import { Children, cloneElement, isValidElement, type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import {
  listAnalysisFiles,
  makeAnalysisFilename,
  readAnalysisFile,
  resetChatConversation,
  saveAnalysisFile,
  sendChatMessage,
  type StressWorkspaceFile,
} from '../api/client';
import type {
  AnalysisSnapshot,
  ChatMessage,
  CalculationStep,
  MessageAttachment,
  ReportStepStatus,
  StressCheck,
  StressToolExecution,
} from '../types';
import './Workspace.css';

const WELCOME: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content:
    'Stress Analyst online. Describe the structure, constraints, and load cases. I will run the analysis and post the report to the canvas.',
  timestamp: new Date().toISOString(),
};

const CHAT_STORAGE_KEY = 'stress-analyst:chat-messages';
const REPORT_MODE_STORAGE_KEY = 'stress-analyst:report-mode';
const REPORT_MODE_INSTRUCTION = '[REPORT_MODE: Generate a structured analysis report on the canvas. Show all calculations, formulas, margins, and engineering judgment in the Analysis Canvas. Keep the chat response to a brief summary with the governing margin only.]';
const CHAT_MODE_INSTRUCTION = '[CHAT_MODE: Respond conversationally in plain English. Keep it short. Do not include formulas, equations, or detailed calculations in the chat. If the user asks an analytical question, give a plain English summary and mention that they can enable the Report toggle for full analytical output.]';

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
    case 'MATERIAL_LOOKUP':
      return 'Material Lookup';
    case 'LOADS_ANALYSIS':
      return 'Loads Analysis';
    case 'SHEAR_ANALYSIS':
      return 'Shear Analysis';
    case 'BEARING_ANALYSIS':
      return 'Bearing Analysis';
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

function formatToolHeading(toolName: string | undefined): string {
  return toolTitle(toolName).replace(/_/g, ' ').toUpperCase();
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

function isCircularPlaceholder(value: unknown): boolean {
  if (value === '[Circular]') return true;
  if (!value || typeof value !== 'object') return false;
  if (Array.isArray(value)) return value.some(isCircularPlaceholder);
  return Object.values(value as Record<string, unknown>).some(isCircularPlaceholder);
}

function safeInputString(value: unknown): string {
  if (isCircularPlaceholder(value)) return 'See analysis state';
  try {
    return JSON.stringify(value);
  } catch {
    return 'See analysis state';
  }
}

function normalizeInputEntries(raw: unknown): Array<[string, number | string]> | null {
  if (raw == null) return null;
  if (isCircularPlaceholder(raw)) return null;

  let value: unknown = raw;

  if (typeof value === 'string') {
    const stringValue = value;
    const trimmed = stringValue.trim();
    if (!trimmed) return null;
    if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
      try {
        value = JSON.parse(trimmed);
      } catch {
        return [['value', stringValue]];
      }
    } else {
      return [['value', stringValue]];
    }
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return null;
    return value.map((item, idx): [string, number | string] => {
      if (typeof item === 'number' || typeof item === 'string') {
        return [String(idx), item];
      }
      return [String(idx), safeInputString(item)];
    });
  }

  if (typeof value === 'object' && value !== null) {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) return null;
    if (entries.length === 1 && isCircularPlaceholder(entries[0][1])) return null;
    return entries.map(([key, v]): [string, number | string] => {
      if (typeof v === 'number' || typeof v === 'string') {
        return [key, v];
      }
      return [key, safeInputString(v)];
    });
  }

  return [['value', String(value)]];
}

function formatMargin(value: number | undefined): string {
  if (typeof value !== 'number' || !Number.isFinite(value)) return '-';
  const sign = value >= 0 ? '+' : '-';
  return `${sign}${Math.abs(value).toFixed(2)}`;
}

function getCheckMargin(check: StressCheck): number | undefined {
  return typeof check.margin === 'number' ? check.margin : check.marginOfSafety;
}

function formatCheckAllowable(check: StressCheck): string {
  if (typeof check.allowable === 'number') {
    return `${formatInputValue(check.allowable)}${check.unit ? ` ${check.unit}` : ''}`;
  }
  if (typeof check.allowableLoadLbf === 'number') {
    return `${formatInputValue(check.allowableLoadLbf)} lbf`;
  }
  if (typeof check.criticalStressPsi === 'number') {
    return `${formatInputValue(check.criticalStressPsi)} psi`;
  }
  return '-';
}

function formatCheckApplied(check: StressCheck): string {
  if (typeof check.applied !== 'number') return '-';
  return `${formatInputValue(check.applied)}${check.unit ? ` ${check.unit}` : ''}`;
}

function formatStepResult(step: CalculationStep): string {
  const value = typeof step.result === 'number' ? formatInputValue(step.result) : step.result;
  return step.unit ? `${value} ${step.unit}` : value;
}

