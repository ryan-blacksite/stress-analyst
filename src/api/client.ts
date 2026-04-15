import type { ChatMessage, MessageAttachment, StressToolExecution } from '../types';

const API_URL: string = import.meta.env.VITE_API_URL ?? '';
const API_BEARER_TOKEN: string = import.meta.env.VITE_API_BEARER_TOKEN ?? '';
const WORKSPACE_ID: string = import.meta.env.VITE_WORKSPACE_ID ?? 'default';
const STRESS_ANALYST_BASE = '/api/stress-analyst';

let activeConversationId: string | null = null;

function createConversationId(): string {
  return `conv-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function url(path: string): string {
  if (!API_URL) return path;
  return `${API_URL.replace(/\/$/, '')}${path}`;
}

function authHeaders(init?: HeadersInit): Headers {
  const headers = new Headers(init);
  if (API_BEARER_TOKEN) {
    headers.set('Authorization', `Bearer ${API_BEARER_TOKEN}`);
  }
  return headers;
}

interface StressStreamEvent {
  conversationId?: string;
  messageId?: string;
  agentId?: string;
  chunk?: string;
  done?: boolean;
  error?: string;
  toolExecutions?: StressToolExecution[];
  [key: string]: unknown;
}

interface StressChatResult {
  conversationId?: string;
  messageId?: string;
  content: string;
  toolExecutions?: StressToolExecution[];
}

interface ProgressiveToolResultEvent {
  __toolResult: true;
  execution: StressToolExecution;
}

interface ProgressivePlanReadyEvent {
  __planReady: true;
  plan: any;
}

async function postStressChat(body: {
  message: string;
  conversationId?: string;
  workspaceId?: string;
  attachment?: MessageAttachment;
  onToolResult?: (execution: StressToolExecution) => void;
  onPlanReady?: (plan: any) => void;
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
  let conversationId = body.conversationId;
  let messageId: string | undefined;
  let toolExecutions: StressToolExecution[] | undefined;

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

      if (parsed.error) throw new Error(parsed.error);
      if (parsed.conversationId) conversationId = parsed.conversationId;
      if (parsed.messageId) messageId = parsed.messageId;
      if (typeof parsed.chunk === 'string') {
        const chunk = parsed.chunk.trim();

        if (chunk.startsWith('{"__toolResult":true')) {
          try {
            const toolEvent = JSON.parse(chunk) as ProgressiveToolResultEvent;
            if (toolEvent.__toolResult && toolEvent.execution) {
              body.onToolResult?.(toolEvent.execution);
              continue;
            }
          } catch {
            // fall through and treat as normal text
          }
        }

        if (chunk.startsWith('{"__planReady":true')) {
          try {
            const planEvent = JSON.parse(chunk) as ProgressivePlanReadyEvent;
            if (planEvent.__planReady) {
              body.onPlanReady?.(planEvent.plan);
              continue;
            }
          } catch {
            // fall through and treat as normal text
          }
        }

        content += parsed.chunk;
      }
      if (Array.isArray(parsed.toolExecutions)) {
        toolExecutions = parsed.toolExecutions;
      }
    }
  }

  return { conversationId, messageId, content: content.trim(), toolExecutions };
}

export interface StressWorkspaceFile {
  path: string;
  size: number;
  name: string;
  savedAt?: string;
  analysisType?: string;
  slug?: string;
}

const ANALYSIS_FOLDER = 'analyses';

function parseAnalysisFilename(path: string): { name: string; savedAt?: string; analysisType?: string; slug?: string } {
  const base = path.replace(/^analyses\//, '');
  const name = base;
  const withoutExt = base.replace(/\.json$/i, '');
  const match = withoutExt.match(/^analysis_(\d{8}T\d{6})_([a-z0-9]+)_(.+)$/i);
  if (!match) return { name };
  const [, compact, analysisType, slug] = match;
  const iso = `${compact.slice(0, 4)}-${compact.slice(4, 6)}-${compact.slice(6, 8)}T${compact.slice(9, 11)}:${compact.slice(11, 13)}:${compact.slice(13, 15)}`;
  return { name, savedAt: iso, analysisType, slug };
}

function buildAnalysisFilename(date: Date, analysisType: string, slug: string): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  const compact =
    `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}` +
    `T${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
  const cleanType = analysisType.toLowerCase().replace(/[^a-z0-9]+/g, '') || 'analysis';
  const cleanSlug = slug
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48) || 'report';
  return `analysis_${compact}_${cleanType}_${cleanSlug}.json`;
}

