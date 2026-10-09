import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import EssaysPage, { metadata } from '../page';
import { OG_IMAGE } from '@/lib/seo';

describe('EssaysPage', () => {
  it('renders the heading, the intro, and a card for each essay', () => {
    render(<EssaysPage />);

    expect(screen.getByRole('heading', { level: 1, name: 'Essays' })).toBeInTheDocument();
    expect(screen.getByText(/sit apart from the engineering work/i)).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Welcome to The Autistic Apologist/ })
    ).toHaveAttribute('href', '/essays/welcome');
  });

  it('links to the engineering blog and to the essays feed', () => {
    render(<EssaysPage />);

    expect(screen.getByRole('link', { name: 'The engineering blog' })).toHaveAttribute('href', '/blog');
    expect(screen.getByRole('link', { name: 'RSS' })).toHaveAttribute('href', '/essays/feed.xml');
  });

  it('is canonical on itself, leaves the name to the title template, and carries the social card', () => {
    expect(metadata.alternates?.canonical).toBe('/essays');
    expect(metadata.title).toBe('Essays');
    expect(JSON.stringify(metadata.openGraph?.images)).toContain(OG_IMAGE);
  });

  it('declares both feeds, since alternates are not merged with the root layout\'s', () => {
    const feeds = JSON.stringify(metadata.alternates?.types);
    expect(feeds).toContain('/feed.xml');
    expect(feeds).toContain('/essays/feed.xml');
  });
});
