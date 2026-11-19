import type { Metadata } from 'next';
import ArticleList from '@/components/ArticleList';
import { OG_IMAGE } from '@/lib/seo';
import { localeAlternates } from '@/lib/locales';
import {
  WRITING_ARTICLES_HE_FEED_PATH,
  WRITING_ARTICLES_HE_PATH,
  WRITING_ARTICLES_PATH,
  writingArticlesHe,
} from '@/data/writingArticles';

export const metadata: Metadata = {
  title: writingArticlesHe.title,
  description: writingArticlesHe.description,
  alternates: {
    ...localeAlternates(WRITING_ARTICLES_HE_PATH, {
      en: WRITING_ARTICLES_PATH,
      he: WRITING_ARTICLES_HE_PATH,
    }),
    types: {
      'application/rss+xml': [
        { url: '/feed.xml', title: 'Writing' },
        { url: WRITING_ARTICLES_HE_FEED_PATH, title: writingArticlesHe.title },
      ],
    },
  },
  openGraph: {
    images: [OG_IMAGE],
    title: `${writingArticlesHe.title} | Adam Matthew Steinberger`,
    description: writingArticlesHe.description,
    url: `https://vibewithadam.matthewsteinberger.com${WRITING_ARTICLES_HE_PATH}`,
    locale: 'he_IL',
  },
};

export default function HebrewArticlesPage() {
  return <ArticleList locale="he" />;
}
