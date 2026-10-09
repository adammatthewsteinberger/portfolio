import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LocaleSwitcher from '../LocaleSwitcher';

const BOTH = { en: '/ministry/atonement', he: '/he/ministry/atonement' };

describe('LocaleSwitcher', () => {
  it('shows the current language as plain text and links to the other', () => {
    render(<LocaleSwitcher current="en" hrefs={BOTH} />);

    expect(screen.getByRole('navigation', { name: 'Language' })).toBeInTheDocument();
    expect(screen.getByText('English')).toHaveAttribute('aria-current', 'true');
    expect(screen.queryByRole('link', { name: 'English' })).not.toBeInTheDocument();

    const hebrew = screen.getByRole('link', { name: 'עברית' });
    expect(hebrew).toHaveAttribute('href', '/he/ministry/atonement');
    expect(hebrew).toHaveAttribute('hreflang', 'he');
    expect(hebrew).toHaveAttribute('lang', 'he');
  });

  it('flips when the Hebrew page is current', () => {
    render(<LocaleSwitcher current="he" hrefs={BOTH} />);

    expect(screen.getByText('עברית')).toHaveAttribute('aria-current', 'true');
    expect(screen.getByRole('link', { name: 'English' })).toHaveAttribute(
      'href',
      '/ministry/atonement'
    );
  });

  it('renders nothing for a page that exists in only one language', () => {
    const { container } = render(<LocaleSwitcher current="en" hrefs={{ en: '/ministry/x' }} />);

    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing when no paths are given', () => {
    const { container } = render(<LocaleSwitcher current="he" hrefs={{}} />);

    expect(container).toBeEmptyDOMElement();
  });
});
