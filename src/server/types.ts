export interface ChatMessage {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string;
}

export interface ToolDefinition {
  type: 'function';
  function: {
    name: string;
    description: string;
    parameters: {
      type: 'object';
      properties: Record<string, unknown>;
      required?: string[];
    };
  };
}

export interface ToolCall {
  id: string;
  type: 'function';
  function: {
    name: string;
    arguments: string;
  };
}

export interface OpenRouterMessage {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string;
  name?: string;
  tool_call_id?: string;
  tool_calls?: ToolCall[];
}

export interface OpenRouterChatResponse {
  choices: Array<{
    message: {
      role: 'assistant';
      content?: string | null;
      tool_calls?: ToolCall[];
    };
    finish_reason?: string | null;
  }>;
  usage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
  };
}

export interface EmbeddingResponse {
  data?: Array<{
    embedding: number[];
  }>;
}

export interface RerankResponse {
  results?: Array<{
    index: number;
    relevance_score: number;
  }>;
}

export interface KnowledgeChunk {
  heading: string;
  text: string;
  embedding: number[];
}

export interface RetrievedKnowledge {
  query: string;
  chunks: Array<{
    heading: string;
    text: string;
    score: number;
  }>;
  context: string;
}

export interface MaterialProperties {
  material: string;
  basis: 'typical' | 'reference';
  units: 'ksi';
  source: string;
  properties: {
    ftu_ksi?: number;
    fty_ksi?: number;
    fcy_ksi?: number;
    fsu_ksi?: number;
    fbru_ksi?: number;
    fbry_ksi?: number;
    e_msi?: number;
    g_msi?: number;
    nu?: number;
    cte_microstrain_per_f?: number;
  };
  notes?: string;
  referenceExcerpt?: string;
}

export interface MarginOfSafetyResult {
  applied: number;
  allowable: number;
  factorOfSafety: number;
  reserveFactor: number;
  marginOfSafety: number;
  status: 'PASS' | 'MARGINAL' | 'FAIL';
}

export interface CalculationStep {
  step: string;
  formula: string;
  values: string;
  result: string;
}

export interface ToolExecutionResult {
  toolName: string;
  summary: string;
  status: 'PASS' | 'MARGINAL' | 'FAIL' | 'INFO';
  governingMargin?: number;
  data: Record<string, unknown>;
  calculationSteps?: CalculationStep[];
}

export interface FlaggedForReview {
  type: 'flagged_for_review';
  question: string;
  timestamp: string;
}

export interface StressAnalystAnswer {
  type: 'final_answer';
  answer: string;
  toolRounds: number;
  toolExecutions: ToolExecutionResult[];
  knowledgeContext?: RetrievedKnowledge;
}

export type StressAnalystResponse = StressAnalystAnswer | FlaggedForReview;