export function makeAnalysisFilename(analysisType: string, slug: string, date: Date = new Date()): string {
  return buildAnalysisFilename(date, analysisType, slug);
}

function resolveWorkspaceId(workspaceId?: string): string {
  return workspaceId ?? WORKSPACE_ID;
}

export async function listAnalysisFiles(workspaceId?: string): Promise<StressWorkspaceFile[]> {
  const id = resolveWorkspaceId(workspaceId);
  const res = await fetch(
    url(`${STRESS_ANALYST_BASE}/workspaces/${encodeURIComponent(id)}/files`),
    { headers: authHeaders() },
  );
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Failed to list files: ${res.status} ${text || res.statusText}`);
  }
  const payload = (await res.json()) as { files?: Array<{ path: string; size: number }> };
  const files = payload.files ?? [];
  return files
    .filter((f) => f.path.startsWith(`${ANALYSIS_FOLDER}/`))
    .map((f) => ({ path: f.path, size: f.size, ...parseAnalysisFilename(f.path) }))
    .sort((a, b) => {
      const aKey = a.savedAt ?? a.name;
      const bKey = b.savedAt ?? b.name;
      return bKey.localeCompare(aKey);
    });
}

export async function readAnalysisFile(path: string, workspaceId?: string): Promise<string> {
  const id = resolveWorkspaceId(workspaceId);
  const params = new URLSearchParams({ path });
  const res = await fetch(
    url(`${STRESS_ANALYST_BASE}/workspaces/${encodeURIComponent(id)}/file?${params.toString()}`),
    { headers: authHeaders() },
  );
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Failed to read file: ${res.status} ${text || res.statusText}`);
  }
  return res.text();
}

export async function saveAnalysisFile(
  filename: string,
  content: string,
  workspaceId?: string,
): Promise<StressWorkspaceFile> {
  const id = resolveWorkspaceId(workspaceId);
  const form = new FormData();
  form.append('file', new Blob([content], { type: 'application/json' }), filename);
  form.append('folder', ANALYSIS_FOLDER);
  const res = await fetch(
    url(`${STRESS_ANALYST_BASE}/workspaces/${encodeURIComponent(id)}/files/upload`),
    { method: 'POST', headers: authHeaders(), body: form },
  );
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Failed to save file: ${res.status} ${text || res.statusText}`);
  }
  const payload = (await res.json()) as { file: { path: string; size: number } };
  return {
    path: payload.file.path,
    size: payload.file.size,
    ...parseAnalysisFilename(payload.file.path),
  };
}

export async function sendChatMessage(
  _history: ChatMessage[],
  message: string,
  attachment?: MessageAttachment,
  onToolResult?: (execution: StressToolExecution) => void,
  onPlanReady?: (plan: any) => void,
): Promise<ChatMessage> {
  const result = await postStressChat({
    message,
    conversationId: activeConversationId ?? undefined,
    workspaceId: WORKSPACE_ID,
    attachment,
    onToolResult,
    onPlanReady,
  });

  if (result.conversationId) {
    activeConversationId = result.conversationId;
  }

  return {
    id: result.messageId ?? `assistant-${Date.now().toString(36)}`,
    role: 'assistant',
    content: result.content || 'No response returned from stress analyst.',
    timestamp: new Date().toISOString(),
    toolExecutions: result.toolExecutions,
  };
}

export function resetChatConversation(): string {
  activeConversationId = createConversationId();
  return activeConversationId;
}

export { API_URL };
