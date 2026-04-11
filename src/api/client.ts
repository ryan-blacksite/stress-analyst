import type { ChatMessage, StressToolExecution } from '../types';

const API_URL: string = import.meta.env.VITE_API_URL ?? '';
const API_BEARER_TOKEN: string = import.meta.env.VITE_API_BEARER_TOKEN ?? '';
const WORKSPACE_ID: string = import.meta.env.VITE_WORKSPACE_ID ?? 'default';
const STRESS_ANALYST_BASE = '/api/stress-analyst';

let activeConversationId: string | null = null;

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
      if (typeof parsed.chunk === 'string') content += parsed.chunk;
      if (Array.isArray(parsed.toolExecutions)) {
        toolExecutions = parsed.toolExecutions;
      }
    }
  }

  return { conversationId, messageId, content: content.trim(), toolExecutions };
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
    toolExecutions: result.toolExecutions,
  };
}

export { API_URL };
