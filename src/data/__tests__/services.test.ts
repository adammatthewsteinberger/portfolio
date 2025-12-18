import { describe, it, expect } from 'vitest';
import { services, serviceCategories, Service } from '../services';

describe('services data', () => {
  describe('data integrity', () => {
    it('has services array with content', () => {
      expect(services).toBeDefined();
      expect(Array.isArray(services)).toBe(true);
      expect(services.length).toBeGreaterThan(0);
    });

    it('has more than 40 services', () => {
      expect(services.length).toBeGreaterThan(40);
    });

    it('all services have required fields', () => {
      services.forEach((service: Service) => {
        expect(service.slug).toBeDefined();
        expect(typeof service.slug).toBe('string');
        expect(service.slug.length).toBeGreaterThan(0);

        expect(service.title).toBeDefined();
        expect(typeof service.title).toBe('string');
        expect(service.title.length).toBeGreaterThan(0);

        expect(service.description).toBeDefined();
        expect(typeof service.description).toBe('string');
        expect(service.description.length).toBeGreaterThan(0);

        expect(service.category).toBeDefined();
        expect(typeof service.category).toBe('string');
        expect(service.category.length).toBeGreaterThan(0);

        expect(service.categoryDescription).toBeDefined();
        expect(typeof service.categoryDescription).toBe('string');

        expect(service.order).toBeDefined();
        expect(typeof service.order).toBe('number');
        expect(service.order).toBeGreaterThan(0);
      });
    });

    it('has unique slugs', () => {
      const slugs = services.map(service => service.slug);
      const uniqueSlugs = new Set(slugs);
      expect(uniqueSlugs.size).toBe(slugs.length);
    });

    it('slugs follow URL-safe format', () => {
      const urlSafeRegex = /^[a-z0-9-]+$/;
      services.forEach((service: Service) => {
        expect(service.slug).toMatch(urlSafeRegex);
      });
    });
  });

  describe('service categories', () => {
    it('has serviceCategories array with content', () => {
      expect(serviceCategories).toBeDefined();
      expect(Array.isArray(serviceCategories)).toBe(true);
      expect(serviceCategories.length).toBeGreaterThan(0);
    });

    it('has exactly 3 categories', () => {
      expect(serviceCategories).toHaveLength(3);
    });

    it('all categories have required fields', () => {
      serviceCategories.forEach(category => {
        expect(category.title).toBeDefined();
        expect(typeof category.title).toBe('string');
        expect(category.title.length).toBeGreaterThan(0);

        expect(category.description).toBeDefined();
        expect(typeof category.description).toBe('string');

        expect(category.services).toBeDefined();
        expect(Array.isArray(category.services)).toBe(true);
        expect(category.services.length).toBeGreaterThan(0);
      });
    });

    it('has expected category names', () => {
      const expectedCategories = [
        'Location-Based Services',
        'Industry-Specific Solutions',
        'Technical Services',
      ];
      const categoryTitles = serviceCategories.map(c => c.title);
      expectedCategories.forEach(expected => {
        expect(categoryTitles).toContain(expected);
      });
    });

    it('category titles match service categories', () => {
      const categoryTitles = serviceCategories.map(c => c.title);
      const serviceCategs = new Set(services.map(s => s.category));

      serviceCategs.forEach(category => {
        expect(categoryTitles).toContain(category);
      });
    });

    it('all services are categorized', () => {
      const servicesInCategories = serviceCategories.reduce((acc, category) => {
        return acc + category.services.length;
      }, 0);
      expect(servicesInCategories).toBe(services.length);
    });
  });

  describe('optional fields', () => {
    it('services with heroTitle have valid content', () => {
      services.forEach((service: Service) => {
        if (service.heroTitle) {
          expect(typeof service.heroTitle).toBe('string');
          expect(service.heroTitle.length).toBeGreaterThan(0);
        }
      });
    });

    it('services with heroSubtitle have valid content', () => {
      services.forEach((service: Service) => {
        if (service.heroSubtitle) {
          expect(typeof service.heroSubtitle).toBe('string');
          expect(service.heroSubtitle.length).toBeGreaterThan(0);
        }
      });
    });

    it('services with features have valid arrays', () => {
      services.forEach((service: Service) => {
        if (service.features) {
          expect(Array.isArray(service.features)).toBe(true);
          service.features.forEach(feature => {
            expect(typeof feature).toBe('string');
            expect(feature.length).toBeGreaterThan(0);
          });
        }
      });
    });

    it('services with benefits have valid arrays', () => {
      services.forEach((service: Service) => {
        if (service.benefits) {
          expect(Array.isArray(service.benefits)).toBe(true);
          service.benefits.forEach(benefit => {
            expect(typeof benefit).toBe('string');
            expect(benefit.length).toBeGreaterThan(0);
          });
        }
      });
    });
  });

  describe('content quality', () => {
    it('descriptions are meaningful (>20 characters)', () => {
      services.forEach((service: Service) => {
        expect(service.description.length).toBeGreaterThan(20);
      });
    });

    it('titles are reasonable length', () => {
      services.forEach((service: Service) => {
        expect(service.title.length).toBeGreaterThan(3);
        expect(service.title.length).toBeLessThan(100);
      });
    });
  });

  describe('location-based services', () => {
    it('has location services for Upstate SC', () => {
      const locationSlugs = services
        .filter(s => s.category === 'Location-Based Services')
        .map(s => s.slug);

      expect(locationSlugs).toContain('ai-greenville');
      expect(locationSlugs).toContain('ai-greer');
      expect(locationSlugs).toContain('ai-simpsonville');
      expect(locationSlugs).toContain('ai-spartanburg');
    });
  });

  describe('technical services', () => {
    it('has core AI services', () => {
      const technicalSlugs = services
        .filter(s => s.category === 'Technical Services')
        .map(s => s.slug);

      expect(technicalSlugs).toContain('custom-chatbots');
      expect(technicalSlugs).toContain('llm-development');
      expect(technicalSlugs).toContain('rag-development');
      expect(technicalSlugs).toContain('ai-consulting');
    });
  });
});
