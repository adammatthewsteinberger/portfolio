import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { VIBEY_DISTRIBUTION, openSourcePackages, packageNameList } from '../open-source';

describe('openSourcePackages', () => {
  it('is a well-formed list with unique names, each linking into the one vibey repository', () => {
    expect(openSourcePackages.length).toBeGreaterThan(0);
    const names = openSourcePackages.map((p) => p.name);
    expect(new Set(names).size).toBe(names.length);
    for (const pkg of openSourcePackages) {
      expect(['loop', 'vibey']).toContain(pkg.family);
      expect(pkg.tagline.length).toBeGreaterThan(0);
      expect(pkg.description.length).toBeGreaterThan(0);
      expect(pkg.links.length).toBeGreaterThan(0);
      for (const link of pkg.links) {
        expect(
          link.href.startsWith(`${VIBEY_DISTRIBUTION.repo}/tree/develop/src/`) ||
            [VIBEY_DISTRIBUTION.pypi, VIBEY_DISTRIBUTION.repo, VIBEY_DISTRIBUTION.docs].includes(link.href as never),
          `${pkg.name}: ${link.href}`,
        ).toBe(true);
      }
    }
  });

  it('points runners at src/vibey_runners, tools at src/vibey_tools, and only vibey at PyPI', () => {
    const source = (name: string) => openSourcePackages.find((p) => p.name === name)!.links[0].href;
    const tree = `${VIBEY_DISTRIBUTION.repo}/tree/develop`;
    expect(source('claudeloop')).toBe(`${tree}/src/vibey_runners/claude`);
    expect(source('codexloop')).toBe(`${tree}/src/vibey_runners/codex`);
    expect(source('cursorloop')).toBe(`${tree}/src/vibey_runners/cursor`);
    expect(source('agyloop')).toBe(`${tree}/src/vibey_runners/agy`);
    expect(source('qwenloop')).toBe(`${tree}/src/vibey_runners/qwen`);
    expect(source('vibey-gh')).toBe(`${tree}/src/vibey_tools/gh`);
    expect(source('vibey-bootstrap')).toBe(`${tree}/src/vibey_tools/bootstrap`);
    expect(source('vibey-skills')).toBe(`${tree}/src/vibey_tools/skills`);
    const pypi = openSourcePackages.filter((p) => p.links.some((l) => l.href.startsWith('https://pypi.org/')));
    expect(pypi.map((p) => p.name)).toEqual(['vibey']);
    expect(VIBEY_DISTRIBUTION).toEqual({
      install: 'uv tool install vibey',
      pypi: 'https://pypi.org/project/vibey/',
      repo: 'https://github.com/the-vibey-project/vibey',
      docs: 'https://the-vibey-project.github.io/vibey/main/',
    });
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

// Since vibey 1.0.0 the family is one repository and one PyPI distribution;
// the old per-package repositories and PyPI projects 404. None may come back.
describe('no links to retired package homes', () => {
  const root = process.cwd();
  const RETIRED =
    /github\.com\/adammatthewsteinberger\/(claudeloop|codexloop|cursorloop|agyloop|qwenloop|vibey|vibey-gh|vibey-bootstrap|vibey-skills|vibe-engineering-skills|azure-bootstrap)\b|pypi\.org\/(project|user)\/(claudeloop|codexloop|cursorloop|agyloop|qwenloop|vibey-gh|vibey-bootstrap|vibey-skills|azure-bootstrap|adammatthewsteinberger)\b/;
  const surfaces = [
    ...walk(path.join(root, 'src/app')),
    ...walk(path.join(root, 'src/components')),
    ...walk(path.join(root, 'src/data')),
    path.join(root, 'public/llms.txt'),
    path.join(root, 'README.md'),
  ];

  it.each(surfaces.map((f) => [path.relative(root, f), f]))('%s links to no retired package home', (_rel, file) => {
    const hit = fs.readFileSync(file, 'utf8').match(RETIRED);
    expect(hit?.[0] ?? null).toBeNull();
  });
});
