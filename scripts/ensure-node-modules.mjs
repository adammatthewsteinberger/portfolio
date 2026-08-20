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
 * Idempotent: exits 0 immediately when `node_modules` already exists.
 */
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { platform } from 'node:os';
import { dirname, join } from 'node:path';

const here = process.cwd();
const target = join(here, 'node_modules');

if (existsSync(target)) {
  console.log('node_modules already present — nothing to do');
  process.exit(0);
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
