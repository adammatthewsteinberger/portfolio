import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getBlogPostBySlug,
  getAllBlogSlugs,
  getAllBlogPosts,
  getBlogPostsByCategory,
  getFeaturedBlogPosts,
  getRelatedPosts,
} from '../blogUtils';

// Use vi.hoisted to create mocks that are available during vi.mock hoisting
const { mockExistsSync, mockReadFileSync, mockReaddirSync } = vi.hoisted(() => ({
  mockExistsSync: vi.fn(),
  mockReadFileSync: vi.fn(),
  mockReaddirSync: vi.fn(),
}));

// Mock fs module with factory using hoisted functions
vi.mock('fs', () => ({
  default: {
    existsSync: mockExistsSync,
    readFileSync: mockReadFileSync,
    readdirSync: mockReaddirSync,
  },
  existsSync: mockExistsSync,
  readFileSync: mockReadFileSync,
  readdirSync: mockReaddirSync,
}));

// Mock process.cwd
vi.spyOn(process, 'cwd').mockReturnValue('/mock/project');

describe('blogUtils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const createMockBlogPost = (overrides: Record<string, unknown> = {}) => {
    const defaults = {
      title: 'Test Blog Post',
      description: 'A test description',
      category: 'AI Development',
      author: 'Adam Steinberger',
      publishedDate: '2025-01-15',
      readTime: '5 min read',
      tags: ['AI', 'Testing'],
      featured: false,
    };
    const data = { ...defaults, ...overrides };
    return `---
title: ${data.title}
description: ${data.description}
category: ${data.category}
author: ${data.author}
publishedDate: ${data.publishedDate}
readTime: ${data.readTime}
tags: [${(data.tags as string[]).join(', ')}]
featured: ${data.featured}
---

# ${data.title}

This is the blog post content.`;
  };

  describe('getBlogPostBySlug', () => {
    it('returns blog post with all fields', () => {
      mockExistsSync.mockReturnValue(true);
      mockReadFileSync.mockReturnValue(createMockBlogPost());

      const result = getBlogPostBySlug('test-post');

      expect(result).not.toBeNull();
      expect(result?.slug).toBe('test-post');
      expect(result?.title).toBe('Test Blog Post');
      expect(result?.description).toBe('A test description');
      expect(result?.category).toBe('AI Development');
      expect(result?.author).toBe('Adam Steinberger');
      // gray-matter converts date strings to Date objects
      expect(new Date(result?.publishedDate as unknown as Date).toISOString().split('T')[0]).toBe('2025-01-15');
      expect(result?.readTime).toBe('5 min read');
      expect(result?.tags).toEqual(['AI', 'Testing']);
      expect(result?.featured).toBe(false);
      expect(result?.content).toContain('# Test Blog Post');
    });

    it('handles featured boolean correctly', () => {
      mockExistsSync.mockReturnValue(true);
      mockReadFileSync.mockReturnValue(createMockBlogPost({ featured: true }));

      const result = getBlogPostBySlug('featured-post');

      expect(result?.featured).toBe(true);
    });

    it('handles missing tags as empty array', () => {
      const markdownWithoutTags = `---
title: No Tags Post
description: Description
category: Tech
author: Author
publishedDate: 2025-01-15
readTime: 3 min
---

Content`;

      mockExistsSync.mockReturnValue(true);
      mockReadFileSync.mockReturnValue(markdownWithoutTags);

      const result = getBlogPostBySlug('no-tags');

      expect(result?.tags).toEqual([]);
    });

    it('returns null for non-existent slug', () => {
      mockExistsSync.mockReturnValue(false);

      const result = getBlogPostBySlug('non-existent');

      expect(result).toBeNull();
    });

    it('handles errors gracefully', () => {
      mockExistsSync.mockReturnValue(true);
      mockReadFileSync.mockImplementation(() => {
        throw new Error('Read error');
      });

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const result = getBlogPostBySlug('error-post');

      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('getAllBlogSlugs', () => {
    it('returns all blog slugs', () => {
      mockExistsSync.mockReturnValue(true);
      mockReaddirSync.mockReturnValue([
        'post-1.md',
        'post-2.md',
        'post-3.md',
      ]);

      const result = getAllBlogSlugs();

      expect(result).toEqual(['post-1', 'post-2', 'post-3']);
    });

    it('returns empty array if directory does not exist', () => {
      mockExistsSync.mockReturnValue(false);

      const result = getAllBlogSlugs();

      expect(result).toEqual([]);
    });

    it('filters only .md files', () => {
      mockExistsSync.mockReturnValue(true);
      mockReaddirSync.mockReturnValue([
        'post.md',
        'draft.txt',
        '.gitkeep',
      ]);

      const result = getAllBlogSlugs();

      expect(result).toEqual(['post']);
    });

    it('handles errors gracefully', () => {
      mockExistsSync.mockReturnValue(true);
      mockReaddirSync.mockImplementation(() => {
        throw new Error('Error');
      });

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const result = getAllBlogSlugs();

      expect(result).toEqual([]);
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('getAllBlogPosts', () => {
    it('returns posts sorted by publishedDate (newest first)', () => {
      mockExistsSync.mockReturnValue(true);
      mockReaddirSync.mockReturnValue([
        'old-post.md',
        'new-post.md',
      ]);

      mockReadFileSync.mockImplementation((filePath) => {
        const pathStr = filePath as string;
        if (pathStr.includes('old')) {
          return createMockBlogPost({ title: 'Old Post', publishedDate: '2024-01-01' });
        }
        return createMockBlogPost({ title: 'New Post', publishedDate: '2025-06-15' });
      });

      const result = getAllBlogPosts();

      expect(result).toHaveLength(2);
      expect(result[0].title).toBe('New Post');
      expect(result[1].title).toBe('Old Post');
    });

    it('skips a slug whose file has since been removed, without failing the batch', () => {
      mockReaddirSync.mockReturnValue(['real-post.md', 'removed-post.md']);
      mockExistsSync.mockImplementation(
        (filePath) => !String(filePath).includes('removed-post')
      );
      mockReadFileSync.mockReturnValue(createMockBlogPost({ title: 'Real Post' }));

      const result = getAllBlogPosts();

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Real Post');
    });

    it('returns empty array when no posts exist', () => {
      mockExistsSync.mockReturnValue(false);

      const result = getAllBlogPosts();

      expect(result).toEqual([]);
    });
  });

  describe('getBlogPostsByCategory', () => {
    it('filters posts by category correctly', () => {
      mockExistsSync.mockReturnValue(true);
      mockReaddirSync.mockReturnValue([
        'ai-post.md',
        'tech-post.md',
      ]);

      mockReadFileSync.mockImplementation((filePath) => {
        const pathStr = filePath as string;
        if (pathStr.includes('ai')) {
          return createMockBlogPost({ category: 'AI', title: 'AI Post' });
        }
        return createMockBlogPost({ category: 'Tech', title: 'Tech Post' });
      });

      const result = getBlogPostsByCategory('AI');

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('AI Post');
    });

    it('returns empty array for non-matching category', () => {
      mockExistsSync.mockReturnValue(true);
      mockReaddirSync.mockReturnValue(['post.md']);
      mockReadFileSync.mockReturnValue(createMockBlogPost({ category: 'Tech' }));

      const result = getBlogPostsByCategory('NonExistent');

      expect(result).toEqual([]);
    });
  });

  describe('getFeaturedBlogPosts', () => {
    it('returns only featured posts', () => {
      mockExistsSync.mockReturnValue(true);
      mockReaddirSync.mockReturnValue([
        'featured.md',
        'regular.md',
      ]);

      mockReadFileSync.mockImplementation((filePath) => {
        const pathStr = filePath as string;
        if (pathStr.includes('featured')) {
          return createMockBlogPost({ featured: true, title: 'Featured Post' });
        }
        return createMockBlogPost({ featured: false, title: 'Regular Post' });
      });

      const result = getFeaturedBlogPosts();

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Featured Post');
      expect(result[0].featured).toBe(true);
    });

    it('returns empty array when no featured posts exist', () => {
      mockExistsSync.mockReturnValue(true);
      mockReaddirSync.mockReturnValue(['post.md']);
      mockReadFileSync.mockReturnValue(createMockBlogPost({ featured: false }));

      const result = getFeaturedBlogPosts();

      expect(result).toEqual([]);
    });
  });

  describe('getRelatedPosts', () => {
    beforeEach(() => {
      mockExistsSync.mockReturnValue(true);
      mockReaddirSync.mockReturnValue([
        'current.md',
        'related-1.md',
        'related-2.md',
        'different.md',
      ]);

      mockReadFileSync.mockImplementation((filePath) => {
        const pathStr = filePath as string;
        if (pathStr.includes('current')) {
          return createMockBlogPost({ title: 'Current', category: 'AI' });
        }
        if (pathStr.includes('related-1')) {
          return createMockBlogPost({ title: 'Related 1', category: 'AI' });
        }
        if (pathStr.includes('related-2')) {
          return createMockBlogPost({ title: 'Related 2', category: 'AI' });
        }
        return createMockBlogPost({ title: 'Different', category: 'Tech' });
      });
    });

    it('returns related posts excluding current post', () => {
      const result = getRelatedPosts('current', 'AI');

      expect(result.find(p => p.slug === 'current')).toBeUndefined();
      expect(result.every(p => p.category === 'AI')).toBe(true);
    });

    it('respects limit parameter', () => {
      const result = getRelatedPosts('current', 'AI', 1);

      expect(result).toHaveLength(1);
    });

    it('uses default limit of 3', () => {
      const result = getRelatedPosts('current', 'AI');

      expect(result.length).toBeLessThanOrEqual(3);
    });

    it('filters by matching category', () => {
      const result = getRelatedPosts('current', 'AI');

      result.forEach(post => {
        expect(post.category).toBe('AI');
      });
    });

    it('returns empty array when no related posts exist', () => {
      const result = getRelatedPosts('current', 'NonExistent');

      expect(result).toEqual([]);
    });
  });
});
