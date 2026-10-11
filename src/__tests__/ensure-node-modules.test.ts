import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

// `npm run worktree:deps` gives a vibey BUILD worktree its node_modules by cloning the nearest
// ancestor checkout's. It used to stop at "node_modules already present" for ANY directory of
// that name, and Vitest writes node_modules/.vite when it runs, so a test run in a worktree before
// the script ran left a directory with no packages in it. Every build after that failed with
// "Could not find the Next.js package", and an unattended repair loop spent hours on it.

const script = path.resolve(__dirname, '../../scripts/ensure-node-modules.mjs');

let root: string;
let worktree: string;

beforeEach(() => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), 'ensure-node-modules-'));
  fs.writeFileSync(path.join(root, 'package.json'), '{}');
  fs.mkdirSync(path.join(root, 'node_modules', 'next'), { recursive: true });
  fs.writeFileSync(path.join(root, 'node_modules', 'next', 'package.json'), '{"name":"next"}');
  worktree = path.join(root, '.vibey', 'worktrees', 'cycle', 'item');
  fs.mkdirSync(worktree, { recursive: true });
});

afterEach(() => {
  fs.rmSync(root, { recursive: true, force: true });
});

function run(): string {
  return execFileSync('node', [script], { cwd: worktree, encoding: 'utf8' });
}

const cloned = () => path.join(worktree, 'node_modules', 'next', 'package.json');

describe('scripts/ensure-node-modules.mjs', () => {
  it('clones the ancestor checkout when the worktree has no node_modules', () => {
    expect(run()).toContain('cloned');
    expect(fs.existsSync(cloned())).toBe(true);
  });

  it('leaves a node_modules that already holds packages alone', () => {
    fs.mkdirSync(path.join(worktree, 'node_modules', 'left-pad'), { recursive: true });

    expect(run()).toContain('already present');
    expect(fs.existsSync(path.join(worktree, 'node_modules', 'left-pad'))).toBe(true);
    expect(fs.existsSync(cloned())).toBe(false); // nothing was cloned over it
  });

  it('replaces a node_modules that only holds a tool cache, such as Vitest’s .vite', () => {
    fs.mkdirSync(path.join(worktree, 'node_modules', '.vite', 'vitest'), { recursive: true });

    const output = run();

    expect(output).toContain('holds no packages');
    expect(fs.existsSync(cloned())).toBe(true); // the clone ran, which the old check skipped
    expect(fs.existsSync(path.join(worktree, 'node_modules', '.vite'))).toBe(false);
  });

  it('replaces a node_modules with nothing in it at all', () => {
    fs.mkdirSync(path.join(worktree, 'node_modules'));

    run();

    expect(fs.existsSync(cloned())).toBe(true);
  });

  it('fails, and says to run npm ci, when no ancestor has node_modules to clone', () => {
    fs.rmSync(path.join(root, 'node_modules'), { recursive: true });

    expect(() => execFileSync('node', [script], { cwd: worktree, stdio: 'pipe' })).toThrow();
  });
});
