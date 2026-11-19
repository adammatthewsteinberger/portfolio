import Link from 'next/link';
import EntryCard from '@/components/EntryCard';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import { getAllCollectionEntries } from '@/lib/collectionUtils';
import type { Locale } from '@/lib/locales';
import {
  WRITING_ARTICLES_FEED_PATH,
  WRITING_ARTICLES_HE_FEED_PATH,
  WRITING_ARTICLES_HE_PATH,
  WRITING_ARTICLES_PATH,
  articleSection,
} from '@/data/writingArticles';

/**
 * The listing at /writing/articles and its Hebrew twin. One component, so the
 * two languages cannot drift; the /he layout supplies lang and direction.
 */
export default function ArticleList({ locale }: { locale: Locale }) {
  const section = articleSection(locale);
  const articles = getAllCollectionEntries(section.dir);
  const feedPath = locale === 'he' ? WRITING_ARTICLES_HE_FEED_PATH : WRITING_ARTICLES_FEED_PATH;

  return (
    <div>
      <section className="container mx-auto px-4 pt-8 pb-12 text-center">
        <div className="flex justify-center mb-6">
          <LocaleSwitcher
            current={locale}
            hrefs={{ en: WRITING_ARTICLES_PATH, he: WRITING_ARTICLES_HE_PATH }}
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-4">
          {section.title}
        </h1>
        <p className="text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto">{section.intro}</p>
        <p className="mt-4 text-[var(--color-text-muted)]">
          <Link href="/writing" className="text-[var(--color-accent-blue)] hover:underline">
            {section.writing}
          </Link>
          {' · '}
          <a href={feedPath} className="text-[var(--color-accent-blue)] hover:underline">
            RSS
          </a>
        </p>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto grid grid-cols-1 gap-6">
          {articles.map((article) => (
            <EntryCard
              key={article.slug}
              href={`${section.path}/${article.slug}`}
              title={article.title}
              description={article.description}
              publishedDate={article.publishedDate}
              readTime={article.readTime}
              locale={locale}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
