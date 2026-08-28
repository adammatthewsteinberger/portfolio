import Link from 'next/link';
import { availabilityHeading } from '@/lib/availability';

export default function MultipleCTAs() {
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
          <a
            href="https://tidycal.com/adammatthewsteinberger"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-text-muted)] hover:text-[var(--color-accent-blue)] transition-colors"
          >
            <i className="fas fa-calendar mr-1"></i> Book a consulting call
          </a>
          <Link href="/writing" className="text-[var(--color-text-muted)] hover:text-[var(--color-accent-blue)] transition-colors">
            <i className="fas fa-book-open mr-1"></i> Read the writing
          </Link>
          <Link href="/services" className="text-[var(--color-text-muted)] hover:text-[var(--color-accent-blue)] transition-colors">
            <i className="fas fa-tools mr-1"></i> Consulting services
          </Link>
        </div>
      </div>
    </section>
  );
}
