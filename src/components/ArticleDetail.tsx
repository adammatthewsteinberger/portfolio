import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/Icon';
import EntryCard from '@/components/EntryCard';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import MarkdownArticle from '@/components/MarkdownArticle';
import { getCollectionEntry, getRelatedEntries } from '@/lib/collectionUtils';
import type { Locale } from '@/lib/locales';
import {
  WRITING_ARTICLES_HE_PATH,
  WRITING_ARTICLES_PATH,
  articleSection,
} from '@/data/writingArticles';

export const SITE_URL = 'https://vibewithadam.matthewsteinberger.com';

const DATE_LOCALES: Record<Locale, string> = { en: 'en-US', he: 'he-IL' };

/**
 * One article, in either language. The /he layout supplies lang and direction,
 * so nothing here uses left/right utilities.
 */
export default function ArticleDetail({ slug, locale }: { slug: string; locale: Locale }) {
  const section = articleSection(locale);
  const article = getCollectionEntry(section.dir, slug);

  if (!article) {
    notFound();
  }

  const related = getRelatedEntries(section.dir, slug, article.tags);
  const url = `${SITE_URL}${section.path}/${slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.publishedDate,
    inLanguage: locale,
    author: { '@type': 'Person', name: article.author, url: `${SITE_URL}/story` },
    publisher: { '@type': 'Organization', name: 'Adam Matthew Steinberger LLC' },
    mainEntityOfPage: url,
    keywords: article.tags.join(', '),
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
          <div className="flex justify-center mb-6">
            <LocaleSwitcher
              current={locale}
              hrefs={{
                en: `${WRITING_ARTICLES_PATH}/${slug}`,
                he: `${WRITING_ARTICLES_HE_PATH}/${slug}`,
              }}
            />
          </div>

          <nav aria-label="Breadcrumb" className="mb-6">
            <div className="flex justify-center items-center gap-2">
              <Link
                href={section.path}
                className="no-underline text-[var(--color-accent-blue)] hover:underline"
              >
                {section.title}
              </Link>
              <span className="text-[var(--color-text-muted)]">&gt;</span>
              <span className="text-[var(--color-text-muted)]">{article.title}</span>
            </div>
          </nav>

          <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-6">
            {article.title}
          </h1>

          <p className="max-w-2xl mx-auto mb-6 text-lg text-[var(--color-text-muted)]">
            {article.description}
          </p>

          <div className="flex justify-center items-center gap-6 flex-wrap mb-6">
            <div className="flex items-center">
              <Icon name="user-circle" className="me-2 text-[var(--color-accent-blue)]" />
              <span className="text-[var(--color-text-muted)]">
                {section.by}{' '}
                <strong className="text-[var(--color-text-primary)]">{article.author}</strong>
              </span>
            </div>
            <div className="flex items-center">
              <Icon name="calendar-alt" className="me-2 text-[var(--color-accent-blue)]" />
              <time dateTime={article.publishedDate} className="text-[var(--color-text-muted)]">
                {new Date(article.publishedDate).toLocaleDateString(DATE_LOCALES[locale], {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  timeZone: 'UTC',
                })}
              </time>
            </div>
            <div className="flex items-center">
              <Icon name="clock" className="me-2 text-[var(--color-accent-blue)]" />
              <span className="text-[var(--color-text-muted)]">{article.readTime}</span>
            </div>
          </div>

          {/* Tags are English slugs, so they stay left-to-right inside the Hebrew page. */}
          <ul className="flex justify-center flex-wrap gap-2 list-none p-0" dir="ltr">
            {article.tags.map((tag) => (
              <li
                key={tag}
                className="px-3 py-1 text-sm bg-[var(--color-dark-card-alt)] text-[var(--color-text-muted)] rounded"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {article.image && (
            // Decorative: the images carry no description, so none is invented.
            <Image
              src={article.image}
              alt=""
              width={1280}
              height={853}
              priority
              className="w-full h-auto rounded-xl mb-8"
            />
          )}
          <MarkdownArticle>{article.content}</MarkdownArticle>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">
              {section.moreArticles}
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {related.map((entry) => (
                <EntryCard
                  key={entry.slug}
                  href={`${section.path}/${entry.slug}`}
                  title={entry.title}
                  description={entry.description}
                  publishedDate={entry.publishedDate}
                  readTime={entry.readTime}
                  locale={locale}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="container mx-auto px-4 py-12">
        <div className="text-center">
          <Link
            href={section.path}
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[var(--color-accent-blue)] text-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue)] hover:text-white rounded-lg transition-colors no-underline font-medium"
          >
            <Icon name="arrow-left" />
            {section.backToArticles}
          </Link>
        </div>
      </section>
    </>
  );
}
