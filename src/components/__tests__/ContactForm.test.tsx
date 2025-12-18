import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from '../ContactForm';

// Mock the formspree react hook
vi.mock('@formspree/react', () => ({
  useForm: vi.fn(() => [
    { succeeded: false, submitting: false, errors: [] },
    vi.fn(),
  ]),
  ValidationError: ({ prefix, field }: { prefix: string; field: string; errors: unknown }) => (
    <span data-testid={`validation-error-${field}`}>{prefix} error</span>
  ),
}));

// Get the mocked module for manipulation
import { useForm } from '@formspree/react';
const mockUseForm = vi.mocked(useForm);

// Helper to create mock return value - cast to unknown first to satisfy TypeScript
const createMockState = (state: { succeeded: boolean; submitting: boolean; errors: unknown }) => {
  return [state, vi.fn()] as unknown as ReturnType<typeof useForm>;
};

describe('ContactForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset to default state
    mockUseForm.mockReturnValue(
      createMockState({ succeeded: false, submitting: false, errors: [] })
    );
  });

  describe('form rendering', () => {
    it('renders form with all fields', () => {
      render(<ContactForm />);
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    });

    it('renders submit button', () => {
      render(<ContactForm />);
      expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
    });

    it('renders form header', () => {
      render(<ContactForm />);
      expect(screen.getByText('Contact Me')).toBeInTheDocument();
    });

    it('all required fields are marked as required', () => {
      render(<ContactForm />);
      expect(screen.getByLabelText(/name/i)).toBeRequired();
      expect(screen.getByLabelText(/email address/i)).toBeRequired();
      expect(screen.getByLabelText(/subject/i)).toBeRequired();
      expect(screen.getByLabelText(/message/i)).toBeRequired();
    });

    it('email field has correct type', () => {
      render(<ContactForm />);
      expect(screen.getByLabelText(/email address/i)).toHaveAttribute('type', 'email');
    });

    it('message field is a textarea', () => {
      render(<ContactForm />);
      expect(screen.getByLabelText(/message/i).tagName).toBe('TEXTAREA');
    });
  });

  describe('form interaction', () => {
    it('allows typing in all fields', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      const nameInput = screen.getByLabelText(/name/i);
      await user.type(nameInput, 'John Doe');
      expect(nameInput).toHaveValue('John Doe');

      const emailInput = screen.getByLabelText(/email address/i);
      await user.type(emailInput, 'john@example.com');
      expect(emailInput).toHaveValue('john@example.com');

      const subjectInput = screen.getByLabelText(/subject/i);
      await user.type(subjectInput, 'AI Consultation');
      expect(subjectInput).toHaveValue('AI Consultation');

      const messageInput = screen.getByLabelText(/message/i);
      await user.type(messageInput, 'I would like to discuss AI solutions.');
      expect(messageInput).toHaveValue('I would like to discuss AI solutions.');
    });
  });

  describe('form submission states', () => {
    it('shows loading state when submitting', () => {
      mockUseForm.mockReturnValue(
        createMockState({ succeeded: false, submitting: true, errors: [] })
      );

      render(<ContactForm />);
      expect(screen.getByText('Sending...')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('shows success message when submission succeeds', () => {
      mockUseForm.mockReturnValue(
        createMockState({ succeeded: true, submitting: false, errors: [] })
      );

      render(<ContactForm />);
      expect(screen.getByText('Thank you!')).toBeInTheDocument();
      expect(
        screen.getByText(/your message has been sent successfully/i)
      ).toBeInTheDocument();
    });

    it('does not show form when submission succeeds', () => {
      mockUseForm.mockReturnValue(
        createMockState({ succeeded: true, submitting: false, errors: [] })
      );

      render(<ContactForm />);
      expect(screen.queryByRole('button', { name: /send message/i })).not.toBeInTheDocument();
    });
  });

  describe('form errors', () => {
    it('shows error alert when errors exist', () => {
      mockUseForm.mockReturnValue(
        createMockState({ succeeded: false, submitting: false, errors: { email: ['Invalid email'] } })
      );

      render(<ContactForm />);
      expect(
        screen.getByText(/please check the form and try again/i)
      ).toBeInTheDocument();
    });

    it('does not show error alert when no errors', () => {
      render(<ContactForm />);
      expect(
        screen.queryByText(/please check the form and try again/i)
      ).not.toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('form has noValidate attribute', () => {
      render(<ContactForm />);
      const form = document.querySelector('form');
      expect(form).toHaveAttribute('novalidate');
    });

    it('all inputs have autocomplete attributes', () => {
      render(<ContactForm />);
      expect(screen.getByLabelText(/name/i)).toHaveAttribute('autocomplete', 'name');
      expect(screen.getByLabelText(/email address/i)).toHaveAttribute('autocomplete', 'email');
      expect(screen.getByLabelText(/subject/i)).toHaveAttribute('autocomplete', 'off');
    });

    it('success message has alert role', () => {
      mockUseForm.mockReturnValue(
        createMockState({ succeeded: true, submitting: false, errors: [] })
      );

      render(<ContactForm />);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });
});
