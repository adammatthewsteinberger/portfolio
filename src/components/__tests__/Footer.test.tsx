import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '../layout/Footer';

describe('Footer', () => {
  it('renders footer element', () => {
    render(<Footer />);
    const footer = document.querySelector('footer');
    expect(footer).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /hire me/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /ask my résumé/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^work$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /expertise/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /writing/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /consulting call/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /newsletter/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /consulting services/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /site directory/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^privacy$/i })).toBeInTheDocument();
  });

  it('renders social media links with correct aria labels', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'GitHub' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Download Resume' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'RSS feed' })).toBeInTheDocument();
  });

  it('displays current year in copyright', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`© Copyright ${currentYear}`))).toBeInTheDocument();
  });

  it('displays company name', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'Adam Matthew Steinberger LLC' })).toBeInTheDocument();
  });

  it('displays FEIN number', () => {
    render(<Footer />);
    expect(screen.getByText('FEIN: 33-2687374')).toBeInTheDocument();
  });

  it('social media links have proper target and rel attributes', () => {
    render(<Footer />);
    const linkedInLink = screen.getByRole('link', { name: 'LinkedIn' });
    expect(linkedInLink).toHaveAttribute('target', '_blank');
    expect(linkedInLink).toHaveAttribute('rel', 'noopener noreferrer');

    const githubLink = screen.getByRole('link', { name: 'GitHub' });
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('external links point to correct URLs', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/adammatthewsteinberger/'
    );
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/adammatthewsteinberger'
    );
  });

  it('internal links use Next.js Link component with correct hrefs', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /hire me/i })).toHaveAttribute('href', '/hire-me');
    expect(screen.getByRole('link', { name: /ask my résumé/i })).toHaveAttribute('href', '/chat');
    expect(screen.getByRole('link', { name: /^work$/i })).toHaveAttribute('href', '/work');
    expect(screen.getByRole('link', { name: /expertise/i })).toHaveAttribute('href', '/expertise');
    expect(screen.getByRole('link', { name: /writing/i })).toHaveAttribute('href', '/writing');
    expect(screen.getByRole('link', { name: /consulting services/i })).toHaveAttribute(
      'href',
      '/services'
    );
    expect(screen.getByRole('link', { name: /site directory/i })).toHaveAttribute(
      'href',
      '/site-directory'
    );
    expect(screen.getByRole('link', { name: /^privacy$/i })).toHaveAttribute('href', '/privacy');
  });

  it('newsletter and consulting-call links open externally', () => {
    render(<Footer />);
    const newsletter = screen.getByRole('link', { name: /newsletter/i });
    expect(newsletter).toHaveAttribute('href', 'https://eepurl.com/jiYXCQ');
    expect(newsletter).toHaveAttribute('target', '_blank');

    const call = screen.getByRole('link', { name: /consulting call/i });
    expect(call).toHaveAttribute('href', 'https://tidycal.com/adammatthewsteinberger');
    expect(call).toHaveAttribute('target', '_blank');
  });
});
