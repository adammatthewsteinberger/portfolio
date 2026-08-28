import { describe, expect, it } from 'vitest';
import nextConfig from '../../next.config';
import sitemap from '@/app/sitemap';
import { execRoutes } from '@/data/exec';
import { EXEC_PREFIX } from '@/lib/edition';
import { getExecProjects, getProjectBySlug } from '@/lib/projectUtils';

// The invariants from vibey-gh #134/#135, made checkable:
//   1. the engineering site is the default — nothing rewrites or redirects into the exec edition
//   2. every exec page has an engineering counterpart
//   3. the first heading of every exec page is a problem, not a product
//   4. the exec edition never outranks the engineering page it mirrors

describe('editions: the engineering site stays the default', () => {
  it('no rewrite targets the exec edition, and only the chat host rewrites the root', async () => {
    const rewrites = await nextConfig.rewrites!();
    const rules = Array.isArray(rewrites)
      ? rewrites
      : [...(rewrites.beforeFiles ?? []), ...(rewrites.afterFiles ?? []), ...(rewrites.fallback ?? [])];
    for (const rule of rules) {
      expect(rule.destination.startsWith(EXEC_PREFIX)).toBe(false);
      if (rule.source === '/') expect(rule.has?.some((h: { type: string }) => h.type === 'host')).toBe(true);
    }
  });

  it('no redirect targets the exec edition', async () => {
    const redirects = await nextConfig.redirects!();
    for (const rule of redirects) {
      expect(rule.destination.includes(EXEC_PREFIX)).toBe(false);
    }
  });
});

describe('editions: parity and content contract', () => {
  const urls = sitemap();
  const byUrl = new Map(urls.map((entry) => [entry.url.replace('https://hire.adam.matthewsteinberger.com', ''), entry]));

  it('every static exec route has an engineering counterpart in the sitemap', () => {
    for (const route of execRoutes) {
      expect(byUrl.has(route.execUrl), route.execUrl).toBe(true);
      expect(byUrl.has(route.engineeringUrl), route.engineeringUrl).toBe(true);
      expect(route.problem.length).toBeGreaterThan(40);
    }
  });

  it('every exec case study is the same file as its engineering case study', () => {
    const studies = getExecProjects();
    expect(studies.length).toBeGreaterThanOrEqual(6);
    for (const study of studies) {
      expect(getProjectBySlug(study.slug)).not.toBeNull();
      expect(byUrl.has(`/work/${study.slug}`)).toBe(true);
      expect(byUrl.has(`${EXEC_PREFIX}/work/${study.slug}`)).toBe(true);
    }
  });

  it('the first heading of every exec page frames a problem, not a product', () => {
    for (const study of getExecProjects()) {
      expect(study.execProblem!.length).toBeGreaterThan(40);
      expect(study.execProblem!.toLowerCase()).not.toContain(study.title.toLowerCase());
      expect(study.execOutcome!.length).toBeGreaterThan(40);
    }
  });

  it('the exec edition never outranks the engineering page it mirrors', () => {
    for (const route of execRoutes) {
      expect(byUrl.get(route.execUrl)!.priority!).toBeLessThanOrEqual(0.5);
      expect(byUrl.get(route.execUrl)!.priority!).toBeLessThan(byUrl.get(route.engineeringUrl)!.priority!);
    }
    for (const study of getExecProjects()) {
      expect(byUrl.get(`${EXEC_PREFIX}/work/${study.slug}`)!.priority!).toBeLessThan(byUrl.get(`/work/${study.slug}`)!.priority!);
    }
  });
});
