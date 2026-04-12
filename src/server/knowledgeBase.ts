import { createHash } from 'node:crypto';
import { Dirent, promises as fs } from 'node:fs';
import * as path from 'node:path';

import { openRouterFetch } from './openrouter';
import type {
  EmbeddingResponse,
  KnowledgeChunk,
  RetrievedKnowledge,
  RerankResponse,
} from './types';

const KNOWLEDGE_DIR = path.resolve(process.cwd(), 'knowledge');
const CACHE_DIR = path.resolve(process.cwd(), '.cache');
const CACHE_FILE = path.join(CACHE_DIR, 'stress-analyst-knowledge.json');
const EMBEDDING_MODEL = process.env.STRESS_ANALYST_EMBEDDING_MODEL ?? 'openai/text-embedding-3-small';
const RERANK_MODEL = 'cohere/rerank-4-fast';
const DEFAULT_TOP_K = 4;

interface KnowledgeDocument {
  absolutePath: string;
  relativePath: string;
  content: string;
}

let knowledgeDocumentsCache: KnowledgeDocument[] | null = null;
let knowledgeTextCache: string | null = null;
let chunkCache: KnowledgeChunk[] | null = null;
let initPromise: Promise<KnowledgeChunk[] | null> | null = null;

interface PersistedKnowledgeCache {
  hash: string;
  model: string;
  chunks: KnowledgeChunk[];
}

async function walkMarkdownFiles(directory: string): Promise<string[]> {
  const entries: Dirent[] = await fs.readdir(directory, { withFileTypes: true });
  const collected: string[] = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      collected.push(...(await walkMarkdownFiles(entryPath)));
      continue;
    }

    if (entry.isFile() && entry.name.toLowerCase().endsWith('.md')) {
      collected.push(entryPath);
    }
  }

  return collected;
}

function normalizePathForDisplay(filePath: string): string {
  return filePath.split(path.sep).join('/');
}

async function readKnowledgeDocuments(): Promise<KnowledgeDocument[]> {
  if (knowledgeDocumentsCache !== null) {
    return knowledgeDocumentsCache;
  }

  const markdownFiles = (await walkMarkdownFiles(KNOWLEDGE_DIR)).sort((left, right) =>
    left.localeCompare(right),
  );
  if (markdownFiles.length === 0) {
    throw new Error(`No markdown knowledge files found under ${KNOWLEDGE_DIR}`);
  }

  knowledgeDocumentsCache = await Promise.all(
    markdownFiles.map(async (absolutePath) => {
      const relativePath = normalizePathForDisplay(path.relative(KNOWLEDGE_DIR, absolutePath));
      const content = await fs.readFile(absolutePath, 'utf8');
      return { absolutePath, relativePath, content };
    }),
  );

  return knowledgeDocumentsCache;
}

async function readKnowledgeText(): Promise<string> {
  if (knowledgeTextCache !== null) {
    return knowledgeTextCache;
  }

  const documents = await readKnowledgeDocuments();
  knowledgeTextCache = documents
    .map(
      (document) =>
        `# Source: ${document.relativePath}\n\n${document.content.trim()}`,
    )
    .join('\n\n---\n\n');

  return knowledgeTextCache;
}

function splitByHeadings(markdown: string): Array<{ heading: string; text: string }> {
  const lines = markdown.split(/\r?\n/);
  const sections: Array<{ heading: string; text: string }> = [];
  let currentHeading = 'Introduction';
  let currentBody: string[] = [];

  const flush = () => {
    const body = currentBody.join('\n').trim();
    if (!body) {
      return;
    }

    sections.push({
      heading: currentHeading,
      text: `## ${currentHeading}\n\n${body}`,
    });
  };

  for (const line of lines) {
    const match = /^##\s+(.+?)\s*$/.exec(line);
    if (match) {
      flush();
      currentHeading = match[1];
      currentBody = [];
      continue;
    }

    currentBody.push(line);
  }

  flush();
  return sections;
}

function hashContent(content: string): string {
  return createHash('sha256').update(content).digest('hex');
}

async function loadPersistedCache(hash: string): Promise<KnowledgeChunk[] | null> {
  try {
    const raw = await fs.readFile(CACHE_FILE, 'utf8');
    const parsed = JSON.parse(raw) as PersistedKnowledgeCache;
    if (parsed.hash !== hash || parsed.model !== EMBEDDING_MODEL || !Array.isArray(parsed.chunks)) {
      return null;
    }
    return parsed.chunks;
  } catch {
    return null;
  }
}

