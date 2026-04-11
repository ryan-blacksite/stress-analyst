export type ToolId =
  | 'full_analysis'
  | 'buckling_check'
  | 'bearing_analysis'
  | 'shear_analysis';

export interface ToolDefinition {
  id: ToolId;
  label: string;
  description: string;
  endpoint: string;
}

export type InputCategory = 'geometry' | 'materials' | 'loads' | 'environment';

export interface UploadedFile {
  id: string;
  category: InputCategory;
  name: string;
  size: number;
  uploadedAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

export interface AnalysisRun {
  id: string;
  tool: ToolId;
  toolLabel: string;
  status: 'running' | 'complete' | 'error';
  startedAt: string;
  completedAt?: string;
  summary?: string;
  output?: ToolOutput;
}

export interface ToolOutput {
  tool: ToolId;
  summary: string;
  marginsOfSafety?: Array<{
    location: string;
    mode: string;
    value: number;
  }>;
  details?: string;
  raw?: unknown;
}
