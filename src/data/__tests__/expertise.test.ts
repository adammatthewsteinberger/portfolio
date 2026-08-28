import { describe, expect, it } from 'vitest';
import { allPillars, fullStack, specialties, specialtyGroups } from '../expertise';
import { projects } from '../projects';

describe('specialtyGroups', () => {
  it('has unique group and pillar ids', () => {
    const groupIds = specialtyGroups.map((g) => g.id);
    expect(new Set(groupIds).size).toBe(groupIds.length);
    const pillarIds = allPillars().map((p) => p.id);
    expect(new Set(pillarIds).size).toBe(pillarIds.length);
  });

  it('keeps the six bio specialties in the bio’s order, then the design group', () => {
    expect(specialties.map((g) => g.title)).toEqual([
      'Azure',
      'Python and .NET backends',
      'Event-driven microservices',
      'RAG, multi-vendor LLM gateways, AI governance',
      'Kubernetes, Helm, GitOps, secretless DevSecOps',
      'Identity governance',
    ]);
    expect(specialtyGroups[specialtyGroups.length - 1].id).toBe('how-i-design');
  });

  it('keeps the original pillar anchors so KB URLs and links stay valid', () => {
    const ids = allPillars().map((p) => p.id);
    for (const legacy of [
      'ai-ml', 'rag-chat-systems', 'agents-automation', 'process-engineering', 'scrum-agile',
      'software-architecture', 'onion-clean-layering', 'microservices', 'azure-cloud', 'data-integration-pipelines',
    ]) {
      expect(ids).toContain(legacy);
    }
  });

  it('gives every pillar full engineering copy, a rule, and a plain-terms seed', () => {
    for (const pillar of allPillars()) {
      expect(pillar.engineer.length).toBeGreaterThan(80);
      expect(pillar.rule.length).toBeGreaterThan(20);
      expect(pillar.plain.length).toBeGreaterThan(20);
    }
  });

  it('only points "where" at case studies that exist', () => {
    const slugs = new Set(projects.map((p) => p.slug));
    for (const group of specialtyGroups) {
      expect(group.where.length).toBeGreaterThan(0);
      for (const slug of group.where) expect(slugs.has(slug), `${group.id} → ${slug}`).toBe(true);
      expect(group.stack.length).toBeGreaterThan(0);
      expect(group.summary.length).toBeGreaterThan(40);
    }
  });

  it('dedupes the stack strip in first-seen order', () => {
    const stack = fullStack();
    expect(new Set(stack).size).toBe(stack.length);
    expect(stack[0]).toBe('AKS');
    expect(fullStack([specialtyGroups[0]])).toEqual(specialtyGroups[0].stack);
    expect(allPillars([specialtyGroups[0]])).toEqual(specialtyGroups[0].pillars);
  });
});
