import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MultipleCTAs from '../MultipleCTAs';

describe('MultipleCTAs', () => {
  it('renders the section heading', () => {
    render(<MultipleCTAs />);
    expect(
      screen.getByText('Ready to Transform Your Business with AI?')
    ).toBeInTheDocument();
  });

  it('renders all primary CTA buttons', () => {
    render(<MultipleCTAs />);
    expect(
      screen.getByRole('link', { name: /schedule free consultation/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /contact for employment/i })
    ).toBeInTheDocument();
  });

  it('renders secondary CTA buttons', () => {
    render(<MultipleCTAs />);
    expect(screen.getByRole('link', { name: /try the demo/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /learn about ai/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /read the blog/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /my services/i })).toBeInTheDocument();
  });

  it('renders descriptive text for each CTA', () => {
    render(<MultipleCTAs />);
    expect(
      screen.getByText('For businesses ready to explore AI solutions')
    ).toBeInTheDocument();
    expect(
      screen.getByText('For employers looking to hire AI talent')
    ).toBeInTheDocument();
    expect(screen.getByText('Experience the technology')).toBeInTheDocument();
    expect(screen.getByText('33-article education series')).toBeInTheDocument();
    expect(screen.getByText('AI insights & case studies')).toBeInTheDocument();
    expect(screen.getByText('Browse all of my services')).toBeInTheDocument();
  });

  it('consultation link opens in new tab', () => {
    render(<MultipleCTAs />);
    const consultationLink = screen.getByRole('link', {
      name: /schedule free consultation/i,
    });
    expect(consultationLink).toHaveAttribute('target', '_blank');
    expect(consultationLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('demo link opens in new tab', () => {
    render(<MultipleCTAs />);
    const demoLink = screen.getByRole('link', { name: /try the demo/i });
    expect(demoLink).toHaveAttribute('target', '_blank');
  });

  it('internal links have correct hrefs', () => {
    render(<MultipleCTAs />);
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

  it('external links have correct URLs', () => {
    render(<MultipleCTAs />);
    expect(
      screen.getByRole('link', { name: /schedule free consultation/i })
    ).toHaveAttribute('href', 'https://tidycal.com/adammatthewsteinberger');
    expect(screen.getByRole('link', { name: /try the demo/i })).toHaveAttribute(
      'href',
      'https://chat.adam.matthewsteinberger.com'
    );
  });

  it('renders with proper section element', () => {
    render(<MultipleCTAs />);
    const section = document.querySelector('section');
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass('container');
  });
});
