import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import {
  WRITING_ARTICLES_DIR,
  WRITING_ARTICLES_FEED_PATH,
  WRITING_ARTICLES_HE_DIR,
  WRITING_ARTICLES_HE_FEED_PATH,
  WRITING_ARTICLES_HE_PATH,
  WRITING_ARTICLES_PATH,
  articleSection,
  writingArticlesHe,
  writingArticlesSection,
} from '../writingArticles';
import { kbSources } from '../kb-sources';

describe('writing articles section data', () => {
  it('keeps the feeds under the section paths and the Hebrew twin under /he', () => {
    expect(WRITING_ARTICLES_PATH).toBe('/writing/articles');
    expect(WRITING_ARTICLES_FEED_PATH).toBe(`${WRITING_ARTICLES_PATH}/feed.xml`);
    expect(WRITING_ARTICLES_HE_PATH).toBe(`/he${WRITING_ARTICLES_PATH}`);
    expect(WRITING_ARTICLES_HE_FEED_PATH).toBe(`${WRITING_ARTICLES_HE_PATH}/feed.xml`);
    expect(WRITING_ARTICLES_DIR).toBe('src/content/writing-articles');
    expect(WRITING_ARTICLES_HE_DIR).toBe(`${WRITING_ARTICLES_DIR}/he`);
  });

  it('points at content directories that exist and hold Markdown', () => {
    for (const dir of [WRITING_ARTICLES_DIR, WRITING_ARTICLES_HE_DIR]) {
      const files = fs.readdirSync(path.join(process.cwd(), dir));
      expect(files.some((file) => file.endsWith('.md'))).toBe(true);
    }
  });

  it('serves each language its own directory, path and interface strings', () => {
    expect(articleSection('en')).toMatchObject({
      locale: 'en',
      dir: WRITING_ARTICLES_DIR,
      path: WRITING_ARTICLES_PATH,
      title: 'Articles',
      by: 'By',
    });
    expect(articleSection('he')).toMatchObject({
      locale: 'he',
      dir: WRITING_ARTICLES_HE_DIR,
      path: WRITING_ARTICLES_HE_PATH,
      title: writingArticlesHe.title,
      by: writingArticlesHe.by,
    });
  });

  it('describes the articles as faith writing, kept apart from the engineering work', () => {
    expect(writingArticlesSection.intro).toMatch(/engineering work/i);
    expect(writingArticlesSection.botNote).toMatch(/faith writing/i);
    expect(writingArticlesSection.botNote).toMatch(/not technical documentation or professional claims/i);
    expect(writingArticlesSection.botNote).toMatch(/no employer, university, government/i);
  });

  it('is not described as a track, a service, a donation appeal or something for sale', () => {
    const copy = JSON.stringify([writingArticlesSection, writingArticlesHe]);
    expect(copy).not.toMatch(/\$\d|price|consult|book a|hire|for sale|donat|501|tax-deduct/i);
  });
});

describe('writing articles in the chat bot knowledge base', () => {
  const chunk = kbSources.find((source) => source.id === 'writing-articles');

  it('has one curated chunk pointing at /writing/articles, not the article bodies', () => {
    expect(chunk).toMatchObject({ url: '/writing/articles', title: 'Articles' });
    expect(kbSources.filter((source) => source.url.startsWith('/writing/articles/'))).toEqual([]);
  });

  it('is built from the section copy so the two cannot drift', () => {
    expect(chunk?.text).toContain(writingArticlesSection.description);
    expect(chunk?.text).toContain(writingArticlesSection.botNote);
  });
});

describe('writing articles in public/llms.txt', () => {
  const llms = fs.readFileSync(path.join(process.cwd(), 'public/llms.txt'), 'utf8');

  it('lists the English index and the Hebrew twin', () => {
    expect(llms).toContain('https://vibewithadam.matthewsteinberger.com/writing/articles)');
    expect(llms).toContain('https://vibewithadam.matthewsteinberger.com/he/writing/articles');
  });
});
