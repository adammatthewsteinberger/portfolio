import type { Metadata } from 'next';
import ArticleDetail, { SITE_URL } from '@/components/ArticleDetail';
import { getCollectionEntry, getCollectionSlugs } from '@/lib/collectionUtils';
import { localeAlternates } from '@/lib/locales';
import { OG_IMAGE } from '@/lib/seo';
import {
  WRITING_ARTICLES_HE_DIR,
  WRITING_ARTICLES_HE_PATH,
  WRITING_ARTICLES_PATH,
} from '@/data/writingArticles';

interface HebrewArticlePageProps {
  params: Promise<{ slug: string }>;
}

// Prerendered: the Workers runtime has no filesystem to read these at request time.
export async function generateStaticParams() {
  return getCollectionSlugs(WRITING_ARTICLES_HE_DIR).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: HebrewArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getCollectionEntry(WRITING_ARTICLES_HE_DIR, slug);

  if (!article) {
    return {
      title: 'המאמר לא נמצא',
      description: 'לא ניתן למצוא את המאמר המבוקש.',
    };
  }

  return {
    title: article.title,
    description: article.description,
    keywords: article.tags.join(', '),
    authors: [{ name: article.author }],
    creator: 'Adam Matthew Steinberger',
    publisher: 'Adam Matthew Steinberger LLC',
    // Canonical on its own Hebrew URL, with the English twin as an alternate.
    alternates: localeAlternates(`${WRITING_ARTICLES_HE_PATH}/${slug}`, {
      en: `${WRITING_ARTICLES_PATH}/${slug}`,
      he: `${WRITING_ARTICLES_HE_PATH}/${slug}`,
    }),
    // The generated cards bundle Latin fonts only, so a Hebrew title would not
    // render on one; Hebrew pages carry the site-wide card instead.
    openGraph: {
      images: [OG_IMAGE],
      title: article.title,
      description: article.description,
      url: `${SITE_URL}${WRITING_ARTICLES_HE_PATH}/${slug}`,
      siteName: 'Adam Matthew Steinberger',
      locale: 'he_IL',
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

export default async function HebrewArticlePage({ params }: HebrewArticlePageProps) {
  const { slug } = await params;
  return <ArticleDetail slug={slug} locale="he" />;
}
