import { articles } from '@/data/articles';
import { ESSAYS_DIR, ESSAYS_PATH } from '@/data/essays';
import { WRITING_ARTICLES_DIR, WRITING_ARTICLES_PATH } from '@/data/writingArticles';
import { getAllBlogPosts } from '@/lib/blogUtils';
import { getAllCollectionEntries } from '@/lib/collectionUtils';
import { getArticleBySlug } from '@/lib/markdownUtils';
import type { FeedItem } from '@/lib/rss';

const DOMAIN = 'https://vibewithadam.matthewsteinberger.com';
const AUTHOR = 'Adam Matthew Steinberger';

/**
 * Everything in the writing section, newest first: the blog, the essays, the
 * Articles, and the Novice to Navigator series. One feed, so a reader who
 * subscribes to /feed.xml misses nothing. Uncapped: the items are only a title
 * and a description. Hebrew twins stay in their own feed, since mixing
 * languages in one feed breaks most readers' language handling.
 */
export function getWritingFeedItems(): FeedItem[] {
  const blog: FeedItem[] = getAllBlogPosts().map((post) => ({
    title: post.title,
    link: `${DOMAIN}/blog/${post.slug}`,
    description: post.description,
    pubDate: new Date(post.publishedDate),
    author: post.author,
    categories: [post.category],
  }));

  const collection = (dir: string, basePath: string): FeedItem[] =>
    getAllCollectionEntries(dir).map((entry) => ({
      title: entry.title,
      link: `${DOMAIN}${basePath}/${entry.slug}`,
      description: entry.description,
      pubDate: new Date(entry.publishedDate),
      author: entry.author,
      categories: entry.tags,
    }));

  // The series' own files carry a written date ("July 4, 2025"); read it as UTC
  // so the day cannot shift with the build machine's timezone.
  const series: FeedItem[] = articles.map((article) => ({
    title: article.title,
    link: `${DOMAIN}/novice-to-navigator/${article.slug}`,
    description: article.description,
    pubDate: new Date(`${getArticleBySlug(article.slug)?.meta.date} UTC`),
    author: AUTHOR,
    categories: [article.section],
  }));

  return [
    ...blog,
    ...collection(ESSAYS_DIR, ESSAYS_PATH),
    ...collection(WRITING_ARTICLES_DIR, WRITING_ARTICLES_PATH),
    ...series,
  ].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime() || a.title.localeCompare(b.title));
}
