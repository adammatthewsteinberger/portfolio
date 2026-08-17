import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Expertise | Adam Matthew Steinberger',
  description:
    'AI/ML, RAG chat systems, agents & automation, process engineering, Scrum/Agile, software architecture, onion layering, microservices, Azure cloud, and data & integration pipelines.',
  openGraph: {
    title: 'Expertise | Adam Matthew Steinberger',
    description:
      'AI/ML, RAG chat systems, agents & automation, process engineering, Scrum/Agile, software architecture, onion layering, microservices, Azure cloud, and data & integration pipelines.',
    url: 'https://hire.adam.matthewsteinberger.com/expertise',
  },
};

interface Pillar {
  title: string;
  ceo: string;
  engineer: string;
  rule: string;
}

const pillars: Pillar[] = [
  {
    title: 'AI & ML',
    ceo: 'I help you tell the difference between a genuine AI opportunity and a vendor pitch — most of what gets sold as "AI" is a decision tree with better marketing.',
    engineer:
      'AI ⊃ ML ⊃ DL ⊃ transformers/LLMs is a nested hierarchy, and knowing where your use case sits in it is the first question before choosing a vendor or a model. Build order: prompting, then RAG, then fine-tuning — in that order, because each step adds cost and most problems never need the third.',
    rule: 'The word "AI" in a vendor pitch tells you nothing about which level of that hierarchy is actually involved.',
  },
  {
    title: 'RAG chat systems',
    ceo: 'A chatbot with a 35% resolution rate and one with an 85% resolution rate are almost never running different AI models — they’re running on different data.',
    engineer:
      'RAG turns a closed-book exam into an open-book one: retrieval, indexing, and generation, each of which can fail independently. Parent-child chunking, contextual retrieval, and hybrid search close most of the gap before the model is ever touched.',
    rule: 'The AI is a commodity. The knowledge base is the only genuinely proprietary part of the stack.',
  },
  {
    title: 'Agents & automation',
    ceo: 'The hard part of an AI agent is never the model. It’s the guardrails — the limits that stop it from running away with your Azure bill or doing something you didn’t ask for.',
    engineer:
      'Hard iteration caps, token/time budgets per run, explicit completion criteria, and human-in-the-loop checkpoints are mandatory production controls, not polish. Model Context Protocol (MCP) is becoming the standard way agents reach tools and data — I design for it.',
    rule: 'Single-agent architectures handle roughly 80% of real cases. Multi-agent adds cost and non-determinism most problems don’t need.',
  },
  {
    title: 'Process engineering',
    ceo: 'Most expensive project mistakes aren’t technical failures. They’re scope decisions made before the technical work even begins — or never made at all.',
    engineer:
      'Cynefin for method selection (the most damaging error is treating a Complex problem as merely Complicated and over-planning the unknowable); structured interviews as the highest-yield requirements technique; Event Storming and Example Mapping to surface bounded contexts before a line of code is written.',
    rule: 'No single methodology wins. Context-fit and execution discipline win.',
  },
  {
    title: 'Scrum & Agile',
    ceo: 'I run Security-First Scrum: secure, working, tested, clean code, in that order — never traded away for speed.',
    engineer:
      'Certified ScrumMaster. Threat modeling belongs in backlog refinement (a 5–10 minute STRIDE pass), not a waterfall gate. Retrospective action items get a single named owner and become backlog tickets, or they die — most retros fail because nobody follows through.',
    rule: 'Psychological safety is a security control. Teams without it hide vulnerabilities instead of reporting them.',
  },
  {
    title: 'Software architecture',
    ceo: 'Every architecture decision is a trade-off. If you think you’ve found one that isn’t, you haven’t found the trade-off yet — I’ll help you find it before it costs you six months.',
    engineer:
      'Start with a modular monolith, not microservices — roughly 80% of microservices’ benefits come from logical boundaries, not independent deployment, and the infrastructure cost runs 3.75–6x higher. Split along business boundaries, not technical layers.',
    rule: 'A dedicated "release coordination manager" role is the tell-tale sign of a distributed monolith, not a real microservices win.',
  },
  {
    title: 'Onion / clean layering',
    ceo: 'I build systems where the core business logic doesn’t know or care what database or framework is running underneath it — so swapping either one later doesn’t require a rewrite.',
    engineer:
      'Hexagonal, Clean, and Onion architecture are the same idea in three vocabularies: a dependency rule pointing inward to a framework-independent domain core, with adapters at the edges. Domain has zero dependencies on API or infrastructure — no exceptions.',
    rule: 'Dependencies point inward only. The moment they don’t, you have a distributed monolith wearing an architecture diagram as a costume.',
  },
  {
    title: 'Microservices',
    ceo: 'I don’t reach for microservices by default — I reach for them when a specific business boundary or compliance requirement genuinely demands independent deployment.',
    engineer:
      'Event-driven patterns via Azure Service Bus (ordering, transactions, DLQ), Event Grid (reactive pub/sub), and Event Hubs (the log, not the queue) are complementary, not competing. The Outbox pattern is mandatory wherever a business change and an event need to land together — never two independent writes.',
    rule: 'Redundancy is architecture; resiliency is behavior. Size failover capacity for full load, not half.',
  },
  {
    title: 'Azure cloud',
    ceo: 'I’ve spent thirteen-plus years building on Azure and Microsoft’s cloud stack — Service Bus, Functions, Key Vault, App Config, AKS — and I know which of its 250-plus built-in roles actually maps to a data-plane action you need.',
    engineer:
      'Control-plane "*" in Actions does not grant DataActions — the single most common source of production RBAC incidents. Managed identity, zero stored secrets, OIDC federation for CI/CD. Cosmos DB partition key is an irreversible decision; get it wrong and it’s a re-platform, not a config change.',
    rule: 'Owner can fully manage a storage account and still not read a single blob without a separate data-plane role assignment. This catches even experienced engineers.',
  },
  {
    title: 'Data & integration pipelines',
    ceo: 'I connect the systems that don’t want to talk to each other — HubSpot, SharePoint, Snowflake, Salesforce, legacy APIs — without building a fragile spaghetti of point-to-point scripts.',
    engineer:
      'ELT is the production default on modern warehouses; idempotency is non-negotiable so re-running a failed job never double-writes. dbt three-layer discipline: staging views with no joins, intermediate as ephemeral, marts capped at 4–6 joins.',
    rule: 'Watermark storage belongs in an audit table in the target database, not just an orchestrator variable — or it’s undebuggable when it breaks at 2am.',
  },
];

