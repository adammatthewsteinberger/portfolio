import { AskAdam } from '@/components/AskAdam';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chat with Adam | Ask my résumé',
  description: 'Ask questions about Adam Matthew Steinberger\'s experience, skills, and availability.',
  alternates: {
    canonical: '/chat',
  },
};

export default function ChatPage() {
  return (
    <div className="container mx-auto px-4 pt-8 pb-16 h-screen flex flex-col">
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-4">Ask my résumé</h1>
          <p className="text-xl text-[var(--color-text-muted)]">
            Ask about my experience, stack, or availability — answered only from what&apos;s on this site.
          </p>
        </div>
        <div className="flex-1 min-h-0">
          <AskAdam variant="page" />
        </div>
      </div>
    </div>
  );
}
