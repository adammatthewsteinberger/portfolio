import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { ESSAYS_DIR } from '@/data/essays';

/**
 * Guards the imported Markdown. The loader tolerates sloppy input (it
 * normalizes dates and tags on read), so nothing else would notice an essay
 * with a missing description, a duplicate H1, or raw HTML that react-markdown
 * would print as literal text. Real files, no mocks.
 */
const root = path.join(process.cwd(), ESSAYS_DIR);
const files = fs.readdirSync(root).filter((name) => name.endsWith('.md'));

const read = (file: string) => matter(fs.readFileSync(path.join(root, file), 'utf8'));

/** Body lines outside fenced code blocks, so a `# comment` in a code sample is not flagged. */
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

describe('essays content integrity', () => {
  it('has essays to check', () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it.each(files)('%s has a safe slug and complete frontmatter', (file) => {
    const { data } = read(file);

    expect(file).toMatch(/^[\w-]+\.md$/);
    expect(typeof data.title).toBe('string');
    expect(data.title.trim()).not.toBe('');
    expect(typeof data.description).toBe('string');
    expect(data.description.trim()).not.toBe('');
  });

  it.each(files)('%s has a real, quoted ISO date', (file) => {
    const { data } = read(file);

    // A string, not a Date: an unquoted YAML date would parse to a Date.
    expect(typeof data.publishedDate).toBe('string');
    expect(data.publishedDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(new Date(data.publishedDate).toISOString().slice(0, 10)).toBe(data.publishedDate);
  });

  it.each(files)('%s has clean, unique, lowercase tags', (file) => {
    const { data } = read(file);

    expect(Array.isArray(data.tags)).toBe(true);
    expect(data.tags.length).toBeGreaterThan(0);
    for (const tag of data.tags) {
      expect(tag).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
    expect(new Set(data.tags).size).toBe(data.tags.length);
  });

  it.each(files)('%s has a body with no duplicate H1, no raw HTML, and no "this blog"', (file) => {
    const { content } = read(file);
    const prose = proseLines(content);

    expect(content.trim().length).toBeGreaterThan(0);
    // The page renders the title as the H1.
    expect(prose.filter((line) => /^# /.test(line))).toEqual([]);
    // react-markdown prints raw HTML as text.
    expect(prose.filter((line) => /<\/?[a-zA-Z][^>]*>/.test(line))).toEqual([]);
    expect(content).not.toMatch(/\b(this|my) blog\b/i);
  });

  it('only references images that exist', () => {
    for (const file of files) {
      const { data } = read(file);
      if (data.image) {
        expect(data.image).toMatch(/^\/images\/essays\/[\w-]+\.webp$/);
        expect(fs.existsSync(path.join(process.cwd(), 'public', data.image))).toBe(true);
      }
    }
  });

  it('uses no frontmatter keys the loader does not read', () => {
    const allowed = new Set(['title', 'description', 'publishedDate', 'tags', 'image', 'author', 'readTime']);
    for (const file of files) {
      expect(Object.keys(read(file).data).filter((key) => !allowed.has(key))).toEqual([]);
    }
  });

  it('has no two essays with the same title', () => {
    const titles = files.map((file) => read(file).data.title.trim().toLowerCase());
    expect(new Set(titles).size).toBe(titles.length);
  });
});
