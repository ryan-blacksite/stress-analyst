import { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ChatPanel from '../components/ChatPanel';
import ToolButtons from '../components/ToolButtons';
import FileUploadPanel from '../components/FileUploadPanel';
import AnalysisHistory from '../components/AnalysisHistory';
import ToolOutputView from '../components/ToolOutputView';
import { TOOLS } from '../tools';
import { runTool, sendChatMessage, uploadInputFile } from '../api/client';
import type {
  AnalysisRun,
  ChatMessage,
  InputCategory,
  ToolId,
  UploadedFile,
} from '../types';
import './Workspace.css';

const INITIAL_ASSISTANT: ChatMessage = {
  id: 'sys-welcome',
  role: 'assistant',
  content:
    'Stress Analyst ready. Upload geometry, materials, loads, and environment inputs, then request an analysis or run a tool directly.',
  timestamp: new Date().toISOString(),
};

function uid(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function Workspace() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_ASSISTANT]);
  const [runs, setRuns] = useState<AnalysisRun[]>([]);
  const [activeRunId, setActiveRunId] = useState<string | null>(null);
  const [chatPending, setChatPending] = useState(false);
  const [busyTool, setBusyTool] = useState<ToolId | null>(null);

  const activeRun = useMemo(
    () => runs.find((r) => r.id === activeRunId) ?? null,
    [runs, activeRunId],
  );

  const handleUpload = useCallback(
    async (category: InputCategory, file: File) => {
      try {
        const uploaded = await uploadInputFile(category, file);
        setFiles((prev) => [...prev, uploaded]);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        const local: UploadedFile = {
          id: uid('local'),
          category,
          name: file.name,
          size: file.size,
          uploadedAt: new Date().toISOString(),
        };
        setFiles((prev) => [...prev, local]);
        setMessages((prev) => [
          ...prev,
          {
            id: uid('sys'),
            role: 'system',
            content: `Upload queued locally (backend unreachable): ${message}`,
            timestamp: new Date().toISOString(),
          },
        ]);
      }
    },
    [],
  );

  const handleRemoveFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const handleRunTool = useCallback(
    async (toolId: ToolId) => {
      const def = TOOLS.find((t) => t.id === toolId);
      if (!def) return;
      const runId = uid('run');
      const startedAt = new Date().toISOString();
      const newRun: AnalysisRun = {
        id: runId,
        tool: toolId,
        toolLabel: def.label,
        status: 'running',
        startedAt,
      };
      setRuns((prev) => [newRun, ...prev]);
      setActiveRunId(runId);
      setBusyTool(toolId);
      try {
        const output = await runTool(
          toolId,
          files.map((f) => f.id),
        );
        setRuns((prev) =>
          prev.map((r) =>
            r.id === runId
              ? {
                  ...r,
                  status: 'complete',
                  completedAt: new Date().toISOString(),
                  summary: output.summary,
                  output,
                }
              : r,
          ),
        );
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        setRuns((prev) =>
          prev.map((r) =>
            r.id === runId
              ? {
                  ...r,
                  status: 'error',
                  completedAt: new Date().toISOString(),
                  summary: message,
                }
              : r,
          ),
        );
      } finally {
        setBusyTool(null);
      }
    },
    [files],
  );

  const handleSendMessage = useCallback(
    async (text: string) => {
      const userMsg: ChatMessage = {
        id: uid('msg'),
        role: 'user',
        content: text,
        timestamp: new Date().toISOString(),
      };
      const next = [...messages, userMsg];
      setMessages(next);
      setChatPending(true);
      try {
        const reply = await sendChatMessage(messages, text);
        setMessages((prev) => [...prev, reply]);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        setMessages((prev) => [
          ...prev,
          {
            id: uid('sys'),
            role: 'system',
            content: `Agent unreachable: ${message}`,
            timestamp: new Date().toISOString(),
          },
        ]);
      } finally {
        setChatPending(false);
      }
    },
    [messages],
  );

  return (
    <div className="workspace">
      <header className="workspace__header">
        <Link to="/" className="workspace__brand">
          <span className="workspace__mark" aria-hidden="true" />
          <span>Stress Analyst</span>
        </Link>
        <div className="workspace__meta">
          <span className="workspace__status-dot" aria-hidden="true" />
          <span>Session active</span>
        </div>
      </header>

      <div className="workspace__body">
        <section className="workspace__left" aria-label="Agent chat">
          <ToolButtons
            tools={TOOLS}
            onRun={handleRunTool}
            busyTool={busyTool}
            disabled={files.length === 0}
          />
          <ChatPanel
            messages={messages}
            pending={chatPending}
            onSend={handleSendMessage}
          />
        </section>

        <aside className="workspace__right" aria-label="Workspace panel">
          <FileUploadPanel
            files={files}
            onUpload={handleUpload}
            onRemove={handleRemoveFile}
          />
          <AnalysisHistory
            runs={runs}
            activeRunId={activeRunId}
            onSelect={setActiveRunId}
          />
          <ToolOutputView run={activeRun} />
        </aside>
      </div>
    </div>
  );
}
