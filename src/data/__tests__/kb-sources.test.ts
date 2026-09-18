import { describe, it, expect } from 'vitest';
import { isAvailableNow } from '@/lib/availability';
import { openSourcePackages } from '../open-source';
import { kbSources } from '../kb-sources';

/** Closed / renamed packages that must never reappear as current KB inventory. */
const CLOSED_PACKAGE_NAMES = ['engineering-influence-skills', 'content-pipeline-skills'] as const;

describe('kbSources', () => {
  it('is a non-empty array of well-formed KB sources', () => {
    expect(kbSources.length).toBeGreaterThan(0);
    for (const source of kbSources) {
      expect(source.id).toBeTruthy();
      expect(source.url.startsWith('/')).toBe(true);
      expect(source.title).toBeTruthy();
      expect(source.section).toBeTruthy();
      expect(source.text.length).toBeGreaterThan(0);
    }
  });

  it('has unique ids', () => {
    const ids = kbSources.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('contains the chat chunk with required fields and content', () => {
    const chatChunk = kbSources.find((s) => s.id === 'chat');
    expect(chatChunk).toBeDefined();
    expect(chatChunk).toEqual({
      id: 'chat',
      url: '/chat',
      title: 'Ask my résumé',
      section: 'Chat',
      text: expect.stringContaining('https://chatwithadam.matthewsteinberger.com'),
    });
    expect(chatChunk?.text).toContain('six questions');
  });

  it('keeps hire/story availability copy aligned with availability.ts after the flip', () => {
    // The RAG bot answers from these chunks; stale "from September 2026"
    // wording after AVAILABLE_FROM would contradict the live hire-me UI.
    if (!isAvailableNow()) return;

    const hireAndStory = kbSources.filter((s) =>
      ['hire-me-facts', 'story-vizius', 'story-timeline'].includes(s.id),
    );
    expect(hireAndStory).toHaveLength(3);
    for (const source of hireAndStory) {
      expect(source.text.toLowerCase()).not.toMatch(/available from september 2026/);
      expect(source.text.toLowerCase()).toMatch(/available now/);
    }
  });

  it('lists every current open-source package and none of the closed ones', () => {
    const openSourceChunk = kbSources.find((s) => s.id === 'open-source');
    expect(openSourceChunk).toBeDefined();
    const text = openSourceChunk!.text;
    for (const pkg of openSourcePackages) {
      expect(text).toContain(pkg.name);
    }
    for (const closed of CLOSED_PACKAGE_NAMES) {
      expect(text).not.toContain(closed);
    }
  });
});
