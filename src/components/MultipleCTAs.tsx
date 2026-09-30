import Link from 'next/link';
import { audiences } from '@/data/audiences';
import Icon from '@/components/Icon';

const AUDIENCE_ICONS: Record<string, string> = {
  developers: 'code-branch',
  governments: 'shield-halved',
  academia: 'graduation-cap',
};

/**
 * The closing call to action on posts, articles, and index pages. It leads
 * with the primary ask — help build vibey — and then offers the other two
 * audiences, in the same order as /join-me (src/data/audiences.ts).
 */
export default function MultipleCTAs() {
  const [developers, ...others] = audiences;
  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-green)] bg-clip-text text-transparent">
        Help build vibey
      </h2>
      <p className="text-center text-[var(--color-text-muted)] mb-8 max-w-2xl mx-auto">{developers.summary}</p>
      <div className="max-w-2xl mx-auto text-center">
        <Link
          href={developers.href}
          className="flex items-center justify-center gap-2 w-full px-6 py-4 font-bold bg-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue-light)] rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 no-underline mb-6"
          style={{ color: '#ffffff' }}
        >
          <Icon name={AUDIENCE_ICONS.developers} /> {developers.cta}
        </Link>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm">
          {others.map((audience) => (
            <Link key={audience.id} href={audience.href} className="text-[var(--color-text-muted)] hover:text-[var(--color-accent-blue)] transition-colors">
              <Icon name={AUDIENCE_ICONS[audience.id]} className="mr-1" /> {audience.title}
            </Link>
          ))}
          <Link href="/writing" className="text-[var(--color-text-muted)] hover:text-[var(--color-accent-blue)] transition-colors">
            <Icon name="book-open" className="mr-1" /> Read the writing
          </Link>
          <a
            href="https://eepurl.com/jiYXCQ"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-text-muted)] hover:text-[var(--color-accent-blue)] transition-colors"
          >
            <Icon name="envelope-open-text" className="mr-1" /> Newsletter
          </a>
        </div>
      </div>
    </section>
  );
}
