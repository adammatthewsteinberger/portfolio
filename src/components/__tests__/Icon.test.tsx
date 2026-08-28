import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import Icon from '../Icon';
import { FALLBACK_ICON, glyphs } from '../icons/sprite';

describe('Icon', () => {
  it('renders every glyph in the sprite as an inline, decorative SVG', () => {
    for (const name of Object.keys(glyphs)) {
      const { container, unmount } = render(<Icon name={name} />);
      const svg = container.querySelector('svg')!;
      expect(svg.getAttribute('viewBox')).toBe(glyphs[name].viewBox);
      expect(svg.getAttribute('aria-hidden')).toBe('true');
      expect(svg.querySelector('path')!.getAttribute('d')).toBe(glyphs[name].d);
      unmount();
    }
  });

  it('accepts the legacy fa- prefix, merges classes, and can be labelled', () => {
    const { container } = render(<Icon name="fa-github" className="text-2xl" label="GitHub" />);
    const svg = container.querySelector('svg')!;
    expect(svg.getAttribute('viewBox')).toBe(glyphs.github.viewBox);
    expect(svg.className.baseVal).toContain('text-2xl');
    expect(svg.getAttribute('role')).toBe('img');
    expect(svg.getAttribute('aria-label')).toBe('GitHub');
    expect(svg.getAttribute('aria-hidden')).toBeNull();
  });

  it('falls back to a question mark for unknown names', () => {
    const { container } = render(<Icon name="not-a-real-icon" />);
    expect(container.querySelector('path')!.getAttribute('d')).toBe(glyphs[FALLBACK_ICON].d);
  });
});
