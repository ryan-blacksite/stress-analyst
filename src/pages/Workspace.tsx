import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  listAnalysisFiles,
  makeAnalysisFilename,
  readAnalysisFile,
  saveAnalysisFile,
  sendChatMessage,
  type StressWorkspaceFile,
} from '../api/client';
import type { AnalysisSnapshot, ChatMessage, StressToolExecution } from '../types';
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

function formatDate(iso: string | undefined): string {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleString([], {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return iso;
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

function shortAnalysisType(toolName: string | undefined): string {
  switch (toolName) {
    case 'run_full_analysis':
      return 'full';
    case 'run_buckling_check':
      return 'buckling';
    case 'run_bearing_analysis':
      return 'bearing';
    case 'run_shear_analysis':
      return 'shear';
    case 'get_margin_of_safety':
      return 'ms';
    case 'get_material_properties':
      return 'material';
    default:
      return 'analysis';
  }
}

function typeLabel(type: string | undefined): string {
  switch (type) {
    case 'full':
      return 'Integrated';
    case 'buckling':
      return 'Buckling';
    case 'bearing':
      return 'Bearing';
    case 'shear':
      return 'Shear';
    case 'ms':
      return 'Margin';
    case 'material':
      return 'Material';
    default:
      return type ?? 'Analysis';
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

function deriveSnapshotMeta(toolExecutions: StressToolExecution[]): { analysisType: string; slug: string; summary: string } {
  const governing = toolExecutions.find((t) => t.resultParsed && typeof t.resultParsed.governingMargin === 'number')
    ?? toolExecutions[toolExecutions.length - 1];
  const toolName = governing?.resultParsed?.toolName ?? governing?.toolName;
  const analysisType = shortAnalysisType(toolName);
  const slug = governing?.resultParsed?.component ?? governing?.resultParsed?.governingMode ?? toolTitle(toolName);
  const summary = governing?.resultParsed?.summary ?? `Stress analysis (${typeLabel(analysisType)})`;
  return { analysisType, slug, summary };
}

interface LoadedFile {
  path: string;
  name: string;
  savedAt?: string;
  content: string;
  snapshot: AnalysisSnapshot | null;
}

function tryParseSnapshot(text: string): AnalysisSnapshot | null {
  try {
    const parsed = JSON.parse(text) as Partial<AnalysisSnapshot>;
    if (parsed && Array.isArray(parsed.toolExecutions)) {
      return {
        version: 1,
        savedAt: parsed.savedAt ?? new Date().toISOString(),
        summary: parsed.summary,
        analysisType: parsed.analysisType,
        toolExecutions: parsed.toolExecutions as StressToolExecution[],
      };
    }
  } catch {
    // fall through to plain text
  }
  return null;
}

export default function Workspace() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [draft, setDraft] = useState('');
  const [pending, setPending] = useState(false);

  const [files, setFiles] = useState<StressWorkspaceFile[]>([]);
  const [filesError, setFilesError] = useState<string | null>(null);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [loadedFile, setLoadedFile] = useState<LoadedFile | null>(null);
  const [activeFilePath, setActiveFilePath] = useState<string | null>(null);
  const [fileOpInProgress, setFileOpInProgress] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

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

  const refreshFiles = useCallback(async () => {
    setLoadingFiles(true);
    setFilesError(null);
    try {
      const list = await listAnalysisFiles();
      setFiles(list);
    } catch (err) {
      setFilesError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoadingFiles(false);
    }
  }, []);

  useEffect(() => {
    void refreshFiles();
  }, [refreshFiles]);

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
      if (reply.toolExecutions && reply.toolExecutions.length > 0) {
        setLoadedFile(null);
        setActiveFilePath(null);
      }
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

  const handleFileClick = useCallback(async (file: StressWorkspaceFile) => {
    if (fileOpInProgress) return;
    setFileOpInProgress(true);
    setFilesError(null);
    setActiveFilePath(file.path);
    try {
      const content = await readAnalysisFile(file.path);
      const snapshot = tryParseSnapshot(content);
      setLoadedFile({
        path: file.path,
        name: file.name,
        savedAt: file.savedAt,
        content,
        snapshot,
      });
    } catch (err) {
      setFilesError(err instanceof Error ? err.message : String(err));
      setActiveFilePath(null);
    } finally {
      setFileOpInProgress(false);
    }
  }, [fileOpInProgress]);

  const handleCloseFile = useCallback(() => {
    setLoadedFile(null);
    setActiveFilePath(null);
  }, []);

  const handleSave = useCallback(async () => {
    if (fileOpInProgress) return;
    setSaveError(null);

    let filename: string;
    let content: string;

    if (loadedFile) {
      filename = loadedFile.name;
      content = loadedFile.content;
    } else if (latestToolRun && latestToolRun.toolExecutions && latestToolRun.toolExecutions.length > 0) {
      const { analysisType, slug, summary } = deriveSnapshotMeta(latestToolRun.toolExecutions);
      const snapshot: AnalysisSnapshot = {
        version: 1,
        savedAt: new Date().toISOString(),
        summary,
        analysisType,
        toolExecutions: latestToolRun.toolExecutions,
      };
      content = JSON.stringify(snapshot, null, 2);
      filename = makeAnalysisFilename(analysisType, slug);
    } else {
      setSaveError('Nothing on the canvas to save.');
      return;
    }

    setFileOpInProgress(true);
    try {
      const saved = await saveAnalysisFile(filename, content);
      await refreshFiles();
      setActiveFilePath(saved.path);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : String(err));
    } finally {
      setFileOpInProgress(false);
    }
  }, [fileOpInProgress, latestToolRun, loadedFile, refreshFiles]);

  const canvasMode: 'file' | 'tool' | 'empty' = loadedFile
    ? 'file'
    : latestToolRun && latestToolRun.toolExecutions && latestToolRun.toolExecutions.length > 0
      ? 'tool'
      : 'empty';

  const canSave = !fileOpInProgress && (
    (canvasMode === 'tool' && !!latestToolRun)
    || (canvasMode === 'file' && !!loadedFile)
  );

  const canvasSubLabel = canvasMode === 'file' && loadedFile
    ? `File · ${loadedFile.name}`
    : canvasMode === 'tool' && latestToolRun
      ? `Live · Updated ${formatTime(latestToolRun.timestamp)}`
      : 'Idle';

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
        <div className="ws__left-col">
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

          <section className="ws__files" aria-label="Saved analyses">
            <div className="ws__panel-head">
              <span className="ws__panel-label">Saved Analyses</span>
              <button
                type="button"
                className="ws__file-save"
                onClick={() => void handleSave()}
                disabled={!canSave}
                title={canSave ? 'Save the current canvas to a new analysis file' : 'Run an analysis first'}
              >
                {fileOpInProgress ? 'Saving…' : 'Save Current Analysis'}
              </button>
            </div>

            <div className="ws__file-list" role="list">
              {loadingFiles && files.length === 0 ? (
                <div className="ws__file-empty">Loading…</div>
              ) : filesError ? (
                <div className="ws__file-error">{filesError}</div>
              ) : files.length === 0 ? (
                <div className="ws__file-empty">
                  No saved analyses yet. Run an analysis and hit <em>Save Current Analysis</em> to archive it.
                </div>
              ) : (
                files.map((file) => {
                  const active = activeFilePath === file.path;
                  return (
                    <button
                      key={file.path}
                      type="button"
                      role="listitem"
                      className={`ws__file-item${active ? ' ws__file-item--active' : ''}`}
                      onClick={() => void handleFileClick(file)}
                      disabled={fileOpInProgress && !active}
                    >
                      <div className="ws__file-row">
                        <span className="ws__file-name">{file.slug ?? file.name}</span>
                        <span className="ws__file-type">{typeLabel(file.analysisType)}</span>
                      </div>
                      <div className="ws__file-meta">
                        <span className="ws__file-date">{formatDate(file.savedAt) || file.name}</span>
                        <span className="ws__file-size">{Math.max(1, Math.round(file.size / 1024))} KB</span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {saveError && <div className="ws__file-error ws__file-error--footer">{saveError}</div>}
          </section>
        </div>

        <section className="ws__canvas" aria-label="Analysis canvas">
          <div className="ws__panel-head ws__panel-head--canvas">
            <span className="ws__panel-label">Analysis Canvas</span>
            <div className="ws__canvas-head-right">
              <span className="ws__panel-sub">{canvasSubLabel}</span>
              {canvasMode === 'file' && (
                <button
                  type="button"
                  className="ws__canvas-close"
                  onClick={handleCloseFile}
                  title="Return to the latest live analysis"
                >
                  Close file
                </button>
              )}
            </div>
          </div>

          <div className="ws__canvas-body">
            {canvasMode === 'file' && loadedFile ? (
              <FileCanvas file={loadedFile} />
            ) : canvasMode === 'tool' && latestToolRun && latestToolRun.toolExecutions ? (
              <AnalysisReport
                timestamp={latestToolRun.timestamp}
                toolExecutions={latestToolRun.toolExecutions}
                kicker="Analyst Output"
              />
            ) : (
              <div className="ws__empty">
                <div className="ws__empty-mark" aria-hidden="true" />
                <p className="ws__empty-title">Analysis output will appear here.</p>
                <p className="ws__empty-sub">
                  Calculation steps, margins, and tool results render on this canvas
                  as the analyst completes its work. Click a saved file to reopen it.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

function FileCanvas({ file }: { file: LoadedFile }) {
  if (file.snapshot) {
    return (
      <AnalysisReport
        timestamp={file.snapshot.savedAt}
        toolExecutions={file.snapshot.toolExecutions}
        kicker={`Saved File · ${formatDate(file.snapshot.savedAt)}`}
      />
    );
  }
  return (
    <article className="report">
      <div className="report__header">
        <span className="report__kicker">Saved File</span>
        <span className="report__time">{formatDate(file.savedAt)}</span>
      </div>
      <div className="report__content">
        <pre className="report__raw">{file.content}</pre>
      </div>
    </article>
  );
}

interface AnalysisReportProps {
  timestamp: string;
  toolExecutions: StressToolExecution[];
  kicker?: string;
}

function AnalysisReport({ timestamp, toolExecutions, kicker = 'Analyst Output' }: AnalysisReportProps) {
  return (
    <article className="report">
      <div className="report__header">
        <span className="report__kicker">{kicker}</span>
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
