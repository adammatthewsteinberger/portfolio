import type { Metadata } from 'next';
import Link from 'next/link';
import { AskAdam } from '@/components/AskAdam';

// Canonical home of this page. hire.adam.matthewsteinberger.com/chat 308s here and the
// chat host's "/" is rewritten to this route — see next.config.ts.
const CHAT_URL = 'https://chat.adam.matthewsteinberger.com/';

export const metadata: Metadata = {
  title: 'Ask my résumé',
  description:
    "Chat with Adam Matthew Steinberger's résumé — a small RAG assistant that answers questions about his experience, stack, and availability using only what's on his site.",
  alternates: {
    canonical: CHAT_URL,
  },
  openGraph: {
    title: 'Ask my résumé | Adam Matthew Steinberger',
    description:
      "A small RAG assistant that answers questions about Adam's experience, stack, and availability using only what's on his site.",
    url: CHAT_URL,
  },
};

export default function ChatPage() {
  return (
    <div>
      <section className="container mx-auto px-4 pt-8 pb-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-4">
          Ask my résumé
        </h1>
        <p className="text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto">
          Ask about Adam&apos;s experience, stack, or availability. Answers come only from what&apos;s
          actually on this site, and each session is capped at six questions.
        </p>
      </section>

      <section className="container mx-auto px-4 pb-12">
        <div className="max-w-3xl mx-auto">
          <AskAdam variant="page" />
          <p className="mt-6 text-sm text-center text-[var(--color-text-muted)]">
            Prefer the short version? See{' '}
            <Link href="/hire-me" className="underline hover:text-[var(--color-accent-blue)]">
              Hire Me
            </Link>{' '}
            or{' '}
            <Link href="/contact" className="underline hover:text-[var(--color-accent-blue)]">
              get in touch
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
