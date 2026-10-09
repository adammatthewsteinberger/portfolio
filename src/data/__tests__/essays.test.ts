import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { ESSAYS_DIR, ESSAYS_FEED_PATH, ESSAYS_PATH, essaysSection } from '../essays';
import { kbSources } from '../kb-sources';

describe('essays section data', () => {
  it('keeps the feed under the section path and the content under src/content', () => {
    expect(ESSAYS_FEED_PATH).toBe(`${ESSAYS_PATH}/feed.xml`);
    expect(ESSAYS_DIR).toBe('src/content/essays');
  });

  it('points at a content directory that exists and holds Markdown', () => {
    const dir = path.join(process.cwd(), ESSAYS_DIR);
    expect(fs.readdirSync(dir).some((file) => file.endsWith('.md'))).toBe(true);
  });

  it('describes the essays as personal writing, kept apart from the engineering blog', () => {
    expect(essaysSection.intro).toMatch(/engineering work/i);
    expect(essaysSection.botNote).toMatch(/personal writing/i);
    expect(essaysSection.botNote).toMatch(/not technical documentation or professional claims/i);
  });

  it('is not described as a track, a service or something for sale', () => {
    const copy = JSON.stringify(essaysSection);
    expect(copy).not.toMatch(/\$\d|price|consult|book a|hire|for sale/i);
  });
});

describe('essays in the chat bot knowledge base', () => {
  const chunk = kbSources.find((source) => source.id === 'essays');

  it('has one curated chunk pointing at /essays, not the essay bodies', () => {
    expect(chunk).toMatchObject({ url: '/essays', title: 'Essays' });
    expect(kbSources.filter((source) => source.url.startsWith('/essays/'))).toEqual([]);
  });

  it('is built from the section copy so the two cannot drift', () => {
    expect(chunk?.text).toContain(essaysSection.description);
    expect(chunk?.text).toContain(essaysSection.botNote);
  });
});
