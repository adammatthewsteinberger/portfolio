import { describe, expect, it } from 'vitest';
import { INVITATION, INVITATION_CTA, quickstart } from '../quickstart';

describe('quickstart', () => {
  it('is the vibey 4.2 README quickstart: one install, a database, then vibey commands', () => {
    expect(quickstart[0].cmd).toBe('uv tool install vibey-engine');
    expect(quickstart[1].cmd).toMatch(/^export VIBEY_PG_URL=/);
    for (const step of quickstart.slice(2)) {
      expect(step.cmd).toMatch(/^vibey /);
    }
    // The paid path names its provider and its engines; Cursor and Antigravity are
    // retired (ADR-0078) and 4.x refuses a config that still names them.
    const worker = quickstart.find((step) => step.cmd.startsWith('vibey worker'))?.cmd;
    expect(worker).toMatch(/--provider claudeloop/);
    expect(worker).toMatch(/--engines claudeloop,codexloop/);
    expect(worker).not.toMatch(/agyloop|cursorloop/);
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
