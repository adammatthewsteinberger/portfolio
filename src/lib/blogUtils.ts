import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogContent {
  slug: string;
  title: string;
  description: string;
  category: string;
  author: string;
  publishedDate: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
  content: string;
}

export function getBlogPostBySlug(slug: string): BlogContent | null {
  try {
    const blogDirectory = path.join(process.cwd(), 'src/content/blog');
    const fullPath = path.join(blogDirectory, `${slug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      description: data.description,
      category: data.category,
      author: data.author,
      publishedDate: data.publishedDate,
      readTime: data.readTime,
      tags: data.tags || [],
      featured: data.featured || false,
      content
    };
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
}

export function getAllBlogSlugs(): string[] {
  try {
    const blogDirectory = path.join(process.cwd(), 'src/content/blog');
    
    if (!fs.existsSync(blogDirectory)) {
      return [];
    }

    const fileNames = fs.readdirSync(blogDirectory);
    return fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => fileName.replace(/\.md$/, ''));
  } catch (error) {
    console.error('Error reading blog slugs:', error);
    return [];
  }
}

export function getAllBlogPosts(): BlogContent[] {
  // getAllBlogSlugs() and getBlogPostBySlug() each already catch and log
  // their own filesystem/parse errors (returning [] / null respectively),
  // so there is no error path left for this function itself to guard.
  const slugs = getAllBlogSlugs();
  const posts: BlogContent[] = [];

  for (const slug of slugs) {
    const post = getBlogPostBySlug(slug);
    if (post) {
      posts.push(post);
    }
  }

  // Sort by published date (newest first)
  return posts.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
}

export function getBlogPostsByCategory(category: string): BlogContent[] {
  const allPosts = getAllBlogPosts();
  return allPosts.filter(post => post.category === category);
}

export function getFeaturedBlogPosts(): BlogContent[] {
  const allPosts = getAllBlogPosts();
  return allPosts.filter(post => post.featured === true);
}

export function getRelatedPosts(currentSlug: string, category: string, limit: number = 3): BlogContent[] {
  const allPosts = getAllBlogPosts();
  return allPosts
    .filter(post => post.slug !== currentSlug && post.category === category)
    .slice(0, limit);
}