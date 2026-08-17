import Link from 'next/link';
import type { Metadata } from 'next';
import { AudienceToggle, ForAudience } from '@/components/AudienceToggle';
import { getAllBlogPosts } from '@/lib/blogUtils';

export const metadata: Metadata = {
  title: 'Adam Matthew Steinberger | Staff Software Architect & AI Automation Engineer',
  description:
    'Staff Software Architect & AI Automation Engineer, gifted and autistic, in Greenville, SC. 13+ years shipping RAG systems, event-driven Azure microservices, and automation pipelines. Available September 2026.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Adam Matthew Steinberger | Staff Software Architect & AI Automation Engineer',
    description:
      'RAG systems, event-driven Azure microservices, and automation pipelines that the people who inherit them can actually run. Available September 2026 — Greenville, SC (remote) or US remote.',
    url: 'https://hire.adam.matthewsteinberger.com',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Adam Matthew Steinberger' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adam Matthew Steinberger | Staff Software Architect & AI Automation Engineer',
    description:
      'RAG systems, event-driven Azure microservices, and automation pipelines. Available September 2026.',
  },
};

const pillars = [
  { title: 'AI & ML', href: '/expertise#ai-ml', ceo: 'Telling real AI opportunities apart from vendor pitches.', engineer: 'AI ⊃ ML ⊃ DL ⊃ transformers — build order is prompting, then RAG, then fine-tuning.' },
  { title: 'RAG chat systems', href: '/expertise#rag-chat-systems', ceo: 'A chatbot is only as good as what it can retrieve, not which model it runs.', engineer: 'Retrieval, indexing, generation — parent-child chunking and contextual retrieval close the accuracy gap.' },
  { title: 'Agents & automation', href: '/expertise#agents-automation', ceo: 'The hard part is never the model. It’s the guardrails.', engineer: 'Hard iteration caps, token/time budgets, human-in-the-loop checkpoints — mandatory, not polish.' },
  { title: 'Process engineering', href: '/expertise#process-engineering', ceo: 'Most expensive mistakes are scope decisions made before the work even begins.', engineer: 'Cynefin for method selection; structured interviews; Event Storming before code.' },
  { title: 'Scrum & Agile', href: '/expertise#scrum-agile', ceo: 'Security-First Scrum: secure, working, tested, clean — in that order.', engineer: 'Certified ScrumMaster. Threat modeling in backlog refinement, not a waterfall gate.' },
  { title: 'Software architecture', href: '/expertise#software-architecture', ceo: 'Every architecture decision is a trade-off — I help you find it before it costs you.', engineer: 'Modular monolith first. Split along business boundaries, not technical layers.' },
  { title: 'Onion layering', href: '/expertise#onion-clean-layering', ceo: 'Your business logic shouldn’t care what database sits underneath it.', engineer: 'One dependency rule, pointing inward. Domain has zero framework dependencies.' },
  { title: 'Microservices', href: '/expertise#microservices', ceo: 'I don’t reach for microservices by default — only when a real boundary demands it.', engineer: 'Service Bus, Event Grid, Event Hubs — complementary, not competing. Outbox pattern, always.' },
  { title: 'Azure cloud', href: '/expertise#azure-cloud', ceo: '13+ years on Microsoft’s cloud stack — Service Bus, Functions, Key Vault, AKS.', engineer: 'Control-plane "*" does not grant DataActions. Cosmos partition key is an irreversible decision.' },
  { title: 'Data & integration', href: '/expertise#data-integration-pipelines', ceo: 'Connecting the systems that don’t want to talk to each other.', engineer: 'ELT default, idempotency non-negotiable, dbt three-layer discipline.' },
];

const proof = [
  { title: 'AI Payroll Processor', metric: '45-day handoff, junior dev now owns it', href: '/work/enterprise-ai-payroll-processor' },
  { title: 'Self-Hosted RAG Chatbot', metric: 'Mistral-7B, zero external dependencies', href: '/work/self-hosted-rag-chatbot' },
  { title: 'GodFocus Push Notifications', metric: '159/159 tests, 85.84% coverage, 5 billable hours', href: '/work/godfocus-push-notifications' },
  { title: 'Lima One Microservices Suite', metric: 'NestJS/gRPC, replaced legacy Mulesoft', href: '/work/lima-one-microservices-suite' },
];

