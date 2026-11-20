import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { GET, dynamic } from '../feed.xml/route';
import { GET as GET_HE, dynamic as dynamicHe } from '@/app/he/writing/articles/feed.xml/route';
import { WRITING_ARTICLES_DIR, WRITING_ARTICLES_HE_DIR } from '@/data/writingArticles';

const count = (dir: string) => fs.readdirSync(path.join(process.cwd(), dir)).filter((f) => f.endsWith('.md')).length;

describe('writing articles feeds', () => {
  it('are prerendered, since the Workers runtime cannot read the Markdown', () => {
    expect(dynamic).toBe('force-static');
    expect(dynamicHe).toBe('force-static');
  });

  it('serve English RSS with an item for each article', async () => {
    const response = GET();
    const xml = await response.text();

    expect(response.headers.get('Content-Type')).toBe('application/xml; charset=utf-8');
    expect(xml).toContain('<title>Adam Matthew Steinberger — Articles</title>');
    expect(xml).toContain('<guid isPermaLink="true">https://vibewithadam.matthewsteinberger.com/writing/articles/what-is-sin</guid>');
    expect(xml).toContain('href="https://vibewithadam.matthewsteinberger.com/writing/articles/feed.xml"');
    expect(xml.match(/<item>/g)).toHaveLength(count(WRITING_ARTICLES_DIR));
  });

  it('serve Hebrew RSS with an item for each Hebrew article, linked to /he', async () => {
    const xml = await GET_HE().text();

    expect(xml).toContain('<guid isPermaLink="true">https://vibewithadam.matthewsteinberger.com/he/writing/articles/what-is-sin</guid>');
    expect(xml).toContain('href="https://vibewithadam.matthewsteinberger.com/he/writing/articles/feed.xml"');
    expect(xml).toContain('<language>he</language>');
    expect(xml.match(/<item>/g)).toHaveLength(count(WRITING_ARTICLES_HE_DIR));
  });
});
