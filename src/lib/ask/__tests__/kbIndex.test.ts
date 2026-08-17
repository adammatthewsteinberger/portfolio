import { describe, it, expect } from 'vitest';
import { retrieveContext } from '../kbIndex';

describe('retrieveContext', () => {
  it('returns relevant chunks for a matching query', () => {
    const results = retrieveContext('Azure microservices architecture', 5);
    expect(results.length).toBeGreaterThan(0);
    expect(results.length).toBeLessThanOrEqual(5);
    for (const chunk of results) {
      expect(chunk.url.startsWith('/')).toBe(true);
      expect(chunk.title).toBeTruthy();
      expect(chunk.text).toBeTruthy();
    }
  });

  it('respects the topK limit', () => {
    const results = retrieveContext('Adam software engineer', 2);
    expect(results.length).toBeLessThanOrEqual(2);
  });

  it('returns an empty array for a query that matches nothing', () => {
    const results = retrieveContext('zzyxxqqvvbbnnmm nonsense query', 5);
    expect(results).toEqual([]);
  });

  it('reuses the same index instance across calls', () => {
    const first = retrieveContext('Greenville South Carolina remote', 3);
    const second = retrieveContext('Greenville South Carolina remote', 3);
    expect(first.map((c) => c.id)).toEqual(second.map((c) => c.id));
  });
});
