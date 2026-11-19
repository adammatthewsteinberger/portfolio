import { describe, it, expect } from 'vitest';
import sitemap from '../sitemap';

const DOMAIN = 'https://vibewithadam.matthewsteinberger.com';
const entry = (url: string) => sitemap().find((item) => item.url === url);

describe('sitemap: essays', () => {
  it('lists the essays index', () => {
    expect(entry(`${DOMAIN}/essays`)).toMatchObject({ changeFrequency: 'monthly', priority: 0.6 });
  });

  it('lists each essay with its own date, ranked below the blog', () => {
    const essay = entry(`${DOMAIN}/essays/welcome`);

    expect(essay?.lastModified).toEqual(new Date('2025-10-29'));
    expect(essay?.priority).toBeLessThan(entry(`${DOMAIN}/blog`)!.priority!);
  });

  it('keeps the engineering pages ahead of the essays', () => {
    expect(entry(`${DOMAIN}/join-me`)!.priority).toBeGreaterThan(entry(`${DOMAIN}/essays`)!.priority!);
  });
});

describe('sitemap: writing articles', () => {
  it('lists the English index with its Hebrew twin declared, and the Hebrew index', () => {
    expect(entry(`${DOMAIN}/writing/articles`)).toMatchObject({
      changeFrequency: 'monthly',
      alternates: { languages: { he: `${DOMAIN}/he/writing/articles` } },
    });
    expect(entry(`${DOMAIN}/he/writing/articles`)).toMatchObject({ changeFrequency: 'monthly' });
  });

  it('lists each article in both languages with its own date, ranked below the blog', () => {
    const en = entry(`${DOMAIN}/writing/articles/what-is-sin`);
    const he = entry(`${DOMAIN}/he/writing/articles/what-is-sin`);

    expect(en?.lastModified).toEqual(new Date('2025-06-16'));
    expect(en?.alternates?.languages).toEqual({
      en: `${DOMAIN}/writing/articles/what-is-sin`,
      he: `${DOMAIN}/he/writing/articles/what-is-sin`,
    });
    expect(he?.lastModified).toEqual(new Date('2025-06-16'));
    expect(en?.priority).toBeLessThan(entry(`${DOMAIN}/blog`)!.priority!);
    expect(he?.priority).toBeLessThan(en!.priority!);
  });

  it('keeps the engineering pages ahead of the articles', () => {
    expect(entry(`${DOMAIN}/join-me`)!.priority).toBeGreaterThan(entry(`${DOMAIN}/writing/articles`)!.priority!);
  });
});
