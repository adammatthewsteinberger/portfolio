import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { describe, expect, it } from 'vitest';

// Content-integrity rule (AGENTS.md): no invented metrics anywhere. The service
// pages carried 180 unsourced "N% faster/fewer/better" claims across 43 files;
// they were stripped on 2026-08-27 and this keeps them out.
const dir = path.join(process.cwd(), 'src/content/services');
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));

describe('service pages', () => {
  it('exist', () => {
    expect(files.length).toBeGreaterThan(40);
  });

  it.each(files.map((f) => [f]))('%s parses and carries no percentage claims', (file) => {
    const raw = fs.readFileSync(path.join(dir, file), 'utf8');
    const { data } = matter(raw);
    expect(data.title, 'title').toBeTruthy();
    expect(data.description, 'description').toBeTruthy();
    expect(raw).not.toMatch(/\d\s*%/);
  });
});
