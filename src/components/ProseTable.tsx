import type { ComponentPropsWithoutRef } from 'react';
import type { ExtraProps } from 'react-markdown';

/**
 * react-markdown `table` renderer for `.prose` bodies. A wide Markdown table
 * scrolls inside its own container instead of pushing the whole page sideways
 * on a phone. The wrapper is focusable and labelled so keyboard users can
 * scroll it too; the table itself keeps `display: table`, so its semantics
 * survive for screen readers.
 */
export default function ProseTable({ node, ...props }: ComponentPropsWithoutRef<'table'> & ExtraProps) {
  void node; // the hast node react-markdown passes along; not a DOM attribute
  return (
    <div className="prose-table" role="region" aria-label="Scrollable table" tabIndex={0}>
      <table {...props} />
    </div>
  );
}
