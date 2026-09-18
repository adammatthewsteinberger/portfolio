import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

// The site carries no "looking for work" copy — no hiring page, no
// availability pill, no résumé download, no consulting or booking pitch
// (the-vibey-project/vibey#238). It is for three audiences instead:
// developers who want to help build vibey, then governments and military,
// then universities and academia (src/data/audiences.ts).
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

// Job-seeking and client-seeking copy, and links to the pages that carried it.
const LOOKING_FOR_WORK: RegExp[] = [
  /hire[- ]me\b/i,
  /hiring (him|adam)\b/i,
  /recruiter/i,
  /résumé/i,
  /resume\.pdf|\/resume\/raw\//i,
  /\bavailable (from|starting|now|for hire|for work|september)\b/i,
  /availability(Short|Long|Heading|Fact|Sentence)\b/,
  /contract-to-hire/i,
  /\bW2\b/,
  /sponsorship/i,
  /what i['’]m (not )?looking for/i,
  /looking for (the next|my next|a new|a) (team|role|job|position)/i,
  /open to (work|roles|new roles|opportunities|remote work)/i,
  /tidycal\.com/i,
  /free (\d+-minute )?(consultation|consult|call)/i,
  /\b(book|schedule)\s+(?:\w+\s+){0,3}(consult\w*|call)\b/i,
  /consulting (call|services)/i,
  /engage (my|the) (firm|llc)/i,
];

const RETIRED_LINKS = /["'(`]\/(hire-me|for-executives|services)(["'/)#?`]|$)/m;

// Educational examples that quote what a chatbot user might type. They are
// content about chatbots, not a pitch, so they are removed before matching.
const QUOTED_EXAMPLES = ['"How do I schedule a consultation?"'];
const withoutExamples = (text: string) => QUOTED_EXAMPLES.reduce((t, example) => t.replaceAll(example, ''), text);

describe('no looking-for-work copy on the site', () => {
  it('scans a meaningful set of surfaces', () => {
    expect(codeSurfaces.length).toBeGreaterThan(40);
    expect(codeSurfaces).toContain('src/components/layout/Header.tsx');
    expect(codeSurfaces).toContain('src/data/kb-sources.ts');
    expect(codeSurfaces).toContain('public/llms.txt');
    expect(contentSurfaces.length).toBeGreaterThan(100);
  });

  it.each(codeSurfaces.map((f) => [f]))('%s carries no looking-for-work copy', (file) => {
    const text = fs.readFileSync(path.join(root, file), 'utf8');
    for (const pattern of LOOKING_FOR_WORK) {
      expect(text, `${file} matches ${pattern}`).not.toMatch(pattern);
    }
    expect(text, `${file} links to a retired page`).not.toMatch(RETIRED_LINKS);
  });

  it.each(contentSurfaces.map((f) => [f]))('%s carries no consulting or hiring call to action', (file) => {
    const text = withoutExamples(fs.readFileSync(path.join(root, file), 'utf8'));
    for (const pattern of LOOKING_FOR_WORK) {
      expect(text, `${file} matches ${pattern}`).not.toMatch(pattern);
    }
    expect(text, `${file} links to a retired page`).not.toMatch(/\]\(\/(hire-me|for-executives|services)\b/);
  });

  it('keeps the retired routes gone', () => {
    for (const route of ['src/app/hire-me', 'src/app/for-executives', 'src/app/services', 'src/content/services']) {
      expect(fs.existsSync(path.join(root, route)), route).toBe(false);
    }
  });
});
