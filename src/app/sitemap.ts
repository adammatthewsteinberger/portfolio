import { MetadataRoute } from 'next';
import { articles } from '@/data/articles';
import { projects } from '@/data/projects';
import { getAllBlogPosts } from '@/lib/blogUtils';
import { getAllCollectionEntries } from '@/lib/collectionUtils';
import { ESSAYS_DIR, ESSAYS_PATH } from '@/data/essays';

const DOMAIN = 'https://vibewithadam.matthewsteinberger.com';

export default function sitemap(): MetadataRoute.Sitemap {
  // A fallback for pages whose content has no per-item date of its own
  // (e.g. static marketing pages). Real content below uses its own date.
  const buildDate = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${DOMAIN}/`, lastModified: buildDate, changeFrequency: 'weekly', priority: 1.0 },
    // The primary page: developers, nonprofits, universities, then governments and military.
    { url: `${DOMAIN}/join-me`, lastModified: buildDate, changeFrequency: 'weekly', priority: 1.0 },
    // The tracks in priority order (src/data/tracks.ts): freelance fifth, industry hiring sixth.
    { url: `${DOMAIN}/freelance`, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${DOMAIN}/hire-me`, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${DOMAIN}/story`, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${DOMAIN}/expertise`, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${DOMAIN}/work`, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${DOMAIN}/open-source`, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${DOMAIN}/writing`, lastModified: buildDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${DOMAIN}/books`, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${DOMAIN}/blog`, lastModified: buildDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${DOMAIN}${ESSAYS_PATH}`, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${DOMAIN}/novice-to-navigator`, lastModified: buildDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${DOMAIN}/contact`, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${DOMAIN}/privacy`, lastModified: buildDate, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${DOMAIN}/site-directory`, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.5 },
    { url: 'https://chatwithadam.matthewsteinberger.com/', lastModified: buildDate, changeFrequency: 'monthly', priority: 0.7 },
  ];

  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${DOMAIN}/novice-to-navigator/${article.slug}`,
    lastModified: buildDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${DOMAIN}/work/${project.slug}`,
    lastModified: buildDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Blog pages use each post's own publishedDate as lastModified — a real
  // freshness signal instead of "today" for every URL on every build.
  const blogPages: MetadataRoute.Sitemap = getAllBlogPosts().map((post) => ({
    url: `${DOMAIN}/blog/${post.slug}`,
    lastModified: new Date(post.publishedDate),
    changeFrequency: 'monthly' as const,
    priority: post.featured ? 0.8 : 0.6,
  }));

  // Essays also use their own date, and rank below the blog: the site leads with engineering.
  const essayPages: MetadataRoute.Sitemap = getAllCollectionEntries(ESSAYS_DIR).map((essay) => ({
    url: `${DOMAIN}${ESSAYS_PATH}/${essay.slug}`,
    lastModified: new Date(essay.publishedDate),
    changeFrequency: 'yearly' as const,
    priority: 0.4,
  }));

  return [...staticPages, ...articlePages, ...projectPages, ...blogPages, ...essayPages];
}
