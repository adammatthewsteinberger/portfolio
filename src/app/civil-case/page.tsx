import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Civil Case Documents | Adam Steinberger',
  description:
    'Legal documents and personal testimony related to an ongoing civil case involving alleged NAR Code of Ethics violations by a licensed South Carolina real estate agent.',
  alternates: {
    canonical: '/civil-case',
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      nosnippet: true,
    },
  },
  other: {
    'X-Robots-Tag': 'noindex, nofollow, noarchive, nosnippet',
  },
};

const documents = [
  {
    label: 'Personal Testimony',
    file: 'personal-testimony.pdf',
    description: 'Full personal testimony detailing 19 alleged NAR Code of Ethics violations.',
    date: '',
    size: '12.4 MB',
  },
  {
    label: 'Court Document 001',
    file: 'court-doc-001.pdf',
    description: 'Original summons',
    date: '8/12/25',
    size: '195 KB',
  },
  {
    label: 'Court Document 002',
    file: 'court-doc-002.pdf',
    description: 'Exclusive right to sell agreement',
    date: '8/12/25',
    size: '1.0 MB',
  },
  {
    label: 'Court Document 003',
    file: 'court-doc-003.pdf',
    description: 'Agreement/contract to buy and sell real estate',
    date: '8/12/25',
    size: '1.4 MB',
  },
  {
    label: 'Court Document 004',
    file: 'court-doc-004.pdf',
    description: 'Motion for extension of time',
    date: '10/14/25',
    size: '207 KB',
  },
  {
    label: 'Court Document 005',
    file: 'court-doc-005.pdf',
    description: 'Consent to extend deadline',
    date: '11/6/25',
    size: '152 KB',
  },
  {
    label: 'Court Document 006',
    file: 'court-doc-006.pdf',
    description: 'Original counterclaim',
    date: '11/9/25',
    size: '25.1 MB',
  },
  {
    label: 'Court Document 007',
    file: 'court-doc-007.pdf',
    description: 'Original denial of counterclaims',
    date: '12/9/25',
    size: '203 KB',
  },
  {
    label: 'Court Document 008',
    file: 'court-doc-008.pdf',
    description: 'Amendment to counterclaim',
    date: '1/20/26',
    size: '5.6 MB',
  },
  {
    label: 'Court Document 009',
    file: 'court-doc-009.pdf',
    description: 'Motion to dismiss amendment',
    date: '3/2/26',
    size: '149 KB',
  },
  {
    label: 'Court Document 010',
    file: 'court-doc-010.pdf',
    description: 'Opposition to motion to dismiss amendment',
    date: '3/4/26',
    size: '342 KB',
  },
  {
    label: 'Court Document 011',
    file: 'court-doc-011.pdf',
    description: 'Motion to dismiss original claim for abuse of process / lawfare',
    date: '3/5/26',
    size: '977 KB',
  },
  {
    label: 'Court Document 012',
    file: 'court-doc-012.pdf',
    description: 'First memorandum for motion to dismiss',
    date: '3/11/26',
    size: '411 KB',
  },
  {
    label: 'Court Document 013',
    file: 'court-doc-013.pdf',
    description: 'Second memorandum for motion to dismiss',
    date: '3/12/26',
    size: '787 KB',
  },
];

