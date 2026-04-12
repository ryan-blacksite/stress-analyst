import { promises as fs } from 'node:fs';
import * as path from 'node:path';

import * as cheerio from 'cheerio';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

const OUTPUT_DIR = path.resolve(process.cwd(), 'knowledge', 'references');
const REQUEST_DELAY_MS = 2_000;
const REQUEST_TIMEOUT_MS = 45_000;
const MAX_RETRIES = 3;

interface ReferenceSource {
  slug: string;
  title: string;
  url: string;
  contentSelectors: string[];
  stripSelectors?: string[];
}

const SOURCES: ReferenceSource[] = [
  {
    slug: 'aircraftstress-fastener-analysis-part-1',
    title: 'AircraftStress.com — Fastener Analysis Part 1',
    url: 'https://aircraftstress.com/2019/01/10/fastener-analysis-part-1/',
    contentSelectors: ['article .entry-content', '.entry-content', 'article', 'main'],
  },
  {
    slug: 'afgrow-dtd-handbook-9-1-structural-repairs',
    title: 'AFGROW — Damage Tolerance Handbook §9.1 (Structural Repairs)',
    url: 'https://www.afgrow.net/applications/dtdhandbook/sections/page9_1.aspx',
    contentSelectors: ['#content', '#main', 'main', 'form'],
    stripSelectors: ['#header', '#footer', '.navigation', '#nav', 'nav'],
  },
  {
    slug: 'kitplanes-stressing-structure-margins-of-safety',
    title: 'Kitplanes — Stressing Structure (Margins of Safety)',
    url: 'https://www.kitplanes.com/stressing-structure-2/',
    contentSelectors: ['article .entry-content', '.td-post-content', '.entry-content', 'article'],
  },
  {
    slug: 'embry-riddle-aerospace-structures',
    title: 'Embry-Riddle — Aerospace Structures',
    url: 'https://eaglepubs.erau.edu/introductiontoaerospaceflightvehicles/chapter/aerospace-structures/',
    contentSelectors: ['.entry-content', 'article .chapter-content', 'article', 'main'],
  },
  {
    slug: 'embry-riddle-aerospace-materials',
    title: 'Embry-Riddle — Aerospace Materials',
    url: 'https://eaglepubs.erau.edu/introductiontoaerospaceflightvehicles/chapter/aerospace-materials/',
    contentSelectors: ['.entry-content', 'article .chapter-content', 'article', 'main'],
  },
  {
    slug: 'stressebook-mmpds-mechanical-properties-table',
    title: 'StressEbook — MMPDS Mechanical Properties Table Guide',
    url: 'https://www.stressebook.com/mmpds-mechanical-properties-table/',
    contentSelectors: ['article .entry-content', '.entry-content', 'article', 'main'],
  },
  {
    slug: 'scirp-thin-walled-pressure-vessels',
    title: 'SCIRP — Thin-Walled Pressure Vessels',
    url: 'https://www.scirp.org/journal/paperinformation?paperid=53766',
    contentSelectors: [
      '#htmlContent',
      '#JournalInfor_div_paper',
      '.articles_main',
      '.con_main',
      'main',
    ],
    stripSelectors: ['#header', '#footer', '.navigation', 'nav', '#leftNav', '#rightNav'],
  },
  {
    slug: 'composite-materials-hub-failure-criteria',
    title: 'Composite Materials Hub — Failure Criteria',
    url: 'https://compositematerialshub.com/failure-criteria-in-composite-materials/',
    contentSelectors: [
      '#content-try .elementor-widget-container',
      '#content-try',
      'main#main',
      'article .entry-content',
      '.entry-content',
      'article',
      'main',
    ],
  },
  {
    slug: 'vaia-buckling-analysis-aerospace',
    title: 'Vaia — Buckling Analysis in Aerospace',
    url: 'https://www.vaia.com/en-us/explanations/engineering/aerospace-engineering/buckling-analysis/',
    contentSelectors: [
      '#api-content',
      '.va-main-content',
      '.va-main-content-wrap',
      'article',
      'main',
    ],
    stripSelectors: [
      '.va-mega-menu',
      '.va-mobile-offcanvas',
      '.va-welcome',
      '.va-smart-exam',
      '.va-main-navigation',
      '.minimal-popular-topics',
      '.swiper-wrapper',
      '.swiper-smart-exam',
      '#mobile-navigation-subtopic',
    ],
  },
  {
    slug: 'sg-systems-mrb-process-overview',
    title: 'SG Systems Global — MRB Process Overview',
    url: 'https://sgsystemsglobal.com/glossary/material-review-board-mrb/',
    contentSelectors: ['article .entry-content', '.entry-content', 'article', 'main'],
  },
];

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

