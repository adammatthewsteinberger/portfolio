import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

// The site has three tracks, in priority order (src/data/tracks.ts):
// open-source developers who want to help build vibey, teams with a
// fixed-scope project (/freelance), and hiring teams (/hire-me).
//
// The retired consulting pitch (the-vibey-project/vibey#238) stays retired:
// no call booking, no "engage the LLC", no open-ended consulting catalogue,
// and no links to the old executive edition or /services. Freelance work came
// back in a different shape, on 2026-09-30: fixed-scope packages that start
// with a written brief, with no price on the site (src/data/freelance.ts).
// This guard is what keeps the two apart.
//
// This guard reads every copy surface a visitor, a crawler, or the chat
// bot's knowledge base can reach, so the old copy cannot creep back in.

const root = process.cwd();

function walk(dir: string, match: RegExp, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '__tests__' || entry.name === 'generated') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, match, out);
    else if (match.test(entry.name) && !/\.test\.tsx?$/.test(entry.name)) out.push(full);
  }
  return out;
}

const rel = (file: string) => path.relative(root, file);

/** Pages, components, data, and library code: the site's own copy. */
const codeSurfaces = [
  ...['src/app', 'src/components', 'src/data', 'src/lib', 'src/hooks'].flatMap((dir) => walk(path.join(root, dir), /\.tsx?$/)),
  path.join(root, 'public/llms.txt'),
].map(rel);

/** Markdown content: blog posts, Novice to Navigator articles, case studies. */
const contentSurfaces = walk(path.join(root, 'src/content'), /\.md$/).map(rel);

// Client-seeking copy, and links to the pages that carried it.
const CLIENT_SEEKING: RegExp[] = [
  /tidycal\.com/i,
  /free (\d+-minute )?(consultation|consult|call)/i,
  /\b(book|schedule)\s+(?:\w+\s+){0,3}(consult\w*|call)\b/i,
  /consulting (call|services)/i,
  /engage (my|the) (firm|llc)/i,
  /hiring (him|adam) as a (consultant|contractor)\b/i,
];

const RETIRED_LINKS = /["'(`]\/(for-executives|services)(["'/)#?`]|$)/m;

// Educational examples that quote what a chatbot user might type. They are
// content about chatbots, not a pitch, so they are removed before matching.
const QUOTED_EXAMPLES = ['"How do I schedule a consultation?"'];
const withoutExamples = (text: string) => QUOTED_EXAMPLES.reduce((t, example) => t.replaceAll(example, ''), text);

describe('no client-seeking copy on the site', () => {
  it('scans a meaningful set of surfaces', () => {
    expect(codeSurfaces.length).toBeGreaterThan(40);
    expect(codeSurfaces).toContain('src/components/layout/Header.tsx');
    expect(codeSurfaces).toContain('src/data/kb-sources.ts');
    expect(codeSurfaces).toContain('public/llms.txt');
    expect(contentSurfaces.length).toBeGreaterThan(100);
  });

  it.each(codeSurfaces.map((f) => [f]))('%s carries no client-seeking copy', (file) => {
    const text = fs.readFileSync(path.join(root, file), 'utf8');
    for (const pattern of CLIENT_SEEKING) {
      expect(text, `${file} matches ${pattern}`).not.toMatch(pattern);
    }
    expect(text, `${file} links to a retired page`).not.toMatch(RETIRED_LINKS);
  });

  it.each(contentSurfaces.map((f) => [f]))('%s carries no consulting call to action', (file) => {
    const text = withoutExamples(fs.readFileSync(path.join(root, file), 'utf8'));
    for (const pattern of CLIENT_SEEKING) {
      expect(text, `${file} matches ${pattern}`).not.toMatch(pattern);
    }
    expect(text, `${file} links to a retired page`).not.toMatch(/\]\(\/(for-executives|services)\b/);
  });

  it('keeps the retired routes gone', () => {
    for (const route of ['src/app/for-executives', 'src/app/services', 'src/content/services']) {
      expect(fs.existsSync(path.join(root, route)), route).toBe(false);
    }
  });

  it('serves the freelance and hiring pages', () => {
    expect(fs.existsSync(path.join(root, 'src/app/freelance/page.tsx'))).toBe(true);
    expect(fs.existsSync(path.join(root, 'src/app/hire-me/page.tsx'))).toBe(true);
  });
});
