import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Civil Case Documents | Adam Steinberger',
  description:
    'Legal documents and personal testimony for Case No. 2025-CP-23-05006: an ongoing civil case in Greenville County Court of Common Pleas involving alleged NAR Code of Ethics violations by a licensed South Carolina REALTOR®. Hearing scheduled May 5, 2026.',
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
    label: 'Combined Testimony: ADA Memorandum & Chronological Record',
    file: '000-combined-testimony.pdf',
    description: "Defendant's Memorandum in Lieu of Verbal Testimony with attached Chronological Personal Testimony, submitted as ADA accommodation for the May 5, 2026 hearing.",
    date: '4/22/26',
    size: '13.2 MB',
  },
  {
    label: 'Personal Testimony',
    file: '001-personal-testimony.pdf',
    description: 'Full personal testimony detailing 19 alleged NAR Code of Ethics violations.',
    date: '12/15/25',
    size: '13 MB',
  },
  {
    label: 'Original Court Summons',
    file: '002-original-summons.pdf',
    description: 'Original summons',
    date: '8/12/25',
    size: '201 KB',
  },
  {
    label: 'Exclusive Right to Sell Agreement',
    file: '003-exclusive-right-to-sell.pdf',
    description: 'Exclusive right to sell agreement',
    date: '8/12/25',
    size: '1.1 MB',
  },
  {
    label: 'Contract to Buy and Sell Real Estate',
    file: '004-contract-to-buy-sell.pdf',
    description: 'Agreement/contract to buy and sell real estate',
    date: '8/12/25',
    size: '1.4 MB',
  },
  {
    label: 'Motion for Extension of Time',
    file: '005-extension-of-time.pdf',
    description: 'Motion for extension of time',
    date: '10/14/25',
    size: '213 KB',
  },
  {
    label: 'Consent to Extend Deadline',
    file: '006-deadline-extension.pdf',
    description: 'Consent to extend deadline',
    date: '11/6/25',
    size: '160 KB',
  },
  {
    label: 'Original Counterclaim',
    file: '007-original-counterclaim.pdf',
    description: 'Original counterclaim',
    date: '11/9/25',
    size: '26.4 MB',
  },
  {
    label: 'Denial of Counterclaims',
    file: '008-denial-of-counterclaim.pdf',
    description: 'Original denial of counterclaims',
    date: '12/9/25',
    size: '209 KB',
  },
  {
    label: 'Amendment to Counterclaim',
    file: '009-amendment-to-counterclaim.pdf',
    description: 'Amendment to counterclaim',
    date: '1/20/26',
    size: '5.9 MB',
  },
  {
    label: 'Motion to Dismiss Amendment',
    file: '010-motion-to-dismiss-amendment.pdf',
    description: 'Motion to dismiss amendment',
    date: '3/2/26',
    size: '156 KB',
  },
  {
    label: 'Opposition to Motion to Dismiss Amendment',
    file: '011-opposition-to-dismissal.pdf',
    description: 'Opposition to motion to dismiss amendment',
    date: '3/4/26',
    size: '352 KB',
  },
  {
    label: 'Motion to Dismiss Original Claim',
    file: '012-motion-to-dismiss-claim.pdf',
    description: 'Motion to dismiss original claim for abuse of process / lawfare',
    date: '3/5/26',
    size: '1 MB',
  },
  {
    label: 'Arguendo Memorandum for Motion to Dismiss',
    file: '013-arguendo-memorandum.pdf',
    description: 'First memorandum for motion to dismiss',
    date: '3/11/26',
    size: '422 KB',
  },
  {
    label: 'Chronology Memorandum for Motion to Dismiss',
    file: '014-chronology-memorandum.pdf',
    description: 'Second memorandum for motion to dismiss',
    date: '3/12/26',
    size: '807 KB',
  },
  {
    label: 'Valuation Memorandum for Motion to Dismiss',
    file: '015-valuation-memorandum.pdf',
    description: 'Third memorandum for motion to dismiss',
    date: '4/17/26',
    size: '1.4 MB',
  },
  {
    label: 'Motion for Continuance',
    file: '016-motion-for-continuance.pdf',
    description: 'Motion to continue the May 5, 2026 hearing to allow newly retained counsel adequate time to prepare. Prospective counsel has expressed willingness to represent.',
    date: '4/22/26',
    size: '406 KB',
  },
];