const violations = [
  {
    num: 1,
    code: 'SOP 10-1',
    title: 'Panic Selling',
    summary:
      "Agent allegedly exploited a disabled seller's emotional distress, financial panic, and religious vulnerability to pressure a below-market sale — including suggesting the seller add personal vehicles to the deal rather than offering favorable alternatives such as waiting for peak season or moving back home.",
  },
  {
    num: 2,
    code: 'SOP 11-1',
    title: 'Duty to Prepare Opinions of Real Property Value',
    summary:
      "Agent provided property valuations ($290K for seller's home, $275K for a comparison property, $20K for seller's car) without any supporting market data, CMA, or required disclosures.",
  },
  {
    num: 3,
    code: 'SOP 1-3',
    title: 'Deliberate Misleading of Market Value',
    summary:
      'Agent may have deliberately understated market value to accelerate a panic sale. No justification for valuations was ever provided in writing.',
  },
  {
    num: 4,
    code: 'Article 2',
    title: 'Misrepresentation and Exaggeration',
    summary:
      "Agent allegedly misrepresented his own religious identity, the buyer's character and intentions, the nature of dual agency, the terms of the deal, and later falsely claimed that seller had signed a Dual Agency Agreement that remains unsigned.",
  },
  {
    num: 5,
    code: 'SOP 1-12',
    title: 'Dual Agency Disclosure',
    summary:
      'Agent continued sending the unsigned Dual Agency Agreement to seller up through the week of closing — even after closing documents had been signed by the buyer — suggesting seller was never properly informed of the dual agency arrangement.',
  },
  {
    num: 6,
    code: 'Article 9',
    title: 'Signed and Initialed Agreements',
    summary:
      'The Dual Agency Agreement was never signed by seller. Agent proceeded with the transaction anyway, including an attempted closing, without this required document.',
  },
  {
    num: 7,
    code: 'Article 17',
    title: 'Failure to Mediate/Arbitrate',
    summary:
      'Agent directed seller to seek legal counsel and proceeded to litigation without first offering mediation or arbitration as required by NAR Code of Ethics — knowing seller was in financial hardship and could not afford legal representation.',
  },
  {
    num: 8,
    code: 'SOP 17-1',
    title: 'Refusal to Arbitrate',
    summary:
      'By filing litigation and refusing to withdraw, agent effectively refused to arbitrate an arbitrable matter.',
  },
  {
    num: 9,
    code: 'SOP 17-2',
    title: 'Duty to Arbitrate',
    summary:
      'Even after seller attempted mediation (which failed), agent never pursued arbitration as required regardless of whether mediation succeeds.',
  },
  {
    num: 10,
    code: 'SOP 1-5',
    title: 'Informed Consent',
    summary:
      'Seller (later confirmed AuDHD — combined autism and ADHD, diagnosed Oct 2025) was not properly informed of the mechanics of the transaction before signing documents. Disability symptomology was observable from the earliest communications.',
  },
  {
    num: 11,
    code: 'SOP 9-2',
    title: 'Reasonable Efforts to Explain',
    summary:
      'Agent failed to make reasonable efforts to explain the nature and specific terms of the transaction to a seller who was demonstrably confused about the payment structure days before a scheduled closing.',
  },
  {
    num: 12,
    code: 'SOP 1-6',
    title: 'Objectivity',
    summary:
      'Agent responded with emotional protest when seller exercised an alternative closing option that agent himself had confirmed with the closing attorney — failing the standard of submitting offers and counter-offers objectively.',
  },
  {
    num: 13,
    code: 'SOP 1-9',
    title: "Confidential Information Used to Client's Disadvantage",
    summary:
      "Agent shared seller's personal hardship with a prospective buyer (asking permission via text). Agent's legal team later weaponized seller's disclosed religious convictions in demand letters using Scripture verses to characterize seller as dishonest.",
  },
  {
    num: 14,
    code: 'Article 1',
    title: 'Fiduciary Duties',
    summary:
      "Agent repeatedly steered seller away from options favorable to seller's own financial interests (keeping the car, waiting for peak season, bringing cash to close) in favor of a deal that included agent's own commission.",
  },
  {
    num: 15,
    code: 'SOP 1-11',
    title: 'Protection Against Losses',
    summary:
      "Agent refused to release seller from the Exclusive Rights to Representation Agreement, causing seller to default on his mortgage and lose possession of his home.",
  },
  {
    num: 16,
    code: 'SOP 12-10',
    title: 'Misleading Consumers',
    summary:
      "Agent manipulated the MLS/Zillow listing — removing and relisting seller's home — while actively refusing to proceed with a valid sale.",
  },
];

