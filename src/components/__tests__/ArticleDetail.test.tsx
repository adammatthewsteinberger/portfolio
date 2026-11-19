import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ArticleDetail from '../ArticleDetail';

describe('ArticleDetail', () => {
  it('renders an English article: title, byline, date, tags, body, language switch and the way back', () => {
    render(<ArticleDetail slug="what-is-sin" locale="en" />);

    expect(screen.getByRole('heading', { level: 1, name: 'What Is Sin?' })).toBeInTheDocument();
    expect(screen.getByText('Adam Matthew Steinberger')).toBeInTheDocument();
    expect(screen.getByText('sin-and-salvation')).toBeInTheDocument();
    expect(screen.getByText('June 16, 2025')).toHaveAttribute('datetime', '2025-06-16');
    expect(screen.getByRole('link', { name: 'עברית' })).toHaveAttribute('href', '/he/writing/articles/what-is-sin');
    expect(screen.getByRole('link', { name: /Back to Articles/ })).toHaveAttribute('href', '/writing/articles');
  });

  it('renders the Hebrew twin with Hebrew interface strings and Hebrew URLs', () => {
    render(<ArticleDetail slug="what-is-sin" locale="he" />);

    expect(screen.getByRole('heading', { level: 1, name: 'מהו חטא?' })).toBeInTheDocument();
    expect(screen.getByText(/^מאת/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'English' })).toHaveAttribute('href', '/writing/articles/what-is-sin');
    expect(screen.getByRole('link', { name: /חזרה למאמרים/ })).toHaveAttribute('href', '/he/writing/articles');
    expect(screen.getByRole('heading', { level: 2, name: 'מאמרים נוספים' })).toBeInTheDocument();
  });

  it('lists related articles that share a tag, linked to their own pages', () => {
    render(<ArticleDetail slug="what-is-sin" locale="en" />);

    expect(screen.getByRole('heading', { level: 2, name: 'More articles' })).toBeInTheDocument();
    expect(screen.getAllByRole('link').some((link) => link.getAttribute('href')?.startsWith('/writing/articles/'))).toBe(true);
  });

  it('shows a decorative hero image when the article has one, and none otherwise', () => {
    const { container, unmount } = render(<ArticleDetail slug="daniels-ancient-calendar" locale="en" />);
    const image = container.querySelector('img');

    expect(image).not.toBeNull();
    expect(decodeURIComponent(image!.getAttribute('src') ?? '')).toContain('/images/writing-articles/daniels-ancient-calendar.webp');
    expect(image).toHaveAttribute('alt', '');
    unmount();

    expect(render(<ArticleDetail slug="what-is-sin" locale="en" />).container.querySelector('img')).toBeNull();
  });

  it('embeds Article JSON-LD in the right language, with "<" escaped', () => {
    const { container } = render(<ArticleDetail slug="what-is-sin" locale="he" />);
    const raw = container.querySelector('script[type="application/ld+json"]')?.innerHTML ?? '';

    expect(raw).not.toContain('<');
    const data = JSON.parse(raw);
    expect(data['@type']).toBe('Article');
    expect(data.inLanguage).toBe('he');
    expect(data.mainEntityOfPage).toBe('https://vibewithadam.matthewsteinberger.com/he/writing/articles/what-is-sin');
  });

  it('404s for an unknown article', () => {
    expect(() => ArticleDetail({ slug: 'no-such-article', locale: 'en' })).toThrow();
    expect(() => ArticleDetail({ slug: 'no-such-article', locale: 'he' })).toThrow();
  });
});
