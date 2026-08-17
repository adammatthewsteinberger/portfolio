import { describe, it, expect, vi, beforeEach } from 'vitest';
import path from 'path';
import { getServiceBySlug, getAllServiceSlugs, getAllServices, getServiceMetadata } from '../serviceUtils';

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

describe('serviceUtils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockServiceMarkdown = `---
title: AI Consulting
subtitle: Expert AI Solutions
description: Full description here
category: Technical
heroTitle: Hero Title
heroSubtitle: Hero Subtitle
whyChoose: Why Choose Us
choice1Title: Choice 1
choice1Icon: fa-robot
choice1Description: Description 1
choice2Title: Choice 2
choice2Icon: fa-brain
choice2Description: Description 2
choice3Title: Choice 3
choice3Icon: fa-cog
choice3Description: Description 3
featuresOffered: Our Features
feature1Icon: fa-check
feature1Title: Feature 1
feature1Description: Feature 1 desc
feature2Icon: fa-star
feature2Title: Feature 2
feature2Description: Feature 2 desc
feature3Icon: fa-bolt
feature3Title: Feature 3
feature3Description: Feature 3 desc
feature4Icon: fa-shield
feature4Title: Feature 4
feature4Description: Feature 4 desc
feature5Icon: fa-cloud
feature5Title: Feature 5
feature5Description: Feature 5 desc
feature6Icon: fa-code
feature6Title: Feature 6
feature6Description: Feature 6 desc
feature7Icon: fa-chart
feature7Title: Feature 7
feature7Description: Feature 7 desc
feature8Icon: fa-users
feature8Title: Feature 8
feature8Description: Feature 8 desc
feature9Icon: fa-globe
feature9Title: Feature 9
feature9Description: Feature 9 desc
feature10Icon: fa-rocket
feature10Title: Feature 10
feature10Description: Feature 10 desc
contentTitle: Main Content
---

# Main Content

This is the main content of the service page.`;

  describe('getServiceBySlug', () => {
    it('returns full service content for valid slug', () => {
      mockExistsSync.mockReturnValue(true);
      mockReadFileSync.mockReturnValue(mockServiceMarkdown);

      const result = getServiceBySlug('ai-consulting');

      expect(result).not.toBeNull();
      expect(result?.slug).toBe('ai-consulting');
      expect(result?.title).toBe('AI Consulting');
      expect(result?.subtitle).toBe('Expert AI Solutions');
      expect(result?.category).toBe('Technical');
      expect(result?.choice1Title).toBe('Choice 1');
      expect(result?.feature1Title).toBe('Feature 1');
      expect(result?.content).toContain('# Main Content');
    });

    it('returns null for non-existent slug', () => {
      mockExistsSync.mockReturnValue(false);

      const result = getServiceBySlug('non-existent');

      expect(result).toBeNull();
    });

    it('handles file read errors gracefully', () => {
      mockExistsSync.mockReturnValue(true);
      mockReadFileSync.mockImplementation(() => {
        throw new Error('File read error');
      });

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const result = getServiceBySlug('error-service');

      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('constructs correct file path', () => {
      mockExistsSync.mockReturnValue(false);

      getServiceBySlug('my-service');

      expect(mockExistsSync).toHaveBeenCalledWith(
        path.join('/mock/project', 'src/content/services', 'my-service.md')
      );
    });
  });

  describe('getAllServiceSlugs', () => {
    it('returns array of slugs from directory', () => {
      mockExistsSync.mockReturnValue(true);
      mockReaddirSync.mockReturnValue([
        'ai-consulting.md',
        'chatbot-development.md',
        'rag-implementation.md',
      ]);

      const result = getAllServiceSlugs();

      expect(result).toEqual(['ai-consulting', 'chatbot-development', 'rag-implementation']);
    });

    it('returns empty array if directory does not exist', () => {
      mockExistsSync.mockReturnValue(false);

      const result = getAllServiceSlugs();

      expect(result).toEqual([]);
    });

    it('filters only .md files', () => {
      mockExistsSync.mockReturnValue(true);
      mockReaddirSync.mockReturnValue([
        'service.md',
        '.DS_Store',
        'image.png',
        'another.md',
      ]);

      const result = getAllServiceSlugs();

      expect(result).toEqual(['service', 'another']);
    });

    it('handles directory read errors gracefully', () => {
      mockExistsSync.mockReturnValue(true);
      mockReaddirSync.mockImplementation(() => {
        throw new Error('Directory read error');
      });

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const result = getAllServiceSlugs();

      expect(result).toEqual([]);
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('getAllServices', () => {
    it('returns sorted array of all services', () => {
      mockExistsSync.mockReturnValue(true);
      mockReaddirSync.mockReturnValue([
        'zebra-service.md',
        'alpha-service.md',
      ]);

      // Mock different content for each service
      mockReadFileSync.mockImplementation((filePath) => {
        const pathStr = filePath as string;
        if (pathStr.includes('zebra')) {
          return mockServiceMarkdown.replace('AI Consulting', 'Zebra Service');
        }
        return mockServiceMarkdown.replace('AI Consulting', 'Alpha Service');
      });

      const result = getAllServices();

      expect(result).toHaveLength(2);
      expect(result[0].title).toBe('Alpha Service');
      expect(result[1].title).toBe('Zebra Service');
    });

    it('skips a slug whose file has since been removed, without failing the batch', () => {
      mockReaddirSync.mockReturnValue(['real-service.md', 'removed-service.md']);
      mockExistsSync.mockImplementation(
        (filePath) => !String(filePath).includes('removed-service')
      );
      mockReadFileSync.mockReturnValue(mockServiceMarkdown);

      const result = getAllServices();

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('AI Consulting');
    });

    it('returns empty array when no services exist', () => {
      mockExistsSync.mockReturnValue(false);

      const result = getAllServices();

      expect(result).toEqual([]);
    });

    it('handles errors gracefully', () => {
      mockExistsSync.mockReturnValue(true);
      mockReaddirSync.mockImplementation(() => {
        throw new Error('Error');
      });

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const result = getAllServices();

      expect(result).toEqual([]);
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('getServiceMetadata', () => {
    it('returns lightweight metadata without full content', () => {
      mockExistsSync.mockReturnValue(true);
      mockReadFileSync.mockReturnValue(mockServiceMarkdown);

      const result = getServiceMetadata('ai-consulting');

      expect(result).not.toBeNull();
      expect(result?.title).toBe('AI Consulting');
      expect(result?.subtitle).toBe('Expert AI Solutions');
      expect(result?.description).toBe('Full description here');
      expect(result?.category).toBe('Technical');
      // Should not have full content fields
      expect(result).not.toHaveProperty('content');
      expect(result).not.toHaveProperty('slug');
      expect(result).not.toHaveProperty('feature1Title');
    });

    it('returns null for non-existent slug', () => {
      mockExistsSync.mockReturnValue(false);

      const result = getServiceMetadata('non-existent');

      expect(result).toBeNull();
    });

    it('handles errors gracefully', () => {
      mockExistsSync.mockReturnValue(true);
      mockReadFileSync.mockImplementation(() => {
        throw new Error('Read error');
      });

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const result = getServiceMetadata('error-service');

      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });
});
