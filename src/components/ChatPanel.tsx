import { useEffect, useRef, useState } from 'react';
import type { ChatMessage } from '../types';
import './ChatPanel.css';

interface Props {
  messages: ChatMessage[];
  pending: boolean;
  onSend: (text: string) => void;
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

export default function ChatPanel({ messages, pending, onSend }: Props) {
  const [draft, setDraft] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages, pending]);

  function submit() {
    const text = draft.trim();
    if (!text || pending) return;
    onSend(text);
    setDraft('');
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  return (
    <div className="chat">
      <div className="chat__header">
        <span className="chat__title">Agent Conversation</span>
        <span className="chat__subtitle">
          Describe the structure, constraints, or questions for the analyst.
        </span>
      </div>

      <div className="chat__scroll" ref={scrollRef}>
        {messages.map((msg) => (
          <div key={msg.id} className={`chat__msg chat__msg--${msg.role}`}>
            <div className="chat__msg-meta">
              <span className="chat__msg-role">
                {msg.role === 'user'
                  ? 'You'
                  : msg.role === 'assistant'
                    ? 'Analyst'
                    : 'System'}
              </span>
              <span className="chat__msg-time">{formatTime(msg.timestamp)}</span>
            </div>
            <div className="chat__msg-body">{msg.content}</div>
          </div>
        ))}
        {pending && (
          <div className="chat__msg chat__msg--assistant chat__msg--pending">
            <div className="chat__msg-meta">
              <span className="chat__msg-role">Analyst</span>
            </div>
            <div className="chat__msg-body">
              <span className="chat__dots" aria-label="Thinking">
                <span />
                <span />
                <span />
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="chat__composer">
        <textarea
          className="chat__input"
          placeholder="Ask the analyst, or describe what you want to check..."
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
          rows={3}
        />
        <button
          type="button"
          className="chat__send"
          onClick={submit}
          disabled={pending || draft.trim().length === 0}
        >
          Send
        </button>
      </div>
    </div>
  );
}
