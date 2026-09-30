import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  FREELANCE_SUMMARY,
  briefPrompts,
  engagementSteps,
  freelanceFaq,
  listedPlatforms,
  offers,
  platformAnswer,
  platforms,
  workingAgreement,
  type Platform,
} from '../freelance';
import { method } from '../evidence';
import { projects } from '../projects';

const caseStudies = new Set(projects.map((p) => `/work/${p.slug}`));

/** Every string a visitor, a crawler, or the bot can read from this file. */
const allCopy = [
  FREELANCE_SUMMARY,
  ...briefPrompts,
  ...offers.flatMap((o) => [o.title, o.forWhom, o.proof, ...o.deliverables]),
  ...engagementSteps.flatMap((s) => [s.title, s.body]),
  ...workingAgreement.flatMap((s) => [s.title, s.body]),
  ...platforms.flatMap((p) => [p.name, p.role]),
  ...freelanceFaq().flatMap((q) => [q.question, q.answer]),
].join('\n');

describe('freelance offers', () => {
  it('are well-formed, with unique anchors', () => {
    expect(offers.length).toBeGreaterThan(0);
    for (const offer of offers) {
      expect(offer.id).toMatch(/^[a-z0-9-]+$/);
      expect(offer.deliverables.length).toBeGreaterThan(0);
      expect(offer.forWhom).toMatch(/^For /);
    }
    expect(new Set(offers.map((o) => o.id)).size).toBe(offers.length);
  });

  // Content integrity (AGENTS.md): every proof is work already delivered, shown on a case study.
  it('links every proof to a case study that exists', () => {
    for (const offer of offers) {
      expect(caseStudies.has(offer.proofHref), `${offer.id} → ${offer.proofHref}`).toBe(true);
      const slug = offer.proofHref.replace('/work/', '');
      expect(fs.existsSync(path.join(process.cwd(), 'src/content/projects', `${slug}.md`)), slug).toBe(true);
    }
  });

  it('states proof as numbers and nouns, without intensifiers', () => {
    // A number, as digits or spelled out (house style spells out small ones at a sentence start).
    for (const offer of offers) expect(offer.proof).toMatch(/\d|\b(two|three|four|five|six|seven|eight|nine|ten)\b/i);
    expect(allCopy).not.toMatch(/\b(very|clearly|obviously|extremely|incredibly|truly|highly|world-class|cutting-edge|genius|rockstar|guaranteed)\b/i);
  });
});

describe('freelance house rules', () => {
  it('publishes no price', () => {
    expect(allCopy).not.toMatch(/[$€£]\s?\d|\b\d+\s?(usd|dollars)\b|\/\s?h(ou)?r\b|per hour/i);
  });

  it('never asks for a call to be booked', () => {
    expect(allCopy).not.toMatch(/\b(book|schedule)\s+(?:\w+\s+){0,3}(consult\w*|call)\b|free (consultation|call)/i);
    expect(workingAgreement[0].title).toMatch(/Written brief first/);
  });

  it('claims no platform rating, badge, or review that the site cannot show', () => {
    expect(allCopy).not.toMatch(/top rated|rising talent|expert-vetted|\b\d+(\.\d)?\s?stars?\b|five-star|\d+\+? reviews/i);
  });

  it('keeps a platform client on that platform', () => {
    expect(platformAnswer()).toContain('stays on that platform');
  });

  it('discloses AI assistance and a human sign-off', () => {
    const ai = workingAgreement.find((w) => /AI-assisted/.test(w.title));
    expect(ai?.body).toMatch(/say so up front/);
    expect(ai?.body).toMatch(/sign off every deliverable myself/);
  });

  it('never names an employer', () => {
    expect(allCopy).not.toMatch(/anthropic|palantir/i);
  });
});

describe('engagement steps', () => {
  it('follow the method, in order and by name', () => {
    expect(engagementSteps.map((s) => s.title)).toEqual(method);
    for (const step of engagementSteps) expect(step.body.length).toBeGreaterThan(0);
  });
});

describe('platforms', () => {
  const live: Platform[] = [
    { name: 'Upwork', role: 'r', profileUrl: 'https://www.upwork.com/freelancers/example' },
    { name: 'Fiverr Pro', role: 'r' },
    { name: 'Contra', role: 'r', profileUrl: 'https://contra.com/example' },
  ];

  it('lists only platforms whose profile is live, in order', () => {
    expect(listedPlatforms(live).map((p) => p.name)).toEqual(['Upwork', 'Contra']);
    expect(listedPlatforms([])).toEqual([]);
    // With no profile URL set, nothing is claimed.
    expect(listedPlatforms()).toEqual(platforms.filter((p) => p.profileUrl));
  });

  it('answers the platform question truthfully either way', () => {
    expect(platformAnswer([])).toMatch(/as they go live/);
    expect(platformAnswer(live)).toMatch(/^Yes, through Upwork or Contra, linked from this page/);
    expect(platformAnswer(live)).not.toMatch(/Fiverr/);
  });

  it('puts the platform answer in the FAQ', () => {
    const faq = freelanceFaq(live);
    expect(faq.find((q) => /Upwork or Fiverr/.test(q.question))?.answer).toBe(platformAnswer(live));
    expect(new Set(faq.map((q) => q.question)).size).toBe(faq.length);
  });
});