const violations = [
  {
    num: 1,
    code: 'SOP 10-1',
    title: 'Panic Selling',
    summary: "Exploited a disabled seller's emotional distress and religious vulnerability to pressure a below-market sale.",
  },
  {
    num: 2,
    code: 'SOP 11-1',
    title: 'Unsupported Valuations',
    summary: 'Provided valuations for home, comp, and personal property with no CMA, market data, or required disclosures.',
  },
  {
    num: 3,
    code: 'SOP 1-3',
    title: 'Deliberate Undervaluation',
    summary: 'Understated market value in writing with no justification, likely to accelerate a distressed sale.',
  },
  {
    num: 4,
    code: 'Article 2',
    title: 'Misrepresentation',
    summary: 'Misrepresented religious identity, dual agency, deal terms, and later falsely claimed seller signed a document that remains unsigned.',
  },
  {
    num: 5,
    code: 'SOP 1-12',
    title: 'Dual Agency Disclosure Failure',
    summary: 'Sent the unsigned Dual Agency Agreement through closing week, seller was never properly informed.',
  },
  {
    num: 6,
    code: 'Article 9',
    title: 'Unsigned Required Agreement',
    summary: 'Proceeded to closing without a signed Dual Agency Agreement, a required document.',
  },
  {
    num: 7,
    code: 'Article 17',
    title: 'Failure to Offer Mediation',
    summary: 'Skipped mandatory mediation/arbitration and went straight to litigation against an unrepresented disabled seller.',
  },
  {
    num: 8,
    code: 'SOP 17-1',
    title: 'Refusal to Arbitrate',
    summary: 'Filed suit and refused to withdraw, bypassing an arbitrable dispute.',
  },
  {
    num: 9,
    code: 'SOP 17-2',
    title: 'Duty to Arbitrate Ignored',
    summary: 'Never pursued arbitration even after mediation failed: a separate, ongoing obligation.',
  },
  {
    num: 10,
    code: 'SOP 1-5',
    title: 'Informed Consent',
    summary: 'AuDHD seller (diagnosed Oct 2025) was not informed of transaction mechanics before signing. Observable from early communications.',
  },
  {
    num: 11,
    code: 'SOP 9-2',
    title: 'Failure to Explain Terms',
    summary: 'Seller was demonstrably confused about payment structure days before closing. Agent made no reasonable effort to clarify.',
  },
  {
    num: 12,
    code: 'SOP 1-6',
    title: 'Lack of Objectivity',
    summary: "Responded with emotional protest when seller used a closing option the agent himself had confirmed, a textbook objectivity failure.",
  },
  {
    num: 13,
    code: 'SOP 1-9',
    title: 'Confidential Information Weaponized',
    summary: "Disclosed seller's hardship to a buyer, then legal team weaponized seller's religious beliefs in demand letters.",
  },
  {
    num: 14,
    code: 'Article 1',
    title: 'Breach of Fiduciary Duty',
    summary: "Steered seller away from financially favorable options to protect a commission-bearing deal.",
  },
  {
    num: 15,
    code: 'SOP 1-11',
    title: 'Failure to Protect Against Loss',
    summary: 'Refused to release seller from the listing agreement, directly causing mortgage default and loss of home.',
  },
  {
    num: 16,
    code: 'SOP 12-10',
    title: 'MLS Manipulation',
    summary: "Removed and relisted seller's property on MLS/Zillow while blocking a valid sale.",
  },
  {
    num: 17,
    code: 'SOP 12-8',
    title: 'Assurance of Current Information Online',
    summary: 'Failed to ensure online listing information was accurate and current during the transaction.',
  },
  {
    num: 18,
    code: 'SOP 1-1',
    title: 'Obligation to the Code of Ethics',
    summary: 'Agent had an affirmative duty to uphold the Code, a duty violated across every interaction documented in this case.',
  },
  {
    num: 19,
    code: 'SOP 1-2',
    title: 'All Encompassing',
    summary: "Agent's conduct violated the spirit and letter of the Code in its entirety, not merely isolated provisions.",
  },
];

