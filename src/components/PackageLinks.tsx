import { VIBEY_DISTRIBUTION, type OpenSourcePackage } from '@/data/open-source';

const LINK = 'text-[var(--color-accent-blue)] hover:underline';

function External({ href, children, className = LINK }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}

/** A package's links, in order: its source directory, or PyPI · Repository · Docs for vibey. */
export function PackageLinks({ pkg, className }: { pkg: OpenSourcePackage; className?: string }) {
  return (
    <>
      {pkg.links.map((link) => (
        <External key={link.href} href={link.href} className={className}>
          {link.label}
        </External>
      ))}
    </>
  );
}

/**
 * The one-distribution lead line, shared by the homepage and /open-source so
 * both say the same thing: one repository, one PyPI distribution, one install.
 */
export function DistributionNote({ className = '' }: { className?: string }) {
  return (
    <p className={className}>
      Everything here lives in one repository,{' '}
      <External href={VIBEY_DISTRIBUTION.repo}>the-vibey-project/vibey</External>, and ships as one PyPI
      distribution: <code>{VIBEY_DISTRIBUTION.install}</code> installs the conductor, all five{' '}
      <code>*loop</code> engines, and the tools (<External href={VIBEY_DISTRIBUTION.pypi}>PyPI</External>
      {' · '}
      <External href={VIBEY_DISTRIBUTION.docs}>docs</External>).
    </p>
  );
}
