import type { Metadata } from 'next';
import Link from 'next/link';
import { AskAdam } from '@/components/AskAdam';
import { OG_IMAGE } from '@/lib/seo';

// Canonical home of this page. vibewithadam.matthewsteinberger.com/chat 308s here and the
// chat host's "/" is rewritten to this route — see next.config.ts.
const CHAT_URL = 'https://chatwithadam.matthewsteinberger.com/';

export const metadata: Metadata = {
  title: 'Ask about Adam',
  description:
    "A small RAG assistant that answers questions about Adam Matthew Steinberger's work, his open-source project vibey, and how to get involved, using only what's on his site.",
  alternates: {
    canonical: CHAT_URL,
  },
  openGraph: {
    images: [OG_IMAGE],
    title: 'Ask about Adam | Adam Matthew Steinberger',
    description:
      "A small RAG assistant that answers questions about Adam's work, vibey, and how to get involved, using only what's on his site.",
    url: CHAT_URL,
  },
};

export default function ChatPage() {
  return (
    <div>
      <section className="container mx-auto px-4 pt-8 pb-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-4">
          Ask about Adam
        </h1>
        <p className="text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto">
          Ask about Adam&apos;s work, his open-source project vibey, or how to get involved. Answers
          come only from what&apos;s actually on this site, and each session is capped at six questions.
        </p>
      </section>

      <section className="container mx-auto px-4 pb-12">
        <div className="max-w-3xl mx-auto">
          <AskAdam variant="page" />
          <p className="mt-6 text-sm text-center text-[var(--color-text-muted)]">
            Prefer the short version? See{' '}
            <Link href="/join-me" className="underline hover:text-[var(--color-accent-blue)]">
              Join Me
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
