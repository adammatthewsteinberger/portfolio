import { describe, it, expect, vi, beforeEach } from 'vitest';
import path from 'path';
import { getProjectBySlug, getAllProjectSlugs, getAllProjects } from '../projectUtils';

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

describe('projectUtils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const createMockProject = (overrides: Record<string, unknown> = {}) => {
    const defaults = {
      title: 'Test Project',
      subtitle: 'A test project subtitle',
      description: 'Full project description',
      category: 'Enterprise',
      heroTitle: 'Hero Title',
      heroSubtitle: 'Hero Subtitle',
      technologies: ['React', 'Node.js', 'TypeScript'],
      duration: '6 months',
      status: 'completed',
      challenge: 'The challenge we faced',
      solution: 'How we solved it',
      results: 'The outcomes achieved',
      techStack: 'React, Node.js, PostgreSQL',
      architecture: 'Microservices architecture',
      lessons: 'Key lessons learned',
    };
    const data = { ...defaults, ...overrides };
    return `---
title: ${data.title}
subtitle: ${data.subtitle}
description: ${data.description}
category: ${data.category}
heroTitle: ${data.heroTitle}
heroSubtitle: ${data.heroSubtitle}
technologies: [${(data.technologies as string[]).join(', ')}]
duration: ${data.duration}
status: ${data.status}
challenge: ${data.challenge}
solution: ${data.solution}
results: ${data.results}
techStack: ${data.techStack}
architecture: ${data.architecture}
lessons: ${data.lessons}
---

# Project Details

This is the detailed project content.`;
  };

  describe('getProjectBySlug', () => {
    it('returns project with all fields including technologies array', () => {
      mockExistsSync.mockReturnValue(true);
      mockReadFileSync.mockReturnValue(createMockProject());

      const result = getProjectBySlug('test-project');

      expect(result).not.toBeNull();
      expect(result?.slug).toBe('test-project');
      expect(result?.title).toBe('Test Project');
      expect(result?.subtitle).toBe('A test project subtitle');
      expect(result?.description).toBe('Full project description');
      expect(result?.category).toBe('Enterprise');
      expect(result?.heroTitle).toBe('Hero Title');
      expect(result?.heroSubtitle).toBe('Hero Subtitle');
      expect(result?.technologies).toEqual(['React', 'Node.js', 'TypeScript']);
      expect(result?.duration).toBe('6 months');
      expect(result?.status).toBe('completed');
      expect(result?.challenge).toBe('The challenge we faced');
      expect(result?.solution).toBe('How we solved it');
      expect(result?.results).toBe('The outcomes achieved');
      expect(result?.techStack).toBe('React, Node.js, PostgreSQL');
      expect(result?.architecture).toBe('Microservices architecture');
      expect(result?.lessons).toBe('Key lessons learned');
      expect(result?.content).toContain('# Project Details');
    });

    it('handles missing technologies as empty array', () => {
      const markdownWithoutTech = `---
title: No Tech Project
subtitle: Subtitle
description: Description
category: Other
heroTitle: Hero
heroSubtitle: Sub
duration: 3 months
status: ongoing
challenge: Challenge
solution: Solution
results: Results
techStack: Stack
architecture: Arch
lessons: Lessons
---

Content`;

      mockExistsSync.mockReturnValue(true);
      mockReadFileSync.mockReturnValue(markdownWithoutTech);

      const result = getProjectBySlug('no-tech');

      expect(result?.technologies).toEqual([]);
    });

    it('returns null for non-existent slug', () => {
      mockExistsSync.mockReturnValue(false);

      const result = getProjectBySlug('non-existent');

      expect(result).toBeNull();
    });

    it('handles errors gracefully', () => {
      mockExistsSync.mockReturnValue(true);
      mockReadFileSync.mockImplementation(() => {
        throw new Error('Read error');
      });

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const result = getProjectBySlug('error-project');

      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('constructs correct file path', () => {
      mockExistsSync.mockReturnValue(false);

      getProjectBySlug('my-project');

      expect(mockExistsSync).toHaveBeenCalledWith(
        path.join('/mock/project', 'src/content/projects', 'my-project.md')
      );
    });
  });

  describe('getAllProjectSlugs', () => {
    it('returns all project slugs', () => {
      mockExistsSync.mockReturnValue(true);
      mockReaddirSync.mockReturnValue([
        'project-1.md',
        'project-2.md',
        'project-3.md',
      ]);

      const result = getAllProjectSlugs();

      expect(result).toEqual(['project-1', 'project-2', 'project-3']);
    });

    it('returns empty array if directory does not exist', () => {
      mockExistsSync.mockReturnValue(false);

      const result = getAllProjectSlugs();

      expect(result).toEqual([]);
    });

    it('filters only .md files', () => {
      mockExistsSync.mockReturnValue(true);
      mockReaddirSync.mockReturnValue([
        'project.md',
        'readme.txt',
        '.DS_Store',
        'another.md',
      ]);

      const result = getAllProjectSlugs();

      expect(result).toEqual(['project', 'another']);
    });

    it('handles errors gracefully', () => {
      mockExistsSync.mockReturnValue(true);
      mockReaddirSync.mockImplementation(() => {
        throw new Error('Error');
      });

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const result = getAllProjectSlugs();

      expect(result).toEqual([]);
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('getAllProjects', () => {
    it('returns sorted array of projects by title', () => {
      mockExistsSync.mockReturnValue(true);
      mockReaddirSync.mockReturnValue([
        'zebra-project.md',
        'alpha-project.md',
      ]);

      mockReadFileSync.mockImplementation((filePath) => {
        const pathStr = filePath as string;
        if (pathStr.includes('zebra')) {
          return createMockProject({ title: 'Zebra Project' });
        }
        return createMockProject({ title: 'Alpha Project' });
      });

      const result = getAllProjects();

      expect(result).toHaveLength(2);
      expect(result[0].title).toBe('Alpha Project');
      expect(result[1].title).toBe('Zebra Project');
    });

    it('returns empty array when no projects exist', () => {
      mockExistsSync.mockReturnValue(false);

      const result = getAllProjects();

      expect(result).toEqual([]);
    });

    it('handles errors gracefully', () => {
      mockExistsSync.mockReturnValue(true);
      mockReaddirSync.mockImplementation(() => {
        throw new Error('Error');
      });

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const result = getAllProjects();

      expect(result).toEqual([]);
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('skips null projects from failed reads', () => {
      mockExistsSync.mockImplementation((pathArg) => {
        // Directory exists, but one file doesn't
        return !String(pathArg).includes('broken');
      });
      mockReaddirSync.mockReturnValue([
        'working.md',
        'broken.md',
      ]);
      mockReadFileSync.mockReturnValue(createMockProject({ title: 'Working' }));

      const result = getAllProjects();

      // Should only have the working project
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Working');
    });
  });
});
