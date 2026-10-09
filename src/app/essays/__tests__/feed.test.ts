import { describe, it, expect } from 'vitest';
import { GET, dynamic } from '../feed.xml/route';

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
});