function formatNotes(notes: string | string[] | undefined): string[] {
  if (!notes) return [];
  return Array.isArray(notes) ? notes.filter(Boolean) : [notes];
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

interface PlanStepDescriptor {
  description: string;
}

interface CanvasStatusState {
  text: string;
  progress: number | null;
}

const STEP_STATUS_LABELS: Record<string, string> = {
  material_lookup: 'Looking up material properties...',
  environmental_knockdown: 'Computing environmental factors...',
  bearing_analysis: 'Running bearing analysis...',
  shear_analysis: 'Running shear analysis...',
  buckling_analysis: 'Running buckling analysis...',
  net_tension_analysis: 'Running net tension analysis...',
  interaction_analysis: 'Running interaction check...',
  loads_analysis: 'Computing load distribution...',
  margin_of_safety: 'Calculating margin of safety...',
};

function executionIdentity(execution: StressToolExecution, fallbackIndex: number): string {
  if (execution.toolCallId) return execution.toolCallId;
  return JSON.stringify({
    i: fallbackIndex,
    toolName: execution.toolName,
    displayName: execution.displayName,
    arguments: execution.arguments,
    resultRaw: execution.resultRaw,
    resultParsed: execution.resultParsed,
  });
}

function mergeToolExecutions(
  existing: StressToolExecution[],
  incoming: StressToolExecution[] | undefined,
): StressToolExecution[] {
  if (!incoming || incoming.length === 0) return existing;

  const merged = [...existing];
  const seen = new Set(merged.map((execution, index) => executionIdentity(execution, index)));

  incoming.forEach((execution, index) => {
    const key = executionIdentity(execution, existing.length + index);
    if (!seen.has(key)) {
      seen.add(key);
      merged.push(execution);
    }
  });

  return merged;
}

function extractPlanSteps(plan: any): PlanStepDescriptor[] {
  if (!plan || typeof plan !== 'object') return [];

  const rawSteps = Array.isArray(plan.steps)
    ? plan.steps
    : Array.isArray(plan.plan)
      ? plan.plan
      : Array.isArray(plan.items)
        ? plan.items
        : [];

  return rawSteps
    .map((step: any) => {
      if (typeof step === 'string') {
        return { description: step };
      }

      if (!step || typeof step !== 'object') return null;

      const description = [
        step.description,
        step.summary,
        step.title,
        step.step,
        step.label,
      ].find((value): value is string => typeof value === 'string' && value.trim().length > 0);

      if (description) {
        return { description };
      }

      const toolName = [step.toolName, step.tool, step.name].find(
        (value): value is string => typeof value === 'string' && value.trim().length > 0,
      );

      if (toolName) {
        return { description: `Running ${toolTitle(toolName)}...` };
      }

      return null;
    })
    .filter((step: PlanStepDescriptor | null): step is PlanStepDescriptor => !!step);
}

function getPlanStepCount(plan: any): number {
  return extractPlanSteps(plan).length;
}

function formatPlanReadyStatus(plan: any): CanvasStatusState {
  const stepCount = getPlanStepCount(plan);
  const label = stepCount === 1 ? 'check' : 'checks';
  return {
    text: `Analysis plan ready — ${stepCount} ${label} planned`,
    progress: null,
  };
}

function formatFallbackStepName(toolName: string): string {
  const cleaned = toolName
    .replace(/_/g, ' ')
    .trim();

  if (!cleaned) return 'Running analysis...';

  return `Running ${cleaned.charAt(0).toLowerCase()}${cleaned.slice(1)}...`;
}

function clampProgress(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

function formatStepStatus(status: ReportStepStatus): CanvasStatusState {
  const total = Math.max(status.total, 0);

  if (total > 0 && status.completed >= total) {
    return {
      text: 'Generating summary...',
      progress: 1,
    };
  }

  const safeTotal = Math.max(total, 1);
  const currentStep = Math.min(status.completed + 1, safeTotal);
  const friendlyLabel = STEP_STATUS_LABELS[status.current] ?? formatFallbackStepName(status.current);

  return {
    text: `${friendlyLabel} (step ${currentStep} of ${safeTotal})`,
    progress: clampProgress(status.completed / safeTotal),
  };
}

interface LoadedFile {
  path: string;
  name: string;
  savedAt?: string;
  content: string;
  snapshot: AnalysisSnapshot | null;
}

interface DraftAttachment {
  file: File;
  previewUrl: string;
}

const ACCEPTED_IMAGE_TYPES = new Set(['image/png', 'image/jpeg', 'image/webp', 'image/gif']);

function isAcceptedImage(file: File): boolean {
  return ACCEPTED_IMAGE_TYPES.has(file.type);
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      const commaIndex = result.indexOf(',');
      resolve(commaIndex >= 0 ? result.slice(commaIndex + 1) : result);
    };
    reader.onerror = () => reject(reader.error ?? new Error('Failed to read attachment.'));
    reader.readAsDataURL(file);
  });
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
        narrativeSummary: parsed.narrativeSummary,
        toolExecutions: parsed.toolExecutions as StressToolExecution[],
      };
    }
  } catch {
    // fall through to plain text
  }
  return null;
}

