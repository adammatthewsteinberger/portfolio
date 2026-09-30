import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { evidenceText, method, staffEvidence, vibeyGuarantees, type Evidence } from '../evidence';
import { projects } from '../projects';

const all: Evidence[] = [...vibeyGuarantees, ...staffEvidence];
const caseStudies = new Set(projects.map((p) => `/work/${p.slug}`));
const appRoutes = new Set(['/join-me', '/open-source', '/hire-me']);

describe('evidence', () => {
  it('is non-empty and well-formed', () => {
    expect(vibeyGuarantees.length).toBeGreaterThan(0);
    expect(staffEvidence.length).toBeGreaterThan(0);
    for (const item of all) {
      expect(item.claim.length).toBeGreaterThan(0);
      expect(item.proof.length).toBeGreaterThan(0);
    }
  });

  it('links every claim to a case study or page that exists', () => {
    for (const item of all) {
      const ok = caseStudies.has(item.href) || appRoutes.has(item.href);
      expect(ok, `${item.claim} → ${item.href}`).toBe(true);
    }
    for (const href of caseStudies) {
      if (all.some((i) => i.href === href)) {
        const slug = href.replace('/work/', '');
        expect(fs.existsSync(path.join(process.cwd(), 'src/content/projects', `${slug}.md`)), slug).toBe(true);
      }
    }
  });

  // Proof is numbers and nouns. Intensifiers correlate with losing arguments
  // (Long & Christensen, 800 appellate briefs) and read as padding to engineers.
  it('carries no intensifiers', () => {
    for (const item of all) {
      expect(`${item.claim} ${item.proof}`).not.toMatch(/\b(very|clearly|obviously|extremely|incredibly|truly|highly|world-class|cutting-edge)\b/i);
    }
  });

  it('keeps unique claims', () => {
    const claims = all.map((i) => i.claim);
    expect(new Set(claims).size).toBe(claims.length);
  });

  it('states the method in order', () => {
    expect(method[0]).toBe('Discovery');
    expect(method.at(-1)).toBe('A mentored handoff');
  });

  it('renders plain text for the knowledge base', () => {
    const text = evidenceText(staffEvidence);
    expect(text).toContain(`${staffEvidence[0].claim}: ${staffEvidence[0].proof}`);
    expect(evidenceText([])).toBe('');
  });
});
