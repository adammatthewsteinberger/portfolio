import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AmazonBookButton from '../AmazonBookButton';

describe('AmazonBookButton', () => {
  it('renders with default props', () => {
    render(<AmazonBookButton />);
    const link = screen.getByRole('link', { name: /order on amazon/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://www.amazon.com/dp/B0G2FWTJ3Q');
  });

  it('opens in new tab with proper security attributes', () => {
    render(<AmazonBookButton />);
    const link = screen.getByRole('link', { name: /order on amazon/i });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('shows icon by default', () => {
    render(<AmazonBookButton />);
    const icon = document.querySelector('.fa-amazon');
    expect(icon).toBeInTheDocument();
  });

  it('hides icon when showIcon is false', () => {
    render(<AmazonBookButton showIcon={false} />);
    const icon = document.querySelector('.fa-amazon');
    expect(icon).not.toBeInTheDocument();
  });

  it('applies large size class by default', () => {
    render(<AmazonBookButton />);
    const link = screen.getByRole('link', { name: /order on amazon/i });
    expect(link.className).toContain('px-6');
    expect(link.className).toContain('py-3');
    expect(link.className).toContain('text-lg');
  });

  it('applies small size class when size is sm', () => {
    render(<AmazonBookButton size="sm" />);
    const link = screen.getByRole('link', { name: /order on amazon/i });
    expect(link.className).toContain('px-3');
    expect(link.className).toContain('py-1.5');
    expect(link.className).toContain('text-sm');
  });

  it('applies medium size class when size is md', () => {
    render(<AmazonBookButton size="md" />);
    const link = screen.getByRole('link', { name: /order on amazon/i });
    expect(link.className).toContain('px-4');
    expect(link.className).toContain('py-2');
    expect(link.className).toContain('text-base');
  });

  it('applies custom className', () => {
    render(<AmazonBookButton className="custom-class" />);
    const link = screen.getByRole('link', { name: /order on amazon/i });
    expect(link).toHaveClass('custom-class');
  });

  it('has required Tailwind styling classes', () => {
    render(<AmazonBookButton />);
    const link = screen.getByRole('link', { name: /order on amazon/i });
    expect(link.className).toContain('inline-flex');
    expect(link.className).toContain('font-bold');
    expect(link.className).toContain('rounded-lg');
  });
});
