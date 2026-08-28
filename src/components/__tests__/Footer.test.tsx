import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '../layout/Footer';

// Outside the App Router, usePathname() is null → engineering edition.
describe('Footer (engineering edition)', () => {
  it('renders footer element', () => {
    render(<Footer />);
    expect(document.querySelector('footer')).toBeInTheDocument();
  });

  it('renders the engineering navigation links', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /hire me/i })).toHaveAttribute('href', '/hire-me');
    expect(screen.getByRole('link', { name: /ask my résumé/i })).toHaveAttribute('href', '/chat');
    expect(screen.getByRole('link', { name: /^work$/i })).toHaveAttribute('href', '/work');
    expect(screen.getByRole('link', { name: /expertise/i })).toHaveAttribute('href', '/expertise');
    expect(screen.getByRole('link', { name: /open source/i })).toHaveAttribute('href', '/open-source');
    expect(screen.getByRole('link', { name: /join me/i })).toHaveAttribute('href', '/join-me');
    expect(screen.getByRole('link', { name: /writing/i })).toHaveAttribute('href', '/writing');
    expect(screen.getByRole('link', { name: /site directory/i })).toHaveAttribute('href', '/site-directory');
    expect(screen.getByRole('link', { name: /^privacy$/i })).toHaveAttribute('href', '/privacy');
  });

  it('links to the executive edition explicitly, last, and de-emphasized — and to nothing commercial', () => {
    render(<Footer />);
    const exec = screen.getByRole('link', { name: /for executives/i });
    expect(exec).toHaveAttribute('href', '/for-executives');
    expect(exec.className).toContain('text-[var(--color-text-muted)]');
    const links = Array.from(document.querySelectorAll('footer a'));
    expect(links.some((a) => (a.getAttribute('href') ?? '').includes('tidycal'))).toBe(false);
    expect(links.some((a) => a.getAttribute('href') === '/services')).toBe(false);
  });

  it('renders social media links with correct aria labels', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'GitHub' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Download Resume' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'RSS feed' })).toBeInTheDocument();
  });

  it('displays current year, company name, and FEIN', () => {
    render(<Footer />);
    expect(screen.getByText(new RegExp(`© Copyright ${new Date().getFullYear()}`))).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Adam Matthew Steinberger LLC' })).toBeInTheDocument();
    expect(screen.getByText('FEIN: 33-2687374')).toBeInTheDocument();
  });

  it('external links have proper target, rel, and URLs', () => {
    render(<Footer />);
    for (const name of ['LinkedIn', 'GitHub']) {
      const link = screen.getByRole('link', { name });
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute('href', 'https://www.linkedin.com/in/adammatthewsteinberger/');
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', 'https://github.com/adammatthewsteinberger');
    const newsletter = screen.getByRole('link', { name: /newsletter/i });
    expect(newsletter).toHaveAttribute('href', 'https://eepurl.com/jiYXCQ');
    expect(newsletter).toHaveAttribute('target', '_blank');
  });
});