function normalizeUrl(href: string, base: string): string {
  try {
    const url = new URL(href, base);
    url.hash = '';
    return url.toString();
  } catch {
    return href;
  }
}

async function fetchHtml(url: string, attempt = 1): Promise<string> {
  const elapsed = Date.now() - lastRequestAt;
  if (elapsed < REQUEST_DELAY_MS) {
    await sleep(REQUEST_DELAY_MS - elapsed);
  }

  try {
    const response = await fetch(url, {
      headers: {
        'user-agent':
          'stress-analyst-knowledge-bot/1.0 (educational aerospace reference collection)',
        accept: 'text/html,application/xhtml+xml',
        'accept-language': 'en-US,en;q=0.9',
      },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      redirect: 'follow',
    });
    lastRequestAt = Date.now();

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}`);
    }

    return await response.text();
  } catch (error) {
    if (attempt >= MAX_RETRIES) {
      throw new Error(`Failed to fetch ${url}: ${String(error)}`);
    }
    await sleep(REQUEST_DELAY_MS * attempt);
    return fetchHtml(url, attempt + 1);
  }
}

const GLOBAL_STRIP_SELECTORS = [
  'script',
  'style',
  'noscript',
  'iframe',
  'form',
  'nav',
  'header',
  'footer',
  'aside',
  '.nav',
  '.navbar',
  '.navigation',
  '.menu',
  '.sidebar',
  '.widget',
  '.widgets',
  '.advertisement',
  '.ad',
  '.ads',
  '.ad-container',
  '.adsbygoogle',
  '.sharedaddy',
  '.share',
  '.share-buttons',
  '.social',
  '.social-share',
  '.jp-relatedposts',
  '.related-posts',
  '.related',
  '.comments',
  '#comments',
  '.comment-respond',
  '.post-navigation',
  '.pagination',
  '.breadcrumb',
  '.breadcrumbs',
  '.cookie',
  '.cookie-banner',
  '.newsletter',
  '.subscribe',
  '.author-box',
  '.author-bio',
  '.entry-meta',
  '.post-meta',
  '.meta',
  '.tags',
  '.tag-links',
  '.cat-links',
  '.wp-block-buttons',
  '.wp-block-cover',
  '[role="navigation"]',
  '[role="banner"]',
  '[role="contentinfo"]',
  '[role="complementary"]',
  '[aria-label*="cookie" i]',
];

function cleanContent(
  $: cheerio.CheerioAPI,
  container: cheerio.Cheerio<any>,
  sourceUrl: string,
  extraStripSelectors: string[] = [],
): cheerio.Cheerio<any> {
  for (const selector of [...GLOBAL_STRIP_SELECTORS, ...extraStripSelectors]) {
    container.find(selector).remove();
  }

  container.find('img').each((_, img) => {
    const image = $(img);
    if (!image.attr('src') && image.attr('data-src')) {
      image.attr('src', image.attr('data-src') ?? '');
    }
    const src = image.attr('src');
    if (src) {
      image.attr('src', normalizeUrl(src, sourceUrl));
    }
  });

  container.find('a').each((_, link) => {
    const anchor = $(link);
    const href = anchor.attr('href');
    if (!href) {
      return;
    }
    if (href.startsWith('#')) {
      anchor.replaceWith(anchor.text());
      return;
    }
    anchor.attr('href', normalizeUrl(href, sourceUrl));
  });

  return container;
}

function pickContentContainer(
  $: cheerio.CheerioAPI,
  selectors: string[],
): cheerio.Cheerio<any> | null {
  for (const selector of selectors) {
    const match = $(selector).first();
    if (match.length && match.text().trim().length > 200) {
      return match;
    }
  }

  const body = $('body').first();
  return body.length ? body : null;
}

function extractTitle($: cheerio.CheerioAPI, fallback: string): string {
  const candidates = [
    $('article h1').first().text(),
    $('h1.entry-title').first().text(),
    $('h1').first().text(),
    $('meta[property="og:title"]').attr('content') ?? '',
    $('title').first().text(),
  ];

  for (const candidate of candidates) {
    const cleaned = candidate?.replace(/\s+/g, ' ').trim();
    if (cleaned) {
      return cleaned;
    }
  }

  return fallback;
}

function buildMarkdown(source: ReferenceSource, pageTitle: string, body: string): string {
  const lines: string[] = [];
  lines.push(`# ${source.title}`);
  lines.push('');
  lines.push(`Source: ${source.url}`);
  if (pageTitle && pageTitle !== source.title) {
    lines.push(`Page title: ${pageTitle}`);
  }
  lines.push(`Retrieved: ${new Date().toISOString()}`);
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push(body.trim());
  lines.push('');
  return lines.join('\n');
}

