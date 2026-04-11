import { useRef } from 'react';
import type { InputCategory, UploadedFile } from '../types';
import './FileUploadPanel.css';

interface Props {
  files: UploadedFile[];
  onUpload: (category: InputCategory, file: File) => void;
  onRemove: (id: string) => void;
}

const CATEGORIES: Array<{
  id: InputCategory;
  label: string;
  hint: string;
  accept: string;
}> = [
  {
    id: 'geometry',
    label: 'Geometry',
    hint: 'STEP, IGES, or parametric definitions',
    accept: '.step,.stp,.iges,.igs,.json,.yaml,.yml',
  },
  {
    id: 'materials',
    label: 'Materials',
    hint: 'Allowables and material cards',
    accept: '.json,.csv,.yaml,.yml,.txt',
  },
  {
    id: 'loads',
    label: 'Loads',
    hint: 'Load cases and boundary conditions',
    accept: '.json,.csv,.yaml,.yml,.txt',
  },
  {
    id: 'environment',
    label: 'Environment',
    hint: 'Thermal, vibration, pressure profiles',
    accept: '.json,.csv,.yaml,.yml,.txt',
  },
];

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

export default function FileUploadPanel({ files, onUpload, onRemove }: Props) {
  return (
    <section className="upload">
      <div className="upload__header">
        <h2 className="upload__title">Input Files</h2>
        <span className="upload__count">{files.length} uploaded</span>
      </div>
      <div className="upload__categories">
        {CATEGORIES.map((cat) => {
          const catFiles = files.filter((f) => f.category === cat.id);
          return (
            <CategoryRow
              key={cat.id}
              category={cat}
              files={catFiles}
              onUpload={onUpload}
              onRemove={onRemove}
            />
          );
        })}
      </div>
    </section>
  );
}

interface RowProps {
  category: { id: InputCategory; label: string; hint: string; accept: string };
  files: UploadedFile[];
  onUpload: (category: InputCategory, file: File) => void;
  onRemove: (id: string) => void;
}

function CategoryRow({ category, files, onUpload, onRemove }: RowProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const list = e.target.files;
    if (!list) return;
    Array.from(list).forEach((f) => onUpload(category.id, f));
    e.target.value = '';
  }

  return (
    <div className="upload__row">
      <div className="upload__row-head">
        <div className="upload__row-label">
          <span className="upload__row-name">{category.label}</span>
          <span className="upload__row-hint">{category.hint}</span>
        </div>
        <button
          type="button"
          className="upload__pick"
          onClick={() => inputRef.current?.click()}
        >
          Upload
        </button>
        <input
          ref={inputRef}
          type="file"
          accept={category.accept}
          multiple
          hidden
          onChange={onPick}
        />
      </div>
      {files.length > 0 && (
        <ul className="upload__files">
          {files.map((f) => (
            <li key={f.id} className="upload__file">
              <span className="upload__file-name" title={f.name}>
                {f.name}
              </span>
              <span className="upload__file-size">{formatBytes(f.size)}</span>
              <button
                type="button"
                className="upload__file-remove"
                onClick={() => onRemove(f.id)}
                aria-label={`Remove ${f.name}`}
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
