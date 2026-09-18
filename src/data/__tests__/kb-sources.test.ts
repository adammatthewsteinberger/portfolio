import { describe, it, expect } from 'vitest';
import { openSourcePackages } from '../open-source';
import { joinMeChunks, kbSources } from '../kb-sources';
import { academiaItems, audiences, getStartedSteps, governmentClaims } from '../audiences';

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
      title: 'Ask about Adam',
      section: 'Chat',
      text: expect.stringContaining('https://chatwithadam.matthewsteinberger.com'),
    });
    expect(chatChunk?.text).toContain('six questions');
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

  it('never tells the bot Adam is looking for work', () => {
    const text = kbSources.map((s) => `${s.url} ${s.title} ${s.text}`).join('\n');
    expect(text).not.toMatch(/\/hire-me|hire me|available (from|starting|for hire)|availability|W2|contract-to-hire|sponsorship|looking for (a role|roles|the next team|work)|résumé/i);
    expect(text).not.toMatch(/\/for-executives|\/services/);
  });
});

describe('joinMeChunks', () => {
  const chunks = joinMeChunks();

  it('covers the overview and the three audiences, in priority order', () => {
    expect(chunks.map((c) => c.id)).toEqual(['join-me-overview', 'join-me-developers', 'join-me-governments', 'join-me-academia']);
    expect(chunks.slice(1).map((c) => c.url)).toEqual(audiences.map((a) => a.href));
    for (const chunk of chunks) expect(kbSources).toContainEqual(chunk);
  });

  it('is generated from the page data, so the bot and /join-me cannot drift', () => {
    const [overview, developers, governments, academia] = chunks;
    expect(overview.text).toContain('looking for developers to help build vibey');
    for (const audience of audiences) expect(overview.text).toContain(audience.title);
    for (const step of getStartedSteps) expect(developers.text).toContain(step.title);
    expect(developers.text).toContain('git checkout -b feature/short-description develop');
    expect(developers.text).not.toContain('`');
    for (const claim of governmentClaims) expect(governments.text).toContain(claim.title);
    expect(governments.text).toContain('claims no government or military customer');
    for (const item of academiaItems) expect(academia.text).toContain(item.title);
    expect(academia.text).toContain('https://the-vibey-project.github.io/vibey/main/paper.pdf');
  });
});
