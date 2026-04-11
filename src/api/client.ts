import type {
  ChatMessage,
  InputCategory,
  ToolId,
  ToolOutput,
  UploadedFile,
} from '../types';

const API_URL: string = import.meta.env.VITE_API_URL ?? '';
const API_BEARER_TOKEN: string = import.meta.env.VITE_API_BEARER_TOKEN ?? '';
const WORKSPACE_ID: string = import.meta.env.VITE_WORKSPACE_ID ?? 'default';
const STRESS_ANALYST_BASE = '/api/stress-analyst';

let activeConversationId: string | null = null;

function url(path: string): string {
  if (!API_URL) {
    return path;
  }
  return `${API_URL.replace(/\/$/, '')}${path}`;
}

function authHeaders(init?: HeadersInit): Headers {
  const headers = new Headers(init);
  if (API_BEARER_TOKEN) {
    headers.set('Authorization', `Bearer ${API_BEARER_TOKEN}`);
  }
  return headers;
}

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`API ${res.status}: ${text || res.statusText}`);
  }
  return (await res.json()) as T;
}

interface StressStreamEvent {
  conversationId?: string;
  messageId?: string;
  agentId?: string;
  chunk?: string;
  done?: boolean;
  error?: string;
  [key: string]: unknown;
}

interface StressChatResult {
  conversationId?: string;
  messageId?: string;
  content: string;
  doneEvent?: StressStreamEvent;
}

function parseMarginsFromText(text: string): ToolOutput['marginsOfSafety'] {
  const rows: NonNullable<ToolOutput['marginsOfSafety']> = [];
  const lines = text.split(/\r?\n/);
  for (const line of lines) {
    const match = line.match(/^([^:]+margin[^:]*):\s*([+-]?\d+(?:\.\d+)?)/i);
    if (!match) continue;
    const mode = match[1].trim();
    const value = Number.parseFloat(match[2]);
    if (Number.isNaN(value)) continue;
    rows.push({
      location: 'Governing case',
      mode,
      value,
    });
  }
  return rows.length > 0 ? rows : undefined;
}

async function postStressChat(body: {
  message: string;
  conversationId?: string;
  workspaceId?: string;
}): Promise<StressChatResult> {
  const res = await fetch(url(`${STRESS_ANALYST_BASE}/chat`), {
    method: 'POST',
    headers: authHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`API ${res.status}: ${text || res.statusText}`);
  }
  if (!res.body) {
    throw new Error('Missing SSE response body from stress analyst endpoint');
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let content = '';
  let doneEvent: StressStreamEvent | undefined;
  let conversationId = body.conversationId;
  let messageId: string | undefined;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const parts = buffer.split('\n\n');
    buffer = parts.pop() ?? '';

    for (const eventBlock of parts) {
      const dataLines = eventBlock
        .split('\n')
        .filter((line) => line.startsWith('data: '))
        .map((line) => line.slice(6));

      if (dataLines.length === 0) continue;
      const data = dataLines.join('\n').trim();
      if (!data || data === '[DONE]') continue;

      let parsed: StressStreamEvent;
      try {
        parsed = JSON.parse(data) as StressStreamEvent;
      } catch {
        continue;
      }

      if (parsed.error) {
        throw new Error(parsed.error);
      }

      if (parsed.conversationId) conversationId = parsed.conversationId;
      if (parsed.messageId) messageId = parsed.messageId;
      if (typeof parsed.chunk === 'string') content += parsed.chunk;
      if (parsed.done) doneEvent = parsed;
    }
  }

  return { conversationId, messageId, content: content.trim(), doneEvent };
}

export async function uploadInputFile(
  category: InputCategory,
  file: File,
): Promise<UploadedFile> {
  const form = new FormData();
  form.append('file', file);
  form.append('folder', category);

  const res = await fetch(
    url(`${STRESS_ANALYST_BASE}/workspaces/${encodeURIComponent(WORKSPACE_ID)}/files/upload`),
    {
      method: 'POST',
      headers: authHeaders(),
      body: form,
    },
  );

  const payload = await handle<{
    workspaceId: string;
    file: { name: string; path: string; size: number };
  }>(res);

  return {
    id: payload.file.path,
    category,
    name: payload.file.name,
    size: payload.file.size,
    uploadedAt: new Date().toISOString(),
  };
}

export async function runTool(
  tool: ToolId,
  fileIds: string[],
): Promise<ToolOutput> {
  const toolMap: Record<ToolId, string> = {
    full_analysis: 'run_full_analysis',
    buckling_check: 'run_buckling_check',
    bearing_analysis: 'run_bearing_analysis',
    shear_analysis: 'run_shear_analysis',
  };
  const toolName = toolMap[tool];
  const fileList = fileIds.length > 0 ? fileIds.join(', ') : 'none provided';
  const message = [
    `Run the specialist tool "${toolName}" now.`,
    `Use workspace files: ${fileList}.`,
    'Respond with a concise analysis summary and include the mock result details.',
  ].join(' ');

  const result = await postStressChat({
    message,
    conversationId: activeConversationId ?? undefined,
    workspaceId: WORKSPACE_ID,
  });

  if (result.conversationId) {
    activeConversationId = result.conversationId;
  }

  const lines = result.content.split(/\r?\n/).filter((line) => line.trim().length > 0);
  return {
    tool,
    summary: lines[0] ?? 'Analysis completed.',
    marginsOfSafety: parseMarginsFromText(result.content),
    details: result.content,
    raw: result.doneEvent,
  };
}

export async function sendChatMessage(
  _history: ChatMessage[],
  message: string,
): Promise<ChatMessage> {
  const result = await postStressChat({
    message,
    conversationId: activeConversationId ?? undefined,
    workspaceId: WORKSPACE_ID,
  });

  if (result.conversationId) {
    activeConversationId = result.conversationId;
  }

  return {
    id: result.messageId ?? `assistant-${Date.now().toString(36)}`,
    role: 'assistant',
    content: result.content || 'No response returned from stress analyst.',
    timestamp: new Date().toISOString(),
  };
}

export { API_URL };
