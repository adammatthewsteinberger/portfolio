import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { getWritingFeedItems } from '../writingFeed';
import { articles } from '@/data/articles';
import { getAllBlogSlugs } from '@/lib/blogUtils';
import { getCollectionSlugs } from '@/lib/collectionUtils';
import { ESSAYS_DIR } from '@/data/essays';
import { WRITING_ARTICLES_DIR } from '@/data/writingArticles';

const items = getWritingFeedItems();
const links = new Set(items.map((item) => item.link));
const D = 'https://vibewithadam.matthewsteinberger.com';

describe('the writing feed', () => {
  it('carries every blog post, essay, article and Novice to Navigator article, uncapped', () => {
    const expected =
      getAllBlogSlugs().length +
      getCollectionSlugs(ESSAYS_DIR).length +
      getCollectionSlugs(WRITING_ARTICLES_DIR).length +
      articles.length;

    expect(items).toHaveLength(expected);
    expect(links.size).toBe(expected);
    expect(links.has(`${D}/essays/welcome`)).toBe(true);
    expect(links.has(`${D}/writing/articles/what-is-sin`)).toBe(true);
    expect(links.has(`${D}/novice-to-navigator/what-is-ai-really`)).toBe(true);
    expect(links.has(`${D}/blog/${getAllBlogSlugs()[0]}`)).toBe(true);
  });

  it('is newest first, with real dates throughout', () => {
    for (const item of items) {
      expect(Number.isNaN(item.pubDate.getTime())).toBe(false);
    }
    const times = items.map((item) => item.pubDate.getTime());
    expect(times).toEqual([...times].sort((a, b) => b - a));
  });

  it('reads the series date as UTC and keeps Hebrew out of the English feed', () => {
    const first = items.find((item) => item.link.endsWith('/what-is-ai-really'));
    expect(first?.pubDate.toISOString()).toBe('2025-07-04T00:00:00.000Z');
    expect(links.has(`${D}/he/writing/articles/what-is-sin`)).toBe(false);
  });
});

describe('/feed.xml route', () => {
  it('serves the combined feed', async () => {
    const { GET, dynamic } = await import('@/app/feed.xml/route');
    const xml = await GET().text();

    expect(dynamic).toBe('force-static');
    expect(xml).toContain('href="https://vibewithadam.matthewsteinberger.com/feed.xml"');
    expect(xml.match(/<item>/g)).toHaveLength(items.length);
    expect(fs.existsSync(path.join(process.cwd(), 'src/app/feed.xml/route.ts'))).toBe(true);
  });
});
