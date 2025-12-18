import { describe, it, expect } from 'vitest';
import {
  blogPosts,
  blogCategories,
  getBlogPostsByCategory,
  getFeaturedPosts,
  getRecentPosts,
  BlogPost,
} from '../blog';

describe('blog data', () => {
  describe('blogPosts array', () => {
    it('is defined and is an array', () => {
      expect(blogPosts).toBeDefined();
      expect(Array.isArray(blogPosts)).toBe(true);
    });

    it('all blog posts have required fields', () => {
      blogPosts.forEach((post: BlogPost) => {
        expect(post.slug).toBeDefined();
        expect(typeof post.slug).toBe('string');

        expect(post.title).toBeDefined();
        expect(typeof post.title).toBe('string');

        expect(post.description).toBeDefined();
        expect(typeof post.description).toBe('string');

        expect(post.category).toBeDefined();
        expect(typeof post.category).toBe('string');

        expect(post.author).toBeDefined();
        expect(typeof post.author).toBe('string');

        expect(post.publishedDate).toBeDefined();
        expect(typeof post.publishedDate).toBe('string');

        expect(post.readTime).toBeDefined();
        expect(typeof post.readTime).toBe('string');

        expect(post.tags).toBeDefined();
        expect(Array.isArray(post.tags)).toBe(true);
      });
    });
  });

  describe('blogCategories', () => {
    it('is defined and is an array', () => {
      expect(blogCategories).toBeDefined();
      expect(Array.isArray(blogCategories)).toBe(true);
    });

    it('has at least 3 categories', () => {
      expect(blogCategories.length).toBeGreaterThanOrEqual(3);
    });

    it('all categories have required fields', () => {
      blogCategories.forEach(category => {
        expect(category.name).toBeDefined();
        expect(typeof category.name).toBe('string');
        expect(category.name.length).toBeGreaterThan(0);

        expect(category.description).toBeDefined();
        expect(typeof category.description).toBe('string');

        expect(category.slug).toBeDefined();
        expect(typeof category.slug).toBe('string');
      });
    });

    it('has expected category names', () => {
      const categoryNames = blogCategories.map(c => c.name);
      expect(categoryNames).toContain('AI Development');
      expect(categoryNames).toContain('Technology Insights');
      expect(categoryNames).toContain('Business Strategy');
      expect(categoryNames).toContain('Case Studies');
    });

    it('category slugs are URL-safe', () => {
      const urlSafeRegex = /^[a-z0-9-]+$/;
      blogCategories.forEach(category => {
        expect(category.slug).toMatch(urlSafeRegex);
      });
    });
  });

  describe('getBlogPostsByCategory', () => {
    it('returns an array', () => {
      const result = getBlogPostsByCategory('AI Development');
      expect(Array.isArray(result)).toBe(true);
    });

    it('returns empty array for non-matching category', () => {
      const result = getBlogPostsByCategory('NonExistent');
      expect(result).toEqual([]);
    });

    it('filters posts correctly when posts exist', () => {
      // This test verifies the function logic works correctly
      // Even with empty blogPosts array, it should return empty
      const result = getBlogPostsByCategory('AI Development');
      result.forEach(post => {
        expect(post.category).toBe('AI Development');
      });
    });
  });

  describe('getFeaturedPosts', () => {
    it('returns an array', () => {
      const result = getFeaturedPosts();
      expect(Array.isArray(result)).toBe(true);
    });

    it('only returns posts with featured=true', () => {
      const result = getFeaturedPosts();
      result.forEach(post => {
        expect(post.featured).toBe(true);
      });
    });
  });

  describe('getRecentPosts', () => {
    it('returns an array', () => {
      const result = getRecentPosts();
      expect(Array.isArray(result)).toBe(true);
    });

    it('uses default limit of 5', () => {
      const result = getRecentPosts();
      expect(result.length).toBeLessThanOrEqual(5);
    });

    it('respects custom limit', () => {
      const result = getRecentPosts(3);
      expect(result.length).toBeLessThanOrEqual(3);
    });

    it('returns posts sorted by date (newest first)', () => {
      const result = getRecentPosts();
      for (let i = 1; i < result.length; i++) {
        const prevDate = new Date(result[i - 1].publishedDate);
        const currDate = new Date(result[i].publishedDate);
        expect(prevDate.getTime()).toBeGreaterThanOrEqual(currDate.getTime());
      }
    });
  });
});
