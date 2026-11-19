import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ArticlePage, { generateMetadata, generateStaticParams } from '../[slug]/page';
import HebrewArticlePage, {
  generateMetadata as generateHebrewMetadata,
  generateStaticParams as generateHebrewStaticParams,
} from '@/app/he/writing/articles/[slug]/page';
import { OG_IMAGE } from '@/lib/seo';

const params = (slug: string) => ({ params: Promise.resolve({ slug }) });

describe('ArticlePage', () => {
  it('prerenders one page per article file, in both languages', async () => {
    expect(await generateStaticParams()).toContainEqual({ slug: 'what-is-sin' });
    expect(await generateHebrewStaticParams()).toContainEqual({ slug: 'what-is-sin' });
  });

  it('renders the English and the Hebrew article', async () => {
    const { unmount } = render(await ArticlePage(params('what-is-sin')));
    expect(screen.getByRole('heading', { level: 1, name: 'What Is Sin?' })).toBeInTheDocument();
    unmount();

    render(await HebrewArticlePage(params('what-is-sin')));
    expect(screen.getByRole('heading', { level: 1, name: 'מהו חטא?' })).toBeInTheDocument();
  });
});

describe('ArticlePage metadata', () => {
  it('canonicalizes to the article, declares the Hebrew twin, and leaves the name to the title template', async () => {
    const meta = await generateMetadata(params('what-is-sin'));

    expect(meta.alternates?.canonical).toBe('/writing/articles/what-is-sin');
    expect(meta.alternates?.languages).toMatchObject({ he: '/he/writing/articles/what-is-sin' });
    expect(meta.title).toBe('What Is Sin?');
    expect(meta.title).not.toMatch(/Adam Matthew Steinberger/);
    expect(meta.openGraph).toMatchObject({ type: 'article', publishedTime: '2025-06-16' });
  });

  it('canonicalizes the Hebrew article to its own URL and carries the site-wide card', async () => {
    const meta = await generateHebrewMetadata(params('what-is-sin'));

    expect(meta.alternates?.canonical).toBe('/he/writing/articles/what-is-sin');
    expect(meta.alternates?.languages).toMatchObject({ en: '/writing/articles/what-is-sin' });
    expect(meta.openGraph).toMatchObject({ type: 'article', locale: 'he_IL' });
    expect(JSON.stringify(meta.openGraph?.images)).toContain(OG_IMAGE);
  });

  it('has a placeholder title for a missing article, in each language', async () => {
    expect((await generateMetadata(params('no-such-article'))).title).toBe('Article Not Found');
    expect((await generateHebrewMetadata(params('no-such-article'))).title).toBe('המאמר לא נמצא');
  });
});
