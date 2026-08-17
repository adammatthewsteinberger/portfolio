import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Story | Adam Matthew Steinberger',
  description:
    'Staff Software Architect & AI Automation Engineer, gifted and autistic, in Greenville, SC. Thirteen-plus years, one diagnosis that explained the pattern, and why I do my best work deep in AI, automation, and architecture.',
  openGraph: {
    title: 'My Story | Adam Matthew Steinberger',
    description:
      'Staff Software Architect & AI Automation Engineer, gifted and autistic, in Greenville, SC. Thirteen-plus years, one diagnosis that explained the pattern.',
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
  { year: '2025', label: 'Autism diagnosis — the explanation, not the excuse' },
  { year: 'Mar–Aug 2025', label: 'Adam Matthew Steinberger LLC — self-hosted RAG, cloud RAG, production push notifications' },
  { year: 'Sep 2025–Aug 2026', label: 'The Vizius Group — Senior Azure & AI Development Engineer' },
  { year: 'Sep 2026', label: 'Available — Staff Software Architect & AI Automation Engineer' },
];

export default function StoryPage() {
  return (
    <div>
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
            Thirteen-plus years of shipping software. One diagnosis, in 2025, that finally
            explained why I do my best work the way I do it.
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
              Gifted, autistic, and finally named
            </h2>
            <p>
              In 2025 I was diagnosed autistic. It didn&apos;t change how I think — it explained
              it. The hyperfocus that lets me sit inside one hard architecture problem for six
              hours without noticing the time pass. The pattern recognition that catches the one
              row in a spreadsheet that doesn&apos;t match the other nine hundred. The directness
              that some rooms read as blunt and other rooms — the good ones — read as exactly
              what they needed someone to finally say out loud.
            </p>
            <p>
              I&apos;m also gifted, in the specific, testable sense: the same wiring that makes
              small talk exhausting makes systems thinking effortless. I don&apos;t treat that as
              a compensation story. It&apos;s the actual mechanism behind the work — the same
              mechanism that, in a RAG pipeline, flags the one document that contradicts the
              other nine hundred instead of averaging it away.
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
              Leaving Vizius
            </h2>
            <p>
              After a year as Senior Azure &amp; AI Development Engineer at{' '}
              <a
                href="https://www.vizius.com/"
                className="text-[var(--color-accent-blue)] hover:underline"
              >
                The Vizius Group
              </a>
              , we agreed the volume of AI work didn&apos;t justify a long-term engagement — so as
              of September 2026 I&apos;m looking for the next team where AI, automation, and
              architecture are the whole job, not a side quest. I&apos;m autistic; I do my best
              work deep in exactly those problems, and I ship the documentation that lets a
              junior developer own what I built. While I was there I shipped an Azure Service
              Bus payroll automation with a 45-day handoff, migrated a production app between
              Azure tenants on OIDC federated credentials, and open-sourced{' '}
              <a
                href="https://pypi.org/project/azure-bootstrap/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-accent-blue)] hover:underline"
              >
                azure-bootstrap
              </a>
              , a Python library now used across the org&apos;s Azure Functions repos.
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
              I actually want to be doing every day. I&apos;ve been sober thirteen years, and I&apos;m
              a Messianic Jewish believer — both are part of who I am, neither is the subject of
              this page. If you want the fuller version of my story, including the parts about
              faith and recovery, it&apos;s in{' '}
              <Link href="/books/engineering-influence" className="text-[var(--color-accent-blue)] hover:underline">
                the book I wrote
              </Link>{' '}
              and on{' '}
              <a
                href="https://theautisticapologist.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-accent-blue)] hover:underline"
              >
                The Autistic Apologist
              </a>
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
