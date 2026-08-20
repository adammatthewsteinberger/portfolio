import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ChatPage from '@/app/chat/page';

vi.mock('@/hooks/useBotDetection', () => ({
  useBotDetection: vi.fn(() => false),
}));

vi.mock('@/lib/analytics', () => ({
  track: vi.fn(),
}));

describe('ChatPage', () => {
  it('renders the chat page with heading and AskAdam component', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ enabled: true }),
    });

    render(<ChatPage />);

    expect(screen.getByRole('heading', { name: /ask my résumé/i })).toBeInTheDocument();
    expect(screen.getByText(/ask about my experience, stack, or availability/i)).toBeInTheDocument();

    // The page variant should not have an "open" button
    expect(screen.queryByRole('button', { name: /ask my résumé/i })).not.toBeInTheDocument();
  });

  it('renders the chat interface in page mode', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ enabled: true }),
    });

    render(<ChatPage />);

    // Should have the input field visible immediately
    const input = await screen.findByPlaceholderText(/ask a question/i);
    expect(input).toBeInTheDocument();
  });
});