export default function CivilCasePage() {
  return (
    <main className="min-h-screen py-16 px-4" style={{ background: 'var(--color-dark-bg)' }}>
      <div className="container mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-12 text-center">
          <p id="legal-documents" className="text-sm uppercase tracking-widest mb-3" style={{ color: 'var(--color-text-muted)', scrollMarginTop: '80px' }}>
            Legal Documents
          </p>
          <h1 className="text-4xl font-bold" style={{ color: 'var(--color-text-primary)', marginBottom: '2.5rem' }}>
            Linhart Realty Group LLC d/b/a RE/MAX Results
            <br />
            <small style={{ fontSize: '0.5em' }}>Robert Jackson Batson, MLS #74055</small>
            <br />
            v.
            <br />
            Adam Matthew Steinberger
            <br />
            <small style={{ fontSize: '0.5em' }}>Disabled pro se litigant</small>
          </h1>
          <div className="max-w-2xl mx-auto rounded-xl border p-6 mt-2" style={{ background: 'var(--color-dark-card)', borderColor: 'var(--color-dark-border)' }}>
            <p className="text-lg mb-3" style={{ color: 'var(--color-text-muted)' }}>
              Case No. 2025-CP-23-05006, Greenville County Court of Common Pleas.{' '}
              A <strong className="text-primary">strong, well-documented case</strong>{' '}
              against a licensed South Carolina REALTOR®: 19 alleged{' '}
              <strong className="text-primary">NAR Code of Ethics violations</strong>,
              a structural defect running through the entire transaction (unsigned Dual Agency Agreement
              required by SC Code § 40-57-350), plaintiff&apos;s claims without merit, and{' '}
              <strong className="text-primary">$2M+ in potential counterclaim damages</strong>.
            </p>
            <p className="text-lg mb-3" style={{ color: 'var(--color-text-muted)' }}>
              A <strong className="text-primary">hearing is scheduled for May 5, 2026</strong>.
              A motion for continuance was filed April 22, 2026 to allow incoming counsel adequate
              preparation time.{' '}
              <strong className="text-primary">Prospective counsel has already expressed willingness
              to represent</strong>, retention is contingent on that continuance being granted.
              All evidentiary and legal groundwork is complete.
            </p>
            <p className="text-lg mb-0" style={{ color: 'var(--color-text-muted)' }}>
              The defendant carries{' '}
              <strong className="text-primary">formal diagnoses of ASD Level 1, ADHD (Combined),
              GAD, and PTSD</strong>{' '}(PCL-5 severity 73/80), confirmed by a licensed psychologist
              and admitted by plaintiff&apos;s counsel in their own pleading. An ADA accommodation
              for written testimony in lieu of verbal has been filed concurrently.
              The <strong className="text-primary">pro se neurodivergent defendant</strong> is
              seeking counsel to take this case to trial.
            </p>
          </div>
        </div>

        {/* Quick ZIP download */}
        <p className="text-sm text-center mb-10" style={{ color: 'var(--color-text-muted)' }}>
          <a href="/legal/civil-case-documents.zip" download style={{ color: 'var(--color-accent-blue)' }}>
            <i className="fas fa-file-zipper mr-1" />
            Download all documents (ZIP, 61.7 MB)
          </a>
        </p>

        {/* Personal Testimony Summary */}
        <section
          className="rounded-xl border p-8 mb-12"
          style={{
            background: 'var(--color-dark-card)',
            borderColor: 'var(--color-dark-border)',
          }}
        >
          <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
            Summary
          </h2>
          <p className="text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>
            19 alleged NAR Code of Ethics violations: summaries below, full evidence and exhibit citations in the <a href="/legal/001-personal-testimony.pdf" target="_blank" style={{ color: 'var(--color-text-primary)' }}>personal testimony PDF</a>.
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
        <div className="mt-10 mb-16 text-center">
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
            Download All Documents (ZIP, 61.7 MB)
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
