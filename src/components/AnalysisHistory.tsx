import type { AnalysisRun } from '../types';
import './AnalysisHistory.css';

interface Props {
  runs: AnalysisRun[];
  activeRunId: string | null;
  onSelect: (id: string) => void;
}

function formatTime(iso: string): string {
  try {
    return new Date(iso).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  } catch {
    return '';
  }
}

function statusLabel(status: AnalysisRun['status']): string {
  switch (status) {
    case 'running':
      return 'Running';
    case 'complete':
      return 'Complete';
    case 'error':
      return 'Error';
  }
}

export default function AnalysisHistory({ runs, activeRunId, onSelect }: Props) {
  return (
    <section className="history">
      <div className="history__header">
        <h2 className="history__title">Analysis History</h2>
        <span className="history__count">{runs.length}</span>
      </div>
      {runs.length === 0 ? (
        <div className="history__empty">No analyses have been run yet.</div>
      ) : (
        <ul className="history__list">
          {runs.map((run) => (
            <li key={run.id}>
              <button
                type="button"
                className={`history__item${activeRunId === run.id ? ' history__item--active' : ''}`}
                onClick={() => onSelect(run.id)}
              >
                <div className="history__item-row">
                  <span className="history__item-tool">{run.toolLabel}</span>
                  <span
                    className={`history__badge history__badge--${run.status}`}
                  >
                    {statusLabel(run.status)}
                  </span>
                </div>
                <div className="history__item-meta">
                  <span>{formatTime(run.startedAt)}</span>
                  {run.summary && (
                    <span className="history__item-summary">{run.summary}</span>
                  )}
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
