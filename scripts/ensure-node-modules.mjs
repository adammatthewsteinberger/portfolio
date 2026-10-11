#!/usr/bin/env node
/**
 * Bootstrap `node_modules` for a git worktree (for example vibey's
 * `.vibey/worktrees/<cycle>/<item>/`) by cloning the nearest ancestor
 * checkout's `node_modules`.
 *
 * Why a clone and not a symlink: Turbopack refuses a `node_modules` symlink
 * that points outside the project root ("Symlink [project]/node_modules is
 * invalid"), so `next build` fails. A clone is a real directory. On APFS
 * (macOS) `cp -c` uses clonefile(2) — copy-on-write, near-instant, and it
 * shares blocks with the source; on Linux `--reflink=auto` does the same
 * where the filesystem supports it.
 *
 * Idempotent: exits 0 immediately when `node_modules` already holds packages.
 *
 * A `node_modules` with nothing installed in it does not count. Tools make one on their own:
 * Vitest writes its cache to `node_modules/.vite`, so a test run in a worktree before this
 * script ran leaves a directory holding only dot-folders. Treating that as "present" skipped
 * the clone for good, and every `next build` after it failed with "Could not find the Next.js
 * package", which an unattended repair loop then chased for hours as if it were a code bug.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, rmSync } from 'node:fs';
import { platform } from 'node:os';
import { dirname, join } from 'node:path';

const here = process.cwd();
const target = join(here, 'node_modules');

/** A real install has a package directory in it; a tool cache only has dot-folders. */
function holdsPackages(dir) {
  return readdirSync(dir).some((name) => !name.startsWith('.'));
}

if (existsSync(target)) {
  if (holdsPackages(target)) {
    console.log('node_modules already present — nothing to do');
    process.exit(0);
  }
  console.log('node_modules holds no packages (only tool caches) — replacing it with a clone');
  rmSync(target, { recursive: true, force: true });
}

let dir = dirname(here);
let source = null;
while (dir !== dirname(dir)) {
  if (existsSync(join(dir, 'package.json')) && existsSync(join(dir, 'node_modules'))) {
    source = join(dir, 'node_modules');
    break;
  }
  dir = dirname(dir);
}

if (!source) {
  console.error('ensure-node-modules: no ancestor checkout with node_modules found — run `npm ci` instead');
  process.exit(1);
}

const args = platform() === 'darwin' ? ['-cR', source, target] : ['-R', '--reflink=auto', source, target];
execFileSync('cp', args, { stdio: 'inherit' });
console.log(`cloned ${source} -> ${target}`);
