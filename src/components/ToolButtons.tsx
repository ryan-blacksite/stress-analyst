import type { ToolDefinition, ToolId } from '../types';
import './ToolButtons.css';

interface Props {
  tools: ToolDefinition[];
  onRun: (id: ToolId) => void;
  busyTool: ToolId | null;
  disabled: boolean;
}

export default function ToolButtons({ tools, onRun, busyTool, disabled }: Props) {
  return (
    <div className="tool-buttons">
      <div className="tool-buttons__label">Analysis Tools</div>
      <div className="tool-buttons__grid">
        {tools.map((tool) => {
          const isBusy = busyTool === tool.id;
          const isDisabled = disabled || busyTool !== null;
          return (
            <button
              key={tool.id}
              type="button"
              className="tool-buttons__btn"
              title={tool.description}
              disabled={isDisabled}
              onClick={() => onRun(tool.id)}
            >
              <span className="tool-buttons__btn-label">{tool.label}</span>
              {isBusy && <span className="tool-buttons__spinner" aria-hidden="true" />}
            </button>
          );
        })}
      </div>
      {disabled && (
        <div className="tool-buttons__hint">
          Upload input files before running a tool.
        </div>
      )}
    </div>
  );
}
