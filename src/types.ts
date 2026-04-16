export interface CalculationStep {
  step?: string;
  stepName?: string;
  formula: string;
  values?: string;
  substitutedValues?: string;
  result: number | string;
  unit?: string;
}

export interface StressCheck {
  mode: string;
  allowable?: number;
  applied?: number;
  margin?: number;
  unit?: string;
  criticalStressPsi?: number;
  allowableLoadLbf?: number;
  marginOfSafety?: number;
  status: string;
}

export interface MessageAttachment {
  filename: string;
  mimeType: string;
  data: string;
}

export interface ReportStepStatus {
  current: string;
  completed: number;
  total: number;
}

export interface StressToolExecution {
  toolCallId?: string;
  toolName: string;
  displayName?: string;
  arguments?: Record<string, unknown>;
  resultRaw?: string;
  resultParsed?: {
    toolName?: string;
    status?: 'PASS' | 'MARGINAL' | 'FAIL' | 'INFO';
    summary?: string;
    component?: string;
    governingMode?: string;
    governingMargin?: number;
    inputs?: Record<string, unknown>;
    checks?: StressCheck[];
    calculationSteps?: CalculationStep[];
    missingInputs?: string[];
    notes?: string | string[];
    references?: Array<{
      source: string;
      section: string;
      title: string;
      url: string;
    }>;
    data?: Record<string, unknown>;
  } | null;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  toolExecutions?: StressToolExecution[];
}

export interface AnalysisSnapshot {
  version: 1;
  savedAt: string;
  summary?: string;
  analysisType?: string;
  narrativeSummary?: string;
  toolExecutions: StressToolExecution[];
}
