import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Books | Adam Matthew Steinberger',
  description:
    'Novice to Navigator (second edition in development) and Engineering Influence — both currently in development. Get notified when either ships.',
  openGraph: {
    title: 'Books | Adam Matthew Steinberger',
    description: 'Novice to Navigator and Engineering Influence — both currently in development.',
    url: 'https://hire.adam.matthewsteinberger.com/books',
  },
};

export default function BooksPage() {
  return (
    <div>
      <section className="container mx-auto px-4 pt-8 pb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-4">
          Books
        </h1>
        <p className="text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto">
          Two books. Neither is for sale yet — both are actively in development.
        </p>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="bg-[var(--color-dark-card)] border border-[var(--color-accent-gold)]/30 rounded-xl p-8">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <Image
                src="/images/book-cover.jpg"
                alt="Novice to Navigator book cover"
                width={140}
                height={200}
                className="rounded-lg shadow-lg shrink-0"
              />
              <div>
                <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
                  Novice to Navigator
                </h2>
                <p className="text-[var(--color-text-muted)] mb-4">
                  Your guide to AI chatbots for business. The first edition&apos;s 33 chapters
                  are free to read right now as web articles. A second edition — with real
                  case studies, named research, and a sharper argument — is currently in
                  development and is not yet for sale.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/novice-to-navigator"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[var(--color-accent-gold)] to-amber-500 hover:from-amber-500 hover:to-[var(--color-accent-gold)] font-bold rounded-lg transition-all no-underline text-sm"
                    style={{ color: '#000000' }}
                  >
                    Read the First Edition Free
                  </Link>
                  <a
                    href="http://eepurl.com/jiYXCQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-[var(--color-accent-gold)] text-[var(--color-accent-gold)] hover:bg-[var(--color-accent-gold)] hover:text-black font-bold rounded-lg transition-colors no-underline text-sm"
                  >
                    Get Notified — Second Edition
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-xl p-8">
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
              Engineering Influence
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] mb-4 italic">
              A Playbook for the Remnant to Bring Christian Culture Back to America
            </p>
            <p className="text-[var(--color-text-muted)] mb-4">
              A 246-page, 200-plus-source field manual on how influence, attention, and culture
              actually work — social engineering frameworks, virality mechanics, narrative
              apologetics, organizational psychology, and a chapter on autistic cognition and
              faithful presence that&apos;s the most personal thing I&apos;ve written. It&apos;s
              explicitly a Christian book, written from a Messianic Jewish perspective, and it
              names that plainly rather than hiding it. Currently in development.
            </p>
            <a
              href="http://eepurl.com/jiYXCQ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-[var(--color-accent-blue)] text-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue)] hover:text-white font-bold rounded-lg transition-colors no-underline text-sm"
            >
              Get Notified
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
