import Link from 'next/link';
import MultipleCTAs from '@/components/MultipleCTAs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Site Directory | Adam Matthew Steinberger',
  description:
    'Complete site directory — every page on Adam Matthew Steinberger\'s site, from the hire-me page to the open-source projects, case studies, and writing.',
  alternates: {
    canonical: '/site-directory',
  },
  openGraph: {
    title: 'Site Directory | Adam Matthew Steinberger',
    description: 'Every page on the site in one place.',
    url: 'https://hire.adam.matthewsteinberger.com/site-directory',
  },
};

const pages = [
  { icon: 'fa-home', color: 'gold', title: 'Home', description: 'The whole pitch in one scroll.', href: '/', cta: 'Visit Home' },
  { icon: 'fa-briefcase', color: 'blue', title: 'Hire Me', description: 'Availability, target roles, résumé, and how to reach me.', href: '/hire-me', cta: 'See Hire Me' },
  { icon: 'fa-user', color: 'purple', title: 'My Story', description: 'Background, career timeline, and how I approach architecture work.', href: '/story', cta: 'Read My Story' },
  { icon: 'fa-layer-group', color: 'blue', title: 'Expertise', description: 'The ten technical pillars — AI/ML, RAG, architecture, Azure, and more.', href: '/expertise', cta: 'See Expertise' },
  { icon: 'fa-diagram-project', color: 'green', title: 'Work', description: 'Case studies from thirteen-plus years of shipping software.', href: '/work', cta: 'Browse Work' },
  { icon: 'fa-code-branch', color: 'purple', title: 'Open Source', description: 'MIT-licensed packages on PyPI — the *loop engines, vibey, vibey-gh, vibey-bootstrap, and vibey-skills.', href: '/open-source', cta: 'See Open Source' },
  { icon: 'fa-pen-nib', color: 'coral', title: 'Writing', description: 'Blog, the free Novice to Navigator article series, and both books.', href: '/writing', cta: 'Start Reading' },
  { icon: 'fa-newspaper', color: 'coral', title: 'Blog', description: 'AI, automation, and architecture — including what\'s buzzing right now.', href: '/blog', cta: 'Read the Blog' },
  { icon: 'fa-graduation-cap', color: 'gold', title: 'Novice to Navigator', description: 'A free 33-article series on AI chatbots for business.', href: '/novice-to-navigator', cta: 'Start Learning' },
  { icon: 'fa-book', color: 'gold', title: 'Books', description: 'Two books, both currently in development.', href: '/books', cta: 'See Books' },
  { icon: 'fa-tools', color: 'green', title: 'Consulting Services', description: 'The full range of AI and automation consulting services.', href: '/services', cta: 'Browse Services' },
  { icon: 'fa-envelope', color: 'blue', title: 'Contact', description: 'Send a message directly.', href: '/contact', cta: 'Contact Me' },
  { icon: 'fa-shield-halved', color: 'purple', title: 'Privacy Policy', description: 'How this site handles data and cookies.', href: '/privacy', cta: 'Read Privacy Policy' },
];

// Tailwind can't resolve template-literal class names at build time, so the
// per-color classes are spelled out in full here rather than interpolated.
const colorClasses: Record<string, { border: string; text: string }> = {
  gold: { border: 'border-[var(--color-accent-gold)]/30', text: 'text-[var(--color-accent-gold)]' },
  blue: { border: 'border-[var(--color-accent-blue)]/30', text: 'text-[var(--color-accent-blue)]' },
  green: { border: 'border-[var(--color-accent-green)]/30', text: 'text-[var(--color-accent-green)]' },
  purple: { border: 'border-[var(--color-accent-purple)]/30', text: 'text-[var(--color-accent-purple)]' },
  coral: { border: 'border-[var(--color-accent-coral)]/30', text: 'text-[var(--color-accent-coral)]' },
};

export default function SiteDirectoryPage() {
  return (
    <>
      <section className="container mx-auto px-4 text-center pt-4 pb-6">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-green)] bg-clip-text text-transparent">
          Site Directory
        </h1>
      </section>

      <section className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {pages.map((page) => {
            const colors = colorClasses[page.color];
            return (
            <div
              key={page.href}
              className={`bg-[var(--color-dark-card)] border ${colors.border} rounded-xl p-6 text-center`}
            >
              <i className={`fas ${page.icon} text-4xl ${colors.text} mb-4`}></i>
              <h5 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">{page.title}</h5>
              <p className="text-[var(--color-text-muted)] mb-4">{page.description}</p>
              <Link
                href={page.href}
                className="inline-flex items-center px-4 py-2 border-2 border-[var(--color-text-primary)] text-[var(--color-text-primary)] hover:bg-[var(--color-text-primary)] hover:text-[var(--color-dark-bg)] rounded-lg transition-colors no-underline font-medium"
              >
                {page.cta}
              </Link>
            </div>
            );
          })}
          <div className="md:col-span-2 bg-[var(--color-dark-card)] border border-[var(--color-accent-purple)]/30 rounded-xl p-6 text-center max-w-md mx-auto w-full">
            <i className="fas fa-envelope-open-text text-4xl text-[var(--color-accent-blue)] mb-4"></i>
            <h5 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">Newsletter</h5>
            <p className="text-[var(--color-text-muted)] mb-4">Get notified when the books ship, plus occasional writing updates.</p>
            <a
              href="https://eepurl.com/jiYXCQ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border-2 border-[var(--color-text-primary)] text-[var(--color-text-primary)] hover:bg-[var(--color-text-primary)] hover:text-[var(--color-dark-bg)] rounded-lg transition-colors no-underline font-medium"
            >
              Subscribe
            </a>
          </div>
        </div>
      </section>

      <MultipleCTAs />
    </>
  );
}