async function scrapeSource(source: ReferenceSource): Promise<void> {
  console.log(`\n[${source.slug}] Fetching ${source.url}`);
  const html = await fetchHtml(source.url);
  const $ = cheerio.load(html);

  const container = pickContentContainer($, source.contentSelectors);
  if (!container || !container.length) {
    throw new Error(`Could not locate main content for ${source.url}`);
  }

  const pageTitle = extractTitle($, source.title);
  const cleaned = cleanContent($, container, source.url, source.stripSelectors ?? []);
  const innerHtml = cleaned.html() ?? '';

  if (!innerHtml.trim()) {
    throw new Error(`Empty content after cleaning for ${source.url}`);
  }

  const markdownBody = turndown
    .turndown(innerHtml)
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  if (markdownBody.length < 200) {
    console.warn(
      `[${source.slug}] Warning: extracted body is short (${markdownBody.length} chars). Check selectors.`,
    );
  }

  const outputPath = path.join(OUTPUT_DIR, `${source.slug}.md`);
  const markdown = buildMarkdown(source, pageTitle, markdownBody);
  await fs.writeFile(outputPath, markdown, 'utf8');
  console.log(
    `[${source.slug}] Wrote ${outputPath} (${markdownBody.length} chars of body)`,
  );
}

function parseOnlyFilter(argv: string[]): Set<string> | null {
  const index = argv.indexOf('--only');
  if (index < 0) {
    return null;
  }
  const raw = argv[index + 1];
  if (!raw) {
    throw new Error('Expected comma-separated slugs after --only');
  }
  return new Set(raw.split(',').map((slug) => slug.trim()).filter(Boolean));
}

async function main(): Promise<void> {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const only = parseOnlyFilter(process.argv.slice(2));
  const selected = only ? SOURCES.filter((source) => only.has(source.slug)) : SOURCES;

  if (selected.length === 0) {
    throw new Error('No sources selected. Check --only slugs.');
  }

  console.log(`[references] Scraping ${selected.length} HTML reference sources.`);

  const failures: Array<{ source: ReferenceSource; error: unknown }> = [];

  for (const source of selected) {
    try {
      await scrapeSource(source);
    } catch (error) {
      console.error(`[${source.slug}] FAILED:`, error);
      failures.push({ source, error });
    }
  }

  console.log('\n[references] Scrape complete.');
  console.log(`  Succeeded: ${selected.length - failures.length}/${selected.length}`);
  if (failures.length) {
    console.log(`  Failed: ${failures.length}`);
    for (const { source, error } of failures) {
      console.log(`    - ${source.slug}: ${String(error)}`);
    }
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error('[references] Scrape failed:', error);
  process.exitCode = 1;
});
