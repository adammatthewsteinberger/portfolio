import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getCollectionEntry,
  getCollectionSlugs,
  getAllCollectionEntries,
  getRelatedEntries,
} from '../collectionUtils';

const { mockExistsSync, mockReadFileSync, mockReaddirSync } = vi.hoisted(() => ({
  mockExistsSync: vi.fn(),
  mockReadFileSync: vi.fn(),
  mockReaddirSync: vi.fn(),
}));

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

vi.spyOn(process, 'cwd').mockReturnValue('/mock/project');

const DIR = 'src/content/essays';

/** Builds a Markdown file; every frontmatter line is passed through verbatim. */
const doc = (frontmatter: string[], body = 'Body text.') =>
  `---\n${frontmatter.join('\n')}\n---\n\n${body}`;

const fullDoc = (overrides: Partial<Record<string, string>> = {}) => {
  const fields: Record<string, string> = {
    title: 'An Essay',
    description: 'About a thing',
    author: 'Someone Else',
    publishedDate: '"2025-01-15"',
    readTime: '7 min read',
    tags: '[Theology, Software Development]',
    image: '/images/essays/one.webp',
    ...overrides,
  };
  return doc(Object.entries(fields).map(([key, value]) => `${key}: ${value}`));
};

describe('collectionUtils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getCollectionEntry', () => {
    it('returns an entry with every field', () => {
      mockExistsSync.mockReturnValue(true);
      mockReadFileSync.mockReturnValue(fullDoc());

      const entry = getCollectionEntry(DIR, 'an-essay');

      expect(entry).toEqual({
        slug: 'an-essay',
        title: 'An Essay',
        description: 'About a thing',
        author: 'Someone Else',
        publishedDate: '2025-01-15',
        readTime: '7 min read',
        tags: ['theology', 'software-development'],
        image: '/images/essays/one.webp',
        content: '\nBody text.',
      });
      expect(mockReadFileSync.mock.calls[0][0]).toBe('/mock/project/src/content/essays/an-essay.md');
    });

    it('turns an unquoted YAML date (parsed as a Date) into a YYYY-MM-DD string', () => {
      mockExistsSync.mockReturnValue(true);
      mockReadFileSync.mockReturnValue(fullDoc({ publishedDate: '2025-10-29' }));

      expect(getCollectionEntry(DIR, 'unquoted')?.publishedDate).toBe('2025-10-29');
    });

    it('leaves the date empty rather than inventing one when the source has none', () => {
      mockExistsSync.mockReturnValue(true);
      mockReadFileSync.mockReturnValue(doc(['title: No Date']));

      expect(getCollectionEntry(DIR, 'no-date')?.publishedDate).toBe('');
    });

    it('fills in defaults for optional fields', () => {
      mockExistsSync.mockReturnValue(true);
      mockReadFileSync.mockReturnValue(doc(['title: Bare'], 'word '.repeat(400)));

      const entry = getCollectionEntry(DIR, 'bare');

      expect(entry?.description).toBe('');
      expect(entry?.author).toBe('Adam Matthew Steinberger');
      expect(entry?.readTime).toBe('2 min read');
      expect(entry?.tags).toEqual([]);
      expect(entry?.image).toBeUndefined();
    });

    it('estimates at least one minute for a very short body', () => {
      mockExistsSync.mockReturnValue(true);
      mockReadFileSync.mockReturnValue(doc(['title: Tiny'], ''));

      expect(getCollectionEntry(DIR, 'tiny')?.readTime).toBe('1 min read');
    });

    it('normalizes tag case and spacing and drops duplicates', () => {
      mockExistsSync.mockReturnValue(true);
      mockReadFileSync.mockReturnValue(
        fullDoc({ tags: '[Theology, theology, " Software  Development "]' })
      );

      expect(getCollectionEntry(DIR, 'tags')?.tags).toEqual(['theology', 'software-development']);
    });

    it('treats tags that are not a list as no tags', () => {
      mockExistsSync.mockReturnValue(true);
      mockReadFileSync.mockReturnValue(fullDoc({ tags: 'just-a-string' }));

      expect(getCollectionEntry(DIR, 'bad-tags')?.tags).toEqual([]);
    });

    it('rejects a slug that could leave the content directory without touching the filesystem', () => {
      for (const slug of ['../secret', 'a/b', 'a.b', '']) {
        expect(getCollectionEntry(DIR, slug)).toBeNull();
      }
      expect(mockExistsSync).not.toHaveBeenCalled();
    });

    it('returns null for a slug with no file', () => {
      mockExistsSync.mockReturnValue(false);

      expect(getCollectionEntry(DIR, 'missing')).toBeNull();
    });

    it('logs and returns null when the file cannot be read', () => {
      mockExistsSync.mockReturnValue(true);
      mockReadFileSync.mockImplementation(() => {
        throw new Error('Read error');
      });
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(getCollectionEntry(DIR, 'broken')).toBeNull();
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('getCollectionSlugs', () => {
    it('returns the .md files as sorted slugs and ignores everything else', () => {
      mockExistsSync.mockReturnValue(true);
      mockReaddirSync.mockReturnValue(['b.md', 'draft.txt', '.gitkeep', 'a.md']);

      expect(getCollectionSlugs(DIR)).toEqual(['a', 'b']);
    });

    it('returns an empty list when the directory does not exist', () => {
      mockExistsSync.mockReturnValue(false);

      expect(getCollectionSlugs(DIR)).toEqual([]);
    });

    it('logs and returns an empty list when the directory cannot be read', () => {
      mockExistsSync.mockReturnValue(true);
      mockReaddirSync.mockImplementation(() => {
        throw new Error('Error');
      });
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(getCollectionSlugs(DIR)).toEqual([]);
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('getAllCollectionEntries', () => {
    it('sorts newest first', () => {
      mockExistsSync.mockReturnValue(true);
      mockReaddirSync.mockReturnValue(['old.md', 'new.md']);
      mockReadFileSync.mockImplementation((filePath) =>
        String(filePath).includes('old')
          ? fullDoc({ title: 'Old', publishedDate: '"2024-01-01"' })
          : fullDoc({ title: 'New', publishedDate: '"2025-06-15"' })
      );

      expect(getAllCollectionEntries(DIR).map((entry) => entry.title)).toEqual(['New', 'Old']);
    });

    it('orders entries that share a date by title, so the order is stable', () => {
      mockExistsSync.mockReturnValue(true);
      mockReaddirSync.mockReturnValue(['z-file.md', 'a-file.md']);
      mockReadFileSync.mockImplementation((filePath) =>
        String(filePath).includes('z-file')
          ? fullDoc({ title: 'Alpha', publishedDate: '2025-10-29' })
          : fullDoc({ title: 'Beta', publishedDate: '"2025-10-29"' })
      );

      expect(getAllCollectionEntries(DIR).map((entry) => entry.title)).toEqual(['Alpha', 'Beta']);
    });

    it('skips a slug whose file has since been removed, without failing the batch', () => {
      mockReaddirSync.mockReturnValue(['real.md', 'removed.md']);
      mockExistsSync.mockImplementation((filePath) => !String(filePath).includes('removed'));
      mockReadFileSync.mockReturnValue(fullDoc({ title: 'Real' }));

      expect(getAllCollectionEntries(DIR).map((entry) => entry.title)).toEqual(['Real']);
    });

    it('returns an empty list for a missing directory', () => {
      mockExistsSync.mockReturnValue(false);

      expect(getAllCollectionEntries(DIR)).toEqual([]);
    });
  });

  describe('getRelatedEntries', () => {
    const files: Record<string, string> = {
      current: fullDoc({ title: 'Current', tags: '[theology, autism]' }),
      both: fullDoc({ title: 'Both', tags: '[theology, autism]', publishedDate: '"2025-01-01"' }),
      one: fullDoc({ title: 'One', tags: '[theology]', publishedDate: '"2025-03-01"' }),
      other: fullDoc({ title: 'Other', tags: '[mars]', publishedDate: '"2025-02-01"' }),
      also: fullDoc({ title: 'Also', tags: '[autism]', publishedDate: '"2025-04-01"' }),
    };

    beforeEach(() => {
      mockExistsSync.mockReturnValue(true);
      mockReaddirSync.mockReturnValue(Object.keys(files).map((name) => `${name}.md`));
      mockReadFileSync.mockImplementation((filePath) => {
        const name = String(filePath).split('/').pop()!.replace('.md', '');
        return files[name];
      });
    });

    it('ranks by shared tags first, then newest, and excludes the current entry and non-matches', () => {
      const related = getRelatedEntries(DIR, 'current', ['theology', 'autism']);

      expect(related.map((entry) => entry.title)).toEqual(['Both', 'Also', 'One']);
    });

    it('matches regardless of the case of the tags passed in', () => {
      const related = getRelatedEntries(DIR, 'current', ['Mars']);

      expect(related.map((entry) => entry.title)).toEqual(['Other']);
    });

    it('respects the limit', () => {
      expect(getRelatedEntries(DIR, 'current', ['theology', 'autism'], 1)).toHaveLength(1);
    });

    it('returns nothing when no tags are shared', () => {
      expect(getRelatedEntries(DIR, 'current', ['unrelated'])).toEqual([]);
    });
  });
});
