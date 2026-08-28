import { describe, expect, it } from 'vitest';
import { INVITATION, INVITATION_CTA, quickstart } from '../quickstart';

describe('quickstart', () => {
  it('is a generic, runnable sequence that starts with installing vibey and an engine', () => {
    expect(quickstart[0].cmd).toBe('uv tool install vibey');
    expect(quickstart[1].cmd).toMatch(/claudeloop/);
    for (const step of quickstart) {
      expect(step.cmd).toMatch(/^(uv tool install|vibey) /);
      expect(step.note.length).toBeGreaterThan(10);
      expect(step.cmd).not.toMatch(/adam|hire-adam|matthewsteinberger/i);
    }
  });

  it('carries the bio invitation verbatim', () => {
    expect(INVITATION).toBe('Greenville-remote or US-remote volunteers are welcome and encouraged to get involved at any time.');
    expect(INVITATION_CTA).toBe('Everything a developer needs to get started');
  });
});
