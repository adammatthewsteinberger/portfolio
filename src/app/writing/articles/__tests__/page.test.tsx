import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ArticlesPage, { metadata } from '../page';
import HebrewArticlesPage, { metadata as hebrewMetadata } from '@/app/he/writing/articles/page';
import { OG_IMAGE } from '@/lib/seo';

describe('ArticlesPage', () => {
  it('renders the English list and the Hebrew list', () => {
    const { unmount } = render(<ArticlesPage />);
    expect(screen.getByRole('heading', { level: 1, name: 'Articles' })).toBeInTheDocument();
    unmount();

    render(<HebrewArticlesPage />);
    expect(screen.getByRole('heading', { level: 1, name: 'מאמרים' })).toBeInTheDocument();
  });

  it('is canonical on itself, declares its Hebrew twin, leaves the name to the title template, and carries the card', () => {
    expect(metadata.alternates?.canonical).toBe('/writing/articles');
    expect(metadata.alternates?.languages).toMatchObject({ en: '/writing/articles', he: '/he/writing/articles' });
    expect(metadata.title).toBe('Articles');
    expect(JSON.stringify(metadata.openGraph?.images)).toContain(OG_IMAGE);
  });

  it('gives the Hebrew page its own canonical, with English as the default alternate', () => {
    expect(hebrewMetadata.alternates?.canonical).toBe('/he/writing/articles');
    expect(hebrewMetadata.alternates?.languages).toMatchObject({ 'x-default': '/writing/articles' });
    expect(hebrewMetadata.title).toBe('מאמרים');
    expect(JSON.stringify(hebrewMetadata.openGraph?.images)).toContain(OG_IMAGE);
  });

  it("declares both feeds, since alternates are not merged with the root layout's", () => {
    expect(JSON.stringify(metadata.alternates?.types)).toContain('/feed.xml');
    expect(JSON.stringify(metadata.alternates?.types)).toContain('/writing/articles/feed.xml');
    expect(JSON.stringify(hebrewMetadata.alternates?.types)).toContain('/he/writing/articles/feed.xml');
  });
});
