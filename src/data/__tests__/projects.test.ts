import { describe, it, expect } from 'vitest';
import { projects, projectCategories, Project } from '../projects';

describe('projects data', () => {
  describe('data integrity', () => {
    it('has projects array with content', () => {
      expect(projects).toBeDefined();
      expect(Array.isArray(projects)).toBe(true);
      expect(projects.length).toBeGreaterThan(0);
    });

    it('has at least 5 projects', () => {
      expect(projects.length).toBeGreaterThanOrEqual(5);
    });

    it('all projects have required fields', () => {
      projects.forEach((project: Project) => {
        expect(project.slug).toBeDefined();
        expect(typeof project.slug).toBe('string');
        expect(project.slug.length).toBeGreaterThan(0);

        expect(project.title).toBeDefined();
        expect(typeof project.title).toBe('string');
        expect(project.title.length).toBeGreaterThan(0);

        expect(project.description).toBeDefined();
        expect(typeof project.description).toBe('string');
        expect(project.description.length).toBeGreaterThan(0);

        expect(project.category).toBeDefined();
        expect(typeof project.category).toBe('string');
        expect(project.category.length).toBeGreaterThan(0);

        expect(project.categoryDescription).toBeDefined();
        expect(typeof project.categoryDescription).toBe('string');

        expect(project.order).toBeDefined();
        expect(typeof project.order).toBe('number');
        expect(project.order).toBeGreaterThan(0);
      });
    });

    it('has unique slugs', () => {
      const slugs = projects.map(project => project.slug);
      const uniqueSlugs = new Set(slugs);
      expect(uniqueSlugs.size).toBe(slugs.length);
    });

    it('has unique order values', () => {
      const orders = projects.map(project => project.order);
      const uniqueOrders = new Set(orders);
      expect(uniqueOrders.size).toBe(orders.length);
    });

    it('slugs follow URL-safe format', () => {
      const urlSafeRegex = /^[a-z0-9-]+$/;
      projects.forEach((project: Project) => {
        expect(project.slug).toMatch(urlSafeRegex);
      });
    });
  });

  describe('project categories', () => {
    it('has projectCategories array with content', () => {
      expect(projectCategories).toBeDefined();
      expect(Array.isArray(projectCategories)).toBe(true);
      expect(projectCategories.length).toBeGreaterThan(0);
    });

    it('has at least 3 categories', () => {
      expect(projectCategories.length).toBeGreaterThanOrEqual(3);
    });

    it('has expected category names', () => {
      expect(projectCategories).toContain('AI Solutions');
      expect(projectCategories).toContain('Enterprise Development');
      expect(projectCategories).toContain('System Modernization');
    });

    it('all project categories are valid', () => {
      projects.forEach((project: Project) => {
        expect(projectCategories).toContain(project.category);
      });
    });
  });

  describe('optional fields', () => {
    it('projects with heroTitle have valid content', () => {
      projects.forEach((project: Project) => {
        if (project.heroTitle) {
          expect(typeof project.heroTitle).toBe('string');
          expect(project.heroTitle.length).toBeGreaterThan(0);
        }
      });
    });

    it('projects with heroSubtitle have valid content', () => {
      projects.forEach((project: Project) => {
        if (project.heroSubtitle) {
          expect(typeof project.heroSubtitle).toBe('string');
          expect(project.heroSubtitle.length).toBeGreaterThan(0);
        }
      });
    });

    it('projects with technologies have valid arrays', () => {
      projects.forEach((project: Project) => {
        if (project.technologies) {
          expect(Array.isArray(project.technologies)).toBe(true);
          project.technologies.forEach(tech => {
            expect(typeof tech).toBe('string');
            expect(tech.length).toBeGreaterThan(0);
          });
        }
      });
    });

    it('projects with duration have valid content', () => {
      projects.forEach((project: Project) => {
        if (project.duration) {
          expect(typeof project.duration).toBe('string');
          expect(project.duration.length).toBeGreaterThan(0);
        }
      });
    });

    it('projects with status have valid values', () => {
      const validStatuses = ['completed', 'ongoing', 'archived'];
      projects.forEach((project: Project) => {
        if (project.status) {
          expect(validStatuses).toContain(project.status);
        }
      });
    });

    it('projects with featured have boolean values', () => {
      projects.forEach((project: Project) => {
        if (project.featured !== undefined) {
          expect(typeof project.featured).toBe('boolean');
        }
      });
    });
  });

  describe('featured projects', () => {
    it('has at least one featured project', () => {
      const featuredProjects = projects.filter(p => p.featured === true);
      expect(featuredProjects.length).toBeGreaterThan(0);
    });

    it('featured projects have technologies listed', () => {
      const featuredProjects = projects.filter(p => p.featured === true);
      featuredProjects.forEach(project => {
        expect(project.technologies).toBeDefined();
        expect(project.technologies!.length).toBeGreaterThan(0);
      });
    });
  });

  describe('content quality', () => {
    it('descriptions are meaningful (>20 characters)', () => {
      projects.forEach((project: Project) => {
        expect(project.description.length).toBeGreaterThan(20);
      });
    });

    it('titles are reasonable length', () => {
      projects.forEach((project: Project) => {
        expect(project.title.length).toBeGreaterThan(5);
        expect(project.title.length).toBeLessThan(100);
      });
    });
  });

  describe('AI solutions category', () => {
    it('has AI-related projects', () => {
      const aiProjects = projects.filter(p => p.category === 'AI Solutions');
      expect(aiProjects.length).toBeGreaterThan(0);
    });

    it('AI projects mention relevant technologies', () => {
      const aiProjects = projects.filter(p => p.category === 'AI Solutions');
      const aiTechs = ['GPT', 'RAG', 'Mistral', 'Gemini', 'LLM', 'AI', 'ML'];

      aiProjects.forEach(project => {
        const hasTech = project.technologies?.some(tech =>
          aiTechs.some(aiTech => tech.toLowerCase().includes(aiTech.toLowerCase()))
        ) || project.title.toLowerCase().includes('ai') || project.description.toLowerCase().includes('ai');
        expect(hasTech).toBe(true);
      });
    });
  });
});
