const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';

function getOpenRouterApiKey(): string {
  const apiKey = process.env.OPENROUTER_API_KEY?.trim();
  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY is not set.');
  }
  return apiKey;
}

export async function openRouterFetch<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${OPENROUTER_BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getOpenRouterApiKey()}`,
      'HTTP-Referer': process.env.OPENROUTER_HTTP_REFERER ?? 'https://stress-analyst.local',
      'X-Title': process.env.OPENROUTER_APP_TITLE ?? 'Stress Analyst',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`OpenRouter request failed (${response.status}): ${text || response.statusText}`);
  }

  return (await response.json()) as T;
}
