import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-12 py-8 bg-[var(--color-dark-card)] border-t border-[var(--color-dark-border)]">
      <div className="container mx-auto px-4">
        {/* Primary Navigation */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-6 text-sm">
          <a href="https://tidycal.com/realadammatthew" className="text-[var(--color-text-primary)] hover:text-[var(--color-accent-blue)] font-semibold transition-colors">Schedule a Free Consultation</a>
          <span className="text-[var(--color-dark-border)]">|</span>
          <Link href="/contact" className="text-[var(--color-text-primary)] hover:text-[var(--color-accent-blue)] font-semibold transition-colors">Contact for Employment</Link>
          <span className="text-[var(--color-dark-border)]">|</span>
          <a href="https://chat.adam.matthewsteinberger.com" className="text-[var(--color-text-primary)] hover:text-[var(--color-accent-blue)] font-semibold transition-colors">Try the Chatbot Demo</a>
          <span className="text-[var(--color-dark-border)]">|</span>
          <Link href="/novice-to-navigator" className="text-[var(--color-text-primary)] hover:text-[var(--color-accent-blue)] font-semibold transition-colors">Learn about AI</Link>
          <span className="text-[var(--color-dark-border)]">|</span>
          <Link href="/blog" className="text-[var(--color-text-primary)] hover:text-[var(--color-accent-blue)] font-semibold transition-colors">Read the Blog</Link>
          <span className="text-[var(--color-dark-border)]">|</span>
          <a href="http://eepurl.com/jiYXCQ" className="text-[var(--color-text-primary)] hover:text-[var(--color-accent-blue)] font-semibold transition-colors">Get the Newsletter</a>
          <span className="text-[var(--color-dark-border)]">|</span>
          <Link href="/services" className="text-[var(--color-text-primary)] hover:text-[var(--color-accent-blue)] font-semibold transition-colors">My Services</Link>
          <span className="text-[var(--color-dark-border)]">|</span>
          <Link href="/site-directory" className="text-[var(--color-text-primary)] hover:text-[var(--color-accent-blue)] font-semibold transition-colors">Site Directory</Link>
        </div>

        {/* Social Media Links */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <a
            href="https://www.linkedin.com/in/realadammatthew/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-[var(--color-text-muted)] hover:text-[var(--color-accent-blue)] transition-colors"
          >
            <i className="fab fa-linkedin text-2xl"></i>
          </a>
          <a
            href="https://github.com/realadammatthew"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            <i className="fab fa-github text-2xl"></i>
          </a>
          <a
            href="https://x.com/realadammatthew"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            <i className="fab fa-x-twitter text-2xl"></i>
          </a>
          <a
            href="https://instagram.com/realadammatthew/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-[var(--color-text-muted)] hover:text-[var(--color-accent-coral)] transition-colors"
          >
            <i className="fab fa-instagram text-2xl"></i>
          </a>
          <a
            href="https://facebook.com/adammatthewsteinberger"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-[var(--color-text-muted)] hover:text-[var(--color-accent-blue)] transition-colors"
          >
            <i className="fab fa-facebook text-2xl"></i>
          </a>
          <a
            href="https://www.youtube.com/@AdamMatthewSteinberger"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="text-[var(--color-text-muted)] hover:text-[var(--color-accent-coral)] transition-colors"
          >
            <i className="fab fa-youtube text-2xl"></i>
          </a>
          <a
            href="https://coff.ee/realadammatthew"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Buy me a Coffee"
            className="text-[var(--color-text-muted)] hover:text-[var(--color-accent-gold)] transition-colors"
          >
            <i className="fas fa-coffee text-2xl"></i>
          </a>
        </div>

        {/* Secondary Navigation */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-6 text-sm">
          <a href="https://humbleberger.org" className="text-[var(--color-text-primary)] hover:text-[var(--color-accent-blue)] font-semibold transition-colors">Ministry</a>
          <span className="text-[var(--color-dark-border)]">|</span>
          <a href="https://messiahfirst.org" className="text-[var(--color-text-primary)] hover:text-[var(--color-accent-blue)] font-semibold transition-colors">Policy</a>
          <span className="text-[var(--color-dark-border)]">|</span>
          <a href="https://chat.adam.matthewsteinberger.com" className="text-[var(--color-text-primary)] hover:text-[var(--color-accent-blue)] font-semibold transition-colors">Chat</a>
          <span className="text-[var(--color-dark-border)]">|</span>
          <a href="https://theautisticapologist.com/" className="text-[var(--color-text-primary)] hover:text-[var(--color-accent-blue)] font-semibold transition-colors">Blog</a>
        </div>

        {/* Copyright */}
        <div className="text-center text-[var(--color-text-muted)] text-sm mb-2">
          © Copyright {new Date().getFullYear()} <Link href="/" className="text-[var(--color-text-primary)] hover:text-[var(--color-accent-blue)] transition-colors">Adam Matthew Steinberger LLC</Link>. All Rights Reserved.
        </div>

        {/* FEIN */}
        <div className="text-center text-[var(--color-text-muted)] text-sm">
          FEIN: 33-2687374
        </div>
      </div>
    </footer>
  )
}
