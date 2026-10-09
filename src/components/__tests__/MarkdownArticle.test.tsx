import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MarkdownArticle from '../MarkdownArticle';

describe('MarkdownArticle', () => {
  it('renders Markdown headings, emphasis and links', () => {
    render(
      <MarkdownArticle>{'## A heading\n\nSome **bold** text and a [link](https://example.com).'}</MarkdownArticle>
    );

    expect(screen.getByRole('heading', { level: 2, name: 'A heading' })).toBeInTheDocument();
    expect(screen.getByText('bold').tagName).toBe('STRONG');
    expect(screen.getByRole('link', { name: 'link' })).toHaveAttribute('href', 'https://example.com');
  });

  it('renders GitHub-flavoured tables through ProseTable', () => {
    render(<MarkdownArticle>{'| a | b |\n|---|---|\n| 1 | 2 |'}</MarkdownArticle>);

    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: '2' })).toBeInTheDocument();
  });

  it('uses the article card styling', () => {
    const { container } = render(<MarkdownArticle>text</MarkdownArticle>);

    expect(container.firstElementChild).toHaveClass('article-body', 'prose');
  });
});
