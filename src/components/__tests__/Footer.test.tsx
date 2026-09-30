import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '../layout/Footer';

describe('Footer', () => {
  it('renders footer element', () => {
    render(<Footer />);
    expect(document.querySelector('footer')).toBeInTheDocument();
  });

  it('renders the navigation links, Join Me first', () => {
    render(<Footer />);
    const joinMe = screen.getByRole('link', { name: /join me/i });
    expect(joinMe).toHaveAttribute('href', '/join-me');
    expect(document.querySelector('footer a')).toBe(joinMe);
    expect(screen.getByRole('link', { name: /ask about adam/i })).toHaveAttribute('href', '/chat');
    expect(screen.getByRole('link', { name: /^work$/i })).toHaveAttribute('href', '/work');
    expect(screen.getByRole('link', { name: /expertise/i })).toHaveAttribute('href', '/expertise');
    expect(screen.getByRole('link', { name: /open source/i })).toHaveAttribute('href', '/open-source');
    expect(screen.getByRole('link', { name: /writing/i })).toHaveAttribute('href', '/writing');
    expect(screen.getByRole('link', { name: /site directory/i })).toHaveAttribute('href', '/site-directory');
    expect(screen.getByRole('link', { name: /^privacy$/i })).toHaveAttribute('href', '/privacy');
  });

  it('links to no hiring, résumé, executive-edition, or consulting page', () => {
    render(<Footer />);
    const hrefs = Array.from(document.querySelectorAll('footer a')).map((a) => a.getAttribute('href') ?? '');
    for (const retired of ['/hire-me', '/for-executives', '/services']) {
      expect(hrefs).not.toContain(retired);
    }
    expect(hrefs.some((href) => /tidycal|resume/i.test(href))).toBe(false);
    expect(screen.queryByRole('link', { name: /download resume|résumé/i })).not.toBeInTheDocument();
  });

  it('renders social media links with correct aria labels', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'GitHub' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument();
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
