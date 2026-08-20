import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-12 py-8 bg-[var(--color-dark-card)] border-t border-[var(--color-dark-border)]">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-6 text-sm">
          <Link href="/hire-me" className="text-[var(--color-text-primary)] hover:text-[var(--color-accent-blue)] font-semibold transition-colors">Hire Me</Link>
          <span className="text-[var(--color-dark-border)]">|</span>
          <Link href="/chat" className="text-[var(--color-text-primary)] hover:text-[var(--color-accent-blue)] font-semibold transition-colors">Ask my résumé</Link>
          <span className="text-[var(--color-dark-border)]">|</span>
          <Link href="/work" className="text-[var(--color-text-primary)] hover:text-[var(--color-accent-blue)] font-semibold transition-colors">Work</Link>
          <span className="text-[var(--color-dark-border)]">|</span>
          <Link href="/expertise" className="text-[var(--color-text-primary)] hover:text-[var(--color-accent-blue)] font-semibold transition-colors">Expertise</Link>
          <span className="text-[var(--color-dark-border)]">|</span>
          <Link href="/writing" className="text-[var(--color-text-primary)] hover:text-[var(--color-accent-blue)] font-semibold transition-colors">Writing</Link>
          <span className="text-[var(--color-dark-border)]">|</span>
          <a href="https://tidycal.com/adammatthewsteinberger" target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-primary)] hover:text-[var(--color-accent-blue)] font-semibold transition-colors">Consulting Call</a>
          <span className="text-[var(--color-dark-border)]">|</span>
          <a href="https://eepurl.com/jiYXCQ" target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-primary)] hover:text-[var(--color-accent-blue)] font-semibold transition-colors">Newsletter</a>
          <span className="text-[var(--color-dark-border)]">|</span>
          <Link href="/services" className="text-[var(--color-text-primary)] hover:text-[var(--color-accent-blue)] font-semibold transition-colors">Consulting Services</Link>
          <span className="text-[var(--color-dark-border)]">|</span>
          <Link href="/site-directory" className="text-[var(--color-text-primary)] hover:text-[var(--color-accent-blue)] font-semibold transition-colors">Site Directory</Link>
          <span className="text-[var(--color-dark-border)]">|</span>
          <Link href="/privacy" className="text-[var(--color-text-primary)] hover:text-[var(--color-accent-blue)] font-semibold transition-colors">Privacy</Link>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <a
            href="https://www.linkedin.com/in/adammatthewsteinberger/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-[var(--color-text-muted)] hover:text-[var(--color-accent-blue)] transition-colors"
          >
            <i className="fab fa-linkedin text-2xl"></i>
          </a>
          <a
            href="https://github.com/adammatthewsteinberger"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            <i className="fab fa-github text-2xl"></i>
          </a>
          <Link
            href="/contact"
            aria-label="Contact"
            className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            <i className="fas fa-envelope"></i>
          </Link>
          <a
            href="https://github.com/adammatthewsteinberger/resume/raw/main/adam-steinberger-resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download Resume"
            className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            <i className="fas fa-download"></i>
          </a>
          <a
            href="/feed.xml"
            aria-label="RSS feed"
            className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            <i className="fas fa-rss"></i>
          </a>
        </div>

        <div className="text-center text-[var(--color-text-muted)] text-sm mb-2">
          © Copyright {new Date().getFullYear()} <Link href="/" className="text-[var(--color-text-primary)] hover:text-[var(--color-accent-blue)] transition-colors">Adam Matthew Steinberger LLC</Link>. All Rights Reserved.
        </div>

        <div className="text-center text-[var(--color-text-muted)] text-sm">
          FEIN: 33-2687374
        </div>
      </div>
    </footer>
  );
}
