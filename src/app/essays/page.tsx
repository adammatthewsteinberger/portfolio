import Link from 'next/link';
import type { Metadata } from 'next';
import EntryCard from '@/components/EntryCard';
import { getAllCollectionEntries } from '@/lib/collectionUtils';
import { ESSAYS_DIR, ESSAYS_FEED_PATH, ESSAYS_PATH, essaysSection } from '@/data/essays';
import { OG_IMAGE } from '@/lib/seo';

export const metadata: Metadata = {
  title: essaysSection.title,
  description: essaysSection.description,
  alternates: {
    canonical: ESSAYS_PATH,
    // Next does not deep-merge `alternates`, so naming only the essays feed
    // here would drop the site-wide one the root layout declares.
    types: {
      'application/rss+xml': [
        { url: '/feed.xml', title: 'Writing' },
        { url: ESSAYS_FEED_PATH, title: 'Essays' },
      ],
    },
  },
  openGraph: {
    images: [OG_IMAGE],
    title: `${essaysSection.title} | Adam Matthew Steinberger`,
    description: essaysSection.description,
    url: `https://vibewithadam.matthewsteinberger.com${ESSAYS_PATH}`,
  },
};

export default function EssaysPage() {
  const essays = getAllCollectionEntries(ESSAYS_DIR);

  return (
    <div>
      <section className="container mx-auto px-4 pt-8 pb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-4">
          {essaysSection.title}
        </h1>
        <p className="text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto">
          {essaysSection.intro}
        </p>
        <p className="mt-4 text-[var(--color-text-muted)]">
          <Link href="/blog" className="text-[var(--color-accent-blue)] hover:underline">
            The engineering blog
          </Link>
          {' · '}
          <a href={ESSAYS_FEED_PATH} className="text-[var(--color-accent-blue)] hover:underline">
            RSS
          </a>
        </p>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto grid grid-cols-1 gap-6">
          {essays.map((essay) => (
            <EntryCard
              key={essay.slug}
              href={`${ESSAYS_PATH}/${essay.slug}`}
              title={essay.title}
              description={essay.description}
              publishedDate={essay.publishedDate}
              readTime={essay.readTime}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