export default function Home() {
  const latestPosts = getAllBlogPosts().slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="container mx-auto px-4 text-center pt-8 pb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-[var(--color-accent-green)]/15 border border-[var(--color-accent-green)]/30 text-[var(--color-accent-green)] text-sm font-semibold">
          Available September 2026 · Greenville, SC (remote) · US remote
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-3">
          Adam Matthew Steinberger
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-green)] bg-clip-text text-transparent mb-6">
          Staff Software Architect &amp; AI Automation Engineer
        </h2>
        <p className="text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto mb-8">
          Gifted, autistic, in Greenville, SC — 13+ years shipping RAG systems, event-driven
          microservices, and automation pipelines that the people who inherit them can actually
          run.
        </p>
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          <Link
            href="/hire-me"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue-light)] font-bold rounded-lg transition-colors no-underline"
            style={{ color: '#ffffff' }}
          >
            Hire Me
          </Link>
          <a
            href="https://github.com/adammatthewsteinberger/resume/raw/main/adam-steinberger-resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[var(--color-accent-blue)] text-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue)] hover:text-white font-bold rounded-lg transition-colors no-underline"
          >
            Download Résumé
          </a>
        </div>
        <p className="text-sm text-[var(--color-text-muted)] max-w-lg mx-auto">
          159/159 tests, 85.84% coverage, 5 billable hours — that&apos;s what &ldquo;AI-assisted
          TDD&rdquo; means when someone who ships owns it.
        </p>
      </section>

      {/* What I actually do */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-2 text-center text-[var(--color-text-primary)]">
          What I Actually Do
        </h2>
        <p className="text-center text-[var(--color-text-muted)] mb-8">
          Ten pillars. Pick your altitude.
        </p>
        <AudienceToggle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {pillars.map((pillar) => (
              <Link
                key={pillar.title}
                href={pillar.href}
                className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] hover:border-[var(--color-accent-blue)]/50 rounded-xl p-4 no-underline transition-colors"
              >
                <h3 className="font-bold text-[var(--color-text-primary)] mb-2 text-sm">
                  {pillar.title}
                </h3>
                <ForAudience audience="ceo">
                  <p className="text-xs text-[var(--color-text-muted)]">{pillar.ceo}</p>
                </ForAudience>
                <ForAudience audience="engineer">
                  <p className="text-xs text-[var(--color-text-muted)]">{pillar.engineer}</p>
                </ForAudience>
              </Link>
            ))}
          </div>
        </AudienceToggle>
      </section>

      {/* Proof */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8 text-center text-[var(--color-text-primary)]">
          Proof, Not Promises
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {proof.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] hover:border-[var(--color-accent-blue)]/50 rounded-xl p-5 no-underline transition-colors flex flex-col"
            >
              <h3 className="font-bold text-[var(--color-text-primary)] mb-2">{item.title}</h3>
              <p className="text-sm text-[var(--color-accent-green)] font-medium">{item.metric}</p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/work" className="text-[var(--color-accent-blue)] hover:underline font-medium">
            See all the work →
          </Link>
        </div>
      </section>

      {/* Neurodivergence as an engineering advantage */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto bg-[var(--color-dark-card)] border border-[var(--color-accent-purple)]/30 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">
            Autistic, Gifted, and That&apos;s the Point
          </h2>
          <p className="text-[var(--color-text-muted)] mb-4 leading-relaxed">
            I was diagnosed autistic in 2025. It didn&apos;t change how I think — it explained
            it. The same wiring that makes hyperfocus effortless and small talk exhausting is
            the reason I catch the one row in a dataset that contradicts the other nine hundred
            instead of averaging it away. Research on autistic engineers backs this up: a 2024
            study in <em>Frontiers in Psychology</em> documented an &ldquo;ethical advantage of
            autistic employees&rdquo; — lower moral disengagement, less susceptibility to the
            bystander effect. I write everything down for the same reason a RAG pipeline cites
            its sources — because an auditable trail beats a confident guess.
          </p>
          <p className="text-[var(--color-text-muted)] mb-6 leading-relaxed">
            After a year as Senior Azure &amp; AI Development Engineer at The Vizius Group, we
            agreed the volume of AI work didn&apos;t justify a long-term engagement — so as of
            September 2026 I&apos;m looking for the next team where AI, automation, and
            architecture are the whole job, not a side quest.
          </p>
          <Link href="/story" className="text-[var(--color-accent-blue)] hover:underline font-medium">
            Read the full story →
          </Link>
        </div>
      </section>

      {/* What's buzzing */}
      {latestPosts.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold mb-8 text-center text-[var(--color-text-primary)]">
            What&apos;s Buzzing in AI
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {latestPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] hover:border-[var(--color-accent-blue)]/50 rounded-xl p-5 no-underline transition-colors flex flex-col"
              >
                <span className="text-xs text-[var(--color-accent-blue)] font-medium mb-2">
                  {post.category}
                </span>
                <h3 className="font-bold text-[var(--color-text-primary)] text-sm">{post.title}</h3>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/blog" className="text-[var(--color-accent-blue)] hover:underline font-medium">
              Read the blog →
            </Link>
          </div>
        </section>
      )}

      {/* Books */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto bg-[var(--color-dark-card)] border border-[var(--color-accent-gold)]/30 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">Books</h2>
          <p className="text-[var(--color-text-muted)] mb-6">
            <strong className="text-[var(--color-text-primary)]">Novice to Navigator</strong> —
            read the first edition free, right here, 33 articles on AI chatbots for business. A
            second edition is in development.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/novice-to-navigator"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--color-accent-gold)] to-amber-500 hover:from-amber-500 hover:to-[var(--color-accent-gold)] font-bold rounded-lg transition-all no-underline"
              style={{ color: '#000000' }}
            >
              Read Free
            </Link>
            <Link
              href="/books"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[var(--color-accent-gold)] text-[var(--color-accent-gold)] hover:bg-[var(--color-accent-gold)] hover:text-black font-bold rounded-lg transition-colors no-underline"
            >
              See Both Books
            </Link>
          </div>
        </div>
      </section>

      {/* Open source */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8 text-center text-[var(--color-text-primary)]">
          Open Source
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          <a
            href="https://github.com/adammatthewsteinberger/claudeloop"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] hover:border-[var(--color-accent-blue)]/50 rounded-xl p-5 no-underline transition-colors"
          >
            <h3 className="font-bold text-[var(--color-text-primary)] mb-2">
              claudeloop &amp; the *loop family
            </h3>
            <p className="text-sm text-[var(--color-text-muted)]">
              Onion-architected, autonomous AI-agent session runners — 5 packages on PyPI.
            </p>
          </a>
          <a
            href="https://github.com/TheViziusGroup/vibe-engineering-skills"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] hover:border-[var(--color-accent-blue)]/50 rounded-xl p-5 no-underline transition-colors"
          >
            <h3 className="font-bold text-[var(--color-text-primary)] mb-2">
              vibe-engineering-skills
            </h3>
            <p className="text-sm text-[var(--color-text-muted)]">
              18 plugins, 71 evidence-grounded practitioner references, MIT licensed.
            </p>
          </a>
          <a
            href="https://pypi.org/project/azure-bootstrap/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] hover:border-[var(--color-accent-blue)]/50 rounded-xl p-5 no-underline transition-colors"
          >
            <h3 className="font-bold text-[var(--color-text-primary)] mb-2">azure-bootstrap</h3>
            <p className="text-sm text-[var(--color-text-muted)]">
              v3, used across 17+ Azure Functions repos. Solves the logging↔config bootstrap
              paradox.
            </p>
          </a>
        </div>
        <div className="text-center mt-8">
          <Link href="/open-source" className="text-[var(--color-accent-blue)] hover:underline font-medium">
            See everything I&apos;ve open-sourced →
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center bg-gradient-to-br from-[var(--color-accent-blue)]/10 to-[var(--color-accent-green)]/10 border border-[var(--color-accent-blue)]/30 rounded-xl p-10">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-3">
            Looking For
          </h2>
          <p className="text-[var(--color-text-muted)] mb-8">
            Staff Software Architect · AI Automation Engineer · Staff/Principal AI Engineer ·
            Solutions Architect · Platform/Automation Engineer — Greenville-remote or US-remote,
            W2 preferred, contract-to-hire OK.
          </p>
          <Link
            href="/hire-me"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue-light)] font-bold rounded-lg transition-colors no-underline"
            style={{ color: '#ffffff' }}
          >
            Everything a Recruiter Needs →
          </Link>
        </div>
      </section>
    </>
  );
}
