import { describe, it, expect, vi, beforeEach } from 'vitest';
import path from 'path';

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

// Import after mocking
import { getArticleBySlug, getAllArticleSlugs, getArticleMetadata } from '../markdownUtils';

describe('markdownUtils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getArticleBySlug', () => {
    const mockMarkdown = `---
title: Test Article
date: January 2025
section: Section 1
readTime: 5 min read
audioFile: test-audio.wav
---

# Test Content

This is test content.`;

    it('returns article content for valid slug', () => {
      mockExistsSync.mockReturnValue(true);
      mockReadFileSync.mockReturnValue(mockMarkdown);

      const result = getArticleBySlug('test-article');

      expect(result).not.toBeNull();
      expect(result?.slug).toBe('test-article');
      expect(result?.title).toBe('Test Article');
      expect(result?.audioFile).toBe('test-audio.wav');
      expect(result?.meta.date).toBe('January 2025');
      expect(result?.meta.section).toBe('Section 1');
      expect(result?.meta.readTime).toBe('5 min read');
      expect(result?.content).toContain('# Test Content');
    });

    it('returns null for non-existent slug', () => {
      mockExistsSync.mockReturnValue(false);

      const result = getArticleBySlug('non-existent');

      expect(result).toBeNull();
    });

    it('handles file read errors gracefully', () => {
      mockExistsSync.mockReturnValue(true);
      mockReadFileSync.mockImplementation(() => {
        throw new Error('File read error');
      });

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const result = getArticleBySlug('error-article');

      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('handles articles without audio file', () => {
      const markdownWithoutAudio = `---
title: No Audio Article
date: January 2025
section: Section 1
readTime: 3 min read
---

Content without audio.`;

      mockExistsSync.mockReturnValue(true);
      mockReadFileSync.mockReturnValue(markdownWithoutAudio);

      const result = getArticleBySlug('no-audio');

      expect(result).not.toBeNull();
      expect(result?.audioFile).toBeUndefined();
    });

    it('constructs correct file path', () => {
      mockExistsSync.mockReturnValue(false);

      getArticleBySlug('my-article');

      expect(mockExistsSync).toHaveBeenCalledWith(
        path.join('/mock/project', 'src/content/articles', 'my-article.md')
      );
    });
  });

  describe('getAllArticleSlugs', () => {
    it('returns array of slugs from directory', () => {
      mockExistsSync.mockReturnValue(true);
      mockReaddirSync.mockReturnValue([
        'article-1.md',
        'article-2.md',
        'article-3.md',
      ]);

      const result = getAllArticleSlugs();

      expect(result).toEqual(['article-1', 'article-2', 'article-3']);
    });

    it('returns empty array if directory does not exist', () => {
      mockExistsSync.mockReturnValue(false);

      const result = getAllArticleSlugs();

      expect(result).toEqual([]);
    });

    it('filters only .md files', () => {
      mockExistsSync.mockReturnValue(true);
      mockReaddirSync.mockReturnValue([
        'article.md',
        'readme.txt',
        'image.png',
        'another.md',
      ]);

      const result = getAllArticleSlugs();

      expect(result).toEqual(['article', 'another']);
    });

    it('handles directory read errors gracefully', () => {
      mockExistsSync.mockReturnValue(true);
      mockReaddirSync.mockImplementation(() => {
        throw new Error('Directory read error');
      });

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const result = getAllArticleSlugs();

      expect(result).toEqual([]);
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('getArticleMetadata', () => {
    const mockMarkdown = `---
title: Metadata Test
date: February 2025
section: Section 2
readTime: 10 min read
---

Long content that should not be returned.`;

    it('returns lightweight metadata without content', () => {
      mockExistsSync.mockReturnValue(true);
      mockReadFileSync.mockReturnValue(mockMarkdown);

      const result = getArticleMetadata('metadata-test');

      expect(result).not.toBeNull();
      expect(result?.title).toBe('Metadata Test');
      expect(result?.meta.date).toBe('February 2025');
      expect(result?.meta.section).toBe('Section 2');
      expect(result?.meta.readTime).toBe('10 min read');
      // Should not have content property
      expect(result).not.toHaveProperty('content');
      expect(result).not.toHaveProperty('slug');
    });

    it('returns null for non-existent slug', () => {
      mockExistsSync.mockReturnValue(false);

      const result = getArticleMetadata('non-existent');

      expect(result).toBeNull();
    });

    it('handles errors gracefully', () => {
      mockExistsSync.mockReturnValue(true);
      mockReadFileSync.mockImplementation(() => {
        throw new Error('Read error');
      });

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const result = getArticleMetadata('error-article');

      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });
});
