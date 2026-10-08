import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { tracks } from '../tracks';
import { audiences } from '../audiences';
import { FREELANCE_SUMMARY } from '../freelance';

describe('tracks', () => {
  it('are in priority order: developers, nonprofits, academia, governments, freelance, industry', () => {
    expect(tracks.map((t) => t.id)).toEqual(['contributors', 'nonprofits', 'academia', 'governments', 'clients', 'employers']);
    expect(tracks.map((t) => t.title)).toEqual([
      'Open-source developers',
      'Nonprofits',
      'Universities and academia',
      'Governments and military',
      'Freelance projects',
      'Industry and hiring teams',
    ]);
  });

  it('take the four vibey audiences from /join-me, word for word, in the same relative order', () => {
    const [, ...rest] = tracks.slice(0, 4);
    expect(rest.map((t) => t.summary)).toEqual(audiences.slice(1).map((a) => a.summary));
    expect(rest.map((t) => t.href)).toEqual(['/join-me#nonprofits', '/join-me#academia', '/join-me#governments']);
    expect(rest.map((t) => t.cta)).toEqual(audiences.slice(1).map((a) => a.cta));
  });

  it('lead with the developer audience from /join-me, word for word', () => {
    const [contributors] = tracks;
    expect(contributors.summary).toBe(audiences[0].summary);
    expect(contributors.href).toBe('/join-me#developers');
  });

  it('describe freelance work from its own source', () => {
    expect(tracks[4].summary).toBe(FREELANCE_SUMMARY);
    expect(tracks[4].href).toBe('/freelance');
    expect(tracks[5].href).toBe('/hire-me');
  });

  it('link to pages that exist', () => {
    for (const track of tracks) {
      const route = track.href.split('#')[0];
      expect(fs.existsSync(path.join(process.cwd(), 'src/app', route, 'page.tsx')), route).toBe(true);
    }
  });

  it('describe the work, never a target employer', () => {
    expect(JSON.stringify(tracks)).not.toMatch(/anthropic|palantir/i);
  });
});
