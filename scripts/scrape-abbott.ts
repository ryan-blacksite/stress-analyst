import { promises as fs } from 'node:fs';
import * as path from 'node:path';

import * as cheerio from 'cheerio';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

const TOC_URL = 'https://www.abbottaerospace.com/aa-sb-001/';
const BASE_DOMAIN = 'https://www.abbottaerospace.com';
const OUTPUT_DIR = path.resolve(process.cwd(), 'knowledge', 'abbott');
const REQUEST_DELAY_MS = 2_000;
const REQUEST_TIMEOUT_MS = 45_000;
const MAX_RETRIES = 3;

interface Chapter {
  number: number;
  title: string;
  url: string;
}

interface SectionPage {
  url: string;
  title: string;
  markdown: string;
}

interface CliOptions {
  chapter?: number;
  from?: number;
  to?: number;
}

let lastRequestAt = 0;

const turndown = new TurndownService({
  headingStyle: 'atx',
  hr: '---',
  bulletListMarker: '-',
  codeBlockStyle: 'fenced',
  emDelimiter: '_',
  strongDelimiter: '**',
});

turndown.use(gfm);

turndown.addRule('superscript', {
  filter: ['sup'],
  replacement: (content: string) => `^${content}^`,
});

turndown.addRule('subscript', {
  filter: ['sub'],
  replacement: (content: string) => `~${content}~`,
});

turndown.addRule('stripEmptyLinks', {
  filter: (node: any) => node.nodeName === 'A' && !node.textContent?.trim(),
  replacement: () => '',
});

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function normalizeUrl(url: string): string {
  const normalized = new URL(url, TOC_URL);
  normalized.hash = '';
  normalized.search = '';
  return normalized.toString().replace(/\/+$/, '/');
}

