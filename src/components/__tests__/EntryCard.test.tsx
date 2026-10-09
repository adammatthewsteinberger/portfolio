import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import EntryCard from '../EntryCard';

const props = {
  href: '/essays/welcome',
  title: 'Welcome',
  description: 'An introduction.',
  publishedDate: '2025-10-29',
  readTime: '2 min read',
};

describe('EntryCard', () => {
  it('links to the entry and shows its title, description and read time', () => {
    render(<EntryCard {...props} />);

    expect(screen.getByRole('link')).toHaveAttribute('href', '/essays/welcome');
    expect(screen.getByRole('heading', { name: 'Welcome' })).toBeInTheDocument();
    expect(screen.getByText('An introduction.')).toBeInTheDocument();
    expect(screen.getByText(/2 min read/)).toBeInTheDocument();
  });

  it('prints the date as written, not shifted a day by the visitor\'s timezone', () => {
    render(<EntryCard {...props} />);

    expect(screen.getByText(/October 29, 2025/)).toBeInTheDocument();
  });

  it('formats the date for the locale it is given', () => {
    render(<EntryCard {...props} locale="he" />);

    expect(screen.getByText(/2025/)).toBeInTheDocument();
    expect(screen.queryByText(/October/)).not.toBeInTheDocument();
  });
});
