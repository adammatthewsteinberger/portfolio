import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ChatPage, { metadata } from '../page';

vi.mock('@/components/AskAdam', () => ({
  AskAdam: ({ variant }: { variant?: string }) => <div data-testid="ask-adam" data-variant={variant} />,
}));

const CHAT_URL = 'https://chat.with.adam.matthewsteinberger.com/';

describe('ChatPage', () => {
  it('renders the heading, intro, and the page variant of AskAdam', () => {
    render(<ChatPage />);
    expect(screen.getByRole('heading', { level: 1, name: 'Ask my résumé' })).toBeInTheDocument();
    expect(screen.getByText(/capped at six questions/i)).toBeInTheDocument();
    expect(screen.getByTestId('ask-adam')).toHaveAttribute('data-variant', 'page');
  });

  it('links back to Hire Me and the contact form', () => {
    render(<ChatPage />);
    expect(screen.getByRole('link', { name: 'Hire Me' })).toHaveAttribute('href', '/hire-me');
    expect(screen.getByRole('link', { name: 'get in touch' })).toHaveAttribute('href', '/contact');
  });

  it('is canonical on the chat subdomain', () => {
    expect(metadata.title).toBe('Ask my résumé');
    expect(metadata.description).toMatch(/experience, stack, and availability/);
    expect(metadata.alternates?.canonical).toBe(CHAT_URL);
    expect(metadata.openGraph?.url).toBe(CHAT_URL);
  });
});
