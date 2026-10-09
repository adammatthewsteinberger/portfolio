import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

/**
 * Generic Markdown collection loader for the essays and ministry sections.
 * Same shape as blogUtils, but parameterized by content directory (relative to
 * the project root) so one loader, and one coverage-complete test file, serves
 * every collection. Everything here runs at build time only: the Workers
 * runtime has no filesystem, so routes that call it must be prerendered.
 */
export interface CollectionEntry {
  slug: string;
  title: string;
  description: string;
  author: string;
  /** Always "YYYY-MM-DD", whether the source quoted the date or not. */
  publishedDate: string;
  readTime: string;
  /** Lowercase, hyphenated, de-duplicated. */
  tags: string[];
  image?: string;
  content: string;
}

const DEFAULT_AUTHOR = 'Adam Matthew Steinberger';
const WORDS_PER_MINUTE = 200;
// Slugs become file names, so refuse anything that could leave the directory.
const SAFE_SLUG = /^[\w-]+$/;

// Turbopack cannot see which folder a parameterized `dir` points at, so it would
// trace the whole project into every route that imports this file. That is
// unnecessary here: these functions only run at build time, while pages are
// prerendered (the Workers runtime has no filesystem to read at request time),
// so the `turbopackIgnore` markers below opt the filesystem calls out of tracing.

/** gray-matter turns an unquoted YAML date into a Date; a quoted one stays a string. */
function toIsoDate(value: unknown): string {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }
  return String(value ?? '');
}

function normalizeTags(raw: unknown): string[] {
  if (!Array.isArray(raw)) {
    return [];
  }
  const tags = raw.map((tag) => String(tag).trim().toLowerCase().replace(/\s+/g, '-'));
  return [...new Set(tags)];
}

function estimateReadTime(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / WORDS_PER_MINUTE))} min read`;
}

export function getCollectionEntry(dir: string, slug: string): CollectionEntry | null {
  if (!SAFE_SLUG.test(slug)) {
    return null;
  }

  try {
    const fullPath = path.join(/*turbopackIgnore: true*/ process.cwd(), dir, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const { data, content } = matter(fs.readFileSync(fullPath, 'utf8'));

    return {
      slug,
      title: data.title,
      description: data.description ?? '',
      author: data.author ?? DEFAULT_AUTHOR,
      publishedDate: toIsoDate(data.publishedDate),
      readTime: data.readTime ?? estimateReadTime(content),
      tags: normalizeTags(data.tags),
      image: data.image,
      content,
    };
  } catch (error) {
    console.error(`Error reading ${dir}/${slug}:`, error);
    return null;
  }
}

export function getCollectionSlugs(dir: string): string[] {
  try {
    const directory = path.join(/*turbopackIgnore: true*/ process.cwd(), dir);

    if (!fs.existsSync(directory)) {
      return [];
    }

    return fs
      .readdirSync(/*turbopackIgnore: true*/ directory)
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => fileName.replace(/\.md$/, ''))
      .sort();
  } catch (error) {
    console.error(`Error reading slugs in ${dir}:`, error);
    return [];
  }
}

/**
 * Newest first. Titles break ties, so a collection whose entries share one
 * date (the imported essays all do) still comes out in a stable order.
 */
export function getAllCollectionEntries(dir: string): CollectionEntry[] {
  // getCollectionSlugs and getCollectionEntry each catch and log their own
  // filesystem/parse errors, so this function has no error path of its own.
  const entries: CollectionEntry[] = [];

  for (const slug of getCollectionSlugs(dir)) {
    const entry = getCollectionEntry(dir, slug);
    if (entry) {
      entries.push(entry);
    }
  }

  return entries.sort(
    (a, b) => b.publishedDate.localeCompare(a.publishedDate) || a.title.localeCompare(b.title)
  );
}

/** Entries that share at least one tag, most shared tags first, then newest. */
export function getRelatedEntries(
  dir: string,
  currentSlug: string,
  tags: string[],
  limit: number = 3
): CollectionEntry[] {
  const wanted = normalizeTags(tags);

  return getAllCollectionEntries(dir)
    .filter((entry) => entry.slug !== currentSlug)
    .map((entry) => ({
      entry,
      shared: entry.tags.filter((tag) => wanted.includes(tag)).length,
    }))
    .filter(({ shared }) => shared > 0)
    .sort((a, b) => b.shared - a.shared)
    .slice(0, limit)
    .map(({ entry }) => entry);
}
