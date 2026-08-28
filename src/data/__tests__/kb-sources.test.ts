import { describe, it, expect } from 'vitest';
import { kbSources } from '../kb-sources';

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
      text: expect.stringContaining('https://chat.with.adam.matthewsteinberger.com'),
    });
    expect(chatChunk?.text).toContain('six questions');
  });
});
