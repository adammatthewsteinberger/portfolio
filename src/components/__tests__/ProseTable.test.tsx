import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ProseTable from '../ProseTable';

const markdown = `| Type | Example |
| --- | --- |
| Narrow AI | A spam filter |
`;

describe('ProseTable', () => {
  it('wraps a Markdown table in a focusable, labelled scroll container', () => {
    const { container } = render(
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ table: ProseTable }}>
        {markdown}
      </ReactMarkdown>,
    );
    const region = screen.getByRole('region', { name: 'Scrollable table' });
    expect(region).toHaveClass('prose-table');
    expect(region).toHaveAttribute('tabindex', '0');
    expect(region.firstElementChild?.tagName).toBe('TABLE');
    expect(screen.getByRole('table')).toHaveTextContent('Narrow AI');
    // The hast node react-markdown passes in never reaches the DOM.
    expect(container.querySelector('[node]')).toBeNull();
  });

  it('passes table attributes through', () => {
    render(<ProseTable className="x" summary="s"><tbody><tr><td>cell</td></tr></tbody></ProseTable>);
    const table = screen.getByRole('table');
    expect(table).toHaveClass('x');
    expect(table).toHaveAttribute('summary', 's');
  });
});
