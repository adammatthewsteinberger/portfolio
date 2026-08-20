import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AskAdam } from '../AskAdam';

vi.mock('@/hooks/useBotDetection', () => ({
  useBotDetection: vi.fn(() => false),
}));

vi.mock('@/lib/analytics', () => ({
  track: vi.fn(),
}));

import { useBotDetection } from '@/hooks/useBotDetection';
import { track } from '@/lib/analytics';

const mockUseBotDetection = vi.mocked(useBotDetection);
const mockTrack = vi.mocked(track);

function sseChunk(payload: object): Uint8Array {
  return new TextEncoder().encode(`data: ${JSON.stringify(payload)}\n\n`);
}

function mockStreamingResponse(events: object[]): Response {
  let index = 0;
  const reader = {
    read: vi.fn(async () => {
      if (index >= events.length) {
        return { done: true, value: undefined };
      }
      const value = sseChunk(events[index]);
      index += 1;
      return { done: false, value };
    }),
  };
  return {
    ok: true,
    body: { getReader: () => reader },
    json: async () => ({}),
  } as unknown as Response;
}

function mockEnabledStatusResponse(): Response {
  return {
    ok: true,
    json: async () => ({ enabled: true }),
  } as unknown as Response;
}

function mockRawStreamingResponse(chunks: Uint8Array[]): Response {
  let index = 0;
  const reader = {
    read: vi.fn(async () => {
      if (index >= chunks.length) {
        return { done: true, value: undefined };
      }
      const value = chunks[index];
      index += 1;
      return { done: false, value };
    }),
  };
  return {
    ok: true,
    body: { getReader: () => reader },
    json: async () => ({}),
  } as unknown as Response;
}

/**
 * A streaming response whose first reader.read() call never resolves until
 * the test calls resolve(); every subsequent call ends the stream.
 */
function mockPendingStreamingResponse(): { response: Response; resolve: (event: object) => void } {
  let resolveRead: ((result: { done: boolean; value?: Uint8Array }) => void) | null = null;
  let callCount = 0;
  const reader = {
    read: vi.fn(() => {
      callCount += 1;
      if (callCount === 1) {
        return new Promise<{ done: boolean; value?: Uint8Array }>((resolvePromise) => {
          resolveRead = resolvePromise;
        });
      }
      return Promise.resolve({ done: true, value: undefined });
    }),
  };
  return {
    response: {
      ok: true,
      body: { getReader: () => reader },
      json: async () => ({}),
    } as unknown as Response,
    resolve: (event: object) => {
      resolveRead?.({ done: false, value: sseChunk(event) });
    },
  };
}

