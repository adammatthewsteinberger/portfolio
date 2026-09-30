import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { tracks } from '../tracks';
import { audiences } from '../audiences';
import { FREELANCE_SUMMARY } from '../freelance';

describe('tracks', () => {
  it('are in priority order: open-source developers, then clients, then employers', () => {
    expect(tracks.map((t) => t.id)).toEqual(['contributors', 'clients', 'employers']);
  });

  it('lead with the developer audience from /join-me, word for word', () => {
    const [contributors] = tracks;
    expect(contributors.summary).toBe(audiences[0].summary);
    expect(contributors.href).toBe('/join-me#developers');
  });

  it('describe freelance work from its own source', () => {
    expect(tracks[1].summary).toBe(FREELANCE_SUMMARY);
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
