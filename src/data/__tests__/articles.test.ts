import { describe, it, expect } from 'vitest';
import { articles, sections, Article } from '../articles';

describe('articles data', () => {
  describe('data integrity', () => {
    it('has articles array with content', () => {
      expect(articles).toBeDefined();
      expect(Array.isArray(articles)).toBe(true);
      expect(articles.length).toBeGreaterThan(0);
    });

    it('has exactly 33 articles', () => {
      expect(articles).toHaveLength(33);
    });

    it('all articles have required fields', () => {
      articles.forEach((article: Article) => {
        expect(article.slug).toBeDefined();
        expect(typeof article.slug).toBe('string');
        expect(article.slug.length).toBeGreaterThan(0);

        expect(article.title).toBeDefined();
        expect(typeof article.title).toBe('string');
        expect(article.title.length).toBeGreaterThan(0);

        expect(article.description).toBeDefined();
        expect(typeof article.description).toBe('string');
        expect(article.description.length).toBeGreaterThan(0);

        expect(article.section).toBeDefined();
        expect(typeof article.section).toBe('string');
        expect(article.section.length).toBeGreaterThan(0);

        expect(article.sectionDescription).toBeDefined();
        expect(typeof article.sectionDescription).toBe('string');

        expect(article.order).toBeDefined();
        expect(typeof article.order).toBe('number');
        expect(article.order).toBeGreaterThan(0);
      });
    });

    it('has unique slugs', () => {
      const slugs = articles.map(article => article.slug);
      const uniqueSlugs = new Set(slugs);
      expect(uniqueSlugs.size).toBe(slugs.length);
    });

    it('has unique order values', () => {
      const orders = articles.map(article => article.order);
      const uniqueOrders = new Set(orders);
      expect(uniqueOrders.size).toBe(orders.length);
    });

    it('order values are sequential from 1 to 33', () => {
      const orders = articles.map(article => article.order).sort((a, b) => a - b);
      for (let i = 0; i < orders.length; i++) {
        expect(orders[i]).toBe(i + 1);
      }
    });

    it('slugs follow URL-safe format', () => {
      const urlSafeRegex = /^[a-z0-9-]+$/;
      articles.forEach((article: Article) => {
        expect(article.slug).toMatch(urlSafeRegex);
      });
    });
  });

  describe('sections', () => {
    it('has sections array with content', () => {
      expect(sections).toBeDefined();
      expect(Array.isArray(sections)).toBe(true);
      expect(sections.length).toBeGreaterThan(0);
    });

    it('has exactly 7 sections', () => {
      expect(sections).toHaveLength(7);
    });

    it('all sections have required fields', () => {
      sections.forEach(section => {
        expect(section.title).toBeDefined();
        expect(typeof section.title).toBe('string');
        expect(section.title.length).toBeGreaterThan(0);

        expect(section.description).toBeDefined();
        expect(typeof section.description).toBe('string');

        expect(section.articles).toBeDefined();
        expect(Array.isArray(section.articles)).toBe(true);
        expect(section.articles.length).toBeGreaterThan(0);
      });
    });

    it('section titles match article sections', () => {
      const sectionTitles = sections.map(s => s.title);
      const articleSections = new Set(articles.map(a => a.section));

      articleSections.forEach(section => {
        expect(sectionTitles).toContain(section);
      });
    });

    it('all articles are categorized into sections', () => {
      const articlesInSections = sections.reduce((acc, section) => {
        return acc + section.articles.length;
      }, 0);
      expect(articlesInSections).toBe(articles.length);
    });

    it('sections have expected names', () => {
      const expectedSections = [
        'Understanding the Basics of AI',
        'Understanding Chatbots',
        'Advanced AI Concepts',
        'Building Custom Solutions',
        'Quality and Safety',
        'Business Applications',
        'Working with Experts',
      ];
      const sectionTitles = sections.map(s => s.title);
      expectedSections.forEach(expected => {
        expect(sectionTitles).toContain(expected);
      });
    });
  });

  describe('content quality', () => {
    it('descriptions are meaningful (>20 characters)', () => {
      articles.forEach((article: Article) => {
        expect(article.description.length).toBeGreaterThan(20);
      });
    });

    it('titles are reasonable length', () => {
      articles.forEach((article: Article) => {
        expect(article.title.length).toBeGreaterThan(5);
        expect(article.title.length).toBeLessThan(150);
      });
    });
  });
});
