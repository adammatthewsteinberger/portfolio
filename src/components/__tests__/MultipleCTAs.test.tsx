import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MultipleCTAs from '../MultipleCTAs';

describe('MultipleCTAs', () => {
  it('renders the availability heading', () => {
    render(<MultipleCTAs />);
    expect(screen.getByRole('heading', { name: /available september 2026/i })).toBeInTheDocument();
  });

  it('renders the primary Hire Me CTA', () => {
    render(<MultipleCTAs />);
    const hireMe = screen.getByRole('link', { name: /hire me/i });
    expect(hireMe).toBeInTheDocument();
    expect(hireMe).toHaveAttribute('href', '/hire-me');
  });

  it('renders secondary links', () => {
    render(<MultipleCTAs />);
    expect(screen.getByRole('link', { name: /book a consulting call/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /read the writing/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /consulting services/i })).toBeInTheDocument();
  });

  it('consulting call link opens in a new tab', () => {
    render(<MultipleCTAs />);
    const link = screen.getByRole('link', { name: /book a consulting call/i });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(link).toHaveAttribute('href', 'https://tidycal.com/adammatthewsteinberger');
  });

  it('internal links have correct hrefs', () => {
    render(<MultipleCTAs />);
    expect(screen.getByRole('link', { name: /read the writing/i })).toHaveAttribute(
      'href',
      '/writing'
    );
    expect(screen.getByRole('link', { name: /consulting services/i })).toHaveAttribute(
      'href',
      '/services'
    );
  });

  it('mentions the target location and role in the supporting text', () => {
    render(<MultipleCTAs />);
    expect(
      screen.getByText(/staff software architect.*greenville, sc \(remote\)/i)
    ).toBeInTheDocument();
  });
});
