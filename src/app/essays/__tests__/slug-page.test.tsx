import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import EssayPage, { generateMetadata, generateStaticParams } from '../[slug]/page';

const params = (slug: string) => ({ params: Promise.resolve({ slug }) });

describe('EssayPage', () => {
  it('prerenders one page per essay file', async () => {
    expect(await generateStaticParams()).toContainEqual({ slug: 'welcome' });
  });

  it('renders the essay: title, byline, tags, body, and the way back', async () => {
    render(await EssayPage(params('welcome')));

    expect(
      screen.getByRole('heading', { level: 1, name: 'Welcome to The Autistic Apologist' })
    ).toBeInTheDocument();
    expect(screen.getByText('Adam Matthew Steinberger')).toBeInTheDocument();
    expect(screen.getByText('autism')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'What to Expect' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Back to Essays/ })).toHaveAttribute('href', '/essays');
  });

  it('renders the author link in the body as a link, not as escaped HTML', async () => {
    render(await EssayPage(params('welcome')));

    expect(screen.getByRole('link', { name: 'Adam Matthew' })).toHaveAttribute(
      'href',
      'https://www.instagram.com/realadammatthew'
    );
  });

  it('prints the published date as written', async () => {
    render(await EssayPage(params('welcome')));

    expect(screen.getByText('October 29, 2025')).toHaveAttribute('datetime', '2025-10-29');
  });

  it('embeds Article JSON-LD with the "<" character escaped', async () => {
    const { container } = render(await EssayPage(params('welcome')));
    const script = container.querySelector('script[type="application/ld+json"]');
    const raw = script?.innerHTML ?? '';

    expect(raw).not.toContain('<');
    const data = JSON.parse(raw);
    expect(data['@type']).toBe('Article');
    expect(data.mainEntityOfPage).toBe('https://vibewithadam.matthewsteinberger.com/essays/welcome');
    expect(data.inLanguage).toBe('en');
  });

  it('404s for an unknown essay', async () => {
    await expect(EssayPage(params('no-such-essay'))).rejects.toThrow();
  });
});

describe('EssayPage metadata', () => {
  it('canonicalizes to the essay and leaves the name to the title template', async () => {
    const meta = await generateMetadata(params('welcome'));

    expect(meta.alternates?.canonical).toBe('/essays/welcome');
    expect(meta.title).toBe('Welcome to The Autistic Apologist');
    expect(meta.title).not.toMatch(/Adam Matthew Steinberger/);
  });

  it('describes it as an article with its tags and date', async () => {
    const meta = await generateMetadata(params('welcome'));

    expect(meta.openGraph).toMatchObject({ type: 'article', publishedTime: '2025-10-29' });
    expect(meta.keywords).toContain('autism');
  });

  it('has a placeholder title for a missing essay', async () => {
    const meta = await generateMetadata(params('no-such-essay'));

    expect(meta.title).toBe('Essay Not Found');
  });
});
