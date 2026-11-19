import type { Metadata } from 'next';
import ArticleList from '@/components/ArticleList';
import { OG_IMAGE } from '@/lib/seo';
import { localeAlternates } from '@/lib/locales';
import {
  WRITING_ARTICLES_FEED_PATH,
  WRITING_ARTICLES_HE_PATH,
  WRITING_ARTICLES_PATH,
  writingArticlesSection,
} from '@/data/writingArticles';

export const metadata: Metadata = {
  title: writingArticlesSection.title,
  description: writingArticlesSection.description,
  alternates: {
    // Next does not deep-merge `alternates`, so this page names its own
    // canonical, its Hebrew twin and every feed it should advertise.
    ...localeAlternates(WRITING_ARTICLES_PATH, {
      en: WRITING_ARTICLES_PATH,
      he: WRITING_ARTICLES_HE_PATH,
    }),
    types: {
      'application/rss+xml': [
        { url: '/feed.xml', title: 'Writing' },
        { url: WRITING_ARTICLES_FEED_PATH, title: 'Articles' },
      ],
    },
  },
  openGraph: {
    images: [OG_IMAGE],
    title: `${writingArticlesSection.title} | Adam Matthew Steinberger`,
    description: writingArticlesSection.description,
    url: `https://vibewithadam.matthewsteinberger.com${WRITING_ARTICLES_PATH}`,
  },
};

export default function ArticlesPage() {
  return <ArticleList locale="en" />;
}
