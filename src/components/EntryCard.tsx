import Link from 'next/link';
import type { Locale } from '@/lib/locales';

const DATE_LOCALES: Record<Locale, string> = { en: 'en-US', he: 'he-IL' };

interface EntryCardProps {
  href: string;
  title: string;
  description: string;
  /** "YYYY-MM-DD". */
  publishedDate: string;
  readTime: string;
  locale?: Locale;
}

/** A list row for an essay or ministry post. */
export default function EntryCard({
  href,
  title,
  description,
  publishedDate,
  readTime,
  locale = 'en',
}: EntryCardProps) {
  // Format in UTC: "2025-10-29" parses as UTC midnight, and formatting it in a
  // US timezone would otherwise print the 28th.
  const date = new Date(publishedDate).toLocaleDateString(DATE_LOCALES[locale], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });

  return (
    <Link
      href={href}
      className="block bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] hover:border-[var(--color-accent-blue)]/50 rounded-xl p-6 no-underline transition-colors"
    >
      <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">{title}</h2>
      <p className="text-[var(--color-text-muted)] mb-3">{description}</p>
      <p className="text-sm text-[var(--color-text-muted)]">
        {date} · {readTime}
      </p>
    </Link>
  );
}
