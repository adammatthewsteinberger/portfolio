import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const read = (rel: string) => fs.readFileSync(path.join(process.cwd(), rel), 'utf8');

// Engineering edition is the default (vibey-gh #134/#135): the homepage
// leads with the bio's thesis, and the engineering pages carry no
// plain-terms/CEO lane — that copy lives in src/data/expertise.ts as the
// seed for the executive edition only.
describe('positioning', () => {
  it('the homepage states the "Not just demos" thesis exactly once', () => {
    const home = read('src/app/page.tsx');
    expect(home.match(/Not just demos\./g)?.length).toBe(1);
  });

  it('the engineering pages render no plain-terms lane', () => {
    for (const rel of ['src/app/page.tsx', 'src/app/expertise/page.tsx', 'src/app/hire-me/page.tsx']) {
      expect(read(rel), rel).not.toMatch(/In plain terms|Explain it like I|pillar\.plain|\.plain\b/);
    }
  });

  it('the old title and years appear nowhere in the app', () => {
    const walk = (dir: string, out: string[] = []): string[] => {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) walk(full, out);
        else if (/\.tsx?$/.test(entry.name)) out.push(full);
      }
      return out;
    };
    for (const file of [...walk(path.join(process.cwd(), 'src/app')), ...walk(path.join(process.cwd(), 'src/components'))]) {
      const text = fs.readFileSync(file, 'utf8');
      // "Senior Azure & AI Development Engineer" is allowed only as the past Vizius title on the timeline.
      if (!file.endsWith('story/page.tsx')) expect(text, file).not.toMatch(/Senior Azure/);
      expect(text, file).not.toMatch(/12\+ years/);
    }
  });
});