async function persistCache(hash: string, chunks: KnowledgeChunk[]): Promise<void> {
  await fs.mkdir(CACHE_DIR, { recursive: true });
  const payload: PersistedKnowledgeCache = {
    hash,
    model: EMBEDDING_MODEL,
    chunks,
  };
  await fs.writeFile(CACHE_FILE, JSON.stringify(payload), 'utf8');
}

async function embedText(text: string): Promise<number[]> {
  const response = await openRouterFetch<EmbeddingResponse>('/embeddings', {
    model: EMBEDDING_MODEL,
    input: text,
  });

  const embedding = response.data?.[0]?.embedding;
  if (!embedding?.length) {
    throw new Error('Embedding response did not include an embedding vector.');
  }

  return embedding;
}

function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  const len = Math.min(a.length, b.length);

  for (let index = 0; index < len; index += 1) {
    dot += a[index] * b[index];
    normA += a[index] * a[index];
    normB += b[index] * b[index];
  }

  if (normA === 0 || normB === 0) {
    return 0;
  }

  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

async function rerankScoredChunks(
  query: string,
  chunks: Array<{ heading: string; text: string; score: number }>,
): Promise<Array<{ heading: string; text: string; score: number }>> {
  if (chunks.length === 0) {
    return chunks;
  }

  try {
    const reranked = await openRouterFetch<RerankResponse>('/rerank', {
      model: RERANK_MODEL,
      query,
      documents: chunks.map((chunk) => chunk.text),
      top_n: chunks.length,
    });

    const ordered = (reranked.results ?? [])
      .map((result) => {
        const chunk = chunks[result.index];
        if (!chunk) {
          return null;
        }

        return {
          ...chunk,
          score: result.relevance_score,
        };
      })
      .filter((chunk): chunk is { heading: string; text: string; score: number } => Boolean(chunk));

    return ordered.length > 0 ? ordered : chunks;
  } catch (error) {
    console.error('[stress-analyst/knowledgeBase] Rerank failed, using cosine order:', error);
    return chunks;
  }
}

async function initializeKnowledge(): Promise<KnowledgeChunk[] | null> {
  try {
    const documents = await readKnowledgeDocuments();
    const hashInput = documents
      .map((document) => `${document.relativePath}\n${document.content}`)
      .join('\n\n===\n\n');
    const hash = hashContent(hashInput);
    const persisted = await loadPersistedCache(hash);

    if (persisted?.length) {
      chunkCache = persisted;
      return persisted;
    }

    const chunks: KnowledgeChunk[] = [];

    for (const document of documents) {
      const sections = splitByHeadings(document.content);

      for (const section of sections) {
        const chunkText = `Source: ${document.relativePath}\n\n${section.text}`;
        const embedding = await embedText(chunkText);
        chunks.push({
          heading: `${document.relativePath} :: ${section.heading}`,
          text: chunkText,
          embedding,
        });
      }
    }

    chunkCache = chunks;
    await persistCache(hash, chunks);
    return chunks;
  } catch (error) {
    console.error('[stress-analyst/knowledgeBase] Failed to initialize knowledge base:', error);
    return null;
  }
}

export async function retrieveRelevantAnalysisReferences(
  query: string,
  topK = DEFAULT_TOP_K,
): Promise<RetrievedKnowledge> {
  if (!initPromise) {
    initPromise = initializeKnowledge();
  }

  const chunks = chunkCache ?? (await initPromise);
  const knowledgeText = await readKnowledgeText().catch(() => '');

  if (!chunks?.length) {
    return {
      query,
      chunks: knowledgeText
        ? [{ heading: 'Full Reference Document', text: knowledgeText, score: 1 }]
        : [],
      context: knowledgeText,
    };
  }

  try {
    const queryEmbedding = await embedText(query);
    const scored = chunks
      .map((chunk) => ({
        heading: chunk.heading,
        text: chunk.text,
        score: cosineSimilarity(queryEmbedding, chunk.embedding),
      }))
      .sort((left, right) => right.score - left.score)
      .slice(0, Math.max(1, topK));

    const reranked = await rerankScoredChunks(query, scored);
    return {
      query,
      chunks: reranked,
      context: reranked.map((chunk) => chunk.text).join('\n\n---\n\n'),
    };
  } catch (error) {
    console.error('[stress-analyst/knowledgeBase] Retrieval failed, falling back to full document:', error);
    return {
      query,
      chunks: knowledgeText
        ? [{ heading: 'Full Reference Document', text: knowledgeText, score: 1 }]
        : [],
      context: knowledgeText,
    };
  }
}

export async function getKnowledgeDocumentText(): Promise<string> {
  return readKnowledgeText();
}
