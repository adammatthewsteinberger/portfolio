import { MetadataRoute } from 'next';
import { services } from '@/data/services';
import { articles } from '@/data/articles';
import { projects } from '@/data/projects';
import fs from 'fs';
import path from 'path';

const DOMAIN = 'https://hire.adam.matthewsteinberger.com';

/**
 * Get blog post slugs from the blog content directory
 */
function getBlogSlugs(): string[] {
  try {
    const blogDir = path.join(process.cwd(), 'src/content/blog');
    if (!fs.existsSync(blogDir)) {
      return [];
    }
    const files = fs.readdirSync(blogDir);
    return files
      .filter((file) => file.endsWith('.md'))
      .map((file) => file.replace('.md', ''));
  } catch {
    return [];
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${DOMAIN}/`,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${DOMAIN}/about`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${DOMAIN}/services`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${DOMAIN}/blog`,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${DOMAIN}/novice-to-navigator`,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${DOMAIN}/projects`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${DOMAIN}/contact`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${DOMAIN}/site-directory`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // Service pages
  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${DOMAIN}/services/${service.slug}`,
    lastModified: today,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  // Article pages
  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${DOMAIN}/novice-to-navigator/${article.slug}`,
    lastModified: today,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Project pages
  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${DOMAIN}/projects/${project.slug}`,
    lastModified: today,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Blog pages
  const blogSlugs = getBlogSlugs();
  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${DOMAIN}/blog/${slug}`,
    lastModified: today,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...servicePages,
    ...articlePages,
    ...projectPages,
    ...blogPages,
  ];
}
