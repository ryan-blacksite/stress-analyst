import type { AnalysisRun } from '../types';
import './ToolOutputView.css';

interface Props {
  run: AnalysisRun | null;
}

export default function ToolOutputView({ run }: Props) {
  return (
    <section className="output">
      <div className="output__header">
        <h2 className="output__title">Tool Output</h2>
        {run && <span className="output__tool">{run.toolLabel}</span>}
      </div>

      {!run && (
        <div className="output__empty">
          Select an analysis run to view its output.
        </div>
      )}

      {run && run.status === 'running' && (
        <div className="output__running">Analysis in progress…</div>
      )}

      {run && run.status === 'error' && (
        <div className="output__error">
          <div className="output__error-label">Run failed</div>
          <div className="output__error-body">{run.summary}</div>
        </div>
      )}

      {run && run.status === 'complete' && run.output && (
        <div className="output__body">
          {run.output.summary && (
            <p className="output__summary">{run.output.summary}</p>
          )}

          {run.output.marginsOfSafety && run.output.marginsOfSafety.length > 0 && (
            <div className="output__table-wrap">
              <table className="output__table">
                <thead>
                  <tr>
                    <th>Location</th>
                    <th>Mode</th>
                    <th>Margin of Safety</th>
                  </tr>
                </thead>
                <tbody>
                  {run.output.marginsOfSafety.map((row, i) => (
                    <tr key={i}>
                      <td>{row.location}</td>
                      <td>{row.mode}</td>
                      <td
                        className={`output__ms${row.value < 0 ? ' output__ms--neg' : ''}`}
                      >
                        {row.value >= 0 ? '+' : ''}
                        {row.value.toFixed(3)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {run.output.details && (
            <pre className="output__details">{run.output.details}</pre>
          )}

          {!run.output.details && run.output.raw !== undefined && (
            <pre className="output__details">
              {JSON.stringify(run.output.raw, null, 2)}
            </pre>
          )}
        </div>
      )}
    </section>
  );
}
