import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ArticleList from '../ArticleList';

describe('ArticleList', () => {
  it('renders the English heading, intro, language switch, feed link and a card per article', () => {
    render(<ArticleList locale="en" />);

    expect(screen.getByRole('heading', { level: 1, name: 'Articles' })).toBeInTheDocument();
    expect(screen.getByText(/sit apart from the engineering work/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Writing' })).toHaveAttribute('href', '/writing');
    expect(screen.getByRole('link', { name: 'RSS' })).toHaveAttribute('href', '/writing/articles/feed.xml');
    expect(screen.getByRole('link', { name: 'עברית' })).toHaveAttribute('href', '/he/writing/articles');
    expect(screen.getByRole('link', { name: /What Is Sin\?/ })).toHaveAttribute('href', '/writing/articles/what-is-sin');
  });

  it('renders the Hebrew twin from the Hebrew files, linked to Hebrew URLs', () => {
    render(<ArticleList locale="he" />);

    expect(screen.getByRole('heading', { level: 1, name: 'מאמרים' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'כתיבה' })).toHaveAttribute('href', '/writing');
    expect(screen.getByRole('link', { name: 'RSS' })).toHaveAttribute('href', '/he/writing/articles/feed.xml');
    expect(screen.getByRole('link', { name: 'English' })).toHaveAttribute('href', '/writing/articles');
    expect(screen.getByRole('link', { name: /מהו חטא\?/ })).toHaveAttribute('href', '/he/writing/articles/what-is-sin');
  });
});
