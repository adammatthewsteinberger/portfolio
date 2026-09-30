import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ChatPage, { metadata } from '../page';

vi.mock('@/components/AskAdam', () => ({
  AskAdam: ({ variant }: { variant?: string }) => <div data-testid="ask-adam" data-variant={variant} />,
}));

const CHAT_URL = 'https://chatwithadam.matthewsteinberger.com/';

describe('ChatPage', () => {
  it('renders the heading, intro, and the page variant of AskAdam', () => {
    render(<ChatPage />);
    expect(screen.getByRole('heading', { level: 1, name: 'Ask about Adam' })).toBeInTheDocument();
    expect(screen.getByText(/capped at six questions/i)).toBeInTheDocument();
    expect(screen.getByTestId('ask-adam')).toHaveAttribute('data-variant', 'page');
  });

  it('links back to Join Me and the contact form', () => {
    render(<ChatPage />);
    expect(screen.getByRole('link', { name: 'Join Me' })).toHaveAttribute('href', '/join-me');
    expect(screen.getByRole('link', { name: 'get in touch' })).toHaveAttribute('href', '/contact');
  });

  it('is canonical on the chat subdomain', () => {
    expect(metadata.title).toBe('Ask about Adam');
    expect(metadata.description).toMatch(/his open-source project vibey, and how to get involved/);
    expect(metadata.description).not.toMatch(/résumé|availability/);
    expect(metadata.alternates?.canonical).toBe(CHAT_URL);
    expect(metadata.openGraph?.url).toBe(CHAT_URL);
  });
});
