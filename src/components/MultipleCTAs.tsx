import Link from 'next/link';
import { availabilityHeading } from '@/lib/availability';
import { EXEC_BOOKING_URL, execOffer } from '@/data/exec';
import type { Edition } from '@/lib/edition';

interface MultipleCTAsProps {
  /**
   * `engineering` (default) — hire-me first, no commercial framing.
   * `exec` — used on /for-executives/* and /services/*: the engagement door first.
   */
  edition?: Edition;
}

export default function MultipleCTAs({ edition = 'engineering' }: MultipleCTAsProps) {
  if (edition === 'exec') {
    return (
      <section className="container mx-auto px-4 py-16">
        <h4 className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-green)] bg-clip-text text-transparent">
          {execOffer.engage.title}
        </h4>
        <p className="text-center text-[var(--color-text-muted)] mb-8 max-w-2xl mx-auto">{execOffer.engage.body}</p>
        <div className="max-w-2xl mx-auto text-center">
          <Link
            href={execOffer.engage.href}
            className="flex items-center justify-center gap-2 w-full px-6 py-4 font-bold bg-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue-light)] rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 no-underline mb-6"
            style={{ color: '#ffffff' }}
          >
            <i className="fas fa-handshake"></i> {execOffer.engage.cta}
          </Link>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm">
            <a
              href={EXEC_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-text-muted)] hover:text-[var(--color-accent-blue)] transition-colors"
            >
              <i className="fas fa-calendar mr-1"></i> Book a call
            </a>
            <Link href="/hire-me" className="text-[var(--color-text-muted)] hover:text-[var(--color-accent-blue)] transition-colors">
              <i className="fas fa-briefcase mr-1"></i> Or hire me full-time
            </Link>
            <Link href="/" className="text-[var(--color-text-muted)] hover:text-[var(--color-accent-blue)] transition-colors">
              <i className="fas fa-code mr-1"></i> Engineering edition
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-16">
      <h4 className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-green)] bg-clip-text text-transparent">
        {availabilityHeading()}
      </h4>
      <p className="text-center text-[var(--color-text-muted)] mb-8">
        Staff Software Architect &amp; AI Automation Engineer — Greenville, SC (remote) or US remote.
      </p>
      <div className="max-w-2xl mx-auto text-center">
        <Link
          href="/hire-me"
          className="flex items-center justify-center gap-2 w-full px-6 py-4 font-bold bg-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue-light)] rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 no-underline mb-6"
          style={{ color: '#ffffff' }}
        >
          <i className="fas fa-briefcase"></i> Hire Me
        </Link>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm">
          <Link href="/open-source" className="text-[var(--color-text-muted)] hover:text-[var(--color-accent-blue)] transition-colors">
            <i className="fas fa-code-branch mr-1"></i> Open source
          </Link>
          <Link href="/writing" className="text-[var(--color-text-muted)] hover:text-[var(--color-accent-blue)] transition-colors">
            <i className="fas fa-book-open mr-1"></i> Read the writing
          </Link>
          <a
            href="https://eepurl.com/jiYXCQ"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-text-muted)] hover:text-[var(--color-accent-blue)] transition-colors"
          >
            <i className="fas fa-envelope-open-text mr-1"></i> Newsletter
          </a>
        </div>
      </div>
    </section>
  );
}
