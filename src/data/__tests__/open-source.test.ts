import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { openSourcePackages, packageNameList } from '../open-source';

describe('openSourcePackages', () => {
  it('is a well-formed list with unique names and real PyPI/GitHub links', () => {
    expect(openSourcePackages.length).toBeGreaterThan(0);
    const names = openSourcePackages.map((p) => p.name);
    expect(new Set(names).size).toBe(names.length);
    for (const pkg of openSourcePackages) {
      expect(pkg.pypi).toBe(`https://pypi.org/project/${pkg.name}/`);
      expect(pkg.repo).toBe(`https://github.com/adammatthewsteinberger/${pkg.name}`);
      expect(['loop', 'vibey']).toContain(pkg.family);
      expect(pkg.tagline.length).toBeGreaterThan(0);
      expect(pkg.description.length).toBeGreaterThan(0);
    }
  });

  it('lists the *loop engines before the vibey tooling', () => {
    const families = openSourcePackages.map((p) => p.family);
    const firstVibey = families.indexOf('vibey');
    expect(families.slice(0, firstVibey).every((f) => f === 'loop')).toBe(true);
    expect(families.slice(firstVibey).every((f) => f === 'vibey')).toBe(true);
  });

  it('formats the names as an Oxford-comma list', () => {
    expect(packageNameList()).toMatch(/^claudeloop, .*, and vibey-skills$/);
    expect(packageNameList(openSourcePackages.slice(0, 2))).toBe('claudeloop, and codexloop');
  });
});

// House rule (see src/data/open-source.ts): the site names its packages and
// never counts them. Counts drifted three times in a month; this keeps the
// next one out. Scans the copy surfaces a visitor or crawler actually reads.
const COUNT_PATTERN =
  /\b(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|\d+)\s+(?:[\w*-]+\s+){0,3}packages?\b/i;

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '__tests__' || entry.name === 'generated') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(tsx?|txt)$/.test(entry.name) && !/\.test\.tsx?$/.test(entry.name)) out.push(full);
  }
  return out;
}

describe('no package counts in site copy', () => {
  const root = process.cwd();
  const files = [
    ...walk(path.join(root, 'src/app')),
    ...walk(path.join(root, 'src/components')),
    ...walk(path.join(root, 'src/data')),
    path.join(root, 'public/llms.txt'),
  ];

  it('scans a meaningful set of files', () => {
    expect(files.length).toBeGreaterThan(20);
  });

  it.each(files.map((f) => [path.relative(root, f), f]))('%s states no package count', (_rel, file) => {
    const text = fs.readFileSync(file, 'utf8');
    const hit = text.match(COUNT_PATTERN);
    expect(hit?.[0] ?? null).toBeNull();
  });
});
