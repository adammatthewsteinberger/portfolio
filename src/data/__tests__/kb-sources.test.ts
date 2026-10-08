import { describe, it, expect } from 'vitest';
import { openSourcePackages } from '../open-source';
import { freelanceChunks, joinMeChunks, kbSources } from '../kb-sources';
import { freelanceFaq, offers } from '../freelance';
import { academiaItems, audiences, getStartedSteps, governmentClaims, nonprofitClaims } from '../audiences';

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

  // Hiring was restored as a track (PR #100): the bot can answer from /hire-me,
  // but it never pitches the retired executive edition, the consulting catalogue, or a booking.
  it('answers hiring questions from /hire-me and never pitches consulting', () => {
    const hire = kbSources.filter((s) => s.url === '/hire-me');
    expect(hire.map((s) => s.id)).toEqual(expect.arrayContaining(['hire-me-facts', 'hire-me-looking', 'evidence-staff']));
    expect(hire.find((s) => s.id === 'hire-me-facts')?.text).toMatch(/Availability: Available/);
    const text = kbSources.map((s) => `${s.url} ${s.title} ${s.text}`).join('\n');
    expect(text).not.toMatch(/\/for-executives|\/services/);
    expect(text).not.toMatch(/consulting (call|services)|free consultation|book a (call|consultation)|engage (my|the) (firm|llc)/i);
  });
});

describe('joinMeChunks', () => {
  const chunks = joinMeChunks();

  it('covers the overview and the four audiences, in priority order', () => {
    expect(chunks.map((c) => c.id)).toEqual([
      'join-me-overview',
      'join-me-developers',
      'join-me-nonprofits',
      'join-me-academia',
      'join-me-governments',
    ]);
    expect(chunks.slice(1).map((c) => c.url)).toEqual(audiences.map((a) => a.href));
    for (const chunk of chunks) expect(kbSources).toContainEqual(chunk);
  });

  it('is generated from the page data, so the bot and /join-me cannot drift', () => {
    const [overview, developers, nonprofits, academia, governments] = chunks;
    expect(overview.text).toContain('looking for developers to help build vibey');
    for (const audience of audiences) expect(overview.text).toContain(audience.title);
    for (const step of getStartedSteps) expect(developers.text).toContain(step.title);
    expect(developers.text).toContain('git checkout -b feature/short-description develop');
    expect(developers.text).not.toContain('`');
    for (const claim of nonprofitClaims) expect(nonprofits.text).toContain(claim.title);
    expect(nonprofits.text).toContain('claims no nonprofit customer, partnership, grant, or endorsement');
    expect(nonprofits.text).not.toContain('`');
    for (const claim of governmentClaims) expect(governments.text).toContain(claim.title);
    expect(governments.text).toContain('claims no government or military customer');
    for (const item of academiaItems) expect(academia.text).toContain(item.title);
    expect(academia.text).toContain('https://the-vibey-project.github.io/vibey/main/paper.pdf');
  });
});

describe('freelanceChunks', () => {
  const chunks = freelanceChunks();

  it('covers the overview, one chunk per package, and the questions', () => {
    expect(chunks.map((c) => c.id)).toEqual(['freelance-overview', ...offers.map((o) => `freelance-${o.id}`), 'freelance-faq']);
    for (const chunk of chunks) expect(kbSources).toContainEqual(chunk);
  });

  it('is generated from the page data, so the bot and /freelance cannot drift', () => {
    const [overview] = chunks;
    for (const offer of offers) {
      expect(overview.text).toContain(offer.title);
      const chunk = chunks.find((c) => c.id === `freelance-${offer.id}`);
      expect(chunk?.url).toBe(`/freelance#${offer.id}`);
      expect(chunk?.text).toContain(offer.proof);
      expect(chunk?.text).toContain(offer.proofHref);
    }
    for (const q of freelanceFaq()) expect(chunks.at(-1)?.text).toContain(q.question);
  });

  it('tells the bot there is no price to quote, and how to start', () => {
    expect(chunks[0].text).toMatch(/this site publishes none/);
    expect(chunks[0].text).toContain('/freelance#brief');
    expect(chunks.map((c) => c.text).join(' ')).not.toMatch(/[$€£]\s?\d/);
  });
});
