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
