import ContactForm from '@/components/ContactForm';
import Link from 'next/link';
import type { Metadata } from 'next';
import Icon from '@/components/Icon';

export const metadata: Metadata = {
  title: 'Contact | Adam Matthew Steinberger',
  description:
    'Reach Adam Matthew Steinberger — for a role, to contribute to his open-source work, or to talk about a business engagement. Email or the form; replies within 24 hours.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact | Adam Matthew Steinberger',
    description: 'For a role, an open-source contribution, or a business engagement. Replies within 24 hours.',
    url: 'https://vibe.with.adam.matthewsteinberger.com/contact',
    siteName: 'Adam Matthew Steinberger',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | Adam Matthew Steinberger',
    description: 'For a role, an open-source contribution, or a business engagement.',
  },
};

const doors = [
  { icon: 'fa-briefcase', title: 'Hiring?', body: 'Availability, target roles, résumé, and how I interview best — all on one page.', href: '/hire-me', cta: 'Hire Me' },
  { icon: 'fa-code-branch', title: 'Contributing?', body: 'Everything I build in the open is MIT licensed on PyPI. Volunteers are welcome — Greenville-remote or US-remote.', href: '/join-me', cta: 'Join Me' },
  { icon: 'fa-user-tie', title: 'Running a business?', body: 'The executive edition states the problem first, then what changed, then how an engagement works.', href: '/for-executives', cta: 'For Executives' },
];

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
