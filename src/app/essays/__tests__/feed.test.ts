import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { GET, dynamic } from '../feed.xml/route';
import { ESSAYS_DIR } from '@/data/essays';

describe('essays feed', () => {
  it('is prerendered, since the Workers runtime cannot read the Markdown', () => {
    expect(dynamic).toBe('force-static');
  });

  it('serves RSS with an item for each essay', async () => {
    const response = GET();
    const xml = await response.text();

    expect(response.headers.get('Content-Type')).toBe('application/xml; charset=utf-8');
    expect(xml).toContain('<title>Adam Matthew Steinberger — Essays</title>');
    expect(xml).toContain('<guid isPermaLink="true">https://vibewithadam.matthewsteinberger.com/essays/welcome</guid>');
    expect(xml).toContain('href="https://vibewithadam.matthewsteinberger.com/essays/feed.xml"');
    expect(xml).toContain('<category>autism</category>');
  });

  it('lists every essay: the essays share one date, so a "newest N" cap would drop some arbitrarily', async () => {
    const essayCount = fs.readdirSync(path.join(process.cwd(), ESSAYS_DIR)).filter((f) => f.endsWith('.md')).length;
    const xml = await GET().text();

    expect(essayCount).toBeGreaterThan(50);
    expect(xml.match(/<item>/g)).toHaveLength(essayCount);
  });
});
