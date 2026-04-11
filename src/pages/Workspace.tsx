import {
  startTransition,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import { runTool, sendChatMessage, uploadInputFile } from '../api/client';
import { TOOLS } from '../tools';
import type {
  AnalysisRun,
  ChatMessage,
  InputCategory,
  ToolId,
  ToolOutput,
  UploadedFile,
} from '../types';
import './Workspace.css';

type WorkspaceMode = 'oversight' | 'review' | 'trace';

interface FeedEvent {
  id: string;
  tone: 'neutral' | 'working' | 'success' | 'warning';
  title: string;
  detail: string;
  timestamp: string;
}

interface WorkspaceDocument {
  id: string;
  name: string;
  kind: 'input' | 'report' | 'note' | 'disposition';
  status: 'ready' | 'running' | 'attention';
  source: 'workspace' | 'agent';
  updatedAt: string;
  summary: string;
  content: string;
}

interface ToolStage {
  label: string;
  state: 'ready' | 'active' | 'done';
}

interface ToolLens {
  title: string;
  subtitle: string;
  fields: Array<{ label: string; value: string; emphasis?: boolean }>;
  stages: ToolStage[];
}

const INITIAL_ASSISTANT: ChatMessage = {
  id: 'sys-welcome',
  role: 'assistant',
  content:
    'Stress Analyst online. Hand me geometry, allowables, and load context and I will run the checks, generate the report, and leave a reviewable paper trail while you watch.',
  timestamp: new Date().toISOString(),
};

const INITIAL_FEED: FeedEvent[] = [
  {
    id: 'feed-boot',
    tone: 'success',
    title: 'Workspace ready',
    detail: 'Engineering workspace synchronized. Awaiting assignment or source data.',
    timestamp: new Date().toISOString(),
  },
  {
    id: 'feed-presence',
    tone: 'neutral',
    title: 'Analyst online',
    detail: 'Stress analyst is available for structural sizing, margin review, and report generation.',
    timestamp: new Date().toISOString(),
  },
];

const CATEGORY_LABEL: Record<InputCategory, string> = {
  geometry: 'Geometry',
  materials: 'Materials',
  loads: 'Loads',
  environment: 'Environment',
};

const QUICK_PROMPTS = [
  'Summarize the governing margin',
  'Generate a disposition note',
  'Open the latest report',
];

function uid(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function formatClock(iso: string): string {
  try {
    return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch {
    return '--:--';
  }
}

function formatBytes(value: number): string {
  if (value < 1024) return `${value} B`;
  if (value < 1024 * 1024) return `${(value / 1024).toFixed(1)} KB`;
  return `${(value / (1024 * 1024)).toFixed(2)} MB`;
}

function getToolLens(toolId: ToolId, fileCount: number, output?: ToolOutput): ToolLens {
  const base: ToolLens = {
    title: 'Full Envelope Review',
    subtitle: 'Cross-checking all active failure modes before report synthesis.',
    fields: [
      { label: 'Workspace files', value: `${fileCount} attached` },
      { label: 'Load set', value: fileCount > 0 ? 'Mission inputs loaded' : 'Awaiting upload' },
      { label: 'Result', value: output?.summary ?? 'No result yet', emphasis: Boolean(output?.summary) },
    ],
    stages: [
      { label: 'Pull inputs', state: 'done' },
      { label: 'Solve checks', state: output ? 'done' : 'active' },
      { label: 'Assemble report', state: output ? 'done' : 'ready' },
    ],
  };

  if (toolId === 'buckling_check') {
    return {
      title: 'Buckling Check',
      subtitle: 'Evaluating panel and column stability against mission envelope.',
      fields: [
        { label: 'Method', value: 'Eigenvalue + handbook screening' },
        { label: 'Critical region', value: output?.marginsOfSafety?.[0]?.location ?? 'Cap / web junction' },
        { label: 'Margin', value: output?.marginsOfSafety?.[0] ? `${output.marginsOfSafety[0].value.toFixed(3)} MS` : 'Solving...', emphasis: true },
      ],
      stages: [
        { label: 'Read geometry', state: 'done' },
        { label: 'Assemble stiffness', state: output ? 'done' : 'active' },
        { label: 'Check allowables', state: output ? 'done' : 'ready' },
      ],
    };
  }

  if (toolId === 'bearing_analysis') {
    return {
      title: 'Bearing Analysis',
      subtitle: 'Inspecting joint interfaces, lug bearing, and local contact loads.',
      fields: [
        { label: 'Joint set', value: 'Primary fittings and bolted lugs' },
        { label: 'Allowables', value: fileCount > 0 ? 'Material cards indexed' : 'Pending material cards' },
        { label: 'Status', value: output?.summary ?? 'Awaiting execution', emphasis: true },
      ],
      stages: [
        { label: 'Map joints', state: 'done' },
        { label: 'Compute bearing', state: output ? 'done' : 'active' },
        { label: 'Write findings', state: output ? 'done' : 'ready' },
      ],
    };
  }

  if (toolId === 'shear_analysis') {
    return {
      title: 'Shear Analysis',
      subtitle: 'Tracing shear flow, fastener demand, and reserve factors.',
      fields: [
        { label: 'Fastener set', value: 'Cap splice + web attachments' },
        { label: 'Flow path', value: 'Multi-bay distribution active' },
        { label: 'Result', value: output?.summary ?? 'Solver idle', emphasis: true },
      ],
      stages: [
        { label: 'Import loads', state: 'done' },
        { label: 'Distribute shear', state: output ? 'done' : 'active' },
        { label: 'Compare margins', state: output ? 'done' : 'ready' },
      ],
    };
  }

  return base;
}

function buildDraftReport(run: AnalysisRun, files: UploadedFile[], now: number): string {
  const elapsedSeconds = Math.max(1, Math.floor((now - new Date(run.startedAt).getTime()) / 1000));
  const lines = [
    `# ${run.toolLabel} draft`,
    '',
    '## Active workspace context',
    `- Geometry packets attached: ${files.filter((file) => file.category === 'geometry').length}`,
    `- Materials packets attached: ${files.filter((file) => file.category === 'materials').length}`,
    `- Load packets attached: ${files.filter((file) => file.category === 'loads').length}`,
    `- Environment packets attached: ${files.filter((file) => file.category === 'environment').length}`,
    '',
    '## Working notes',
    '- Pulling workspace files into the active solver context.',
    '- Normalizing units, load cases, and material allowables.',
    '- Establishing governing failure mode candidates.',
    '- Drafting analyst summary for review.',
    '',
    '## Pending analyst remarks',
    'The final report will be attached here when the run completes.',
  ];

  return lines.slice(0, Math.min(lines.length, 4 + elapsedSeconds)).join('\n');
}

function buildDocuments(files: UploadedFile[], runs: AnalysisRun[], now: number): WorkspaceDocument[] {
  const fileDocs = files.map<WorkspaceDocument>((file) => ({
    id: `file-${file.id}`,
    name: file.name,
    kind: 'input',
    status: 'ready',
    source: 'workspace',
    updatedAt: file.uploadedAt,
    summary: `${CATEGORY_LABEL[file.category]} input � ${formatBytes(file.size)}`,
    content: [
      `# ${file.name}`,
      '',
      `Category: ${CATEGORY_LABEL[file.category]}`,
      `Size: ${formatBytes(file.size)}`,
      `Uploaded: ${new Date(file.uploadedAt).toLocaleString()}`,
      '',
      'This source file is staged in the analyst workspace and available to the active tools.',
    ].join('\n'),
  }));

  const runDocs = runs.flatMap<WorkspaceDocument>((run, index) => {
    const baseName = `${run.tool.replace(/_/g, '-')}-${String(index + 1).padStart(2, '0')}`;
    const detailContent =
      run.status === 'running'
        ? buildDraftReport(run, files, now)
        : run.output?.details ??
          [
            `# ${run.toolLabel}`,
            '',
            run.summary ?? 'Run complete.',
            '',
            'No detailed transcript was returned by the backend for this run.',
          ].join('\n');

    const docs: WorkspaceDocument[] = [
      {
        id: `report-${run.id}`,
        name: `${baseName}.stress.md`,
        kind: 'report',
        status:
          run.status === 'running'
            ? 'running'
            : run.status === 'error'
              ? 'attention'
              : 'ready',
        source: 'agent',
        updatedAt: run.completedAt ?? run.startedAt,
        summary: run.summary ?? `${run.toolLabel} in progress`,
        content: detailContent,
      },
    ];

    if (run.status === 'complete') {
      docs.push({
        id: `note-${run.id}`,
        name: `${baseName}.disposition.md`,
        kind: 'disposition',
        status: 'ready',
        source: 'agent',
        updatedAt: run.completedAt ?? run.startedAt,
        summary: 'Disposition note drafted for downstream review.',
        content: [
          `# Disposition note � ${run.toolLabel}`,
          '',
          `Summary: ${run.summary ?? 'Analysis complete.'}`,
          '',
          'Recommended review path:',
          '- Confirm governing margin against latest allowables.',
          '- Verify geometry and load revision alignment.',
          '- Release to structures lead for disposition approval.',
        ].join('\n'),
      });
    }

    return docs;
  });

  return [...runDocs, ...fileDocs].sort(
    (left, right) => new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime(),
  );
}

function MessageComposer({
  pending,
  onSend,
}: {
  pending: boolean;
  onSend: (text: string) => void;
}) {
  const [draft, setDraft] = useState('');

  function submit() {
    const next = draft.trim();
    if (!next || pending) return;
    onSend(next);
    setDraft('');
  }

  return (
    <div className="workspace-chat__composer">
      <textarea
        className="workspace-chat__input"
        rows={4}
        placeholder="Ask the analyst to run a check, explain a margin, or draft a report."
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            submit();
          }
        }}
      />
      <button
        type="button"
        className="workspace-button workspace-button--primary"
        disabled={pending || draft.trim().length === 0}
        onClick={submit}
      >
        Send to analyst
      </button>
    </div>
  );
}

