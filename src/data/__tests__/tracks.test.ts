import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { tracks } from '../tracks';
import { audiences } from '../audiences';
import { FREELANCE_SUMMARY } from '../freelance';

describe('tracks', () => {
  it('are in priority order: developers, freelance, academia, governments, nonprofits, industry', () => {
    expect(tracks.map((t) => t.id)).toEqual(['contributors', 'clients', 'academia', 'governments', 'nonprofits', 'employers']);
    expect(tracks.map((t) => t.title)).toEqual([
      'Open-source developers',
      'Freelance projects',
      'Universities and academia',
      'Governments and military',
      'Nonprofits',
      'Industry and hiring teams',
    ]);
  });

  it('take the audience tracks from /join-me, word for word', () => {
    const academia = tracks.find((t) => t.id === 'academia')!;
    const governments = tracks.find((t) => t.id === 'governments')!;
    const nonprofits = tracks.find((t) => t.id === 'nonprofits')!;

    expect(academia.summary).toBe(audiences.find((a) => a.id === 'academia')?.summary);
    expect(academia.href).toBe('/join-me#academia');
    expect(academia.cta).toBe(audiences.find((a) => a.id === 'academia')?.cta);

    expect(governments.summary).toBe(audiences.find((a) => a.id === 'governments')?.summary);
    expect(governments.href).toBe('/join-me#governments');
    expect(governments.cta).toBe(audiences.find((a) => a.id === 'governments')?.cta);

    expect(nonprofits.summary).toBe(audiences.find((a) => a.id === 'nonprofits')?.summary);
    expect(nonprofits.href).toBe('/join-me#nonprofits');
    expect(nonprofits.cta).toBe(audiences.find((a) => a.id === 'nonprofits')?.cta);
  });

  it('lead with the developer audience from /join-me, word for word', () => {
    const [contributors] = tracks;
    expect(contributors.summary).toBe(audiences[0].summary);
    expect(contributors.href).toBe('/join-me#developers');
  });

  it('describe freelance work from its own source as track 2', () => {
    expect(tracks[1].summary).toBe(FREELANCE_SUMMARY);
    expect(tracks[1].href).toBe('/freelance');
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