function slugify(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[^\x00-\x7F]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

async function fetchHtml(url: string, attempt = 1): Promise<string> {
  const elapsed = Date.now() - lastRequestAt;
  if (elapsed < REQUEST_DELAY_MS) {
    await sleep(REQUEST_DELAY_MS - elapsed);
  }

  try {
    const response = await fetch(url, {
      headers: {
        'user-agent': 'stress-analyst-knowledge-bot/1.0 (+https://www.abbottaerospace.com/aa-sb-001/)',
        accept: 'text/html,application/xhtml+xml',
      },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    lastRequestAt = Date.now();

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    const utf8Text = new TextDecoder('utf-8').decode(bytes);
    const headerCharset =
      /charset=([a-zA-Z0-9._-]+)/i.exec(response.headers.get('content-type') ?? '')?.[1] ?? '';
    const metaCharset = /<meta[^>]+charset=["']?([^"'>\s]+)/i.exec(utf8Text)?.[1] ?? '';
    const detectedCharset = (headerCharset || metaCharset).toLowerCase();

    if (detectedCharset.includes('1252') || detectedCharset.includes('iso-8859-1')) {
      return new TextDecoder('windows-1252').decode(bytes);
    }

    return utf8Text;
  } catch (error) {
    if (attempt >= MAX_RETRIES) {
      throw new Error(`Failed to fetch ${url}: ${String(error)}`);
    }
    await sleep(REQUEST_DELAY_MS * attempt);
    return fetchHtml(url, attempt + 1);
  }
}

function parseChapterAnchor(anchorText: string): { chapter: number; title: string } | null {
  const cleaned = anchorText.replace(/\s+/g, ' ').trim();
  const match = /^(\d{1,2})\.\s*(.+)$/.exec(cleaned);
  if (!match) {
    return null;
  }

  const chapter = Number.parseInt(match[1], 10);
  if (!Number.isFinite(chapter) || chapter < 1 || chapter > 27) {
    return null;
  }

  return { chapter, title: match[2].trim() };
}

function parseSectionAnchor(anchorText: string): { chapter: number; sectionPath: number[] } | null {
  const cleaned = anchorText.replace(/\s+/g, ' ').trim();
  const match = /^(\d{1,2})(?:\.\d+)*(?:\.)?\s*/.exec(cleaned);
  if (!match) {
    return null;
  }

  const parts = cleaned
    .replace(/\.\s+/g, '.')
    .match(/^\d+(?:\.\d+)*/)
    ?.[0]
    .split('.')
    .map((part) => Number.parseInt(part, 10))
    .filter((value) => Number.isFinite(value));

  if (!parts?.length) {
    return null;
  }

  return { chapter: parts[0], sectionPath: parts };
}

function compareSectionPaths(left: number[], right: number[]): number {
  const len = Math.max(left.length, right.length);
  for (let index = 0; index < len; index += 1) {
    const leftValue = left[index] ?? -1;
    const rightValue = right[index] ?? -1;
    if (leftValue !== rightValue) {
      return leftValue - rightValue;
    }
  }
  return 0;
}

async function discoverChaptersFromToc(): Promise<{
  chapters: Chapter[];
  tocSectionLinksByChapter: Map<number, Map<string, number[]>>;
}> {
  const html = await fetchHtml(TOC_URL);
  const $ = cheerio.load(html);
  const chaptersByNumber = new Map<number, Chapter>();
  const chapterUrlByNumber = new Map<number, string>();
  const tocSectionLinksByChapter = new Map<number, Map<string, number[]>>();

  $('a[href]').each((_, element) => {
    const hrefRaw = $(element).attr('href');
    const textRaw = $(element).text();
    if (!hrefRaw || !textRaw) {
      return;
    }

    const href = normalizeUrl(hrefRaw);
    if (!href.startsWith(`${BASE_DOMAIN}/aa-sb-001/`)) {
      return;
    }

    const chapterHit = parseChapterAnchor(textRaw);
    if (chapterHit && /^https:\/\/www\.abbottaerospace\.com\/aa-sb-001\/[^/]+\/$/.test(href)) {
      chapterUrlByNumber.set(chapterHit.chapter, href);
      if (!chaptersByNumber.has(chapterHit.chapter)) {
        chaptersByNumber.set(chapterHit.chapter, {
          number: chapterHit.chapter,
          title: chapterHit.title,
          url: href,
        });
      }
    }

    const sectionHit = parseSectionAnchor(textRaw);
    if (!sectionHit || sectionHit.chapter < 1 || sectionHit.chapter > 27) {
      return;
    }

    if (!tocSectionLinksByChapter.has(sectionHit.chapter)) {
      tocSectionLinksByChapter.set(sectionHit.chapter, new Map<string, number[]>());
    }
    tocSectionLinksByChapter.get(sectionHit.chapter)!.set(href, sectionHit.sectionPath);
  });

  for (const [number, chapter] of chaptersByNumber) {
    const canonicalUrl = chapterUrlByNumber.get(number);
    if (canonicalUrl) {
      chaptersByNumber.set(number, { ...chapter, url: canonicalUrl });
    }
  }

  const chapters = [...chaptersByNumber.values()].sort((left, right) => left.number - right.number);
  if (chapters.length !== 27) {
    throw new Error(`Expected 27 chapters in TOC, found ${chapters.length}.`);
  }

  return { chapters, tocSectionLinksByChapter };
}

function gatherChapterSectionUrls(
  chapter: Chapter,
  chapterHtml: string,
  tocSectionLinks: Map<string, number[]>,
): string[] {
  const $ = cheerio.load(chapterHtml);
  const sectionPathIndex = new Map<string, number[]>();

  for (const [url, sectionPath] of tocSectionLinks) {
    if (url.startsWith(chapter.url)) {
      sectionPathIndex.set(url, sectionPath);
    }
  }

  $('a[href]').each((_, anchor) => {
    const href = $(anchor).attr('href');
    if (!href) {
      return;
    }

    const normalized = normalizeUrl(href);
    if (!normalized.startsWith(chapter.url)) {
      return;
    }

    const text = $(anchor).text();
    const parsed = parseSectionAnchor(text);
    if (parsed?.chapter === chapter.number) {
      sectionPathIndex.set(normalized, parsed.sectionPath);
      return;
    }

    if (!sectionPathIndex.has(normalized)) {
      sectionPathIndex.set(normalized, [chapter.number, Number.MAX_SAFE_INTEGER]);
    }
  });

  sectionPathIndex.set(chapter.url, [chapter.number]);

  return [...sectionPathIndex.entries()]
    .sort((left, right) => {
      const pathCompare = compareSectionPaths(left[1], right[1]);
      if (pathCompare !== 0) {
        return pathCompare;
      }
      return left[0].localeCompare(right[0]);
    })
    .map(([url]) => url);
}

function cleanEntryContent($: cheerio.CheerioAPI): cheerio.Cheerio<any> {
  const entry = $('.post-content .entry-content').first().length
    ? $('.post-content .entry-content').first()
    : $('.entry-content').first();

  entry
    .find('script,style,noscript,iframe,form,nav,footer,.sharedaddy,.jp-relatedposts')
    .remove();

  entry.find('ul,ol').each((_, listNode) => {
    const list = $(listNode);
    const text = list.text().replace(/\s+/g, ' ').trim();
    if (/^Sub-Sections:/i.test(text) || text.startsWith('Sub-Sections:')) {
      list.remove();
    }
  });

  entry.find('img').each((_, img) => {
    const image = $(img);
    if (!image.attr('src') && image.attr('data-src')) {
      image.attr('src', image.attr('data-src') ?? '');
    }
  });

  entry.find('a').each((_, link) => {
    const anchor = $(link);
    const href = anchor.attr('href');
    if (!href) {
      return;
    }

    if (href.startsWith('#')) {
      anchor.replaceWith(anchor.text());
      return;
    }

    anchor.attr('href', normalizeUrl(href));
  });

  return entry;
}

function extractSectionMarkdown(url: string, html: string): SectionPage {
  const $ = cheerio.load(html);
  const rawTitle =
    $('.post-head .entry-title').first().text().trim() ||
    $('h1').first().text().trim() ||
    $('title').first().text().trim() ||
    url;

  const title = rawTitle.replace(/\s+/g, ' ').trim();
  const entry = cleanEntryContent($);
  if (!entry.length) {
    throw new Error(`Could not locate entry content for ${url}`);
  }

  const markdownBody = turndown.turndown(entry.html() ?? '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  return {
    url,
    title,
    markdown: markdownBody,
  };
}

function buildChapterMarkdown(chapter: Chapter, sections: SectionPage[]): string {
  const lines: string[] = [];
  lines.push(`# Chapter ${chapter.number}: ${chapter.title}`);
  lines.push('');
  lines.push(`Source: ${chapter.url}`);
  lines.push('');

  const seenBodies = new Set<string>();

  for (const section of sections) {
    const body = section.markdown.trim();
    if (!body || seenBodies.has(body)) {
      continue;
    }
    seenBodies.add(body);

    lines.push(`## ${section.title}`);
    lines.push('');
    lines.push(`Source URL: ${section.url}`);
    lines.push('');
    lines.push(body);
    lines.push('');
  }

  return `${lines.join('\n').trim()}\n`;
}

function parseCliOptions(argv: string[]): CliOptions {
  const options: CliOptions = {};

  const readNumberArg = (flag: string): number | undefined => {
    const index = argv.indexOf(flag);
    if (index < 0) {
      return undefined;
    }

    const raw = argv[index + 1];
    if (!raw) {
      throw new Error(`Expected numeric value after ${flag}`);
    }

    const value = Number.parseInt(raw, 10);
    if (!Number.isFinite(value)) {
      throw new Error(`Invalid numeric value for ${flag}: ${raw}`);
    }

    return value;
  };

  options.chapter = readNumberArg('--chapter');
  options.from = readNumberArg('--from');
  options.to = readNumberArg('--to');
  return options;
}

async function scrapeChapter(
  chapter: Chapter,
  tocSectionLinksByChapter: Map<number, Map<string, number[]>>,
): Promise<void> {
  console.log(`\n[Chapter ${chapter.number}] Fetching chapter TOC page: ${chapter.url}`);
  const chapterHtml = await fetchHtml(chapter.url);
  const chapterSectionLinks = tocSectionLinksByChapter.get(chapter.number) ?? new Map<string, number[]>();
  const sectionUrls = gatherChapterSectionUrls(chapter, chapterHtml, chapterSectionLinks);

  console.log(`[Chapter ${chapter.number}] Found ${sectionUrls.length} URLs (chapter + sub-sections).`);

  const sections: SectionPage[] = [];
  for (const sectionUrl of sectionUrls) {
    console.log(`[Chapter ${chapter.number}] Scraping ${sectionUrl}`);
    const html = sectionUrl === chapter.url ? chapterHtml : await fetchHtml(sectionUrl);
    const section = extractSectionMarkdown(sectionUrl, html);
    sections.push(section);
  }

  const chapterSlug = slugify(chapter.title) || `chapter-${chapter.number}`;
  const filename = `chapter-${String(chapter.number).padStart(2, '0')}-${chapterSlug}.md`;
  const outputPath = path.join(OUTPUT_DIR, filename);
  const markdown = buildChapterMarkdown(chapter, sections);
  await fs.writeFile(outputPath, markdown, 'utf8');
  console.log(`[Chapter ${chapter.number}] Wrote ${outputPath}`);
}

async function main(): Promise<void> {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const cliOptions = parseCliOptions(process.argv.slice(2));
  console.log(`[Abbott] Discovering chapters from ${TOC_URL}`);
  const { chapters, tocSectionLinksByChapter } = await discoverChaptersFromToc();
  const selectedChapters = chapters.filter((chapter) => {
    if (cliOptions.chapter !== undefined) {
      return chapter.number === cliOptions.chapter;
    }
    if (cliOptions.from !== undefined && chapter.number < cliOptions.from) {
      return false;
    }
    if (cliOptions.to !== undefined && chapter.number > cliOptions.to) {
      return false;
    }
    return true;
  });

  if (selectedChapters.length === 0) {
    throw new Error('No chapters selected. Adjust --chapter/--from/--to options.');
  }

  console.log(
    `[Abbott] Found ${chapters.length} chapters. Scraping ${selectedChapters.length} chapter(s).`,
  );

  for (const chapter of selectedChapters) {
    await scrapeChapter(chapter, tocSectionLinksByChapter);
  }

  console.log('\n[Abbott] Scrape complete.');
}

main().catch((error) => {
  console.error('[Abbott] Scrape failed:', error);
  process.exitCode = 1;
});
