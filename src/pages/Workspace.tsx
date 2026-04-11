import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { sendChatMessage } from '../api/client';
import type { ChatMessage } from '../types';
import './Workspace.css';

const WELCOME: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content:
    'Stress Analyst online. Describe the structure, constraints, and load cases. I will run the analysis and post the report to the canvas.',
  timestamp: new Date().toISOString(),
};

function uid(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function formatTime(iso: string): string {
  try {
    return new Date(iso).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
}

export default function Workspace() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [draft, setDraft] = useState('');
  const [pending, setPending] = useState(false);

  const threadRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const latestAssistant = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i -= 1) {
      const m = messages[i];
      if (m.role === 'assistant' && m.id !== 'welcome') return m;
    }
    return null;
  }, [messages]);

  useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, pending]);

  const handleSend = useCallback(async () => {
    const text = draft.trim();
    if (!text || pending) return;

    const userMsg: ChatMessage = {
      id: uid('user'),
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    };
    const history = messages;
    setMessages((prev) => [...prev, userMsg]);
    setDraft('');
    setPending(true);

    try {
      const reply = await sendChatMessage(history, text);
      setMessages((prev) => [...prev, reply]);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setMessages((prev) => [
        ...prev,
        {
          id: uid('err'),
          role: 'system',
          content: `Agent unreachable: ${message}`,
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setPending(false);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [draft, messages, pending]);

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  }

  return (
    <div className="ws">
      <header className="ws__topbar">
        <Link to="/" className="ws__brand">
          <span className="ws__mark" aria-hidden="true" />
          <span className="ws__brand-text">Stress Analyst</span>
        </Link>
        <div className="ws__session">
          <span className="ws__session-dot" aria-hidden="true" />
          <span>Session active</span>
        </div>
      </header>

      <main className="ws__body">
        <section className="ws__chat" aria-label="Agent chat">
          <div className="ws__panel-head">
            <span className="ws__panel-label">Conversation</span>
            <span className="ws__panel-sub">Stress Analyst Agent</span>
          </div>

          <div className="ws__thread" ref={threadRef}>
            {messages.map((msg) => (
              <div key={msg.id} className={`msg msg--${msg.role}`}>
                <div className="msg__meta">
                  <span className="msg__role">
                    {msg.role === 'user'
                      ? 'You'
                      : msg.role === 'assistant'
                        ? 'Analyst'
                        : 'System'}
                  </span>
                  <span className="msg__time">{formatTime(msg.timestamp)}</span>
                </div>
                <div className="msg__body">{msg.content}</div>
              </div>
            ))}
            {pending && (
              <div className="msg msg--assistant">
                <div className="msg__meta">
                  <span className="msg__role">Analyst</span>
                </div>
                <div className="msg__body msg__body--thinking">
                  <span className="dots" aria-label="Thinking">
                    <span />
                    <span />
                    <span />
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="ws__composer">
            <textarea
              ref={inputRef}
              className="ws__input"
              placeholder="Describe the structure, constraints, and loads..."
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={onKeyDown}
              rows={2}
            />
            <button
              type="button"
              className="ws__send"
              onClick={() => void handleSend()}
              disabled={pending || draft.trim().length === 0}
            >
              Send
            </button>
          </div>
        </section>

        <section className="ws__canvas" aria-label="Analysis canvas">
          <div className="ws__panel-head ws__panel-head--canvas">
            <span className="ws__panel-label">Analysis Canvas</span>
            <span className="ws__panel-sub">
              {latestAssistant ? `Updated ${formatTime(latestAssistant.timestamp)}` : 'Idle'}
            </span>
          </div>

          <div className="ws__canvas-body">
            {latestAssistant ? (
              <article className="report">
                <div className="report__header">
                  <span className="report__kicker">Analyst Output</span>
                  <span className="report__time">{formatTime(latestAssistant.timestamp)}</span>
                </div>
                <pre className="report__content">{latestAssistant.content}</pre>
              </article>
            ) : (
              <div className="ws__empty">
                <div className="ws__empty-mark" aria-hidden="true" />
                <p className="ws__empty-title">Analysis output will appear here.</p>
                <p className="ws__empty-sub">
                  Reports, margins of safety, and tool output render on this canvas
                  as the analyst completes its work.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
