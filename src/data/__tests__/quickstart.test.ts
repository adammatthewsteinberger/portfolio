import { describe, expect, it } from 'vitest';
import { INVITATION, INVITATION_CTA, quickstart } from '../quickstart';

describe('quickstart', () => {
  it('is vibey 1.0 README quickstart: one install, a database, then vibey commands', () => {
    expect(quickstart[0].cmd).toBe('uv tool install vibey');
    expect(quickstart[1].cmd).toMatch(/^export VIBEY_PG_URL=/);
    for (const step of quickstart.slice(2)) {
      expect(step.cmd).toMatch(/^vibey /);
    }
    // The default provider is an offline test double; a live run has to name one.
    expect(quickstart.find((step) => step.cmd.startsWith('vibey worker'))?.cmd).toMatch(/--provider claudeloop/);
    // Engines ship inside vibey (ADR-0037): nothing installs a *loop on its own.
    expect(quickstart.some((step) => /uv tool install \w+loop/.test(step.cmd))).toBe(false);
    for (const step of quickstart) {
      expect(step.note.length).toBeGreaterThan(10);
      expect(step.cmd).not.toMatch(/adam|hire-adam|matthewsteinberger/i);
    }
  });

  it('carries the bio invitation verbatim', () => {
    expect(INVITATION).toBe('Greenville-remote or US-remote volunteers are welcome and encouraged to get involved at any time.');
    expect(INVITATION_CTA).toBe('Everything a developer needs to get started');
  });
});
