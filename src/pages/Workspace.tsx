import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { sendChatMessage } from '../api/client';
import type { ChatMessage, StressToolExecution } from '../types';
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

function toolTitle(toolName: string | undefined): string {
  switch (toolName) {
    case 'run_full_analysis':
      return 'Integrated Structural Analysis';
    case 'run_buckling_check':
      return 'Buckling Analysis';
    case 'run_bearing_analysis':
      return 'Bearing Analysis';
    case 'run_shear_analysis':
      return 'Shear Analysis';
    case 'get_margin_of_safety':
      return 'Margin of Safety';
    case 'get_material_properties':
      return 'Material Properties';
    default:
      return toolName ?? 'Analysis';
  }
}

function formatInputValue(value: number | string): string {
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) return String(value);
    const abs = Math.abs(value);
    if (abs !== 0 && (abs >= 1e6 || abs < 1e-3)) return value.toExponential(3);
    return value.toLocaleString('en-US', { maximumFractionDigits: 4 });
  }
  return String(value);
}

function formatMargin(value: number | undefined): string {
  if (typeof value !== 'number' || !Number.isFinite(value)) return '—';
  const sign = value >= 0 ? '+' : '−';
  return `${sign}${Math.abs(value).toFixed(3)}`;
}

export default function Workspace() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [draft, setDraft] = useState('');
  const [pending, setPending] = useState(false);

  const threadRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const latestToolRun = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i -= 1) {
      const m = messages[i];
      if (m.role === 'assistant' && m.toolExecutions && m.toolExecutions.length > 0) {
        return m;
      }
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
              {latestToolRun ? `Updated ${formatTime(latestToolRun.timestamp)}` : 'Idle'}
            </span>
          </div>

          <div className="ws__canvas-body">
            {latestToolRun && latestToolRun.toolExecutions && latestToolRun.toolExecutions.length > 0 ? (
              <AnalysisReport
                timestamp={latestToolRun.timestamp}
                toolExecutions={latestToolRun.toolExecutions}
              />
            ) : (
              <div className="ws__empty">
                <div className="ws__empty-mark" aria-hidden="true" />
                <p className="ws__empty-title">Analysis output will appear here.</p>
                <p className="ws__empty-sub">
                  Calculation steps, margins, and tool results render on this canvas
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

interface AnalysisReportProps {
  timestamp: string;
  toolExecutions: StressToolExecution[];
}

function AnalysisReport({ timestamp, toolExecutions }: AnalysisReportProps) {
  return (
    <article className="report">
      <div className="report__header">
        <span className="report__kicker">Analyst Output</span>
        <span className="report__time">{formatTime(timestamp)}</span>
      </div>
      <div className="report__content">
        {toolExecutions.map((execution, idx) => (
          <ToolExecutionSection
            key={execution.toolCallId ?? `${execution.toolName}-${idx}`}
            execution={execution}
          />
        ))}
      </div>
    </article>
  );
}

function ToolExecutionSection({ execution }: { execution: StressToolExecution }) {
  const parsed = execution.resultParsed;
  const title = toolTitle(parsed?.toolName ?? execution.toolName);
  const status = parsed?.status;
  const statusClass = status ? `report__status report__status--${status.toLowerCase()}` : '';

  return (
    <section className="report__section">
      <div className="report__section-head">
        <span className="report__section-title">{title}</span>
        {status && <span className={statusClass}>{status}</span>}
      </div>

      {parsed?.summary && (
        <p className="report__summary">{parsed.summary}</p>
      )}

      {typeof parsed?.governingMargin === 'number' && (
        <div className="report__governing">
          <span className="report__label">Governing mode</span>
          <span className="report__value">{parsed.governingMode ?? '—'}</span>
          <span className="report__label">Governing MS</span>
          <span className="report__value">{formatMargin(parsed.governingMargin)}</span>
        </div>
      )}

      {parsed?.inputs && Object.keys(parsed.inputs).length > 0 && (
        <div className="report__inputs">
          <div className="report__block-title">Inputs</div>
          <table className="report__table">
            <tbody>
              {Object.entries(parsed.inputs).map(([key, value]) => (
                <tr key={key}>
                  <th scope="row">{key}</th>
                  <td>{formatInputValue(value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {parsed?.calculationSteps && parsed.calculationSteps.length > 0 && (
        <div className="report__steps">
          <div className="report__block-title">Calculation steps</div>
          <ol className="report__step-list">
            {parsed.calculationSteps.map((step, idx) => (
              <li key={idx} className="report__step">
                <div className="report__step-head">{step.step}</div>
                <div className="report__step-line">
                  <span className="report__step-label">Formula</span>
                  <span className="report__step-value">{step.formula}</span>
                </div>
                <div className="report__step-line">
                  <span className="report__step-label">Substituted</span>
                  <span className="report__step-value">{step.values}</span>
                </div>
                <div className="report__step-line">
                  <span className="report__step-label">Result</span>
                  <span className="report__step-value report__step-result">{step.result}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}

      {parsed?.checks && parsed.checks.length > 0 && (
        <div className="report__checks">
          <div className="report__block-title">Margin summary</div>
          <table className="report__table">
            <thead>
              <tr>
                <th>Mode</th>
                <th>Allowable</th>
                <th>MS</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {parsed.checks.map((check, idx) => {
                const allowable = typeof check.allowableLoadLbf === 'number'
                  ? `${formatInputValue(check.allowableLoadLbf)} lbf`
                  : typeof check.criticalStressPsi === 'number'
                    ? `${formatInputValue(check.criticalStressPsi)} psi`
                    : '—';
                return (
                  <tr key={idx}>
                    <td>{check.mode}</td>
                    <td>{allowable}</td>
                    <td>{formatMargin(check.marginOfSafety)}</td>
                    <td>
                      <span className={`report__status report__status--${check.status.toLowerCase()}`}>
                        {check.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {parsed?.missingInputs && parsed.missingInputs.length > 0 && (
        <div className="report__missing">
          <div className="report__block-title">Required inputs</div>
          <ul>
            {parsed.missingInputs.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {parsed?.notes && <p className="report__notes">{parsed.notes}</p>}

      {!parsed && execution.resultRaw && (
        <pre className="report__raw">{execution.resultRaw}</pre>
      )}
    </section>
  );
}
