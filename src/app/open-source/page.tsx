import { Metadata } from 'next';
import Link from 'next/link';
import { openSourcePackages, type OpenSourcePackage } from '@/data/open-source';
import { DistributionNote, PackageLinks } from '@/components/PackageLinks';
import { OG_IMAGE } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Open Source | Adam Matthew Steinberger',
  description:
    'One MIT-licensed repository and one PyPI distribution, vibey: the *loop family of autonomous AI-agent session runners, the vibey conductor and its release automation, a Claude Code skills marketplace, and a production Azure Functions bootstrap library.',
  alternates: { canonical: '/open-source' },
  openGraph: {
    images: [OG_IMAGE],
    title: 'Open Source | Adam Matthew Steinberger',
    description:
      'One MIT-licensed repository and one PyPI distribution, vibey: the *loop runners, the vibey conductor and its release automation, a Claude Code skills marketplace, and an Azure Functions bootstrap library.',
    url: 'https://vibewithadam.matthewsteinberger.com/open-source',
  },
};

const families: { family: OpenSourcePackage['family']; title: string; blurb: string }[] = [
  {
    family: 'loop',
    title: 'The *loop engines',
    blurb:
      'One contract, one onion architecture, five vendors. Each runner drives a different coding agent without ever blocking on a human, and tells an exhausted rate-limit window apart from exhausted credits so a build can rotate to another engine instead of dying.',
  },
  {
    family: 'vibey',
    title: 'vibey and its tooling',
    blurb:
      'The conductor that turns those runners into autonomous delivery — spec interview, design pass, unattended build, review, opt-in deploy — plus the release automation, the skills marketplace, and the Azure runtime layer that grew up around it.',
  },
];

function PackageCard({ pkg }: { pkg: OpenSourcePackage }) {
  return (
    <div className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-xl p-6">
      <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-1">{pkg.name}</h3>
      <p className="text-[var(--color-accent-blue)] font-medium text-sm mb-3">{pkg.tagline}</p>
      <p className="text-[var(--color-text-muted)] mb-4">{pkg.description}</p>
      <div className="flex flex-wrap gap-3">
        <PackageLinks pkg={pkg} className="text-sm font-medium text-[var(--color-accent-blue)] hover:underline" />
      </div>
    </div>
  );
}

export default function OpenSourcePage() {
  return (
    <div>
      <section className="container mx-auto px-4 pt-8 pb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-4">
          Open Source
        </h1>
        <p className="text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto">
          MIT licensed, and all of it readable before you ever talk to me.
        </p>
        <DistributionNote className="mt-4 text-[var(--color-text-muted)] max-w-2xl mx-auto" />
      </section>

      {families.map((group) => (
        <section key={group.family} className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">{group.title}</h2>
            <p className="text-[var(--color-text-muted)] mb-6">{group.blurb}</p>
            <div className="space-y-6">
              {openSourcePackages
                .filter((pkg) => pkg.family === group.family)
                .map((pkg) => (
                  <PackageCard key={pkg.name} pkg={pkg} />
                ))}
            </div>
          </div>
        </section>
      ))}

      <section className="container mx-auto px-4 py-12 text-center">
        <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto">
          Want to run the whole stack, contribute, or just say hi?{' '}
          <Link href="/join-me" className="text-[var(--color-accent-blue)] hover:underline">
            Join me
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
