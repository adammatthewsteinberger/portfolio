import Link from 'next/link';
import type { Metadata } from 'next';
import { openSourcePackages } from '@/data/open-source';
import { INVITATION, quickstart } from '@/data/quickstart';

export const metadata: Metadata = {
  title: 'Join Me | Adam Matthew Steinberger',
  description:
    'Everything a developer needs to get started with contributing to Adam’s open-source work: run the whole autonomous-delivery stack for free, see how this site is built with it, and where to start. Volunteers welcome — Greenville-remote or US-remote.',
  alternates: { canonical: '/join-me' },
  openGraph: {
    title: 'Join Me | Adam Matthew Steinberger',
    description: 'Run the whole stack for free, see how this site is built with it, and get involved.',
    url: 'https://vibewithadam.matthewsteinberger.com/join-me',
  },
};

const GITHUB = 'https://github.com/adammatthewsteinberger';

// The quickstart lives in src/data/quickstart.ts and is shared with the homepage.

const contribute = [
  { title: 'Open an issue', body: 'Bug, rough edge, or a doc that lied to you — say so on the repo it belongs to. Every repo has a CONTRIBUTING and a SECURITY policy.' },
  { title: 'Send a pull request against develop', body: 'Small and single-purpose. Each repo runs the same gates it asks of you; the release automation (vibey-gh) reviews exact heads and carries a green change through to a release.' },
  { title: 'Add an engine', body: 'The *loop contract is small and documented: a run directory, an exit code for graceful wind-down, a completion marker, and a verdict fence. qwenloop is the newest example of implementing it.' },
  { title: 'Add a skill', body: 'vibey-skills is a marketplace of evidence-grounded practitioner references. Every claim cites the standard, vendor doc, or paper it comes from — bring the citation with the skill.' },
  { title: 'Improve the docs', body: 'The documentation is the product. If you had to read the source to find out, the doc was wrong.' },
];

export default function JoinMePage() {
  return (
    <div>
      <section className="container mx-auto px-4 pt-8 pb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-4">Join Me</h1>
        <p className="text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto">
          I primarily develop free and open-source software, and I&apos;m always open for a
          connection or a coffee — {INVITATION} Everything a developer needs to get started is
          on this page.
        </p>
        <p className="mt-4 text-[var(--color-text-muted)]">
          <a href="mailto:adam@matthewsteinberger.com" className="text-[var(--color-accent-blue)] hover:underline">adam@matthewsteinberger.com</a>
        </p>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Run the whole stack for free</h2>
          <p className="text-[var(--color-text-muted)] mb-6">
            The <code>*loop</code> engines drive coding agents without ever blocking on a human;
            vibey conducts them through a spec interview, an unattended build, and a review;
            vibey-gh carries a green change to a release. All MIT, all on PyPI, nothing tailored
            to anyone&apos;s deployment but this one. Ten minutes from zero to an autonomous
            software-engineering agent:
          </p>
          <ol className="space-y-3 list-none pl-0">
            {quickstart.map((step) => (
              <li key={step.cmd} className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-xl p-4">
                <pre className="mb-1 overflow-x-auto"><code>{step.cmd}</code></pre>
                <p className="text-sm text-[var(--color-text-muted)] mb-0">{step.note}</p>
              </li>
            ))}
          </ol>
          <p className="text-sm text-[var(--color-text-muted)] mt-4">
            Full instructions, the architecture, and the runbooks are in{' '}
            <a href={`${GITHUB}/vibey`} target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent-blue)] hover:underline">the vibey repository</a>.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-[var(--color-dark-card)] border border-[var(--color-accent-purple)]/30 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Dogfooding: this site is built with it</h2>
          <p className="text-[var(--color-text-muted)]">
            The full-page chat at{' '}
            <a href="https://chatwithadam.matthewsteinberger.com/" className="text-[var(--color-accent-blue)] hover:underline">chatwithadam.matthewsteinberger.com</a>{' '}
            shipped as vibey project cycle one: an authored spec with acceptance criteria and
            non-functional requirements, 23 of 23 jobs green across two engines in about fifty
            minutes, and a review gate before merge.
          </p>
          <p className="text-[var(--color-text-muted)] mb-0">
            What it got right: the mechanical work — the page, the component variant, the footer
            and sitemap entries, the tests, the docs. What needed a human afterward: the core
            routing criterion it skipped, a relative canonical, and first-person copy on a page
            that speaks in the third person. That is the honest state of autonomous delivery in
            2026, and it is exactly why the spec, the gates, and the review are the product —
            not the model.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">Ways to contribute</h2>
          <div className="space-y-4">
            {contribute.map((item) => (
              <div key={item.title} className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-xl p-5">
                <h3 className="font-bold text-[var(--color-text-primary)] mb-1">{item.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)] mb-0">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">The repositories</h2>
          <div className="overflow-x-auto border border-[var(--color-dark-border)] rounded-xl">
            <table className="w-full text-sm">
              <tbody>
                {openSourcePackages.map((pkg) => (
                  <tr key={pkg.name} className="border-b border-[var(--color-dark-border)] last:border-b-0">
                    <td className="px-4 py-3 font-mono font-semibold text-[var(--color-text-primary)] whitespace-nowrap">{pkg.name}</td>
                    <td className="px-4 py-3 text-[var(--color-text-muted)]">{pkg.tagline}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <a href={pkg.repo} target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent-blue)] hover:underline mr-3">GitHub</a>
                      <a href={pkg.pypi} target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent-blue)] hover:underline">PyPI</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-[var(--color-text-muted)] mt-4">
            Ground rules travel with each repo: a code of conduct, a security policy (report
            privately, never in a public issue), and the MIT license. Start with{' '}
            <a href={`${GITHUB}/vibey/blob/develop/CONTRIBUTING.md`} target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent-blue)] hover:underline">vibey&apos;s CONTRIBUTING</a>.
            This site is open source too —{' '}
            <a href={`${GITHUB}/portfolio`} target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent-blue)] hover:underline">the repository</a>{' '}
            is MIT for the code and CC BY 4.0 for the writing, and it is the dogfooding target for everything above.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-[var(--color-dark-card)] border border-[var(--color-accent-gold)]/30 rounded-xl p-6">
          <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">Volunteer work</h2>
          <p className="text-[var(--color-text-muted)] mb-0">
            Not everything I build is a package. Since April 2026 I&apos;ve been the volunteer
            architect behind{' '}
            <Link href="/work/project-excite-relay" className="text-[var(--color-accent-blue)] hover:underline">Project Excite</Link>,
            the relay that hands a seeker from an AI chatbot to a live human without losing the
            thread — designed in three technical summaries before a line of code. If you run a
            nonprofit with a real engineering problem, write to me; if you want to volunteer
            alongside, same address.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 text-center">
        <p className="text-[var(--color-text-muted)]">
          Looking to hire the person instead?{' '}
          <Link href="/hire-me" className="text-[var(--color-accent-blue)] hover:underline font-medium">Here&apos;s what I&apos;m looking for →</Link>
        </p>
      </section>
    </div>
  );
}