const stack = [
  'Python', 'TypeScript / NestJS', 'C# / .NET', 'Next.js / React',
  'PostgreSQL / pgvector', 'MongoDB', 'Snowflake',
  'Azure Functions', 'Azure Service Bus', 'Azure App Config & Key Vault', 'Azure App Insights', 'AKS / Helm / GitOps', 'Bicep',
  'Docker / Kubernetes', 'vLLM / Ollama / FAISS', 'LangChain / MCP',
  'Claude / GPT / Gemini / Mistral',
  'Grafana / Prometheus',
  'GitHub Actions / Bitbucket / Azure DevOps',
  'Jira / Scrum (CSM)',
];

export default function ExpertisePage() {
  return (
    <div>
      <section className="container mx-auto px-4 pt-8 pb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-4">
          Where I Actually Shine
        </h1>
        <p className="text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto">
          Ten pillars, each explained twice — plainly, and precisely.
        </p>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              id={pillar.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
              className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-xl p-6 scroll-mt-24"
            >
              <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-3">
                {pillar.title}
              </h2>
              <p className="text-[var(--color-text-muted)] mb-3">
                <span className="font-semibold text-[var(--color-text-primary)]">In plain terms: </span>
                {pillar.ceo}
              </p>
              <p className="text-[var(--color-text-muted)] mb-3">
                <span className="font-semibold text-[var(--color-text-primary)]">For engineers: </span>
                {pillar.engineer}
              </p>
              <p className="text-sm italic text-[var(--color-accent-blue)]">{pillar.rule}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6 text-center">
            The Stack
          </h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {stack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-sm bg-[var(--color-dark-card-alt)] text-[var(--color-text-muted)] rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16 text-center">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue-light)] font-bold rounded-lg transition-colors no-underline"
          style={{ color: '#ffffff' }}
        >
          See it in production →
        </Link>
      </section>
    </div>
  );
}
