import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import ProseTable from '@/components/ProseTable';

/**
 * The article card used by the essays and ministry pages: the same prose
 * styling as a blog post, rendered once. It uses no left/right utilities, so
 * it lays out correctly inside the right-to-left /he wrapper too.
 */
export default function MarkdownArticle({ children }: { children: string }) {
  return (
    <div className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-xl p-6 md:p-10 article-body prose prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{ table: ProseTable }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
