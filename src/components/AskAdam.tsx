'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useBotDetection } from '@/hooks/useBotDetection';
import { track } from '@/lib/analytics';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface Citation {
  url: string;
  title: string;
}

const MAX_TURNS = 6;

const SUGGESTED_QUESTIONS = [
  'Has he shipped RAG in production?',
  'Is he open to remote work?',
  "What's onion architecture and why does he care?",
  'Why is he leaving The Vizius Group?',
];

export interface AskAdamProps {
  variant?: 'widget' | 'page';
}

export function AskAdam({ variant = 'widget' }: AskAdamProps = {}) {
  const isBot = useBotDetection();
  const [enabled, setEnabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [citations, setCitations] = useState<Citation[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/ask')
      .then((res) => (res.ok ? res.json() : { enabled: false }))
      .then((data: { enabled?: boolean }) => {
        if (!cancelled) setEnabled(Boolean(data.enabled));
      })
      .catch(() => {
        if (!cancelled) setEnabled(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, streaming]);

  if (isBot || !enabled) {
    return null;
  }

  const userTurns = messages.filter((m) => m.role === 'user').length;
  const turnLimitReached = userTurns >= MAX_TURNS;

  // Both call sites already gate on these conditions before invoking
  // sendMessage — the suggested-question buttons only render pre-first-message,
  // and the form's submit button is disabled while streaming, at the turn
  // limit, or with empty input — so no guard is needed here.
  const sendMessage = async (question: string) => {
    setErrorMessage(null);
    setCitations([]);
    const nextMessages: ChatMessage[] = [...messages, { role: 'user', content: question.trim() }];
    setMessages(nextMessages);
    setInput('');
    setStreaming(true);
    track('ask_message', { turn: userTurns + 1 });

    try {
      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages, honeypot }),
      });

      if (!response.ok || !response.body) {
        const data = await response.json().catch(() => null);
        setErrorMessage(data?.message ?? 'Something went wrong. Try again in a moment.');
        setStreaming(false);
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = '';
      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

      let buffer = '';
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        // split() on a string always returns at least one element, so pop()
        // here is never undefined.
        const events = buffer.split('\n\n');
        buffer = events.pop() as string;

        for (const event of events) {
          const line = event.trim();
          if (!line.startsWith('data: ')) continue;
          const payload = JSON.parse(line.slice('data: '.length)) as
            | { type: 'delta'; text: string }
            | { type: 'done'; citations: Citation[] }
            | { type: 'error'; message: string };

          if (payload.type === 'delta') {
            assistantText += payload.text;
            setMessages((prev) => {
              const copy = [...prev];
              copy[copy.length - 1] = { role: 'assistant', content: assistantText };
              return copy;
            });
          } else if (payload.type === 'done') {
            setCitations(payload.citations);
          } else if (payload.type === 'error') {
            setErrorMessage(payload.message);
          }
        }
      }
    } catch {
      setErrorMessage('Something went wrong. Try again in a moment.');
    } finally {
      setStreaming(false);
    }
  };

  if (variant === 'page') {
    return (
      <div className="flex flex-col h-full bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-xl shadow-2xl">
        <div className="flex items-center p-4 border-b border-[var(--color-dark-border)]">
          <h3 className="font-bold text-[var(--color-text-primary)]">Ask my résumé</h3>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px]">
          {messages.length === 0 && (
            <div>
              <p className="text-sm text-[var(--color-text-muted)] mb-3">
                Ask about Adam&apos;s experience, stack, or availability — answered only from what&apos;s actually on
                this site.
              </p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_QUESTIONS.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => sendMessage(question)}
                    className="text-xs px-3 py-1.5 rounded-full bg-[var(--color-dark-card-alt)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`text-sm rounded-lg px-3 py-2 max-w-[85%] whitespace-pre-wrap ${
                message.role === 'user'
                  ? 'ml-auto bg-[var(--color-accent-blue)] text-white'
                  : 'bg-[var(--color-dark-card-alt)] text-[var(--color-text-primary)]'
              }`}
            >
              {message.content}
            </div>
          ))}

          {streaming && messages[messages.length - 1]?.content === '' && (
            <div className="text-sm text-[var(--color-text-muted)] italic">Thinking…</div>
          )}

          {citations.length > 0 && (
            <div className="text-xs text-[var(--color-text-muted)] space-x-2">
              {citations.map((citation) => (
                <a key={citation.url} href={citation.url} className="underline hover:text-[var(--color-accent-blue)]">
                  {citation.title}
                </a>
              ))}
            </div>
          )}

          {errorMessage && <p className="text-sm text-[var(--color-accent-coral)]">{errorMessage}</p>}

          {turnLimitReached && (
            <p className="text-xs text-[var(--color-text-muted)] italic">
              That&apos;s the limit for this session — for anything more,{' '}
              <a href="/contact" className="underline">
                reach out directly
              </a>
              .
            </p>
          )}
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            sendMessage(input);
          }}
          className="p-3 border-t border-[var(--color-dark-border)] flex gap-2"
        >
          {/* Honeypot — hidden from real visitors via CSS, invisible to screen readers */}
          <input
            type="text"
            name="website"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute w-0 h-0 opacity-0 pointer-events-none"
          />
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            disabled={streaming || turnLimitReached}
            placeholder={turnLimitReached ? 'Session limit reached' : 'Ask a question…'}
            className="flex-1 px-3 py-2 text-sm rounded-lg bg-[var(--color-dark-card-alt)] text-[var(--color-text-primary)] border border-[var(--color-dark-border)] focus:outline-none focus:border-[var(--color-accent-blue)] disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={streaming || turnLimitReached || !input.trim()}
            className="px-4 py-2 text-sm font-bold rounded-lg bg-[var(--color-accent-blue)] text-white disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </form>
      </div>
    );
  }

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[var(--color-accent-blue)] text-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue)] hover:text-white font-bold rounded-lg transition-colors text-sm"
        >
          Ask my résumé
        </button>
      )}

      {open && (
        <div
          role="dialog"
          aria-label="Ask my résumé"
          className="fixed inset-x-4 bottom-4 sm:right-6 sm:left-auto sm:bottom-6 sm:w-96 z-50 bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-xl shadow-2xl flex flex-col max-h-[80vh]"
        >
          <div className="flex items-center justify-between p-4 border-b border-[var(--color-dark-border)]">
            <h3 className="font-bold text-[var(--color-text-primary)]">Ask my résumé</h3>
            <div className="flex items-center gap-3">
              <Link
                href="/chat"
                className="text-xs underline text-[var(--color-text-muted)] hover:text-[var(--color-accent-blue)]"
              >
                Open full page
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
              >
                ✕
              </button>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px]">
            {messages.length === 0 && (
              <div>
                <p className="text-sm text-[var(--color-text-muted)] mb-3">
                  Ask about Adam&apos;s experience, stack, or availability — answered only from what&apos;s
                  actually on this site.
                </p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_QUESTIONS.map((question) => (
                    <button
                      key={question}
                      type="button"
                      onClick={() => sendMessage(question)}
                      className="text-xs px-3 py-1.5 rounded-full bg-[var(--color-dark-card-alt)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={`text-sm rounded-lg px-3 py-2 max-w-[85%] whitespace-pre-wrap ${
                  message.role === 'user'
                    ? 'ml-auto bg-[var(--color-accent-blue)] text-white'
                    : 'bg-[var(--color-dark-card-alt)] text-[var(--color-text-primary)]'
                }`}
              >
                {message.content}
              </div>
            ))}

            {streaming && messages[messages.length - 1]?.content === '' && (
              <div className="text-sm text-[var(--color-text-muted)] italic">Thinking…</div>
            )}

            {citations.length > 0 && (
              <div className="text-xs text-[var(--color-text-muted)] space-x-2">
                {citations.map((citation) => (
                  <a key={citation.url} href={citation.url} className="underline hover:text-[var(--color-accent-blue)]">
                    {citation.title}
                  </a>
                ))}
              </div>
            )}

            {errorMessage && <p className="text-sm text-[var(--color-accent-coral)]">{errorMessage}</p>}

            {turnLimitReached && (
              <p className="text-xs text-[var(--color-text-muted)] italic">
                That&apos;s the limit for this session — for anything more,{' '}
                <a href="/contact" className="underline">
                  reach out directly
                </a>
                .
              </p>
            )}
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage(input);
            }}
            className="p-3 border-t border-[var(--color-dark-border)] flex gap-2"
          >
            {/* Honeypot — hidden from real visitors via CSS, invisible to screen readers */}
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(event) => setHoneypot(event.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute w-0 h-0 opacity-0 pointer-events-none"
            />
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              disabled={streaming || turnLimitReached}
              placeholder={turnLimitReached ? 'Session limit reached' : 'Ask a question…'}
              className="flex-1 px-3 py-2 text-sm rounded-lg bg-[var(--color-dark-card-alt)] text-[var(--color-text-primary)] border border-[var(--color-dark-border)] focus:outline-none focus:border-[var(--color-accent-blue)] disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={streaming || turnLimitReached || !input.trim()}
              className="px-4 py-2 text-sm font-bold rounded-lg bg-[var(--color-accent-blue)] text-white disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}
