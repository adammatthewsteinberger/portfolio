import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { WRITING_ARTICLES_DIR, WRITING_ARTICLES_HE_DIR } from '@/data/writingArticles';

/**
 * Guards the imported ministry articles (English and Hebrew), the way
 * content-integrity.test.ts guards the essays. Real files, no mocks.
 */
const dirs = { en: path.join(process.cwd(), WRITING_ARTICLES_DIR), he: path.join(process.cwd(), WRITING_ARTICLES_HE_DIR) };
const names = (dir: string) => fs.readdirSync(dir).filter((name) => name.endsWith('.md')).sort();
const files = { en: names(dirs.en), he: names(dirs.he) };
const read = (locale: 'en' | 'he', file: string) => matter(fs.readFileSync(path.join(dirs[locale], file), 'utf8'));
const cases = (['en', 'he'] as const).flatMap((locale) => files[locale].map((file) => [locale, file] as const));

function proseLines(body: string): string[] {
  let inFence = false;
  return body.split('\n').filter((line) => {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      return false;
    }
    return !inFence;
  });
}

describe('writing articles content integrity', () => {
  it('has articles to check, in both languages', () => {
    expect(files.en.length).toBeGreaterThan(0);
    expect(files.he.length).toBeGreaterThan(0);
  });

  it('has a Hebrew twin for every English article and the reverse', () => {
    expect(files.he).toEqual(files.en);
  });

  it.each(cases)('%s/%s has a safe slug and complete frontmatter', (locale, file) => {
    const { data } = read(locale, file);

    expect(file).toMatch(/^[\w-]+\.md$/);
    expect(typeof data.title).toBe('string');
    expect(data.title.trim()).not.toBe('');
    expect(typeof data.description).toBe('string');
    expect(data.description.trim()).not.toBe('');
  });

  it.each(cases)('%s/%s has a real, quoted ISO date', (locale, file) => {
    const { data } = read(locale, file);

    expect(typeof data.publishedDate).toBe('string');
    expect(data.publishedDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(new Date(data.publishedDate).toISOString().slice(0, 10)).toBe(data.publishedDate);
  });

  it.each(cases)('%s/%s has clean, unique, lowercase tags', (locale, file) => {
    const { data } = read(locale, file);

    expect(data.tags.length).toBeGreaterThan(0);
    for (const tag of data.tags) {
      expect(tag).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
    expect(new Set(data.tags).size).toBe(data.tags.length);
  });

  it.each(cases)('%s/%s has a body with no duplicate H1 and no raw HTML', (locale, file) => {
    const { content } = read(locale, file);
    const prose = proseLines(content);

    expect(content.trim().length).toBeGreaterThan(0);
    expect(prose.filter((line) => /^# /.test(line))).toEqual([]);
    expect(prose.filter((line) => /<\/?[a-zA-Z][^>]*>/.test(line))).toEqual([]);
  });

  it('shares dates and tags between a twin and its original', () => {
    for (const file of files.en) {
      const en = read('en', file).data;
      const he = read('he', file).data;
      expect(he.publishedDate).toBe(en.publishedDate);
      expect(he.tags).toEqual(en.tags);
      expect(he.image).toBe(en.image);
    }
  });

  it('writes Hebrew in the Hebrew files', () => {
    for (const file of files.he) {
      expect(read('he', file).data.title).toMatch(/[֐-׿]/);
    }
  });

  it('only references images that exist, all under /images/writing-articles', () => {
    for (const locale of ['en', 'he'] as const) {
      for (const file of files[locale]) {
        const { data } = read(locale, file);
        if (data.image) {
          expect(data.image).toMatch(/^\/images\/writing-articles\/[\w-]+\.webp$/);
          expect(fs.existsSync(path.join(process.cwd(), 'public', data.image))).toBe(true);
        }
      }
    }
  });

  it('uses no frontmatter keys the loader does not read', () => {
    const allowed = new Set(['title', 'description', 'publishedDate', 'tags', 'image', 'author', 'readTime']);
    for (const [locale, file] of cases) {
      expect(Object.keys(read(locale, file).data).filter((key) => !allowed.has(key))).toEqual([]);
    }
  });

  it('carries no testimonial, trust-badge or donation copy from the ministry site', () => {
    for (const [locale, file] of cases) {
      const text = fs.readFileSync(path.join(dirs[locale], file), 'utf8');
      expect(text, `${locale}/${file}`).not.toMatch(/testimonial|trust_badges|conversion_goal|tax-deductible|501\(c\)|donorbox|humbleberger\.org/i);
    }
  });

  it('has no two English articles with the same title', () => {
    const titles = files.en.map((file) => read('en', file).data.title.trim().toLowerCase());
    expect(new Set(titles).size).toBe(titles.length);
  });
});
