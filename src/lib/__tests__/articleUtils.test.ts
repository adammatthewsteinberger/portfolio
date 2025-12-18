import { describe, it, expect, vi, beforeEach } from 'vitest';
import { extractArticleContent, readArticleFile } from '../articleUtils';

// Use vi.hoisted to create mocks that are available during vi.mock hoisting
const { mockReadFileSync } = vi.hoisted(() => ({
  mockReadFileSync: vi.fn(),
}));

// Mock fs module with factory using hoisted functions
vi.mock('fs', () => ({
  default: {
    readFileSync: mockReadFileSync,
  },
  readFileSync: mockReadFileSync,
}));

describe('articleUtils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('extractArticleContent', () => {
    it('extracts title from HTML', () => {
      const html = `<title>Test Title | Novice to Navigator Series | Adam Matthew Steinberger</title>`;

      const result = extractArticleContent(html);

      expect(result.title).toBe('Test Title');
    });

    it('extracts audio file source', () => {
      const html = `<source src="../audio/test-audio.wav" type="audio/wav">`;

      const result = extractArticleContent(html);

      expect(result.audioFile).toBe('test-audio.wav');
    });

    it('returns undefined audioFile when no audio present', () => {
      const html = `<title>No Audio</title>`;

      const result = extractArticleContent(html);

      expect(result.audioFile).toBeUndefined();
    });

    it('extracts meta information', () => {
      const html = `
        <span><i class="fas fa-calendar-alt"></i>January 2025</span>
        <span><i class="fas fa-book-open"></i>Section 1</span>
        <span><i class="fas fa-clock"></i>5 min read</span>
      `;

      const result = extractArticleContent(html);

      expect(result.meta.date).toBe('January 2025');
      expect(result.meta.section).toBe('Section 1');
      expect(result.meta.readTime).toBe('5 min read');
    });

    it('handles missing meta fields gracefully', () => {
      const html = `<title>Test</title>`;

      const result = extractArticleContent(html);

      expect(result.meta.date).toBe('');
      expect(result.meta.section).toBe('');
      expect(result.meta.readTime).toBe('');
    });

    it('extracts and cleans article content', () => {
      const html = `
        <article class="article-content">
          <p class="test">Hello World</p>
          <br>
          <hr>
        </article>
      `;

      const result = extractArticleContent(html);

      expect(result.content).toContain('className="test"');
      expect(result.content).toContain('<br />');
      expect(result.content).toContain('<hr />');
    });

    it('removes script and style tags from content', () => {
      const html = `
        <article class="article-content">
          <p>Keep this</p>
          <script>alert('bad');</script>
          <style>.hidden { display: none; }</style>
          <p>And this</p>
        </article>
      `;

      const result = extractArticleContent(html);

      expect(result.content).toContain('Keep this');
      expect(result.content).toContain('And this');
      expect(result.content).not.toContain('script');
      expect(result.content).not.toContain('style');
      expect(result.content).not.toContain('alert');
    });

    it('returns empty content when article tags are missing', () => {
      const html = `
        <div>
          <p>This is not an article</p>
        </div>
      `;

      const result = extractArticleContent(html);

      expect(result.content).toBe('');
    });

    it('converts img, input, audio, source tags to self-closing', () => {
      const html = `
        <article class="article-content">
          <img src="test.jpg" alt="test">
          <input type="text" name="test">
          <audio controls>
          <source src="audio.mp3" type="audio/mp3">
        </article>
      `;

      const result = extractArticleContent(html);

      expect(result.content).toContain('<img src="test.jpg" alt="test" />');
      expect(result.content).toContain('<input type="text" name="test" />');
    });
  });

  describe('readArticleFile', () => {
    it('reads file and returns extracted content', () => {
      const htmlContent = `
        <title>File Test | Novice to Navigator Series | Adam Matthew Steinberger</title>
        <article class="article-content">
          <p>File content</p>
        </article>
      `;

      mockReadFileSync.mockReturnValue(htmlContent);

      const result = readArticleFile('/path/to/article.html');

      expect(mockReadFileSync).toHaveBeenCalledWith('/path/to/article.html', 'utf-8');
      expect(result.title).toBe('File Test');
      expect(result.content).toContain('File content');
    });

    it('throws when file does not exist', () => {
      mockReadFileSync.mockImplementation(() => {
        throw new Error('ENOENT: no such file or directory');
      });

      expect(() => readArticleFile('/nonexistent/path.html')).toThrow();
    });
  });
});