function FileDropRow({
  category,
  files,
  onUpload,
  onRemove,
}: {
  category: InputCategory;
  files: UploadedFile[];
  onUpload: (category: InputCategory, file: File) => void;
  onRemove: (id: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="workspace-source-row">
      <div>
        <div className="workspace-source-row__title">{CATEGORY_LABEL[category]}</div>
        <div className="workspace-source-row__hint">
          {files.length > 0 ? `${files.length} staged` : 'No files loaded'}
        </div>
      </div>
      <button
        type="button"
        className="workspace-button workspace-button--ghost"
        onClick={() => inputRef.current?.click()}
      >
        Add
      </button>
      <input
        ref={inputRef}
        hidden
        multiple
        type="file"
        onChange={(event) => {
          const nextFiles = event.target.files;
          if (!nextFiles) return;
          Array.from(nextFiles).forEach((file) => onUpload(category, file));
          event.target.value = '';
        }}
      />
      {files.length > 0 && (
        <div className="workspace-source-row__files">
          {files.map((file) => (
            <button
              key={file.id}
              type="button"
              className="workspace-chip workspace-chip--file"
              onClick={() => onRemove(file.id)}
              title={`Remove ${file.name}`}
            >
              <span>{file.name}</span>
              <span className="workspace-chip__meta">{formatBytes(file.size)}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Workspace() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_ASSISTANT]);
  const [runs, setRuns] = useState<AnalysisRun[]>([]);
  const [activeRunId, setActiveRunId] = useState<string | null>(null);
  const [chatPending, setChatPending] = useState(false);
  const [busyTool, setBusyTool] = useState<ToolId | null>(null);
  const [feed, setFeed] = useState<FeedEvent[]>(INITIAL_FEED);
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);
  const [workspaceMode, setWorkspaceMode] = useState<WorkspaceMode>('oversight');
  const [autoOpen, setAutoOpen] = useState(true);
  const [clock, setClock] = useState(Date.now());
  const chatScrollRef = useRef<HTMLDivElement>(null);

  const activeRun = useMemo(
    () => runs.find((run) => run.id === activeRunId) ?? null,
    [runs, activeRunId],
  );

  const documents = useMemo(
    () => buildDocuments(files, runs, clock),
    [files, runs, clock],
  );

  const selectedDocument = useMemo(
    () => documents.find((document) => document.id === selectedDocumentId) ?? documents[0] ?? null,
    [documents, selectedDocumentId],
  );

  const toolLens = useMemo(
    () => getToolLens(activeRun?.tool ?? busyTool ?? 'full_analysis', files.length, activeRun?.output),
    [activeRun?.output, activeRun?.tool, busyTool, files.length],
  );

  useEffect(() => {
    const hasRunningWork = runs.some((run) => run.status === 'running');
    if (!hasRunningWork) return undefined;

    const timer = window.setInterval(() => {
      setClock(Date.now());
    }, 600);

    return () => window.clearInterval(timer);
  }, [runs]);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, chatPending]);

  useEffect(() => {
    if (!selectedDocumentId && documents.length > 0) {
      setSelectedDocumentId(documents[0].id);
    }
  }, [documents, selectedDocumentId]);

  function pushFeed(tone: FeedEvent['tone'], title: string, detail: string) {
    startTransition(() => {
      setFeed((current) => [
        {
          id: uid('feed'),
          tone,
          title,
          detail,
          timestamp: new Date().toISOString(),
        },
        ...current,
      ].slice(0, 14));
    });
  }

  async function handleUpload(category: InputCategory, file: File) {
    try {
      const uploaded = await uploadInputFile(category, file);
      setFiles((current) => [uploaded, ...current]);
      pushFeed('success', 'Source staged', `${uploaded.name} added to ${CATEGORY_LABEL[category]} inputs.`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      const localFile: UploadedFile = {
        id: uid('local-file'),
        category,
        name: file.name,
        size: file.size,
        uploadedAt: new Date().toISOString(),
      };

      setFiles((current) => [localFile, ...current]);
      setMessages((current) => [
        ...current,
        {
          id: uid('sys'),
          role: 'system',
          content: `Source staged locally while backend is unavailable: ${message}`,
          timestamp: new Date().toISOString(),
        },
      ]);
      pushFeed('warning', 'Backend unavailable', `${file.name} queued locally for later sync.`);
    }
  }

  function handleRemoveFile(id: string) {
    const removed = files.find((file) => file.id === id);
    setFiles((current) => current.filter((file) => file.id !== id));
    if (removed) {
      pushFeed('neutral', 'Source removed', `${removed.name} removed from the active workspace.`);
    }
  }

  async function handleRunTool(toolId: ToolId) {
    const tool = TOOLS.find((candidate) => candidate.id === toolId);
    if (!tool) return;

    const runId = uid('run');
    const startedAt = new Date().toISOString();
    const pendingRun: AnalysisRun = {
      id: runId,
      tool: toolId,
      toolLabel: tool.label,
      status: 'running',
      startedAt,
      summary: 'Analyst is setting up the active tool.',
    };

    setRuns((current) => [pendingRun, ...current]);
    setActiveRunId(runId);
    setBusyTool(toolId);
    pushFeed('working', 'Tool launched', `${tool.label} is running against ${files.length || 0} workspace files.`);

    if (autoOpen) {
      setSelectedDocumentId(`report-${runId}`);
    }

    try {
      const output = await runTool(toolId, files.map((file) => file.id));
      setRuns((current) =>
        current.map((run) =>
          run.id === runId
            ? {
                ...run,
                status: 'complete',
                completedAt: new Date().toISOString(),
                summary: output.summary,
                output,
              }
            : run,
        ),
      );
      pushFeed('success', 'Tool finished', output.summary);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setRuns((current) =>
        current.map((run) =>
          run.id === runId
            ? {
                ...run,
                status: 'error',
                completedAt: new Date().toISOString(),
                summary: message,
              }
            : run,
        ),
      );
      pushFeed('warning', 'Tool failed', `${tool.label} stopped with: ${message}`);
    } finally {
      setBusyTool(null);
    }
  }

  async function handleSendMessage(text: string) {
    const userMessage: ChatMessage = {
      id: uid('msg'),
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    };

    setMessages((current) => [...current, userMessage]);
    setChatPending(true);
    pushFeed('neutral', 'Assignment received', text);

    try {
      const reply = await sendChatMessage(messages, text);
      setMessages((current) => [...current, reply]);
      pushFeed('working', 'Analyst replied', reply.content);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setMessages((current) => [
        ...current,
        {
          id: uid('sys'),
          role: 'system',
          content: `Analyst connection interrupted: ${message}`,
          timestamp: new Date().toISOString(),
        },
      ]);
      pushFeed('warning', 'Agent unreachable', message);
    } finally {
      setChatPending(false);
    }
  }

  return (
    <div className="workspace-shell">
      <header className="workspace-topbar">
        <Link to="/" className="workspace-topbar__brand">
          <span className="workspace-topbar__glyph" aria-hidden="true" />
          <span>
            <strong>Mission Control</strong>
            <span>Stress Analyst Workspace</span>
          </span>
        </Link>

        <div className="workspace-topbar__meta">
          <div className="workspace-pill">
            <span className="workspace-pill__dot" />
            Agent session active
          </div>
          <div className="workspace-pill workspace-pill--muted">Engineering fit-out</div>
        </div>
      </header>

      <main className="workspace-grid">
        <aside className="workspace-left">
          <section className="workspace-panel workspace-panel--profile">
            <div className="workspace-panel__eyebrow">AI employee</div>
            <div className="workspace-profile">
              <div className="workspace-profile__avatar" aria-hidden="true">
                SA
              </div>
              <div className="workspace-profile__identity">
                <h1>Stress Analyst</h1>
                <p>Structures Engineering Agent</p>
              </div>
            </div>
            <div className="workspace-profile__details">
              <div>
                <span>Focus</span>
                <strong>Buckling, bearing, shear, full margins</strong>
              </div>
              <div>
                <span>Behavior</span>
                <strong>Runs tools, drafts reports, leaves review trail</strong>
              </div>
            </div>
          </section>

          <section className="workspace-panel workspace-panel--chat">
            <div className="workspace-panel__header">
              <div>
                <div className="workspace-panel__title">Conversation</div>
                <div className="workspace-panel__subtitle">
                  Talk to the analyst like a coworker. The agent does the work while you monitor.
                </div>
              </div>
            </div>

            <div className="workspace-chat__stream" ref={chatScrollRef}>
              {messages.map((message) => (
                <article
                  key={message.id}
                  className={`workspace-chat__message workspace-chat__message--${message.role}`}
                >
                  <div className="workspace-chat__meta">
                    <span>
                      {message.role === 'assistant'
                        ? 'Stress Analyst'
                        : message.role === 'user'
                          ? 'You'
                          : 'Workspace'}
                    </span>
                    <span>{formatClock(message.timestamp)}</span>
                  </div>
                  <div className="workspace-chat__body">{message.content}</div>
                </article>
              ))}
              {chatPending && (
                <article className="workspace-chat__message workspace-chat__message--assistant">
                  <div className="workspace-chat__meta">
                    <span>Stress Analyst</span>
                    <span>Thinking</span>
                  </div>
                  <div className="workspace-chat__typing">
                    <span />
                    <span />
                    <span />
                  </div>
                </article>
              )}
            </div>

            <MessageComposer pending={chatPending} onSend={handleSendMessage} />
          </section>
        </aside>

        <section className="workspace-center">
          <section className="workspace-panel workspace-panel--documents">
            <div className="workspace-panel__header">
              <div>
                <div className="workspace-panel__title">Workspace documents</div>
                <div className="workspace-panel__subtitle">
                  Files appear here as the analyst stages inputs, writes reports, and drafts dispositions.
                </div>
              </div>
              <div className="workspace-panel__status">{documents.length} files visible</div>
            </div>

            <div className="workspace-docs">
              <div className="workspace-docs__sidebar">
                <div className="workspace-docs__sources">
                  {(['geometry', 'materials', 'loads', 'environment'] as const).map((category) => (
                    <FileDropRow
                      key={category}
                      category={category}
                      files={files.filter((file) => file.category === category)}
                      onUpload={handleUpload}
                      onRemove={handleRemoveFile}
                    />
                  ))}
                </div>

                <div className="workspace-docs__list">
                  {documents.map((document) => (
                    <button
                      key={document.id}
                      type="button"
                      className={`workspace-docs__item${
                        selectedDocument?.id === document.id ? ' workspace-docs__item--active' : ''
                      }`}
                      onClick={() => setSelectedDocumentId(document.id)}
                    >
                      <div className="workspace-docs__item-top">
                        <span>{document.name}</span>
                        <span className={`workspace-badge workspace-badge--${document.status}`}>
                          {document.status}
                        </span>
                      </div>
                      <div className="workspace-docs__item-meta">{document.summary}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="workspace-docs__viewer">
                {selectedDocument ? (
                  <>
                    <div className="workspace-docs__viewer-header">
                      <div>
                        <div className="workspace-docs__viewer-title">{selectedDocument.name}</div>
                        <div className="workspace-docs__viewer-meta">
                          {selectedDocument.kind} � {selectedDocument.source} � updated {formatClock(selectedDocument.updatedAt)}
                        </div>
                      </div>
                      <div className={`workspace-badge workspace-badge--${selectedDocument.status}`}>
                        {selectedDocument.status}
                      </div>
                    </div>
                    <pre className="workspace-docs__content">{selectedDocument.content}</pre>
                  </>
                ) : (
                  <div className="workspace-empty">No document selected.</div>
                )}
              </div>
            </div>
          </section>

          <section className="workspace-panel workspace-panel--actions">
            <div className="workspace-panel__header">
              <div>
                <div className="workspace-panel__title">Action deck</div>
                <div className="workspace-panel__subtitle">
                  Fast mode switches and one-click asks while the analyst is working.
                </div>
              </div>
            </div>

            <div className="workspace-actions">
              <div className="workspace-actions__modes">
                {(['oversight', 'review', 'trace'] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    className={`workspace-mode${workspaceMode === mode ? ' workspace-mode--active' : ''}`}
                    onClick={() => setWorkspaceMode(mode)}
                  >
                    {mode}
                  </button>
                ))}
              </div>

              <div className="workspace-actions__buttons">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    className="workspace-button workspace-button--ghost"
                    onClick={() => handleSendMessage(prompt)}
                    disabled={chatPending}
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <label className="workspace-toggle">
                <input
                  type="checkbox"
                  checked={autoOpen}
                  onChange={(event) => setAutoOpen(event.target.checked)}
                />
                <span>Auto-open active report when the analyst starts a tool</span>
              </label>
            </div>
          </section>
        </section>

        <aside className="workspace-right">
          <section className="workspace-panel workspace-panel--tool">
            <div className="workspace-panel__header">
              <div>
                <div className="workspace-panel__title">Tool operation view</div>
                <div className="workspace-panel__subtitle">
                  Watch the analyst drive the active analysis tool in real time.
                </div>
              </div>
              <div className="workspace-panel__status">
                {busyTool ? 'Tool active' : activeRun ? activeRun.status : 'Standby'}
              </div>
            </div>

            <div className="workspace-tool">
              <div className="workspace-tool__hero">
                <div>
                  <div className="workspace-tool__title">{toolLens.title}</div>
                  <div className="workspace-tool__subtitle">{toolLens.subtitle}</div>
                </div>
                <div className={`workspace-badge workspace-badge--${activeRun?.status ?? (busyTool ? 'running' : 'ready')}`}>
                  {activeRun?.status ?? (busyTool ? 'running' : 'ready')}
                </div>
              </div>

              <div className="workspace-tool__fields">
                {toolLens.fields.map((field) => (
                  <div key={field.label} className="workspace-tool__field">
                    <span>{field.label}</span>
                    <strong className={field.emphasis ? 'workspace-tool__field--emphasis' : undefined}>
                      {field.value}
                    </strong>
                  </div>
                ))}
              </div>

              <div className="workspace-tool__stages">
                {toolLens.stages.map((stage) => (
                  <div key={stage.label} className={`workspace-stage workspace-stage--${stage.state}`}>
                    <div className="workspace-stage__rail" />
                    <div>
                      <div className="workspace-stage__label">{stage.label}</div>
                      <div className="workspace-stage__state">{stage.state}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="workspace-tool__buttons">
                {TOOLS.map((tool) => (
                  <button
                    key={tool.id}
                    type="button"
                    className={`workspace-tool__launch${busyTool === tool.id ? ' workspace-tool__launch--busy' : ''}`}
                    onClick={() => handleRunTool(tool.id)}
                    disabled={busyTool !== null || files.length === 0}
                    title={tool.description}
                  >
                    {tool.label}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="workspace-panel workspace-panel--feed">
            <div className="workspace-panel__header">
              <div>
                <div className="workspace-panel__title">Activity feed</div>
                <div className="workspace-panel__subtitle">
                  Live trace of what the analyst is doing on your behalf.
                </div>
              </div>
            </div>

            <div className="workspace-feed">
              {feed.map((event) => (
                <article key={event.id} className={`workspace-feed__item workspace-feed__item--${event.tone}`}>
                  <div className="workspace-feed__time">{formatClock(event.timestamp)}</div>
                  <div className="workspace-feed__body">
                    <strong>{event.title}</strong>
                    <p>{event.detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </aside>
      </main>
    </div>
  );
}
