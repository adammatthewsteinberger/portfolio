import type { Metadata } from 'next';
import { Libre_Baskerville, Oswald, Playfair_Display } from 'next/font/google';
import styles from './styles.module.css';

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-libre',
  display: 'swap',
});

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-oswald',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'An Open Letter to Investigative Journalists | Adam Steinberger',
  description:
    'A disabled seminary student says South Carolina real estate agent Robert Jackson Batson exploited his autism, his financial panic, and his belief in God \u2014 then sued him when he reported it to regulators. A disciplinary complaint has now been escalated. The civil case is still active.',
  alternates: {
    canonical: '/letter-to-the-press',
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

export default function LetterToThePressPage() {
  const fontClasses = `${playfairDisplay.variable} ${libreBaskerville.variable} ${oswald.variable}`;

  return (
    <div className={`${styles.wrapper} ${fontClasses}`}>

      {/* MASTHEAD */}
      {/* <div className={styles.masthead}>
        <div className={styles.mastheadFlag}>Greenville, South Carolina &middot; Travelers Rest, SC 29690</div>
        <div className={styles.mastheadTitle}>The <span>Steinberger</span> File</div>
        <div className={styles.mastheadSub}>An Exclusive Record for Investigative Journalists</div>
        <hr className={styles.mastheadRule} />
      </div> */}

      {/* TICKER */}
      {/* <div className={styles.ticker}>
        <span className={styles.tickerInner}>
          19 NAR Code of Ethics Violations &nbsp;&middot;&nbsp; Unlawful Attempted Closing &nbsp;&middot;&nbsp; Bible Verses Used as Legal Weapons &nbsp;&middot;&nbsp; Disabled Seller Targeted by Licensed Fiduciary &nbsp;&middot;&nbsp; SC LLR Escalated to Disciplinary Counsel &nbsp;&middot;&nbsp; Civil Suit Filed 4 Months After Regulatory Complaint &nbsp;&middot;&nbsp; $17K Demand + Forced Public Retraction &nbsp;&middot;&nbsp; Federal Whistleblower Protections at Stake &nbsp;&middot;&nbsp; 40+ Timestamped Exhibits Available &nbsp;&middot;&nbsp; On-Record Interview Available Now
        </span>
      </div> */}

      <div className={styles.container}>

        {/* DATELINE */}
        {/* <div className={styles.dateline}>
          <span>Exclusive Press Release</span>
          <span>March 2026</span>
          <span>Greenville County, SC</span>
        </div> */}

        {/* HEADLINE BLOCK */}
        <div className={styles.headlineBlock}>
          <div className={styles.exclusiveTag}>Exclusive Investigation</div>
          <h1 className={styles.mainHeadline}>
            &ldquo;He Took My Car, My Food,<br />and My Faith in People.&rdquo;
          </h1>
          <p className={styles.deck}>
            A disabled seminary student says South Carolina real estate agent Robert Jackson Batson exploited his autism, his financial panic, and his belief in God &mdash; then sued him when he reported it to regulators. A disciplinary complaint has now been escalated. The civil case is still active. The story is yours.
          </p>
        </div>

        {/* BODY */}
        <div className={styles.bodySection}>

          <div className={styles.twoCol}>

            <div className={styles.sectionHead}>The Setup</div>
            <p className={styles.dropcap}>In early 2025, Adam Matthew Steinberger &mdash; software engineer, seminary student, and then-undiagnosed autistic individual &mdash; did what desperate people do. He Googled a real estate agent, called him cold, and told him everything: his job loss, his missed mortgage, his fear, his faith. That agent was Robert Jackson Batson of Linhart Realty Group LLC, d/b/a RE/MAX Results, Greenville County, South Carolina.</p>

            <p>What followed, Steinberger alleges and documentation corroborates, was a textbook panic sale: manufactured urgency, religious manipulation, concealed conflicts of interest, and a transaction structured to strip a vulnerable seller of his only vehicle. In October 2025, Steinberger was formally diagnosed with AuDHD &mdash; combined Autism and ADHD &mdash; by Comprehensive Psychological Services, LLC. The diagnosis confirmed what the text messages had already suggested: a licensed fiduciary had knowingly operated on a vulnerable, disabled client without protection or disclosure.</p>

            <p>Batson has not responded to requests for comment. His brokerage and the South Carolina Department of Labor, Licensing and Regulation have each received formal complaints. The LLR has now escalated Complaint No. 2025-167 to its Office of Disciplinary Counsel.</p>

            <div className={styles.pullquote}>
              <p>&ldquo;They took my words, my faith, and turned them around on me. A lawyer sent me Scripture to tell me I was the liar.&rdquo;</p>
              <cite>&mdash; Adam Matthew Steinberger, Complainant</cite>
            </div>

            <div className={styles.sectionHead}>The Scheme</div>
            <p>Within days of first contact, Batson was texting Steinberger about his car. <em>&ldquo;Do you have a car you are going to be selling? Buyer is trying to come up with some creative ways to make this work.&rdquo;</em> The buyer, Steinberger later discovered, was a personal contact of Batson&rsquo;s &mdash; and a fellow licensed real estate agent. Batson never disclosed this. He introduced the buyer as a &ldquo;seasoned business guy&rdquo; and told Steinberger he was praying for him.</p>

            <p>The proposed deal: $290,000 for the house, $20,000 for Steinberger&rsquo;s car &mdash; combined into a single $310,000 cash transaction. No comparable market analysis was ever provided for either valuation. Carvana, Steinberger later discovered, would have paid him $21,800 for the car alone. The buyer, meanwhile, held $478,320.42 in verified funds as of January 2025. The car was never necessary. It was leverage.</p>

            <p>When Steinberger begged to exclude the car from the deal &mdash; pointing out he needed it to reach classes and potential employers &mdash; Batson confirmed via a closing attorney that a cash-to-close alternative was available. Steinberger acted immediately. He sold the car and lined up the funds. Batson&rsquo;s response: <em>&ldquo;You sold the car??&rdquo;</em> He then claimed the message had not been &ldquo;the intent&rdquo; of what he wrote.</p>

            <div className={styles.sectionHead}>The Closing That Wasn&rsquo;t</div>
            <p>Two weeks of silence followed. Then: without Steinberger&rsquo;s consent, the buyer flew in from Boston and appeared at a closing table in Greenville. A closing attorney contacted Steinberger &mdash; in North Carolina &mdash; requesting a remote signature. He refused. The Dual Agency Agreement, which Batson had continued to send Steinberger up until that very week, remained unsigned. The closing never legally occurred. And yet the demand for $17,318.14 &mdash; the exact cash-to-close figure from that failed transaction &mdash; arrived shortly after.</p>

            <p>Along with the money demand came a second condition: Steinberger must publish a public retraction of every communication he had made to government agencies, regulators, and non-profit organizations about Batson&rsquo;s conduct. Federal whistleblower protections exist precisely to prohibit exactly this kind of demand. It is not a legal remedy. Legal experts who have reviewed the demand have described it plainly: it is extortion.</p>

          </div>

          {/* EVIDENCE BOX */}
          <div className={styles.evidenceBox}>
            <h3>What the Documentation Shows</h3>
            <div className={styles.evidenceGrid}>
              <div className={styles.evidenceItem}>
                <div className={styles.num}>19</div>
                <div className={styles.label}>NAR Code of Ethics Violations Alleged</div>
              </div>
              <div className={styles.evidenceItem}>
                <div className={styles.num}>40+</div>
                <div className={styles.label}>Timestamped Exhibits in the Case File</div>
              </div>
              <div className={styles.evidenceItem}>
                <div className={styles.num}>$478K</div>
                <div className={styles.label}>Buyer&rsquo;s Verified Cash &mdash; the Car Was Never Needed</div>
              </div>
              <div className={styles.evidenceItem}>
                <div className={styles.num}>$17K</div>
                <div className={styles.label}>Demanded from a Disabled Man Who Went 2 Days Without Food</div>
              </div>
              <div className={styles.evidenceItem}>
                <div className={styles.num}>0</div>
                <div className={styles.label}>Times Mediation or Arbitration Was Offered (Required by NAR)</div>
              </div>
              <div className={styles.evidenceItem}>
                <div className={styles.num}>4 mo.</div>
                <div className={styles.label}>Gap Between LLR Complaint Filed and Civil Suit Filed in Retaliation</div>
              </div>
            </div>
          </div>

          <div className={styles.twoCol}>

            <div className={styles.sectionHead}>Bible Verses as Legal Weapons</div>
            <p>After Steinberger began reporting Batson&rsquo;s conduct to regulators and government agencies &mdash; using a pseudonym to protect his professional reputation as an unemployed software engineer &mdash; Batson&rsquo;s legal team responded with cease-and-desist letters. The letters accused him of slander. They also contained more than a dozen Bible verses, delivered to a man whose Christian faith had been thoroughly documented in his own panicked communications to Batson.</p>

          </div>

          <div className={styles.scriptureBlock}>
            <h4>Verses Used Against a Known Christian in Legal Demand Letters (Partial List)</h4>
            <ul>
              <li>&ldquo;The integrity of the upright guides them, but the unfaithful are destroyed by their duplicity.&rdquo; &mdash; Proverbs 11:3</li>
              <li>&ldquo;You shall not bear false witness against your neighbor.&rdquo; &mdash; Exodus 20:16</li>
              <li>&ldquo;Those who consider themselves religious and yet do not keep a tight rein on their tongues deceive themselves, and their religion is worthless.&rdquo; &mdash; James 1:26</li>
              <li>&ldquo;Repay no one evil for evil&hellip; Vengeance is mine, I will repay, says the Lord.&rdquo; &mdash; Romans 12:17&ndash;21</li>
              <li>&ldquo;Little children, let us not love in word or talk but in deed and in truth.&rdquo; &mdash; 1 John 3:18</li>
            </ul>
          </div>

          <div className={styles.twoCol}>

            <p>Steinberger has attended church faithfully for nearly ten years. He was studying for ministry when all of this happened. <em>&ldquo;He saw a religious person in a crisis and he pulled out the Jesus card,&rdquo;</em> Steinberger said. <em>&ldquo;That&rsquo;s not faith. That&rsquo;s a tactic.&rdquo;</em></p>

            <div className={styles.sectionHead}>Moped. No Food. Near Homelessness.</div>
            <p>After selling his car &mdash; his only reliable transportation &mdash; in good faith based on the cash-to-close option Batson confirmed and then disavowed, Steinberger replaced it with a $2,000 moped. The moped only operated in warm, dry weather. He informed Batson and his legal team that he had gone without food for two 24-hour periods. He offered to exchange free labor for a payment plan. He told them he was at risk of homelessness.</p>

            <p>The legal team declined and maintained their demand: $17,000 cash, plus a public retraction of all whistleblower disclosures. Batson simultaneously refused to release Steinberger from his Exclusive Rights to Representation Agreement &mdash; effectively locking him out of relisting his own home while it sat on Zillow in limbo and his mortgage slid toward default.</p>

            <div className={styles.sectionHead}>The Lawfare Confirmation</div>
            <p>Batson filed Civil Action No. 2025-CP-23-05006 in Greenville County on August 12, 2025 &mdash; four months after LLR Complaint No. 2025-167 was already on record. Then, on February 26, 2026, the LLR notified Steinberger that his complaint had been reviewed and formally forwarded to the Office of Disciplinary Counsel for further action.</p>

            <p>Four days later &mdash; March 2, 2026 &mdash; Plaintiff&rsquo;s counsel moved to dismiss Steinberger&rsquo;s most recent amendment to the civil court record: the filing containing his complete, detailed eyewitness testimony of exactly what happened. The same testimony that caused the LLR to escalate. Steinberger has filed a Pro Se Motion to Dismiss for Abuse of Process and Unlawful Use of Litigation as Lawfare, arguing that the civil suit exists not to recover $17,000 but to silence a disabled whistleblower and preserve a real estate license now under active disciplinary review.</p>

          </div>

          {/* TIMELINE */}
          <div className={styles.timeline}>
            <div className={styles.timelineEvent}>
              <div className={styles.timelineDate}>February 2025</div>
              <div className={styles.timelineText}>Steinberger first contacts Batson. Discloses job loss, missed mortgage, faith, and financial desperation.</div>
            </div>
            <div className={styles.timelineEvent}>
              <div className={styles.timelineDate}>March 1, 2025</div>
              <div className={styles.timelineText}>Batson begins engineering car inclusion in the deal. Introduces buyer without disclosing buyer is a fellow licensed agent and personal contact.</div>
            </div>
            <div className={styles.timelineEvent}>
              <div className={styles.timelineDate}>March 10&ndash;11, 2025</div>
              <div className={styles.timelineText}>Steinberger catches on, pushes back, sells car based on confirmed cash alternative. Batson repudiates the option. Tells Steinberger to &ldquo;contact an attorney.&rdquo; No mediation offered.</div>
            </div>
            <div className={styles.timelineEvent}>
              <div className={styles.timelineDate}>April 10, 2025</div>
              <div className={styles.timelineText}>LLR Complaint No. 2025-167 filed by Steinberger.</div>
            </div>
            <div className={styles.timelineEvent}>
              <div className={styles.timelineDate}>August 12, 2025</div>
              <div className={styles.timelineText}>Batson files Civil Action No. 2025-CP-23-05006 &mdash; four months after LLR complaint is on record. Demands $17,318.14 plus forced public retraction of all regulatory communications.</div>
            </div>
            <div className={styles.timelineEvent}>
              <div className={styles.timelineDate}>October 21, 2025</div>
              <div className={styles.timelineText}>Steinberger formally diagnosed AuDHD (combined Autism + ADHD) by Comprehensive Psychological Services, LLC.</div>
            </div>
            <div className={styles.timelineEvent}>
              <div className={styles.timelineDate}>February 26, 2026</div>
              <div className={styles.timelineText}>SC LLR escalates complaint to Office of Disciplinary Counsel for further action.</div>
            </div>
            <div className={styles.timelineEvent}>
              <div className={styles.timelineDate}>March 2, 2026</div>
              <div className={styles.timelineText}>Plaintiff&rsquo;s counsel moves to suppress Steinberger&rsquo;s complete testimony from the civil record &mdash; four days after LLR escalation.</div>
            </div>
          </div>

          <div className={styles.twoCol}>
            <div className={styles.sectionHead}>Why This Belongs on Your Front Page</div>
            <p>This story has everything: a licensed professional exploiting a disabled person&rsquo;s vulnerability, religious manipulation weaponized in legal filings, a regulatory body that acted only after a year of pressure, and a civil suit that appears designed not to seek justice but to achieve the opposite. The evidence is documented, timestamped, and available for review. The source is on record and available for interview immediately.</p>

            <p>Robert Jackson Batson holds an active South Carolina real estate license. He is a member of the Travelers Rest Greater Chamber of Commerce. He has professional and social connections in Greenville County. Steinberger has none of those things. What he has is the documentation &mdash; over 40 exhibits &mdash; and the pattern recognition to have assembled it while riding a moped in the rain between classes and food pantries. <em>&ldquo;Most people in my situation do not figure it out. They just lose everything and they don&rsquo;t know why.&rdquo;</em></p>

            <p>He is not asking for sympathy. He is asking for the story to be told.</p>
          </div>

        </div>
      </div>

      {/* CTA */}
      <div className={styles.ctaSection}>
        <div className={styles.container}>
          <h2>This Story Is <em>Yours.</em></h2>
          <p>Full exhibit package. Complete documentation. An on-record source available immediately. If you cover government accountability, regulatory capture, or the abuse of legal process against vulnerable individuals &mdash; this file is ready for you.</p>

          <div className={styles.ctaButtons}>
            <a
              className={styles.btnPrimary}
              href="mailto:adam@matthewsteinberger.com?subject=Press%20Inquiry%20-%20Steinberger%20v.%20Batson"
            >
              Request On-Record Interview
            </a>
            <a
              className={styles.btnSecondary}
              href="/docs/letter-to-the-press.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download the Full Case File
            </a>
          </div>

          <div className={styles.contactInfo}>
            <p style={{ color: '#666', fontSize: '12px', marginTop: '24px', letterSpacing: '0.15em' }}>
              Adam Matthew Steinberger &nbsp;&middot;&nbsp;
              <a href="tel:8645174117">(864) 517-4117</a> &nbsp;&middot;&nbsp;
              <a href="mailto:adam@matthewsteinberger.com">adam@matthewsteinberger.com</a> &nbsp;&middot;&nbsp;
              236 Tippin Trl, Travelers Rest, SC 29690
            </p>
            <p style={{ color: '#555', fontSize: '11px', marginTop: '8px', fontStyle: 'italic', letterSpacing: '0.05em' }}>
              Civil Action No. 2025-CP-23-05006 &middot; LLR Complaint No. 2025-167 &middot; All exhibits available for editorial review upon request.
            </p>
          </div>
        </div>
      </div>

      {/* <footer className={styles.pressFooter}>
        &copy; 2026 Adam Matthew Steinberger &middot; Travelers Rest, SC &middot; All rights reserved &middot; Case documents available to credentialed press
      </footer> */}

    </div>
  );
}
