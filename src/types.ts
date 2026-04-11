export interface CalculationStep {
  step: string;
  formula: string;
  values: string;
  result: string;
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
    inputs?: Record<string, number | string>;
    checks?: Array<{
      mode: string;
      criticalStressPsi?: number;
      allowableLoadLbf?: number;
      marginOfSafety: number;
      status: string;
    }>;
    calculationSteps?: CalculationStep[];
    missingInputs?: string[];
    notes?: string;
  } | null;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  toolExecutions?: StressToolExecution[];
}
