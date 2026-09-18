import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

// Vitest reads every key under `coverage.thresholds` other than the four metrics,
// `perFile`, and `autoUpdate` as a glob pattern. The old `thresholds.global` block
// therefore matched no file, and the "100% required" floor was never enforced:
// a 99.82% run exited 0. This keeps the floor where vitest actually reads it.
// Read as source because importing the config pulls vite into the jsdom test env.
const source = fs.readFileSync(path.join(process.cwd(), 'vitest.config.ts'), 'utf8');
const block = source.match(/thresholds:\s*\{([^}]*)\}/)?.[1] ?? '';

describe('vitest coverage floor', () => {
  it('sets all four metrics to 100 as top-level thresholds', () => {
    for (const metric of ['statements', 'branches', 'functions', 'lines']) {
      expect(block, metric).toMatch(new RegExp(`\\b${metric}:\\s*100\\b`));
    }
  });

  it('has no nested `global` block, which vitest would treat as a glob', () => {
    expect(source).not.toMatch(/thresholds:\s*\{\s*global\s*:/);
    expect(block).not.toMatch(/\bglobal\b/);
  });
});
