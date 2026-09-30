import { Fragment } from 'react';

/**
 * Renders plain copy from src/data/*.ts, turning `backtick` spans into
 * <code>. Keeps data files free of JSX while still letting a command or a
 * flag read as code on the page.
 */
export default function InlineCode({ text }: { text: string }) {
  return (
    <>
      {text.split('`').map((part, i) =>
        i % 2 === 1 ? <code key={i}>{part}</code> : <Fragment key={i}>{part}</Fragment>,
      )}
    </>
  );
}
