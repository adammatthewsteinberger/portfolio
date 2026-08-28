import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

// Commercial language is confined to the executive edition (vibey-gh #135).
// The engineering pages and shared components must not carry it. The one
// shared component that renders it (MultipleCTAs, exec variant) reads the
// booking URL from src/data/exec.ts, so the literal lives only there.
const FORBIDDEN = [/tidycal\.com/i, /consulting call/i, /consulting services/i, /free consultation/i, /book a consultation/i];

// src/data/services.ts is the service catalogue itself — executive-edition content by definition.
const ALLOWED_PREFIXES = ['src/app/for-executives/', 'src/app/services/', 'src/data/exec.ts', 'src/data/services.ts'];

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '__tests__' || entry.name === 'generated') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.tsx?$/.test(entry.name) && !/\.test\.tsx?$/.test(entry.name)) out.push(full);
  }
  return out;
}

const root = process.cwd();
const files = [...walk(path.join(root, 'src/app')), ...walk(path.join(root, 'src/components')), ...walk(path.join(root, 'src/data'))]
  .map((f) => path.relative(root, f))
  .filter((rel) => !ALLOWED_PREFIXES.some((p) => rel.startsWith(p)));

describe('no sales framing on engineering pages', () => {
  it('scans the engineering surface', () => {
    expect(files.length).toBeGreaterThan(20);
    expect(files).toContain('src/components/layout/FooterNav.tsx');
    expect(files).not.toContain('src/app/for-executives/engage/page.tsx');
  });

  it.each(files.map((f) => [f]))('%s carries no commercial framing', (rel) => {
    const text = fs.readFileSync(path.join(root, rel), 'utf8');
    for (const pattern of FORBIDDEN) {
      expect(text, `${rel} matches ${pattern}`).not.toMatch(pattern);
    }
  });
});
