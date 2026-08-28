import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Story | Adam Matthew Steinberger',
  description:
    'Staff Software Architect & AI Automation Engineer in Greenville, SC. Thirteen-plus years across insurance, fintech, and cybersecurity, and why I do my best work deep in AI, automation, and architecture.',
  alternates: { canonical: '/story' },
  openGraph: {
    title: 'My Story | Adam Matthew Steinberger',
    description:
      'Staff Software Architect & AI Automation Engineer in Greenville, SC. Thirteen-plus years of shipping RAG systems, microservices, and automation pipelines.',
    url: 'https://hire.adam.matthewsteinberger.com/story',
    type: 'profile',
  },
};

const timeline = [
  { year: '2012', label: 'B.A. Computer Science, Skidmore College' },
  { year: '2013–2015', label: 'Town & Country Computer Services — junior engineer, insurance software' },
  { year: '2015–2019', label: 'New York State Insurance Fund — migrated VB6 to C# MVC, mentored junior devs' },
  { year: '2019–2020', label: 'Bestpass — toll billing systems, introduced automated testing to a legacy codebase' },
  { year: '2020–2021', label: 'Akmazio — led Agile delivery for a mobile networking platform' },
  { year: '2021', label: 'Certified ScrumMaster' },
  { year: '2021–2022', label: 'LeaseTrack — Python + AWS Textract for insurance document parsing' },
  { year: '2022–2023', label: 'Transcat — .NET Web APIs and React for lab equipment calibration' },
  { year: '2023–2025', label: 'Lima One Capital, Greenville SC — NestJS/gRPC microservices suite, replaced legacy Mulesoft' },
  { year: 'Mar–Aug 2025', label: 'Adam Matthew Steinberger LLC — self-hosted RAG, cloud RAG, production push notifications' },
  { year: 'Sep 2025–Aug 2026', label: 'The Vizius Group — Senior Azure & AI Development Engineer' },
  { year: 'Sep 2026', label: 'Available — Staff Software Architect & AI Automation Engineer' },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  mainEntity: {
    '@type': 'Person',
    name: 'Adam Matthew Steinberger',
    jobTitle: 'Staff Software Architect & AI Automation Engineer',
    url: 'https://hire.adam.matthewsteinberger.com/story',
    image: 'https://hire.adam.matthewsteinberger.com/images/profile-picture.jpg',
    address: { '@type': 'PostalAddress', addressLocality: 'Greenville', addressRegion: 'SC', addressCountry: 'US' },
    sameAs: [
      'https://www.linkedin.com/in/adammatthewsteinberger/',
      'https://github.com/adammatthewsteinberger',
    ],
  },
};