describe('AskAdam', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseBotDetection.mockReturnValue(false);
  });

  it('renders nothing for bot traffic', async () => {
    mockUseBotDetection.mockReturnValue(true);
    global.fetch = vi.fn().mockResolvedValue(mockEnabledStatusResponse());
    const { container } = render(<AskAdam />);
    await waitFor(() => {
      expect(container).toBeEmptyDOMElement();
    });
  });

  it('renders nothing when the bot is disabled server-side', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ enabled: false }) });
    const { container } = render(<AskAdam />);
    await waitFor(() => expect(container).toBeEmptyDOMElement());
  });

  it('renders nothing when the status check fails', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('network down'));
    const { container } = render(<AskAdam />);
    await waitFor(() => expect(container).toBeEmptyDOMElement());
  });

  it('renders nothing when the status check resolves not-ok', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false, json: async () => ({}) });
    const { container } = render(<AskAdam />);
    await waitFor(() => expect(container).toBeEmptyDOMElement());
  });

  it('shows the button once enabled, and opens the panel with suggested questions', async () => {
    global.fetch = vi.fn().mockResolvedValue(mockEnabledStatusResponse());
    const user = userEvent.setup();
    render(<AskAdam />);

    const button = await screen.findByRole('button', { name: /ask my résumé/i });
    await user.click(button);

    expect(screen.getByRole('dialog', { name: /ask my résumé/i })).toBeInTheDocument();
    expect(screen.getByText(/has he shipped rag in production/i)).toBeInTheDocument();
  });

  it('closes the panel via the close button', async () => {
    global.fetch = vi.fn().mockResolvedValue(mockEnabledStatusResponse());
    const user = userEvent.setup();
    render(<AskAdam />);

    await user.click(await screen.findByRole('button', { name: /ask my résumé/i }));
    await user.click(screen.getByRole('button', { name: /close/i }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('sends a suggested question and streams the assistant reply', async () => {
    const fetchMock = vi.fn();
    fetchMock.mockResolvedValueOnce(mockEnabledStatusResponse());
    fetchMock.mockResolvedValueOnce(
      mockStreamingResponse([
        { type: 'delta', text: 'Yes, ' },
        { type: 'delta', text: 'in production.' },
        { type: 'done', citations: [{ url: '/work/self-hosted-rag-chatbot', title: 'Self-Hosted RAG' }] },
      ]),
    );
    global.fetch = fetchMock;
    const user = userEvent.setup();
    render(<AskAdam />);

    await user.click(await screen.findByRole('button', { name: /ask my résumé/i }));
    await user.click(screen.getByText(/has he shipped rag in production/i));

    await waitFor(() => {
      expect(screen.getByText('Yes, in production.')).toBeInTheDocument();
    });
    expect(screen.getByText('Self-Hosted RAG')).toBeInTheDocument();
    expect(mockTrack).toHaveBeenCalledWith('ask_message', { turn: 1, surface: 'widget' });

    const postCall = fetchMock.mock.calls.find(([, init]) => init?.method === 'POST');
    expect(postCall?.[0]).toBe('/api/ask');
    const body = JSON.parse(postCall![1].body as string);
    expect(body.messages).toEqual([{ role: 'user', content: 'Has he shipped RAG in production?' }]);
  });

  it('sends a typed question via the form', async () => {
    const fetchMock = vi.fn();
    fetchMock.mockResolvedValueOnce(mockEnabledStatusResponse());
    fetchMock.mockResolvedValueOnce(mockStreamingResponse([{ type: 'delta', text: 'Sure.' }, { type: 'done', citations: [] }]));
    global.fetch = fetchMock;
    const user = userEvent.setup();
    render(<AskAdam />);

    await user.click(await screen.findByRole('button', { name: /ask my résumé/i }));
    const input = screen.getByPlaceholderText(/ask a question/i);
    await user.type(input, 'Is he remote-friendly?');
    await user.click(screen.getByRole('button', { name: /^send$/i }));

    await waitFor(() => expect(screen.getByText('Sure.')).toBeInTheDocument());
  });

  it('does not send an empty or whitespace-only question', async () => {
    const fetchMock = vi.fn().mockResolvedValue(mockEnabledStatusResponse());
    global.fetch = fetchMock;
    const user = userEvent.setup();
    render(<AskAdam />);

    await user.click(await screen.findByRole('button', { name: /ask my résumé/i }));
    const input = screen.getByPlaceholderText(/ask a question/i);
    await user.type(input, '   ');
    const sendButton = screen.getByRole('button', { name: /^send$/i });
    expect(sendButton).toBeDisabled();

    expect(fetchMock).toHaveBeenCalledTimes(1); // only the initial status check
  });

  it('shows a server-provided error message on a non-ok response', async () => {
    const fetchMock = vi.fn();
    fetchMock.mockResolvedValueOnce(mockEnabledStatusResponse());
    fetchMock.mockResolvedValueOnce({
      ok: false,
      body: null,
      json: async () => ({ message: 'Too many questions — take a short break and try again.' }),
    });
    global.fetch = fetchMock;
    const user = userEvent.setup();
    render(<AskAdam />);

    await user.click(await screen.findByRole('button', { name: /ask my résumé/i }));
    await user.click(screen.getByText(/is he open to remote work/i));

    await waitFor(() => {
      expect(screen.getByText(/too many questions/i)).toBeInTheDocument();
    });
  });

  it('falls back to a generic error message when the error response has no body', async () => {
    const fetchMock = vi.fn();
    fetchMock.mockResolvedValueOnce(mockEnabledStatusResponse());
    fetchMock.mockResolvedValueOnce({
      ok: false,
      body: null,
      json: async () => {
        throw new Error('not json');
      },
    });
    global.fetch = fetchMock;
    const user = userEvent.setup();
    render(<AskAdam />);

    await user.click(await screen.findByRole('button', { name: /ask my résumé/i }));
    await user.click(screen.getByText(/is he open to remote work/i));

    await waitFor(() => {
      expect(screen.getByText(/something went wrong\. try again in a moment\./i)).toBeInTheDocument();
    });
  });

  it('shows an in-stream error event from the server', async () => {
    const fetchMock = vi.fn();
    fetchMock.mockResolvedValueOnce(mockEnabledStatusResponse());
    fetchMock.mockResolvedValueOnce(
      mockStreamingResponse([{ type: 'error', message: 'Something went wrong answering that — try again in a moment.' }]),
    );
    global.fetch = fetchMock;
    const user = userEvent.setup();
    render(<AskAdam />);

    await user.click(await screen.findByRole('button', { name: /ask my résumé/i }));
    await user.click(screen.getByText(/is he open to remote work/i));

    await waitFor(() => {
      expect(screen.getByText(/something went wrong answering that/i)).toBeInTheDocument();
    });
  });

  it('shows a generic error when the fetch itself throws', async () => {
    const fetchMock = vi.fn();
    fetchMock.mockResolvedValueOnce(mockEnabledStatusResponse());
    fetchMock.mockRejectedValueOnce(new Error('network down'));
    global.fetch = fetchMock;
    const user = userEvent.setup();
    render(<AskAdam />);

    await user.click(await screen.findByRole('button', { name: /ask my résumé/i }));
    await user.click(screen.getByText(/is he open to remote work/i));

    await waitFor(() => {
      expect(screen.getByText(/something went wrong\. try again in a moment\./i)).toBeInTheDocument();
    });
  });

  it('disables the input and shows a session-limit notice after six turns', async () => {
    const fetchMock = vi.fn();
    fetchMock.mockResolvedValueOnce(mockEnabledStatusResponse());
    for (let i = 0; i < 6; i++) {
      fetchMock.mockResolvedValueOnce(
        mockStreamingResponse([{ type: 'delta', text: `Answer ${i}` }, { type: 'done', citations: [] }]),
      );
    }
    global.fetch = fetchMock;
    const user = userEvent.setup();
    render(<AskAdam />);

    await user.click(await screen.findByRole('button', { name: /ask my résumé/i }));
    const input = screen.getByPlaceholderText(/ask a question/i);

    for (let i = 0; i < 6; i++) {
      await user.clear(input);
      await user.type(input, `Question ${i}`);
      await user.click(screen.getByRole('button', { name: /^send$/i }));
      await waitFor(() => expect(screen.getByText(`Answer ${i}`)).toBeInTheDocument());
    }

    expect(screen.getByPlaceholderText(/session limit reached/i)).toBeDisabled();
    expect(screen.getByText(/that's the limit for this session/i)).toBeInTheDocument();
  });

  it('lets a real visitor fill the honeypot field without visible effect', async () => {
    const fetchMock = vi.fn().mockResolvedValue(mockEnabledStatusResponse());
    global.fetch = fetchMock;
    const user = userEvent.setup();
    render(<AskAdam />);

    await user.click(await screen.findByRole('button', { name: /ask my résumé/i }));
    const honeypot = document.querySelector('input[name="website"]') as HTMLInputElement;
    expect(honeypot).toHaveAttribute('aria-hidden', 'true');

    await user.type(honeypot, 'http://spam.example');
    expect(honeypot.value).toBe('http://spam.example');
  });

  it('skips a blank line in the SSE stream instead of treating it as an event', async () => {
    const fetchMock = vi.fn();
    fetchMock.mockResolvedValueOnce(mockEnabledStatusResponse());
    // A leading blank line before the first well-formed event, as a proxy or
    // keep-alive heartbeat might send.
    fetchMock.mockResolvedValueOnce(
      mockRawStreamingResponse([
        new TextEncoder().encode('\n\n'),
        sseChunk({ type: 'delta', text: 'Still here.' }),
        sseChunk({ type: 'done', citations: [] }),
      ]),
    );
    global.fetch = fetchMock;
    const user = userEvent.setup();
    render(<AskAdam />);

    await user.click(await screen.findByRole('button', { name: /ask my résumé/i }));
    await user.click(screen.getByText(/is he open to remote work/i));

    await waitFor(() => expect(screen.getByText('Still here.')).toBeInTheDocument());
  });

  it('shows a "Thinking…" indicator while streaming has started but no text has arrived yet', async () => {
    const fetchMock = vi.fn();
    fetchMock.mockResolvedValueOnce(mockEnabledStatusResponse());
    const { response, resolve } = mockPendingStreamingResponse();
    fetchMock.mockResolvedValueOnce(response);
    global.fetch = fetchMock;
    const user = userEvent.setup();
    render(<AskAdam />);

    await user.click(await screen.findByRole('button', { name: /ask my résumé/i }));
    await user.click(screen.getByText(/is he open to remote work/i));

    await waitFor(() => expect(screen.getByText('Thinking…')).toBeInTheDocument());

    resolve({ type: 'done', citations: [] });
    await waitFor(() => expect(screen.queryByText('Thinking…')).not.toBeInTheDocument());
  });

  it('silently ignores an SSE event of an unrecognized type', async () => {
    const fetchMock = vi.fn();
    fetchMock.mockResolvedValueOnce(mockEnabledStatusResponse());
    fetchMock.mockResolvedValueOnce(
      mockRawStreamingResponse([
        sseChunk({ type: 'unknown' }),
        sseChunk({ type: 'delta', text: 'Still works.' }),
        sseChunk({ type: 'done', citations: [] }),
      ]),
    );
    global.fetch = fetchMock;
    const user = userEvent.setup();
    render(<AskAdam />);

    await user.click(await screen.findByRole('button', { name: /ask my résumé/i }));
    await user.click(screen.getByText(/is he open to remote work/i));

    await waitFor(() => expect(screen.getByText('Still works.')).toBeInTheDocument());
    expect(screen.queryByText(/something went wrong/i)).not.toBeInTheDocument();
  });

  it('does not update state after unmounting while the status check is still pending (success)', async () => {
    const captured: { resolve?: (response: Response) => void } = {};
    const fetchMock = vi.fn().mockReturnValue(
      new Promise<Response>((resolvePromise) => {
        captured.resolve = resolvePromise;
      }),
    );
    global.fetch = fetchMock;

    const { unmount } = render(<AskAdam />);
    unmount();

    await expect(
      (async () => {
        captured.resolve?.(mockEnabledStatusResponse());
        await Promise.resolve();
        await Promise.resolve();
      })(),
    ).resolves.not.toThrow();
  });

  it('does not update state after unmounting while the status check is still pending (rejection)', async () => {
    const captured: { reject?: (error: Error) => void } = {};
    const fetchMock = vi.fn().mockReturnValue(
      new Promise<Response>((_resolve, reject) => {
        captured.reject = reject;
      }),
    );
    global.fetch = fetchMock;

    const { unmount } = render(<AskAdam />);
    unmount();

    await expect(
      (async () => {
        captured.reject?.(new Error('network down'));
        await Promise.resolve();
        await Promise.resolve();
      })(),
    ).resolves.not.toThrow();
  });

  it('renders an "Open full page" link to /chat in the widget dialog header', async () => {
    global.fetch = vi.fn().mockResolvedValue(mockEnabledStatusResponse());
    const user = userEvent.setup();
    render(<AskAdam variant="widget" />);

    const button = await screen.findByRole('button', { name: /ask my résumé/i });
    await user.click(button);

    const link = screen.getByRole('link', { name: /open full page/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/chat');
  });

  describe('variant="page"', () => {
    it('renders in page mode without open/close button', async () => {
      global.fetch = vi.fn().mockResolvedValue(mockEnabledStatusResponse());
      render(<AskAdam variant="page" />);

      expect(screen.queryByRole('button', { name: /ask my résumé/i })).not.toBeInTheDocument();
      await waitFor(() => {
        expect(screen.getByText(/ask about adam's experience/i)).toBeInTheDocument();
      });
    });

    it('sends a question in page mode', async () => {
      const fetchMock = vi.fn();
      fetchMock.mockResolvedValueOnce(mockEnabledStatusResponse());
      fetchMock.mockResolvedValueOnce(
        mockStreamingResponse([{ type: 'delta', text: 'Answer.' }, { type: 'done', citations: [] }]),
      );
      global.fetch = fetchMock;
      const user = userEvent.setup();
      render(<AskAdam variant="page" />);

      const input = await screen.findByPlaceholderText(/ask a question/i);
      await user.type(input, 'Test question');
      await user.click(screen.getByRole('button', { name: /^send$/i }));

      await waitFor(() => expect(screen.getByText('Answer.')).toBeInTheDocument());
    });
  });

  describe('page variant frame and resting notice', () => {
    it('is a labelled region with no close button and taller scroll area', async () => {
      global.fetch = vi.fn().mockResolvedValue(mockEnabledStatusResponse());
      render(<AskAdam variant="page" />);

      const region = await screen.findByRole('region', { name: 'Ask my résumé' });
      expect(region).toBeInTheDocument();
      expect(region.className).toContain('min-h-[60vh]');
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument();
      expect(screen.queryByRole('link', { name: /open full page/i })).not.toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2, name: 'Ask my résumé' })).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/ask a question/i).parentElement?.previousElementSibling?.className).toContain(
        'min-h-[320px]',
      );
    });

    it('shows the resting notice when the bot is disabled', async () => {
      global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ enabled: false }) } as unknown as Response);
      render(<AskAdam variant="page" />);

      const region = await screen.findByRole('region', { name: 'Ask my résumé' });
      expect(region).toHaveTextContent(/resting right now/i);
      expect(screen.getByRole('link', { name: 'Hire Me' })).toHaveAttribute('href', '/hire-me');
      expect(screen.getByRole('link', { name: 'get in touch' })).toHaveAttribute('href', '/contact');
      expect(screen.queryByPlaceholderText(/ask a question/i)).not.toBeInTheDocument();
    });

    it('shows the resting notice when the status check fails', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('network down'));
      render(<AskAdam variant="page" />);

      expect(await screen.findByText(/resting right now/i)).toBeInTheDocument();
    });

    it('shows the resting notice for detected bots instead of the chat', async () => {
      mockUseBotDetection.mockReturnValue(true);
      global.fetch = vi.fn().mockResolvedValue(mockEnabledStatusResponse());
      render(<AskAdam variant="page" />);

      expect(await screen.findByText(/resting right now/i)).toBeInTheDocument();
      expect(screen.queryByPlaceholderText(/ask a question/i)).not.toBeInTheDocument();
    });

    it('says it is checking availability until the status check resolves', () => {
      global.fetch = vi.fn(() => new Promise<Response>(() => {}));
      render(<AskAdam variant="page" />);

      expect(screen.getByRole('region', { name: 'Ask my résumé' })).toHaveTextContent(/checking availability/i);
      expect(screen.queryByText(/resting right now/i)).not.toBeInTheDocument();
    });

    it('reports the surface in the analytics event', async () => {
      const fetchMock = vi.fn();
      fetchMock.mockResolvedValueOnce(mockEnabledStatusResponse());
      fetchMock.mockResolvedValueOnce(
        mockStreamingResponse([{ type: 'delta', text: 'Yes.' }, { type: 'done', citations: [] }]),
      );
      global.fetch = fetchMock;
      const user = userEvent.setup();
      render(<AskAdam variant="page" />);

      await user.click(await screen.findByRole('button', { name: /shipped RAG in production/i }));

      await waitFor(() => expect(mockTrack).toHaveBeenCalledWith('ask_message', { turn: 1, surface: 'page' }));
    });

    it('opens the full page in a new tab from the widget header', async () => {
      global.fetch = vi.fn().mockResolvedValue(mockEnabledStatusResponse());
      const user = userEvent.setup();
      render(<AskAdam />);

      await user.click(await screen.findByRole('button', { name: /ask my résumé/i }));

      const link = screen.getByRole('link', { name: /open full page/i });
      expect(link).toHaveAttribute('href', '/chat');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });
});
