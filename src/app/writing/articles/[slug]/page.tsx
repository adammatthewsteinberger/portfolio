import type { Metadata } from 'next';
import ArticleDetail, { SITE_URL } from '@/components/ArticleDetail';
import { getCollectionEntry, getCollectionSlugs } from '@/lib/collectionUtils';
import { localeAlternates } from '@/lib/locales';
import {
  WRITING_ARTICLES_DIR,
  WRITING_ARTICLES_HE_PATH,
  WRITING_ARTICLES_PATH,
} from '@/data/writingArticles';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

// Prerendered: the Workers runtime has no filesystem to read these at request time.
export async function generateStaticParams() {
  return getCollectionSlugs(WRITING_ARTICLES_DIR).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getCollectionEntry(WRITING_ARTICLES_DIR, slug);

  if (!article) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.',
    };
  }

  return {
    title: article.title,
    description: article.description,
    keywords: article.tags.join(', '),
    authors: [{ name: article.author }],
    creator: 'Adam Matthew Steinberger',
    publisher: 'Adam Matthew Steinberger LLC',
    // Every article has a Hebrew twin of the same slug.
    alternates: localeAlternates(`${WRITING_ARTICLES_PATH}/${slug}`, {
      en: `${WRITING_ARTICLES_PATH}/${slug}`,
      he: `${WRITING_ARTICLES_HE_PATH}/${slug}`,
    }),
    // No `images` here: opengraph-image.tsx next to this file supplies the card.
    openGraph: {
      title: article.title,
      description: article.description,
      url: `${SITE_URL}${WRITING_ARTICLES_PATH}/${slug}`,
      siteName: 'Adam Matthew Steinberger',
      locale: 'en_US',
      type: 'article',
      publishedTime: article.publishedDate,
      authors: [article.author],
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  return <ArticleDetail slug={slug} locale="en" />;
}
