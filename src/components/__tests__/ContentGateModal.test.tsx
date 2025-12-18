import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContentGateModal from '../ContentGateModal';

// Mock the custom hooks
vi.mock('@/hooks/useScrollDepth', () => ({
  useScrollDepth: vi.fn(() => false),
}));

vi.mock('@/hooks/useBotDetection', () => ({
  useBotDetection: vi.fn(() => false),
}));

import { useScrollDepth } from '@/hooks/useScrollDepth';
import { useBotDetection } from '@/hooks/useBotDetection';

const mockUseScrollDepth = vi.mocked(useScrollDepth);
const mockUseBotDetection = vi.mocked(useBotDetection);

describe('ContentGateModal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseScrollDepth.mockReturnValue(false);
    mockUseBotDetection.mockReturnValue(false);
    // Reset body style
    document.body.style.overflow = '';
  });

  describe('visibility', () => {
    it('does not render when scroll threshold not reached', () => {
      mockUseScrollDepth.mockReturnValue(false);
      mockUseBotDetection.mockReturnValue(false);

      render(<ContentGateModal />);

      expect(screen.queryByText('Want to Read More?')).not.toBeInTheDocument();
    });

    it('does not render for bots even when scrolled', () => {
      mockUseScrollDepth.mockReturnValue(true);
      mockUseBotDetection.mockReturnValue(true);

      render(<ContentGateModal />);

      expect(screen.queryByText('Want to Read More?')).not.toBeInTheDocument();
    });

    it('renders modal when scrolled and not a bot', () => {
      mockUseScrollDepth.mockReturnValue(true);
      mockUseBotDetection.mockReturnValue(false);

      render(<ContentGateModal />);

      expect(screen.getByText('Want to Read More?')).toBeInTheDocument();
    });

    it('sets body overflow to hidden when modal opens', () => {
      mockUseScrollDepth.mockReturnValue(true);
      mockUseBotDetection.mockReturnValue(false);

      render(<ContentGateModal />);

      expect(document.body.style.overflow).toBe('hidden');
    });
  });

  describe('modal content', () => {
    beforeEach(() => {
      mockUseScrollDepth.mockReturnValue(true);
      mockUseBotDetection.mockReturnValue(false);
    });

    it('displays promotional message', () => {
      render(<ContentGateModal />);

      expect(screen.getByText('Want to Read More?')).toBeInTheDocument();
      expect(
        screen.getByText(/this is a preview from my new book/i)
      ).toBeInTheDocument();
    });

    it('renders Amazon order button', () => {
      render(<ContentGateModal />);

      const amazonLink = screen.getByRole('link', { name: /order on amazon/i });
      expect(amazonLink).toBeInTheDocument();
      expect(amazonLink).toHaveAttribute('href', 'https://www.amazon.com/dp/B0G2FWTJ3Q');
      expect(amazonLink).toHaveAttribute('target', '_blank');
    });

    it('renders chat now button', () => {
      render(<ContentGateModal />);

      const chatLink = screen.getByRole('link', { name: /chat now/i });
      expect(chatLink).toBeInTheDocument();
      expect(chatLink).toHaveAttribute(
        'href',
        'https://chat.adam.matthewsteinberger.com'
      );
      expect(chatLink).toHaveAttribute('target', '_blank');
    });

    it('renders go home button', () => {
      render(<ContentGateModal />);

      const homeLink = screen.getByRole('link', { name: /go home/i });
      expect(homeLink).toBeInTheDocument();
      expect(homeLink).toHaveAttribute('href', '/');
    });

    it('renders close button', () => {
      render(<ContentGateModal />);

      expect(
        screen.getByRole('button', { name: /close modal/i })
      ).toBeInTheDocument();
    });
  });

  describe('closing modal', () => {
    beforeEach(() => {
      mockUseScrollDepth.mockReturnValue(true);
      mockUseBotDetection.mockReturnValue(false);
    });

    it('close button is clickable', async () => {
      const user = userEvent.setup();
      render(<ContentGateModal />);

      const closeButton = screen.getByRole('button', { name: /close modal/i });
      expect(closeButton).toBeInTheDocument();

      // Verify the button can be clicked without throwing
      await user.click(closeButton);
    });

    it('overlay is present for dismissing', () => {
      render(<ContentGateModal />);

      // Check for overlay with Tailwind classes (fixed inset-0)
      const overlay = document.querySelector('[class*="fixed"][class*="inset-0"]');
      expect(overlay).toBeInTheDocument();
    });
  });

  describe('link click handling', () => {
    beforeEach(() => {
      mockUseScrollDepth.mockReturnValue(true);
      mockUseBotDetection.mockReturnValue(false);
    });

    it('prevents event propagation on link clicks', async () => {
      const user = userEvent.setup();
      render(<ContentGateModal />);

      // Click links and verify modal stays open (because stopPropagation)
      const amazonLink = screen.getByRole('link', { name: /order on amazon/i });
      await user.click(amazonLink);

      // Modal should still be visible since we have preventDefault logic
      expect(screen.getByText('Want to Read More?')).toBeInTheDocument();
    });
  });
});
