import { describe, expect, it } from 'vitest';
import { VIBEY, academiaItems, audiences, getStartedSteps, governmentClaims, helpWanted } from '../audiences';

describe('audiences', () => {
  it('are developers, then governments and military, then universities and academia', () => {
    expect(audiences.map((a) => a.id)).toEqual(['developers', 'governments', 'academia']);
    expect(audiences.map((a) => a.title)).toEqual(['Developers', 'Governments and military', 'Universities and academia']);
    for (const audience of audiences) {
      expect(audience.href).toBe(`/join-me#${audience.id}`);
      expect(audience.summary.length).toBeGreaterThan(40);
      expect(audience.cta.length).toBeGreaterThan(0);
    }
    expect(audiences[0].summary).toMatch(/looking for developers to help build vibey/i);
  });
});

describe('the developer path', () => {
  it('follows vibey’s CONTRIBUTING: set up, gates, issue, branch from develop, PR into develop', () => {
    expect(getStartedSteps.map((s) => s.title)).toEqual([
      'Set up the repository',
      'Run the gates',
      'Pick an issue',
      'Branch from develop and commit conventionally',
      'Open a pull request into develop, never main',
    ]);
    const commands = getStartedSteps.flatMap((s) => s.commands);
    expect(commands).toContain('git clone https://github.com/the-vibey-project/vibey.git && cd vibey');
    expect(commands).toContain('uv sync --extra dev');
    expect(commands).toContain('uv run pre-commit run --all-files --hook-stage pre-push');
    expect(commands).toContain('git checkout -b feature/short-description develop');
    const body = getStartedSteps.map((s) => s.body).join(' ');
    expect(body).toMatch(/Conventional Commits/);
    expect(body).toMatch(/merge train/);
    expect(body).toMatch(/good first issue/);
  });

  it('points help at real, linked work', () => {
    expect(helpWanted.length).toBeGreaterThan(0);
    for (const item of helpWanted) expect(item.source.href.startsWith(VIBEY.repo) || item.source.href.startsWith(VIBEY.docs)).toBe(true);
  });
});

describe('claims', () => {
  const all = [...governmentClaims, ...academiaItems];

  it('every claim cites a source in the vibey repository or on its docs site', () => {
    for (const claim of all) {
      expect(claim.body.length).toBeGreaterThan(60);
      expect(claim.source.href.startsWith(VIBEY.repo) || claim.source.href.startsWith(VIBEY.docs)).toBe(true);
    }
  });

  it('never claims a customer, contract, clearance, accreditation, endorsement, or affiliation', () => {
    const text = all.map((c) => `${c.title} ${c.body}`).join(' ');
    expect(text).not.toMatch(/\b(customers?|contracts?|clearances?|accredit\w*|endorse\w*|affiliat\w*|partnered with|trusted by|used by|deployed (at|by|in))\b/i);
  });

  it('states the known sovereign gap instead of overclaiming', () => {
    const sovereign = governmentClaims[0];
    expect(sovereign.body).toMatch(/issue #115/);
    // The rules prefer the fully local path; the page must not claim vibey already runs that way end to end.
    expect(sovereign.body).not.toMatch(/(runs|operates|works) (fully|entirely|completely) (locally|offline)|air-gapped/i);
  });

  it('never claims an SBOM, which vibey does not publish', () => {
    expect(all.map((c) => c.body).join(' ')).not.toMatch(/SBOM|software bill of materials/i);
  });

  it('uses the paper and book as published', () => {
    expect(VIBEY.paperHtml).toBe('https://the-vibey-project.github.io/vibey/main/paper/');
    expect(VIBEY.paperPdf).toBe('https://the-vibey-project.github.io/vibey/main/paper.pdf');
    expect(VIBEY.bookPdf).toBe('https://the-vibey-project.github.io/vibey/main/book.pdf');
    expect(VIBEY.goodFirstIssues).toBe('https://github.com/the-vibey-project/vibey/issues?q=is%3Aissue%20is%3Aopen%20label%3A%22good%20first%20issue%22');
  });
});
