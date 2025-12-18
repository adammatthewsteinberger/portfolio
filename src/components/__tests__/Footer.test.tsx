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
    expect(screen.getByRole('link', { name: /schedule a free consultation/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact for employment/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /try the chatbot demo/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /learn about ai/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /read the blog/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /get the newsletter/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /my services/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /site directory/i })).toBeInTheDocument();
  });

  it('renders social media links with correct aria labels', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'GitHub' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Twitter' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Instagram' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Facebook' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'YouTube' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Buy me a Coffee' })).toBeInTheDocument();
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
      'https://www.linkedin.com/in/realadammatthew/'
    );
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/realadammatthew'
    );
  });

  it('internal links use Next.js Link component with correct hrefs', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /contact for employment/i })).toHaveAttribute(
      'href',
      '/contact'
    );
    expect(screen.getByRole('link', { name: /learn about ai/i })).toHaveAttribute(
      'href',
      '/novice-to-navigator'
    );
    expect(screen.getByRole('link', { name: /read the blog/i })).toHaveAttribute(
      'href',
      '/blog'
    );
    expect(screen.getByRole('link', { name: /my services/i })).toHaveAttribute(
      'href',
      '/services'
    );
  });
});
