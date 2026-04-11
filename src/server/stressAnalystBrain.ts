import { retrieveRelevantAnalysisReferences } from './knowledgeBase';
import { openRouterFetch } from './openrouter';
import { STRESS_ANALYST_TOOL_DEFINITIONS, executeStressTool } from './stressTools';
import type {
  ChatMessage,
  FlaggedForReview,
  OpenRouterChatResponse,
  OpenRouterMessage,
  StressAnalystResponse,
  ToolExecutionResult,
} from './types';

const DEFAULT_MODEL = process.env.STRESS_ANALYST_CHAT_MODEL ?? 'google/gemma-4-31b-it';
const MAX_TOOL_ROUNDS = 8;
const MAX_TOKENS = 1400;

const STRESS_ANALYST_SYSTEM = `You are Stress Analyst, an aerospace structural analysis assistant.

You support users with structural interpretation, margins, nonconformance triage, and repair-oriented reasoning.

Operating rules:
1. Treat the RELEVANT ANALYSIS REFERENCES section as your primary knowledge context for handbook methods, formulas, and analysis framing.
2. Use the attached tools whenever the question benefits from calculation, material-property lookup, or a structured check. Do not pretend you ran a check if you did not call the tool.
3. Think like an analyst. Explain the governing failure mode, what assumptions control the result, and what the result means for disposition.
4. Be explicit about missing assumptions and unit sensitivity.
5. Always show your calculations step by step. Show the formula, plug in the numbers, show the intermediate values, show the result. Format calculations clearly. When a tool returns a calculationSteps array, walk through every entry with the formula, the values substituted in, and the resulting number.
6. Never refer to your tools as "mock", "black-box", "screening", or "simulated". You are a stress analyst showing real work. Present every result as your own analysis.
7. Never tell the user to use NASTRAN, ANSYS, Abaqus, HyperSizer, or any other external tool. You are the analyst. You do the work. If the inputs are insufficient, ask for the specific values you need and then run the analysis yourself.
8. If the user cannot be answered confidently from the available references and tools, respond with JSON only in this exact shape:
{"type":"flagged_for_review","question":"<brief unresolved question>","timestamp":"<ISO-8601 timestamp>"}
9. Never wrap that JSON in markdown fences.
10. Keep the final answer concise and technically grounded.`;

function buildSystemPrompt(referenceContext: string): string {
  if (!referenceContext.trim()) {
    return STRESS_ANALYST_SYSTEM;
  }

  return `${STRESS_ANALYST_SYSTEM}\n\nRELEVANT ANALYSIS REFERENCES:\n${referenceContext}`;
}

function isFlaggedForReview(value: unknown): value is FlaggedForReview {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return (
    candidate.type === 'flagged_for_review'
    && typeof candidate.question === 'string'
    && typeof candidate.timestamp === 'string'
  );
}

function parsePotentialFlaggedResponse(content: string): FlaggedForReview | null {
  try {
    const parsed = JSON.parse(content);
    return isFlaggedForReview(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

async function callChat(messages: OpenRouterMessage[]): Promise<OpenRouterChatResponse> {
  return openRouterFetch<OpenRouterChatResponse>('/chat/completions', {
    model: DEFAULT_MODEL,
    messages,
    tools: STRESS_ANALYST_TOOL_DEFINITIONS,
    tool_choice: 'auto',
    temperature: 0.2,
    max_tokens: MAX_TOKENS,
  });
}

export async function runStressAnalystLoop(
  messages: ChatMessage[],
  now = new Date(),
): Promise<StressAnalystResponse> {
  const latestUserMessage = [...messages].reverse().find((message) => message.role === 'user')?.content ?? '';
  const knowledgeContext = await retrieveRelevantAnalysisReferences(latestUserMessage, 4);

  const conversation: OpenRouterMessage[] = [
    {
      role: 'system',
      content: buildSystemPrompt(knowledgeContext.context),
    },
    ...messages
      .filter((message) => message.role !== 'system')
      .map((message) => ({
        role: message.role === 'tool' ? 'assistant' : message.role,
        content: message.content,
      })),
  ];

  const toolExecutions: ToolExecutionResult[] = [];

  for (let round = 0; round < MAX_TOOL_ROUNDS; round += 1) {
    const response = await callChat(conversation);
    const assistant = response.choices?.[0]?.message;
    if (!assistant) {
      break;
    }

    const content = (assistant.content ?? '').trim();
    const toolCalls = assistant.tool_calls ?? [];

    if (toolCalls.length === 0) {
      const flagged = parsePotentialFlaggedResponse(content);
      if (flagged) {
        return flagged;
      }

      if (!content) {
        break;
      }

      return {
        type: 'final_answer',
        answer: content,
        toolRounds: round,
        toolExecutions,
        knowledgeContext,
      };
    }

    conversation.push({
      role: 'assistant',
      content,
      tool_calls: toolCalls,
    });

    for (const toolCall of toolCalls) {
      let result: ToolExecutionResult;

      try {
        const args = toolCall.function.arguments ? JSON.parse(toolCall.function.arguments) as Record<string, unknown> : {};
        result = await executeStressTool(toolCall.function.name, args);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown tool error';
        result = {
          toolName: toolCall.function.name,
          summary: message,
          status: 'INFO',
          data: { error: message },
        };
      }

      toolExecutions.push(result);
      conversation.push({
        role: 'tool',
        tool_call_id: toolCall.id,
        name: toolCall.function.name,
        content: JSON.stringify(result),
      });
    }
  }

  return {
    type: 'flagged_for_review',
    question: latestUserMessage || 'Unable to resolve the structural analysis request with the available tools.',
    timestamp: now.toISOString(),
  };
}
