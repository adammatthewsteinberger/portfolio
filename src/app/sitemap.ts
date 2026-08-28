import { MetadataRoute } from 'next';
import { services } from '@/data/services';
import { articles } from '@/data/articles';
import { projects } from '@/data/projects';
import { getAllBlogPosts } from '@/lib/blogUtils';
import { getExecProjects } from '@/lib/projectUtils';
import { execRoutes } from '@/data/exec';

const DOMAIN = 'https://hire.adam.matthewsteinberger.com';

export default function sitemap(): MetadataRoute.Sitemap {
  // A fallback for pages whose content has no per-item date of its own
  // (e.g. static marketing pages). Real content below uses its own date.
  const buildDate = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${DOMAIN}/`, lastModified: buildDate, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${DOMAIN}/hire-me`, lastModified: buildDate, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${DOMAIN}/story`, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${DOMAIN}/expertise`, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${DOMAIN}/work`, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${DOMAIN}/open-source`, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${DOMAIN}/join-me`, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${DOMAIN}/writing`, lastModified: buildDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${DOMAIN}/books`, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${DOMAIN}/blog`, lastModified: buildDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${DOMAIN}/novice-to-navigator`, lastModified: buildDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${DOMAIN}/services`, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${DOMAIN}/contact`, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${DOMAIN}/privacy`, lastModified: buildDate, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${DOMAIN}/site-directory`, lastModified: buildDate, changeFrequency: 'monthly', priority: 0.5 },
    { url: 'https://chat.adam.matthewsteinberger.com/', lastModified: buildDate, changeFrequency: 'monthly', priority: 0.7 },
  ];

  // Executive edition (vibey-gh #134): indexable, self-canonical, and never
  // ranked above the engineering page it mirrors.
  const execPages: MetadataRoute.Sitemap = [
    ...execRoutes.map((route) => ({
      url: `${DOMAIN}${route.execUrl}`,
      lastModified: buildDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
    ...getExecProjects().map((project) => ({
      url: `${DOMAIN}/for-executives/work/${project.slug}`,
      lastModified: buildDate,
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    })),
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${DOMAIN}/services/${service.slug}`,
    lastModified: buildDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

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

  return [...staticPages, ...servicePages, ...articlePages, ...projectPages, ...blogPages, ...execPages];
}