export default function StoryPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="container mx-auto px-4 pt-8 pb-16">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <Image
            src="/images/profile-picture.jpg"
            alt="Adam Matthew Steinberger"
            width={160}
            height={160}
            className="rounded-full shadow-lg mx-auto mb-6"
            priority
          />
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-3">
            My Story
          </h1>
          <p className="text-xl text-[var(--color-text-muted)]">
            Thirteen-plus years of shipping software — insurance systems, fintech, toll
            billing, and finally the AI and Azure architecture work I want to be doing.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-10 text-lg leading-relaxed text-[var(--color-text-muted)]">
          <div>
            <p>
              I&apos;m Adam Matthew Steinberger — a Staff Software Architect and AI Automation
              Engineer based in Greenville, South Carolina. I build RAG systems, event-driven
              microservices, and automation pipelines, and I write down how they work well
              enough that the person who inherits them can actually run them.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-3">
              How I think about systems
            </h2>
            <p>
              I go deep rather than wide. Give me one hard architecture problem and a clear
              runway, and I&apos;ll sit inside it until it&apos;s actually solved rather than
              patched — and I&apos;ll hand back a design document before I hand back code,
              because the expensive decisions get made before anyone opens an editor.
            </p>
            <p>
              What I&apos;m good at is the row that doesn&apos;t match. In a spreadsheet, in a
              log, in a RAG pipeline — the one document that contradicts the other nine hundred
              is usually the one that matters, and averaging it away is how systems quietly go
              wrong. That instinct is why I write things down, and why the documentation is a
              deliverable rather than an afterthought.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-3">
              How I work best
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Written specs and async communication over live whiteboards and drive-by Slack pings</li>
              <li>Deep, uninterrupted blocks of time on one hard problem, not context-switched across five</li>
              <li>Remote-first — Greenville, SC is home; the work travels fine over a network connection</li>
              <li>Documentation as a deliverable, not an afterthought — the goal is a system a junior engineer can own</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-3">
              The Vizius year
            </h2>
            <p>
              I spent a year as Senior Azure &amp; AI Development Engineer at{' '}
              <a
                href="https://www.vizius.com/"
                className="text-[var(--color-accent-blue)] hover:underline"
              >
                The Vizius Group
              </a>
              , a cybersecurity firm in Greenville. As of September 2026 I&apos;m looking for
              the next team where AI, automation, and architecture are the whole job, not a side
              quest — the problems I do my best work on, and the ones where I ship the
              documentation that lets a junior developer own what I built.
            </p>
            <p>
              The year was dense. I was sole architect of the firm&apos;s{' '}
              <Link href="/work/ai-governance-gateway" className="text-[var(--color-accent-blue)] hover:underline">
                AI governance gateway
              </Link>{' '}
              — five model vendors behind one policy-enforced API, with per-project cost caps, a
              hash-chained audit trail, and no API keys anywhere in the path — and then migrated
              three product teams onto it. I co-led a{' '}
              <Link href="/work/enterprise-ai-payroll-processor" className="text-[var(--color-accent-blue)] hover:underline">
                20-microservice AI payroll platform
              </Link>{' '}
              (585 test modules, human approval on every phase), led a{' '}
              <Link href="/work/ai-report-generator-email-intake" className="text-[var(--color-accent-blue)] hover:underline">
                technical report generation platform
              </Link>
              , and wrote two{' '}
              <Link href="/work/identity-governance-as-code" className="text-[var(--color-accent-blue)] hover:underline">
                identity-governance-as-code control planes
              </Link>{' '}
              for a SOX-regulated enterprise, a{' '}
              <Link href="/work/multi-system-ticket-relay" className="text-[var(--color-accent-blue)] hover:underline">
                ticket relay
              </Link>{' '}
              with 653 tests and chaos-proved convergence, and a{' '}
              <Link href="/work/multi-tenant-observability-portal" className="text-[var(--color-accent-blue)] hover:underline">
                multi-tenant observability portal
              </Link>
              . Underneath all of it: OIDC workload identity across 20 CI workflows in 9 repos,
              supply-chain scanning and keyless signing, and{' '}
              <a
                href="https://pypi.org/project/vibey-bootstrap/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-accent-blue)] hover:underline"
              >
                vibey-bootstrap
              </a>
              {' '}(published then as azure-bootstrap), the shared Python platform library adopted by 17+
              of the org&apos;s repositories. Around the code: five formal architecture document
              sets, identity-governance advisory for ~5,700 workforce identities, an original
              &ldquo;Security-First Scrum&rdquo; framework with training manuals and AI-agent rulesets,
              and the firm&apos;s LinkedIn thought-leadership program end to end. Client identities
              stay out of it.
            </p>
            <p>
              On the side, unpaid: I&apos;m the volunteer architect behind{' '}
              <Link href="/work/project-excite-relay" className="text-[var(--color-accent-blue)] hover:underline">
                Project Excite
              </Link>
              , the relay that hands a seeker from an AI apologetics chatbot to a live volunteer
              without losing the thread — designed in three technical summaries before a line of
              code, then shipped across split PR stacks. And in 2026 I wrote business plans and
              architecture documents for two SaaS concepts of my own; those stay unnamed here.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-3">
              Before that
            </h2>
            <p>
              Thirteen-plus years of software engineering, starting in Albany, New York, and
              running through insurance systems, fintech, toll billing, mobile networking, and
              lab-equipment calibration before I landed on AI and Azure architecture as the work
              I actually want to be doing every day. If you want the fuller version of my story,
              the parts that aren&apos;t about software are in{' '}
              <Link href="/books" className="text-[var(--color-accent-blue)] hover:underline">
                the book I wrote
              </Link>
              .
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">Timeline</h2>
            <ol className="space-y-3">
              {timeline.map((item) => (
                <li key={item.year} className="flex gap-4 items-baseline">
                  <span className="shrink-0 w-28 text-sm font-mono text-[var(--color-accent-blue)]">
                    {item.year}
                  </span>
                  <span className="text-[var(--color-text-muted)]">{item.label}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="pt-4 text-center">
            <Link
              href="/hire-me"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue-light)] font-bold rounded-lg transition-colors no-underline"
              style={{ color: '#ffffff' }}
            >
              See what I&apos;m looking for →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
