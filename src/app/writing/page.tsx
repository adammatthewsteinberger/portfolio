import Link from 'next/link';
import { Metadata } from 'next';
import { getAllBlogPosts } from '@/lib/blogUtils';

export const metadata: Metadata = {
  title: 'Writing | Adam Matthew Steinberger',
  description:
    'Blog posts on AI and automation, a free 33-article series on AI chatbots for business, and two books in development.',
  alternates: { canonical: '/writing' },
  openGraph: {
    title: 'Writing | Adam Matthew Steinberger',
    description:
      'Blog posts on AI and automation, a free 33-article series on AI chatbots for business, and two books in development.',
    url: 'https://vibe.with.adam.matthewsteinberger.com/writing',
  },
};

export default function WritingPage() {
  const postCount = getAllBlogPosts().length;

  return (
    <div>
      <section className="container mx-auto px-4 pt-8 pb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-4">
          Writing
        </h1>
        <p className="text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto">
          Where I think out loud about AI, architecture, and the business of building software.
        </p>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto grid grid-cols-1 gap-6">
          <Link
            href="/blog"
            className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] hover:border-[var(--color-accent-blue)]/50 rounded-xl p-6 no-underline transition-colors"
          >
            <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">Blog</h2>
            <p className="text-[var(--color-text-muted)]">
              {postCount} posts on AI development, chatbots, and business technology — including
              what&apos;s buzzing right now.
            </p>
          </Link>
          <Link
            href="/novice-to-navigator"
            className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] hover:border-[var(--color-accent-blue)]/50 rounded-xl p-6 no-underline transition-colors"
          >
            <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">
              Novice to Navigator
            </h2>
            <p className="text-[var(--color-text-muted)]">
              A free, 33-article series that takes you from &ldquo;what is AI, really?&rdquo; to
              confidently evaluating a custom chatbot build — no technical background required.
            </p>
          </Link>
          <Link
            href="/books"
            className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] hover:border-[var(--color-accent-blue)]/50 rounded-xl p-6 no-underline transition-colors"
          >
            <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">Books</h2>
            <p className="text-[var(--color-text-muted)]">
              Novice to Navigator and Engineering Influence — both in development. The first
              edition of Novice to Navigator is free to read right now.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
