import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import EntryCard from '@/components/EntryCard';
import MarkdownArticle from '@/components/MarkdownArticle';
import {
  getCollectionEntry,
  getCollectionSlugs,
  getRelatedEntries,
} from '@/lib/collectionUtils';
import { ESSAYS_DIR, ESSAYS_PATH } from '@/data/essays';

const SITE_URL = 'https://vibewithadam.matthewsteinberger.com';

interface EssayPageProps {
  params: Promise<{ slug: string }>;
}

// Prerendered: the Workers runtime has no filesystem to read these at request time.
export async function generateStaticParams() {
  return getCollectionSlugs(ESSAYS_DIR).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: EssayPageProps): Promise<Metadata> {
  const { slug } = await params;
  const essay = getCollectionEntry(ESSAYS_DIR, slug);

  if (!essay) {
    return {
      title: 'Essay Not Found',
      description: 'The requested essay could not be found.',
    };
  }

  return {
    title: essay.title,
    description: essay.description,
    keywords: essay.tags.join(', '),
    authors: [{ name: essay.author }],
    creator: 'Adam Matthew Steinberger',
    publisher: 'Adam Matthew Steinberger LLC',
    alternates: { canonical: `${ESSAYS_PATH}/${slug}` },
    // No `images` here: opengraph-image.tsx next to this file supplies the card.
    openGraph: {
      title: essay.title,
      description: essay.description,
      url: `${SITE_URL}${ESSAYS_PATH}/${slug}`,
      siteName: 'Adam Matthew Steinberger',
      locale: 'en_US',
      type: 'article',
      publishedTime: essay.publishedDate,
      authors: [essay.author],
      tags: essay.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: essay.title,
      description: essay.description,
    },
  };
}

export default async function EssayPage({ params }: EssayPageProps) {
  const { slug } = await params;
  const essay = getCollectionEntry(ESSAYS_DIR, slug);

  if (!essay) {
    notFound();
  }

  const related = getRelatedEntries(ESSAYS_DIR, slug, essay.tags);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: essay.title,
    description: essay.description,
    datePublished: essay.publishedDate,
    inLanguage: 'en',
    author: { '@type': 'Person', name: essay.author, url: `${SITE_URL}/story` },
    publisher: { '@type': 'Organization', name: 'Adam Matthew Steinberger LLC' },
    mainEntityOfPage: `${SITE_URL}${ESSAYS_PATH}/${slug}`,
    keywords: essay.tags.join(', '),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // "<" is escaped so a title can never close the script element.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />

      <section className="container mx-auto px-4 text-center pt-8 pb-12">
        <div className="max-w-4xl mx-auto">
          <nav aria-label="Breadcrumb" className="mb-6">
            <div className="flex justify-center items-center gap-2">
              <Link href={ESSAYS_PATH} className="no-underline text-[var(--color-accent-blue)] hover:underline">
                Essays
              </Link>
              <span className="text-[var(--color-text-muted)]">&gt;</span>
              <span className="text-[var(--color-text-muted)]">{essay.title}</span>
            </div>
          </nav>

          <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-6">
            {essay.title}
          </h1>

          {essay.description && (
            <p className="max-w-2xl mx-auto mb-6 text-lg text-[var(--color-text-muted)]">
              {essay.description}
            </p>
          )}

          <div className="flex justify-center items-center gap-6 flex-wrap mb-6">
            <div className="flex items-center">
              <Icon name="user-circle" className="me-2 text-[var(--color-accent-blue)]" />
              <span className="text-[var(--color-text-muted)]">
                By <strong className="text-[var(--color-text-primary)]">{essay.author}</strong>
              </span>
            </div>
            <div className="flex items-center">
              <Icon name="calendar-alt" className="me-2 text-[var(--color-accent-blue)]" />
              <time dateTime={essay.publishedDate} className="text-[var(--color-text-muted)]">
                {new Date(essay.publishedDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  timeZone: 'UTC',
                })}
              </time>
            </div>
            <div className="flex items-center">
              <Icon name="clock" className="me-2 text-[var(--color-accent-blue)]" />
              <span className="text-[var(--color-text-muted)]">{essay.readTime}</span>
            </div>
          </div>

          {essay.tags.length > 0 && (
            <ul className="flex justify-center flex-wrap gap-2 list-none p-0">
              {essay.tags.map((tag) => (
                <li
                  key={tag}
                  className="px-3 py-1 text-sm bg-[var(--color-dark-card-alt)] text-[var(--color-text-muted)] rounded"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {essay.image && (
            // Decorative: the images carry no description, so none is invented.
            <Image
              src={essay.image}
              alt=""
              width={1280}
              height={853}
              priority
              className="w-full h-auto rounded-xl mb-8"
            />
          )}
          <MarkdownArticle>{essay.content}</MarkdownArticle>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">More essays</h2>
            <div className="grid grid-cols-1 gap-6">
              {related.map((entry) => (
                <EntryCard
                  key={entry.slug}
                  href={`${ESSAYS_PATH}/${entry.slug}`}
                  title={entry.title}
                  description={entry.description}
                  publishedDate={entry.publishedDate}
                  readTime={entry.readTime}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="container mx-auto px-4 py-12">
        <div className="text-center">
          <Link
            href={ESSAYS_PATH}
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[var(--color-accent-blue)] text-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue)] hover:text-white rounded-lg transition-colors no-underline font-medium"
          >
            <Icon name="arrow-left" />
            Back to Essays
          </Link>
        </div>
      </section>
    </>
  );
}