function restoreChatMessages(): ChatMessage[] {
  if (typeof window === 'undefined') return [WELCOME];
  try {
    const raw = window.localStorage.getItem(CHAT_STORAGE_KEY);
    if (!raw) return [WELCOME];
    const parsed = JSON.parse(raw) as ChatMessage[];
    if (!Array.isArray(parsed) || parsed.length === 0) return [WELCOME];
    const restored = parsed.filter(
      (entry): entry is ChatMessage =>
        !!entry
        && typeof entry.id === 'string'
        && (entry.role === 'user' || entry.role === 'assistant' || entry.role === 'system')
        && typeof entry.content === 'string'
        && typeof entry.timestamp === 'string',
    );
    return restored.length > 0 ? restored : [WELCOME];
  } catch {
    return [WELCOME];
  }
}

const ENGINEERING_SUBSCRIPT_RE = /([\p{L}])_([a-z]{1,4})/gu;

function renderEngineeringNotation(text: unknown): ReactNode[] {
  if (typeof text !== 'string') return [];

  const nodes: ReactNode[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(ENGINEERING_SUBSCRIPT_RE)) {
    const [token, base, subscript] = match;
    const start = match.index ?? 0;
    if (start > lastIndex) {
      nodes.push(text.slice(lastIndex, start));
    }
    nodes.push(
      <span key={`${token}-${start}`} className="msg__notation">
        {base}
        <sub>{subscript}</sub>
      </span>,
    );
    lastIndex = start + token.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length > 0 ? nodes : [text];
}

function renderNotationChildren(children: ReactNode): ReactNode {
  return Children.map(children, (child) => {
    if (typeof child === 'string') {
      return renderEngineeringNotation(child);
    }

    if (!isValidElement<{ children?: ReactNode }>(child)) {
      return child;
    }

    if (typeof child.type === 'string' && (child.type === 'code' || child.type === 'pre')) {
      return child;
    }

    return cloneElement(child, {
      ...child.props,
      children: renderNotationChildren(child.props.children),
    });
  });
}

function MarkdownParagraph({ children }: { children?: ReactNode }) {
  return <p>{renderNotationChildren(children)}</p>;
}

function MarkdownListItem({ children }: { children?: ReactNode }) {
  return <li>{renderNotationChildren(children)}</li>;
}

function MarkdownStrong({ children }: { children?: ReactNode }) {
  return <strong>{renderNotationChildren(children)}</strong>;
}

function MarkdownEmphasis({ children }: { children?: ReactNode }) {
  return <em>{renderNotationChildren(children)}</em>;
}

function MarkdownHeading({
  level,
  children,
}: {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children?: ReactNode;
}) {
  const Tag = `h${level}` as const;
  return <Tag>{renderNotationChildren(children)}</Tag>;
}

function AssistantMessageMarkdown({ content }: { content: string }) {
  return (
    <div className="msg__markdown">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        components={{
          h1: ({ children }) => <MarkdownHeading level={1}>{children}</MarkdownHeading>,
          h2: ({ children }) => <MarkdownHeading level={2}>{children}</MarkdownHeading>,
          h3: ({ children }) => <MarkdownHeading level={3}>{children}</MarkdownHeading>,
          h4: ({ children }) => <MarkdownHeading level={4}>{children}</MarkdownHeading>,
          h5: ({ children }) => <MarkdownHeading level={5}>{children}</MarkdownHeading>,
          h6: ({ children }) => <MarkdownHeading level={6}>{children}</MarkdownHeading>,
          p: ({ children }) => <MarkdownParagraph>{children}</MarkdownParagraph>,
          li: ({ children }) => <MarkdownListItem>{children}</MarkdownListItem>,
          strong: ({ children }) => <MarkdownStrong>{children}</MarkdownStrong>,
          em: ({ children }) => <MarkdownEmphasis>{children}</MarkdownEmphasis>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default function Workspace() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => restoreChatMessages());
  const [draft, setDraft] = useState('');
  const [reportMode, setReportMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      return window.localStorage.getItem(REPORT_MODE_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const [pending, setPending] = useState(false);
  const [draftAttachment, setDraftAttachment] = useState<DraftAttachment | null>(null);
  const [attachmentError, setAttachmentError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [progressiveTools, setProgressiveTools] = useState<StressToolExecution[]>([]);
  const [canvasStatus, setCanvasStatus] = useState<CanvasStatusState | null>(null);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const [files, setFiles] = useState<StressWorkspaceFile[]>([]);
  const [filesError, setFilesError] = useState<string | null>(null);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [loadedFile, setLoadedFile] = useState<LoadedFile | null>(null);
  const [activeFilePath, setActiveFilePath] = useState<string | null>(null);
  const [fileOpInProgress, setFileOpInProgress] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [renameError, setRenameError] = useState<string | null>(null);
  const [filesExpanded, setFilesExpanded] = useState(false);
  const [fileDisplayNames, setFileDisplayNames] = useState<Record<string, string>>({});
  const [editingFilePath, setEditingFilePath] = useState<string | null>(null);
  const [editingFileName, setEditingFileName] = useState('');
  const [renamePending, setRenamePending] = useState(false);

  const threadRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      const metadata = await Promise.all(
        list.map(async (file) => {
          try {
            const text = await readAnalysisFile(file.path);
            const snapshot = tryParseSnapshot(text);
            const summary = snapshot?.summary?.trim();
            return summary ? [file.path, summary] as const : null;
          } catch {
            return null;
          }
        }),
      );
      const nextNames: Record<string, string> = {};
      for (const item of metadata) {
        if (!item) continue;
        const [path, name] = item;
        nextNames[path] = name;
      }
      setFileDisplayNames(nextNames);
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

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // ignore quota/storage failures
    }
  }, [messages]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(REPORT_MODE_STORAGE_KEY, String(reportMode));
    } catch {
      // ignore quota/storage failures
    }
  }, [reportMode]);

  useEffect(() => () => {
    if (draftAttachment) {
      URL.revokeObjectURL(draftAttachment.previewUrl);
    }
  }, [draftAttachment]);

  const clearDraftAttachment = useCallback(() => {
    setDraftAttachment((current) => {
      if (current) {
        URL.revokeObjectURL(current.previewUrl);
      }
      return null;
    });
    setAttachmentError(null);
  }, []);

  const handleNewChat = useCallback(() => {
    setMessages([]);
    setDraft('');
    clearDraftAttachment();
    setAttachmentError(null);
    setProgressiveTools([]);
    setCanvasStatus(null);
    setAnalysisComplete(false);
    resetChatConversation();
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify([]));
      } catch {
        // ignore quota/storage failures
      }
    }
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [clearDraftAttachment]);

  const handleSelectedFile = useCallback((file: File | null) => {
    if (!file) return;
    if (!isAcceptedImage(file)) {
      setAttachmentError('Attach a PNG, JPG, WEBP, or GIF image.');
      return;
    }

    setAttachmentError(null);
    setDraftAttachment((current) => {
      if (current) {
        URL.revokeObjectURL(current.previewUrl);
      }
      return {
        file,
        previewUrl: URL.createObjectURL(file),
      };
    });
  }, []);

  const handleSend = useCallback(async () => {
    const text = draft.trim();
    if ((!text && !draftAttachment) || pending) return;

    let attachment: MessageAttachment | undefined;
    if (draftAttachment) {
      attachment = {
        filename: draftAttachment.file.name,
        mimeType: draftAttachment.file.type,
        data: await fileToBase64(draftAttachment.file),
      };
    }

    const userMsg: ChatMessage = {
      id: uid('user'),
      role: 'user',
      content: text || `[Attached image: ${draftAttachment?.file.name ?? 'image'}]`,
      timestamp: new Date().toISOString(),
    };
    const modeInstruction = reportMode ? REPORT_MODE_INSTRUCTION : CHAT_MODE_INSTRUCTION;
    const outboundMessage = text ? `${modeInstruction}\n\n${text}` : modeInstruction;
    const history = messages;
    setMessages((prev) => [...prev, userMsg]);
    setDraft('');
    clearDraftAttachment();
    setPending(true);
    setProgressiveTools([]);
    setCanvasStatus(null);
    setAnalysisComplete(false);

    if (reportMode) {
      setLoadedFile(null);
      setActiveFilePath(null);
    }

    try {
      const reply = await sendChatMessage(
        history,
        outboundMessage,
        attachment,
        reportMode
          ? (execution) => {
            setProgressiveTools((prev) => mergeToolExecutions(prev, [execution]));
          }
          : undefined,
        reportMode
          ? (plan) => {
            setCanvasStatus(formatPlanReadyStatus(plan));
          }
          : undefined,
        reportMode
          ? (status) => {
            setCanvasStatus(formatStepStatus(status));
          }
          : undefined,
      );

      if (reportMode) {
        setProgressiveTools((prev) => mergeToolExecutions(prev, reply.toolExecutions));
        setCanvasStatus(null);
        setAnalysisComplete(true);
      }

      setMessages((prev) => [...prev, reply]);
      if (reply.toolExecutions && reply.toolExecutions.length > 0) {
        setLoadedFile(null);
        setActiveFilePath(null);
      }
    } catch (err) {
      if (reportMode) {
        setCanvasStatus(null);
        setAnalysisComplete(false);
      }
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
  }, [clearDraftAttachment, draft, draftAttachment, messages, pending, reportMode]);

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  }

  function onFileInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    handleSelectedFile(e.target.files?.[0] ?? null);
    e.target.value = '';
  }

  function onDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    if (pending) return;
    e.dataTransfer.dropEffect = 'copy';
    setDragActive(true);
  }

  function onDragLeave(e: React.DragEvent<HTMLDivElement>) {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
      setDragActive(false);
    }
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragActive(false);
    if (pending) return;
    handleSelectedFile(e.dataTransfer.files?.[0] ?? null);
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

  const handleExport = useCallback(() => {
    window.print();
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
        narrativeSummary: latestToolRun.content || undefined,
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

  const startRenameFile = useCallback((file: StressWorkspaceFile) => {
    const initial = fileDisplayNames[file.path] ?? file.slug ?? file.name;
    setEditingFilePath(file.path);
    setEditingFileName(initial);
    setRenameError(null);
  }, [fileDisplayNames]);

  const cancelRenameFile = useCallback(() => {
    setEditingFilePath(null);
    setEditingFileName('');
    setRenameError(null);
  }, []);

  const commitRenameFile = useCallback(async (file: StressWorkspaceFile) => {
    const nextName = editingFileName.trim();
    if (!nextName) {
      setRenameError('Name cannot be empty.');
      return;
    }

    setRenamePending(true);
    setRenameError(null);
    try {
      const currentContent = await readAnalysisFile(file.path);
      let nextContent = currentContent;
      const snapshot = tryParseSnapshot(currentContent);

      if (snapshot) {
        nextContent = JSON.stringify({ ...snapshot, summary: nextName }, null, 2);
      } else {
        const parsed = JSON.parse(currentContent) as Record<string, unknown>;
        nextContent = JSON.stringify({ ...parsed, summary: nextName }, null, 2);
      }

      await saveAnalysisFile(file.name, nextContent);
      setFileDisplayNames((prev) => ({ ...prev, [file.path]: nextName }));

      if (loadedFile?.path === file.path) {
        setLoadedFile({
          ...loadedFile,
          content: nextContent,
          snapshot: tryParseSnapshot(nextContent),
        });
      }

      setEditingFilePath(null);
      setEditingFileName('');
      await refreshFiles();
    } catch (err) {
      setRenameError(err instanceof Error ? err.message : String(err));
    } finally {
      setRenamePending(false);
    }
  }, [editingFileName, loadedFile, refreshFiles]);

  const liveToolExecutions = reportMode
    ? (pending ? progressiveTools : (latestToolRun?.toolExecutions ?? progressiveTools))
    : [];

  const liveNarrativeSummary = reportMode && !pending ? latestToolRun?.content : undefined;

  const canvasMode: 'file' | 'tool' | 'empty' = loadedFile
    ? 'file'
    : reportMode && liveToolExecutions.length > 0
      ? 'tool'
      : 'empty';

  const canSave = !fileOpInProgress && (
    (canvasMode === 'tool' && !!latestToolRun)
    || (canvasMode === 'file' && !!loadedFile)
  );

  const canvasSubLabel = canvasMode === 'file' && loadedFile
    ? `File - ${loadedFile.name}`
    : canvasMode === 'tool'
      ? pending
        ? 'Live - In Progress'
        : analysisComplete
          ? 'COMPLETE'
        : latestToolRun
          ? `Live - Updated ${formatTime(latestToolRun.timestamp)}`
          : 'Live - Updated just now'
      : 'Idle';

  const exportDateLabel = useMemo(() => (
    new Date().toLocaleDateString([], {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    })
  ), []);

  const enteringExecutionKey = pending && liveToolExecutions.length > 0
    ? executionIdentity(liveToolExecutions[liveToolExecutions.length - 1], liveToolExecutions.length - 1)
    : null;

  const visibleCanvasStatus = reportMode
    && !loadedFile
    && pending
    ? canvasStatus
    : null;

  const statusProgressWidth = visibleCanvasStatus?.progress != null
    ? `${Math.round(clampProgress(visibleCanvasStatus.progress) * 100)}%`
    : '0%';

  const showCanvasStatusBar = !!visibleCanvasStatus;

  return (
    <div className="ws">
      <header className="ws__topbar">
        <Link to="/" className="ws__brand">
          <span className="ws__mark" aria-hidden="true" />
          <span className="ws__brand-text">Stress Analyst</span>
        </Link>
      </header>

      <main className="ws__body">
        <div className="ws__left-col">
          <section className="ws__chat" aria-label="Agent chat">
            <div className="ws__panel-head">
              <div className="ws__chat-head">
                <span className="ws__panel-label">Conversation</span>
                <span className="ws__panel-sub">Stress Analyst Agent</span>
              </div>
              <button
                type="button"
                className="ws__chat-reset"
                onClick={handleNewChat}
                disabled={pending}
                title="Start a new chat"
              >
                New Chat
              </button>
            </div>

            <div className="ws__thread" ref={threadRef}>
              {messages.length === 0 ? (
                <div className="ws__thread-empty">
                  <p className="ws__thread-empty-title">New conversation ready.</p>
                  <p className="ws__thread-empty-sub">
                    Saved analyses stay in place. Send a new message to start a fresh backend conversation.
                  </p>
                </div>
              ) : (
                messages.map((msg) => (
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
                    <div className={`msg__body${msg.role === 'assistant' ? ' msg__body--markdown' : ''}`}>
                      {msg.role === 'assistant'
                        ? <AssistantMessageMarkdown content={msg.content} />
                        : msg.content}
                    </div>
                  </div>
                ))
              )}
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

            <div
              className={`ws__composer${dragActive ? ' ws__composer--drag' : ''}`}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                className="ws__file-input"
                onChange={onFileInputChange}
                tabIndex={-1}
              />
              {draftAttachment && (
                <div className="ws__attachment-preview">
                  <img
                    src={draftAttachment.previewUrl}
                    alt={draftAttachment.file.name}
                    className="ws__attachment-thumb"
                  />
                  <div className="ws__attachment-meta">
                    <span className="ws__attachment-name">{draftAttachment.file.name}</span>
                    <span className="ws__attachment-type">{draftAttachment.file.type.replace('image/', '').toUpperCase()}</span>
                  </div>
                  <button
                    type="button"
                    className="ws__attachment-remove"
                    onClick={clearDraftAttachment}
                    aria-label="Remove attached image"
                    disabled={pending}
                  >
                    x
                  </button>
                </div>
              )}
              {attachmentError && <div className="ws__attachment-error">{attachmentError}</div>}
              <label
                className="ws__report-toggle"
                title="When enabled, the analyst generates a structured report on the canvas."
              >
                <input
                  type="checkbox"
                  className="ws__report-toggle-input"
                  checked={reportMode}
                  onChange={(e) => setReportMode(e.target.checked)}
                  disabled={pending}
                />
                <span className="ws__report-toggle-text">Generate Report</span>
              </label>
              <div className="ws__composer-row">
                <button
                  type="button"
                  className="ws__attach"
                  onClick={() => fileInputRef.current?.click()}
                  aria-label="Attach image"
                  title="Attach image"
                  disabled={pending}
                >
                  <PaperclipIcon />
                </button>
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
                  disabled={pending || (draft.trim().length === 0 && !draftAttachment)}
                >
                  Send
                </button>
              </div>
            </div>
          </section>

          <section
            className={`ws__files${filesExpanded ? ' ws__files--expanded' : ' ws__files--collapsed'}`}
            aria-label="Saved analyses"
          >
            <div className="ws__panel-head">
              <button
                type="button"
                className="ws__files-toggle"
                onClick={() => setFilesExpanded((v) => !v)}
                aria-expanded={filesExpanded}
                aria-controls="ws-file-list"
              >
                <span className="ws__files-toggle-caret" aria-hidden="true">
                  {filesExpanded ? '-' : '+'}
                </span>
                <span className="ws__panel-label">Saved Analyses</span>
                <span className="ws__files-count" aria-hidden="true">{files.length}</span>
              </button>
              <button
                type="button"
                className="ws__file-save"
                onClick={() => void handleSave()}
                disabled={!canSave}
                title={canSave ? 'Save the current canvas to a new analysis file' : 'Run an analysis first'}
              >
                {fileOpInProgress ? 'Saving...' : 'Save Current Analysis'}
              </button>
            </div>

            <div id="ws-file-list" className="ws__file-list" role="list">
              {loadingFiles && files.length === 0 ? (
                <div className="ws__file-empty">Loading...</div>
              ) : filesError ? (
                <div className="ws__file-error">{filesError}</div>
              ) : files.length === 0 ? (
                <div className="ws__file-empty">
                  No saved analyses yet. Run an analysis and hit <em>Save Current Analysis</em> to archive it.
                </div>
              ) : (
                files.map((file) => {
                  const active = activeFilePath === file.path;
                  const editing = editingFilePath === file.path;
                  const displayName = fileDisplayNames[file.path] ?? file.slug ?? file.name;
                  const openDisabled = (fileOpInProgress && !active) || renamePending;
                  return (
                    <div
                      key={file.path}
                      role="listitem"
                      className={`ws__file-item${active ? ' ws__file-item--active' : ''}${openDisabled ? ' ws__file-item--disabled' : ''}`}
                      tabIndex={openDisabled ? -1 : 0}
                      onClick={() => {
                        if (!openDisabled && !editing) {
                          void handleFileClick(file);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (openDisabled || editing) return;
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          void handleFileClick(file);
                        }
                      }}
                    >
                      <div className="ws__file-row">
                        {editing ? (
                          <div className="ws__file-rename" onClick={(e) => e.stopPropagation()}>
                            <input
                              className="ws__file-rename-input"
                              value={editingFileName}
                              onChange={(e) => setEditingFileName(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  void commitRenameFile(file);
                                } else if (e.key === 'Escape') {
                                  e.preventDefault();
                                  cancelRenameFile();
                                }
                              }}
                              aria-label="Rename analysis"
                              autoFocus
                            />
                            <button
                              type="button"
                              className="ws__file-rename-action"
                              onClick={() => void commitRenameFile(file)}
                              disabled={renamePending}
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              className="ws__file-rename-action ws__file-rename-action--ghost"
                              onClick={cancelRenameFile}
                              disabled={renamePending}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            className="ws__file-name-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              startRenameFile(file);
                            }}
                            disabled={renamePending}
                            title="Rename analysis"
                          >
                            <span className="ws__file-name">{displayName}</span>
                          </button>
                        )}
                        <span className="ws__file-type">{typeLabel(file.analysisType)}</span>
                      </div>
                      <div className="ws__file-meta">
                        <span className="ws__file-date">{formatDate(file.savedAt) || file.name}</span>
                        <span className="ws__file-size">{Math.max(1, Math.round(file.size / 1024))} KB</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {saveError && <div className="ws__file-error ws__file-error--footer">{saveError}</div>}
            {renameError && <div className="ws__file-error ws__file-error--footer">{renameError}</div>}
          </section>
        </div>

        <section className="ws__canvas" aria-label="Analysis canvas">
          <div className="ws__panel-head ws__panel-head--canvas">
            <span className="ws__panel-label">Analysis Canvas</span>
            <div className="ws__canvas-head-right">
              <span className="ws__panel-sub">{canvasSubLabel}</span>
              <button
                type="button"
                className="ws__canvas-export"
                onClick={handleExport}
                title="Export analysis canvas as PDF"
              >
                <DownloadIcon />
                <span>Export</span>
              </button>
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
            <div className="ws__print-header" aria-hidden="true">
              <span>Structural Analysis Report — Blacksite Labs</span>
              <span>{exportDateLabel}</span>
            </div>
            {showCanvasStatusBar && (
              <div className="ws__canvas-status" role="status" aria-live="polite">
                {visibleCanvasStatus?.progress != null && (
                  <div className="ws__canvas-status-progress" aria-hidden="true">
                    <div
                      className="ws__canvas-status-progress-fill"
                      style={{ width: statusProgressWidth }}
                    />
                  </div>
                )}
                <span className="ws__canvas-status-text">{visibleCanvasStatus?.text}</span>
              </div>
            )}
            {canvasMode === 'file' && loadedFile ? (
              <FileCanvas file={loadedFile} />
            ) : canvasMode === 'tool' ? (
              <AnalysisReport
                timestamp={latestToolRun?.timestamp ?? new Date().toISOString()}
                toolExecutions={liveToolExecutions}
                kicker="Analyst Output"
                narrativeSummary={liveNarrativeSummary}
                enteringExecutionKey={enteringExecutionKey}
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
            <div className="ws__print-footer" aria-hidden="true">
              <span>Structural Analysis Report — Blacksite Labs</span>
              <span>
                Page <span className="ws__print-page-number" />
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function PaperclipIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="ws__attach-icon">
      <path
        d="M7.5 10.625 11.875 6.25a2.652 2.652 0 1 1 3.75 3.75l-5.312 5.313a4.42 4.42 0 0 1-6.25-6.25l5-5a6.188 6.188 0 1 1 8.75 8.75l-5.625 5.625"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="ws__canvas-export-icon">
      <path
        d="M10 3.75v7.5m0 0 3-3m-3 3-3-3M4.75 12.75v1.25A2.25 2.25 0 0 0 7 16.25h6A2.25 2.25 0 0 0 15.25 14v-1.25"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function FileCanvas({ file }: { file: LoadedFile }) {
  if (file.snapshot) {
    return (
      <AnalysisReport
        timestamp={file.snapshot.savedAt}
        toolExecutions={file.snapshot.toolExecutions}
        kicker={`Saved File - ${formatDate(file.snapshot.savedAt)}`}
        narrativeSummary={file.snapshot.narrativeSummary}
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
  narrativeSummary?: string;
  enteringExecutionKey?: string | null;
}

function AnalysisReport({
  timestamp,
  toolExecutions,
  kicker = 'Analyst Output',
  narrativeSummary,
  enteringExecutionKey,
}: AnalysisReportProps) {
  return (
    <article className="report">
      <div className="report__header">
        <span className="report__kicker">{kicker}</span>
        <span className="report__time">{formatTime(timestamp)}</span>
      </div>
      <div className="report__content">
        {narrativeSummary && (
          <section className="report__section report__section--summary">
            <div className="report__section-head">
              <span className="report__section-title">Summary</span>
            </div>
            <div className="report__narrative">
              <AssistantMessageMarkdown content={narrativeSummary} />
            </div>
          </section>
        )}
        <MarginSummaryTable toolExecutions={toolExecutions} />
        {toolExecutions.map((execution, idx) => (
          <ToolExecutionSection
            key={executionIdentity(execution, idx)}
            execution={execution}
            entering={enteringExecutionKey === executionIdentity(execution, idx)}
          />
        ))}
      </div>
    </article>
  );
}

function MarginSummaryTable({ toolExecutions }: { toolExecutions: StressToolExecution[] }) {
  const rows: Array<{
    key: string;
    toolTitle: string;
    mode: string;
    allowable: string;
    margin: number | undefined;
    status: string;
  }> = [];

  toolExecutions.forEach((execution, execIdx) => {
    const parsed = execution.resultParsed;
    if (!parsed?.checks || parsed.checks.length === 0) return;
    const toolTitle = formatToolHeading(parsed.toolName ?? execution.displayName ?? execution.toolName);
    parsed.checks.forEach((check, checkIdx) => {
      rows.push({
        key: `${execIdx}-${checkIdx}`,
        toolTitle,
        mode: check.mode,
        allowable: formatCheckAllowable(check),
        margin: getCheckMargin(check),
        status: check.status,
      });
    });
  });

  if (rows.length === 0) return null;

  return (
    <section className="report__section report__section--summary-table">
      <div className="report__section-head">
        <span className="report__section-title">Margin summary</span>
      </div>
      <div className="report__checks">
        <table className="report__table">
          <thead>
            <tr>
              <th>Check</th>
              <th>Mode</th>
              <th>Allowable</th>
              <th>MS</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.key}>
                <td><CanvasNotationText text={row.toolTitle} /></td>
                <td><CanvasNotationText text={row.mode} /></td>
                <td><CanvasNotationText text={row.allowable} /></td>
                <td>{formatMargin(row.margin)}</td>
                <td>
                  <span className={`report__status report__status--${row.status.toLowerCase()}`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

const CANVAS_SUPERSCRIPT_RE = /([A-Za-z0-9)\]])\^([+\-]?\d+(?:\.\d+)?|[a-z]{1,3})/gu;

function renderCanvasNotation(text: unknown): ReactNode[] {
  if (typeof text !== 'string') return [];

  const subscripted = renderEngineeringNotation(text);
  const nodes: ReactNode[] = [];

  for (const segment of subscripted) {
    if (typeof segment !== 'string') {
      nodes.push(segment);
      continue;
    }

    let lastIndex = 0;
    for (const match of segment.matchAll(CANVAS_SUPERSCRIPT_RE)) {
      const [token, base, superscript] = match;
      const start = match.index ?? 0;
      if (start > lastIndex) {
        nodes.push(segment.slice(lastIndex, start));
      }
      nodes.push(
        <span key={`sup-${start}-${token}`} className="msg__notation">
          {base}
          <sup>{superscript}</sup>
        </span>,
      );
      lastIndex = start + token.length;
    }

    if (lastIndex < segment.length) {
      nodes.push(segment.slice(lastIndex));
    }
  }

  return nodes.length > 0 ? nodes : [text];
}

function CanvasNotationText({ text }: { text: string | undefined }) {
  if (typeof text !== 'string') return null;
  return <>{renderCanvasNotation(text)}</>;
}

function ToolExecutionSection({
  execution,
  entering = false,
}: {
  execution: StressToolExecution;
  entering?: boolean;
}) {
  const parsed = execution.resultParsed;
  const title = formatToolHeading(parsed?.toolName ?? execution.displayName ?? execution.toolName);
  const status = parsed?.status;
  const statusClass = status ? `report__status report__status--${status.toLowerCase()}` : '';
  const inputEntries = normalizeInputEntries(parsed?.inputs);
  const notes = formatNotes(parsed?.notes);

  return (
    <section className={`report__section${entering ? ' report__section--entering' : ''}`}>
      <div className="report__section-head">
        <span className="report__section-title">{title}</span>
        {status && <span className={statusClass}>{status}</span>}
      </div>

      {parsed?.summary && (
        <p className="report__summary"><CanvasNotationText text={parsed.summary} /></p>
      )}

      {typeof parsed?.governingMargin === 'number' && (
        <div className="report__governing">
          <span className="report__label">Governing mode</span>
          <span className="report__value"><CanvasNotationText text={parsed.governingMode ?? '-'} /></span>
          <span className="report__label">Governing MS</span>
          <span className="report__value">{formatMargin(parsed.governingMargin)}</span>
        </div>
      )}

      {inputEntries && inputEntries.length > 0 && (
        <div className="report__inputs">
          <div className="report__block-title">Inputs</div>
          <table className="report__table">
            <tbody>
              {inputEntries.map(([key, value]) => (
                <tr key={key}>
                  <th scope="row"><CanvasNotationText text={key} /></th>
                  <td><CanvasNotationText text={formatInputValue(value)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {parsed?.checks && parsed.checks.length > 0 && (
        <div className="report__checks">
          <div className="report__block-title">Checks</div>
          <table className="report__table">
            <thead>
              <tr>
                <th>Mode</th>
                <th>Allowable</th>
                <th>Applied</th>
                <th>MS</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {parsed.checks.map((check, idx) => (
                <tr key={`${check.mode}-${idx}`}>
                  <td><CanvasNotationText text={check.mode} /></td>
                  <td><CanvasNotationText text={formatCheckAllowable(check)} /></td>
                  <td><CanvasNotationText text={formatCheckApplied(check)} /></td>
                  <td>{formatMargin(getCheckMargin(check))}</td>
                  <td>
                    <span className={`report__status report__status--${check.status.toLowerCase()}`}>
                      {check.status}
                    </span>
                  </td>
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
                <div className="report__step-head"><CanvasNotationText text={step.step ?? step.stepName} /></div>
                <div className="report__step-line">
                  <span className="report__step-label">Formula</span>
                  <span className="report__step-value"><CanvasNotationText text={step.formula} /></span>
                </div>
                <div className="report__step-line">
                  <span className="report__step-label">Substituted</span>
                  <span className="report__step-value"><CanvasNotationText text={step.values ?? step.substitutedValues} /></span>
                </div>
                <div className="report__step-line">
                  <span className="report__step-label">Result</span>
                  <span className="report__step-value report__step-result"><CanvasNotationText text={formatStepResult(step)} /></span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}

      {parsed?.missingInputs && parsed.missingInputs.length > 0 && (
        <div className="report__missing">
          <div className="report__block-title">Required inputs</div>
          <ul>
            {parsed.missingInputs.map((item) => (
              <li key={item}><CanvasNotationText text={item} /></li>
            ))}
          </ul>
        </div>
      )}

      {notes.length > 0 && (
        <div className="report__notes">
          {notes.map((note, idx) => (
            <p key={idx}><CanvasNotationText text={note} /></p>
          ))}
        </div>
      )}

      {!parsed && execution.resultRaw && (
        <pre className="report__raw"><CanvasNotationText text={execution.resultRaw} /></pre>
      )}
    </section>
  );
}
