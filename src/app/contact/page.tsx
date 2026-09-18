import ContactForm from '@/components/ContactForm';
import Link from 'next/link';
import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import { OG_IMAGE } from '@/lib/seo';
import { audiences } from '@/data/audiences';

export const metadata: Metadata = {
  title: 'Contact | Adam Matthew Steinberger',
  description:
    'Reach Adam Matthew Steinberger: to help build vibey, to evaluate it for a government or military organization, or to propose research with a university. Email or the form; replies within 24 hours.',
  alternates: { canonical: '/contact' },
  openGraph: {
    images: [OG_IMAGE],
    title: 'Contact | Adam Matthew Steinberger',
    description: 'For contributors, governments and military, and universities. Replies within 24 hours.',
    url: 'https://vibewithadam.matthewsteinberger.com/contact',
    siteName: 'Adam Matthew Steinberger',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: [OG_IMAGE],
    title: 'Contact | Adam Matthew Steinberger',
    description: 'For contributors, governments and military, and universities.',
  },
};

// The three audiences, in priority order — each door opens its section of /join-me.
const ICONS: Record<string, string> = { developers: 'fa-code-branch', governments: 'fa-shield-halved', academia: 'fa-graduation-cap' };
const doors = audiences.map((audience) => ({
  icon: ICONS[audience.id],
  title: audience.title,
  body: audience.summary,
  href: audience.href,
  cta: audience.cta,
}));

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 pt-8 pb-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-4">Get In Touch</h1>
          <p className="text-xl text-[var(--color-text-muted)]">
            Email{' '}
            <a href="mailto:adam@matthewsteinberger.com" className="text-[var(--color-accent-blue)] hover:underline">
              adam@matthewsteinberger.com
            </a>{' '}
            or use the form. I communicate best in writing and reply within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {doors.map((door) => (
            <div key={door.href} className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-xl p-6 shadow-lg text-center h-full flex flex-col">
              <Icon name={door.icon} className="text-4xl text-[var(--color-accent-blue)] mb-4" />
              <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">{door.title}</h2>
              <p className="text-[var(--color-text-muted)] mb-4 flex-grow">{door.body}</p>
              <Link
                href={door.href}
                className="inline-flex items-center justify-center px-4 py-2 border-2 border-[var(--color-accent-blue)] text-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue)] hover:text-white rounded-lg transition-colors no-underline font-medium"
              >
                {door.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Or Send Me a Message</h2>
          <p className="text-[var(--color-text-muted)]">
            Tell me the problem, not the solution you have in mind.
          </p>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