export default function CivilCasePage() {
  return (
    <main className="min-h-screen py-16 px-4" style={{ background: 'var(--color-dark-bg)' }}>
      <div className="container mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-widest mb-3" style={{ color: 'var(--color-text-muted)' }}>
            Legal Documents
          </p>
          <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
            Civil Case — Steinberger v. Batson
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-text-muted)' }}>
            This page provides access to the personal testimony and court documents related to an
            ongoing civil case involving alleged violations of the NAR Code of Ethics by a
            licensed South Carolina real estate agent.
          </p>
        </div>

        {/* Personal Testimony Summary */}
        <section
          className="rounded-xl border p-8 mb-12"
          style={{
            background: 'var(--color-dark-card)',
            borderColor: 'var(--color-dark-border)',
          }}
        >
          <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
            Personal Testimony — Summary
          </h2>
          <p className="text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>
            The personal testimony documents 19 alleged violations of the NAR Code of Ethics. A
            brief description of each alleged violation is provided below. Full details, evidence
            references, and exhibit citations are contained in the personal testimony PDF linked in
            the documents section.
          </p>

          <div className="space-y-5">
            {violations.map((v) => (
              <div
                key={v.num}
                className="rounded-lg border p-5"
                style={{ borderColor: 'var(--color-dark-border)', background: 'var(--color-dark-bg)' }}
              >
                <div className="flex items-start gap-3 mb-2">
                  <span
                    className="text-xs font-bold px-2 py-1 rounded shrink-0 mt-0.5"
                    style={{ background: 'var(--color-accent-gold)', color: '#000' }}
                  >
                    {v.num}
                  </span>
                  <div>
                    <span className="text-xs font-mono mr-2" style={{ color: 'var(--color-text-muted)' }}>
                      {v.code}
                    </span>
                    <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                      {v.title}
                    </span>
                  </div>
                </div>
                <p className="text-sm leading-relaxed ml-10" style={{ color: 'var(--color-text-muted)' }}>
                  {v.summary}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Documents */}
        <section>
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--color-text-primary)' }}>
            Documents
          </h2>
          <div className="space-y-3">
            {documents.map((doc) => (
              <a
                key={doc.file}
                href={`/legal/${doc.file}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg border p-4 transition-colors"
                style={{
                  background: 'var(--color-dark-card)',
                  borderColor: 'var(--color-dark-border)',
                }}
              >
                <div className="flex items-center gap-3">
                  <i className="fas fa-file-pdf text-lg" style={{ color: 'var(--color-accent-coral)' }} />
                  <div>
                    <p className="font-medium" style={{ color: 'var(--color-text-primary)' }}>
                      {doc.label}
                    </p>
                    {doc.description && (
                      <p className="text-sm mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                        {doc.description}
                        {doc.date && (
                          <span className="ml-2 text-xs" style={{ color: 'var(--color-text-muted)', opacity: 0.6 }}>
                            {doc.date}
                          </span>
                        )}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0 ml-4">
                  <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                    {doc.size}
                  </span>
                  <i className="fas fa-download text-sm" style={{ color: 'var(--color-text-muted)' }} />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ZIP Download */}
        <div className="mt-10 text-center">
          <a
            href="/legal/civil-case-documents.zip"
            download
            className="inline-flex items-center gap-3 rounded-lg border px-6 py-3 font-medium transition-colors"
            style={{
              background: 'var(--color-dark-card)',
              borderColor: 'var(--color-dark-border)',
              color: 'var(--color-text-primary)',
            }}
          >
            <i className="fas fa-file-zipper text-lg" style={{ color: 'var(--color-accent-blue)' }} />
            Download All Documents (ZIP, ~46 MB)
          </a>
        </div>

        {/* Footer note */}
        <p className="text-xs text-center mt-12" style={{ color: 'var(--color-text-muted)' }}>
          This page is private and not indexed by search engines or AI crawlers.{' '}
          For contact:{' '}
          <a href="mailto:adam@matthewsteinberger.com" style={{ color: 'var(--color-accent-blue)' }}>
            adam@matthewsteinberger.com
          </a>
        </p>

      </div>
    </main>
  );
}
