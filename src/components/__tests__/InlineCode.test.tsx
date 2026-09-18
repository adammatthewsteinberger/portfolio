import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import InlineCode from '../InlineCode';

describe('InlineCode', () => {
  it('renders backtick spans as <code> and leaves the rest as text', () => {
    const { container } = render(<p><InlineCode text="Run `uv sync` then `vibey doctor`." /></p>);
    expect(container.textContent).toBe('Run uv sync then vibey doctor.');
    expect(Array.from(container.querySelectorAll('code')).map((c) => c.textContent)).toEqual(['uv sync', 'vibey doctor']);
  });

  it('renders plain text untouched when there are no backticks', () => {
    const { container } = render(<p><InlineCode text="No code here." /></p>);
    expect(container.textContent).toBe('No code here.');
    expect(container.querySelector('code')).toBeNull();
  });
});
