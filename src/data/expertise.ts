/**
 * The single source of truth for "what Adam does".
 *
 * Six specialty groups in the order the August-2026 bio lists them, plus one
 * group for how he designs and delivers. Every pillar carries the full
 * engineering explanation and its quotable rule (rendered on /expertise and
 * fed to the RAG knowledge base) and a plain-terms line (kept here as the seed
 * for the executive edition — it is not rendered on the engineering pages).
 *
 * `where` lists case-study slugs from src/data/projects.ts; a test asserts
 * they all exist.
 */

export interface Pillar {
  /** Stable anchor on /expertise (do not rename — KB URLs and homepage links use it). */
  id: string;
  title: string;
  engineer: string;
  rule: string;
  plain: string;
}

export interface SpecialtyGroup {
  id: string;
  /** The bio's wording, verbatim where the bio names the group. */
  title: string;
  summary: string;
  stack: string[];
  where: string[];
  pillars: Pillar[];
}

export const specialtyGroups: SpecialtyGroup[] = [
  {
    id: 'azure-platform',
    title: 'Azure',
    summary: 'AKS, Functions, Service Bus, Bicep, Terraform, Key Vault — thirteen-plus years on Microsoft’s cloud, most recently private AKS with workload identity and no stored secrets.',
    stack: ['AKS', 'Azure Functions', 'Service Bus', 'Event Grid', 'Bicep', 'Terraform', 'Key Vault', 'App Config', 'App Insights', 'Entra ID'],
    where: ['ai-governance-gateway', 'enterprise-ai-payroll-processor', 'azure-tenant-migration', 'ai-report-generator-email-intake'],
    pillars: [
      {
        id: 'azure-cloud',
        title: 'Azure cloud',
        engineer:
          'Control-plane "*" in Actions does not grant DataActions — the single most common source of production RBAC incidents. Managed identity, zero stored secrets, OIDC federation for CI/CD. Cosmos DB partition key is an irreversible decision; get it wrong and it’s a re-platform, not a config change.',
        rule: 'Owner can fully manage a storage account and still not read a single blob without a separate data-plane role assignment. This catches even experienced engineers.',
        plain:
          'I’ve spent thirteen-plus years building on Azure and Microsoft’s cloud stack — Service Bus, Functions, Key Vault, App Config, AKS — and I know which of its 250-plus built-in roles actually maps to a data-plane action you need.',
      },
    ],
  },
  {
    id: 'backends',
    title: 'Python and .NET backends',
    summary: 'Onion-layered services with a framework-free domain core — Python (FastAPI, Azure Functions) and C#/.NET, with TypeScript/NestJS when the platform calls for it.',
    stack: ['Python', 'FastAPI', 'C# / .NET', 'TypeScript / NestJS', 'PostgreSQL / pgvector', 'MongoDB', 'Redis'],
    where: ['multi-system-ticket-relay', 'ai-governance-gateway', 'lima-one-microservices-suite', 'policy-diff-engine'],
    pillars: [
      {
        id: 'onion-clean-layering',
        title: 'Onion / clean layering',
        engineer:
          'Hexagonal, Clean, and Onion architecture are the same idea in three vocabularies: a dependency rule pointing inward to a framework-independent domain core, with adapters at the edges. Domain has zero dependencies on API or infrastructure — no exceptions. On the ticket relay that rule is enforced by import-linter in CI, not by convention.',
        rule: 'Dependencies point inward only. The moment they don’t, you have a distributed monolith wearing an architecture diagram as a costume.',
        plain:
          'I build systems where the core business logic doesn’t know or care what database or framework is running underneath it — so swapping either one later doesn’t require a rewrite.',
      },
    ],
  },
  {
    id: 'event-driven-microservices',
    title: 'Event-driven microservices',
    summary: 'Service Bus, Event Grid, and Event Hubs used for what each is for; the Outbox pattern wherever a business change and an event must land together; a modular monolith first when a real boundary hasn’t shown up yet.',
    stack: ['Azure Service Bus', 'Event Grid', 'Event Hubs', 'gRPC', 'REST', 'KEDA', 'Outbox pattern', 'dbt', 'Snowflake'],
    where: ['enterprise-ai-payroll-processor', 'lima-one-microservices-suite', 'project-excite-relay', 'enterprise-etl-integrations', 'snow-portal-job-scheduler'],
    pillars: [
      {
        id: 'microservices',
        title: 'Microservices',
        engineer:
          'Event-driven patterns via Azure Service Bus (ordering, transactions, DLQ), Event Grid (reactive pub/sub), and Event Hubs (the log, not the queue) are complementary, not competing. The Outbox pattern is mandatory wherever a business change and an event need to land together — never two independent writes.',
        rule: 'Redundancy is architecture; resiliency is behavior. Size failover capacity for full load, not half.',
        plain:
          'I don’t reach for microservices by default — I reach for them when a specific business boundary or compliance requirement genuinely demands independent deployment.',
      },
      {
        id: 'data-integration-pipelines',
        title: 'Data & integration pipelines',
        engineer:
          'ELT is the production default on modern warehouses; idempotency is non-negotiable so re-running a failed job never double-writes. dbt three-layer discipline: staging views with no joins, intermediate as ephemeral, marts capped at 4–6 joins.',
        rule: 'Watermark storage belongs in an audit table in the target database, not just an orchestrator variable — or it’s undebuggable when it breaks at 2am.',
        plain:
          'I connect the systems that don’t want to talk to each other — HubSpot, SharePoint, Snowflake, Salesforce, legacy APIs — without building a fragile spaghetti of point-to-point scripts.',
      },
    ],
  },
  {
    id: 'rag-llm-gateways-ai-governance',
    title: 'RAG, multi-vendor LLM gateways, AI governance',
    summary: 'Claude, GPT, Gemini, Mistral, vLLM — behind one policy-enforced surface with per-project cost caps and a tamper-evident audit trail, and RAG that starts from the knowledge base, not the model.',
    stack: ['Claude', 'GPT', 'Gemini', 'Mistral', 'vLLM', 'Ollama', 'FAISS', 'pgvector', 'MiniSearch / BM25', 'LangChain', 'MCP', 'Azure AI Foundry'],
    where: ['ai-governance-gateway', 'self-hosted-rag-chatbot', 'cloud-rag-chatbot-gemini', 'chat-with-your-data-kubernetes', 'ai-report-generator-email-intake'],
    pillars: [
      {
        id: 'ai-ml',
        title: 'AI & ML',
        engineer:
          'AI ⊃ ML ⊃ DL ⊃ transformers/LLMs is a nested hierarchy, and knowing where your use case sits in it is the first question before choosing a vendor or a model. Build order: prompting, then RAG, then fine-tuning — in that order, because each step adds cost and most problems never need the third.',
        rule: 'The word "AI" in a vendor pitch tells you nothing about which level of that hierarchy is actually involved.',
        plain:
          'I help you tell the difference between a genuine AI opportunity and a vendor pitch — most of what gets sold as "AI" is a decision tree with better marketing.',
      },
      {
        id: 'rag-chat-systems',
        title: 'RAG chat systems',
        engineer:
          'RAG turns a closed-book exam into an open-book one: retrieval, indexing, and generation, each of which can fail independently. Parent-child chunking, contextual retrieval, and hybrid search close most of the gap before the model is ever touched. The "Ask my résumé" bot on this site is a small worked example: BM25 retrieval, a per-request system prompt, and a spend cap.',
        rule: 'The AI is a commodity. The knowledge base is the only genuinely proprietary part of the stack.',
        plain:
          'A chatbot with a 35% resolution rate and one with an 85% resolution rate are almost never running different AI models — they’re running on different data.',
      },
      {
        id: 'agents-automation',
        title: 'Agents & automation',
        engineer:
          'Hard iteration caps, token/time budgets per run, explicit completion criteria, and human-in-the-loop checkpoints are mandatory production controls, not polish. Model Context Protocol (MCP) is becoming the standard way agents reach tools and data — I design for it, and the governance gateway ships an authenticated MCP transport.',
        rule: 'Single-agent architectures handle roughly 80% of real cases. Multi-agent adds cost and non-determinism most problems don’t need.',
        plain:
          'The hard part of an AI agent is never the model. It’s the guardrails — the limits that stop it from running away with your Azure bill or doing something you didn’t ask for.',
      },
    ],
  },
  {
    id: 'kubernetes-gitops-devsecops',
    title: 'Kubernetes, Helm, GitOps, secretless DevSecOps',
    summary: 'Private AKS delivered through GitOps, with OIDC workload identity in place of stored credentials and supply-chain scanning, SBOMs, and keyless signing in every CI workflow.',
    stack: ['Kubernetes', 'Helm', 'GitOps', 'OIDC workload identity', 'GitHub Actions', 'SAST / SCA / IaC scanning', 'SBOM', 'Cosign', 'Kyverno / OPA', 'Docker'],
    where: ['chat-with-your-data-kubernetes', 'identity-governance-as-code', 'enterprise-ai-payroll-processor', 'ai-governance-gateway'],
    pillars: [
      {
        id: 'secretless-devsecops',
        title: 'Secretless DevSecOps',
        engineer:
          'Federated workload identity for services and interactive sign-in for humans means there is no API key to leak, rotate, or over-scope. Across the Vizius platforms that was OIDC federation across 20 CI workflows in 9 repositories, with SAST, SCA, IaC scanning, secret detection, SBOM generation, Cosign keyless signing, and Kyverno/OPA admission policies on the cluster — and security self-reviews that closed an auth bypass, a path traversal, an SSRF, a timing-unsafe comparison, an injection flaw, and an over-scoped CI credential before anyone else found them.',
        rule: 'No credentials anywhere in the path. If a service can be given an identity instead of a secret, it gets an identity.',
        plain:
          'The systems I ship don’t carry passwords around. Every service proves who it is instead of presenting a key that could be copied — and the pipeline that builds it checks its own supply chain on every change.',
      },
    ],
  },
  {
    id: 'identity-governance',
    title: 'Identity governance',
    summary: 'Okta IGA, Entra ID, SAML/OIDC — governance declared in Git and continuously reconciled, with a human in front of anything destructive; advisory for a SOX-regulated enterprise with ~5,700 workforce identities.',
    stack: ['Okta IGA', 'Entra ID', 'SAML 2.0', 'OIDC', 'kopf operators', 'GxP-classified specifications', 'SOX-to-IAM risk mapping'],
    where: ['identity-governance-as-code', 'ai-report-generator-email-intake'],
    pillars: [
      {
        id: 'identity-governance-as-code',
        title: 'Identity governance as code',
        engineer:
          'Two independent control planes reconcile tenant identity-governance state from Git: a kopf Kubernetes operator with fully secretless multi-tenant auth and LLM-drafted pull requests, and an IdP governance platform managing 40 resource kinds through six addressing patterns, with human-gated destructive drift and point-in-time reversion. Alongside the code: a platform decision report, an API/SDK/MCP coverage assessment across eight identity platforms, GxP-classified functional specifications, and a SOX-to-IAM risk mapping.',
        rule: 'Declared in Git, continuously reconciled. Destructive drift requires a human.',
        plain:
          'Who has access to what should be written down, versioned, and checked automatically — and when the system wants to take access away, a person approves it first.',
      },
    ],
  },
  {
    id: 'how-i-design',
    title: 'How I design and deliver',
    summary: 'Architecture before code. Juniors trained in parallel. Handoffs that hold. The decisions that cost the most get made before anyone opens an editor, and they get written down.',
    stack: ['Cynefin', 'Event Storming', 'Example Mapping', 'STRIDE threat modeling', 'Security-First Scrum', 'Certified ScrumMaster', 'Jira', 'Architecture document sets'],
    where: ['enterprise-ai-payroll-processor', 'policy-diff-engine', 'chosen-people-answers-architecture', 'project-excite-relay'],
    pillars: [
      {
        id: 'software-architecture',
        title: 'Software architecture',
        engineer:
          'Start with a modular monolith, not microservices — roughly 80% of microservices’ benefits come from logical boundaries, not independent deployment, and the infrastructure cost runs 3.75–6x higher. Split along business boundaries, not technical layers.',
        rule: 'A dedicated "release coordination manager" role is the tell-tale sign of a distributed monolith, not a real microservices win.',
        plain:
          'Every architecture decision is a trade-off. If you think you’ve found one that isn’t, you haven’t found the trade-off yet — I’ll help you find it before it costs you six months.',
      },
      {
        id: 'process-engineering',
        title: 'Process engineering',
        engineer:
          'Cynefin for method selection (the most damaging error is treating a Complex problem as merely Complicated and over-planning the unknowable); structured interviews as the highest-yield requirements technique; Event Storming and Example Mapping to surface bounded contexts before a line of code is written.',
        rule: 'No single methodology wins. Context-fit and execution discipline win.',
        plain:
          'Most expensive project mistakes aren’t technical failures. They’re scope decisions made before the technical work even begins — or never made at all.',
      },
      {
        id: 'scrum-agile',
        title: 'Scrum & Agile',
        engineer:
          'Certified ScrumMaster. Threat modeling belongs in backlog refinement (a 5–10 minute STRIDE pass), not a waterfall gate. Retrospective action items get a single named owner and become backlog tickets, or they die — most retros fail because nobody follows through. The Security-First Scrum framework, its two training manuals, and its AI-agent rulesets came out of running this for real.',
        rule: 'Psychological safety is a security control. Teams without it hide vulnerabilities instead of reporting them.',
        plain:
          'I run Security-First Scrum: secure, working, tested, clean code, in that order — never traded away for speed.',
      },
    ],
  },
];

/** The six specialties the bio lists, in its order — everything except the design/delivery group. */
export const specialties = specialtyGroups.filter((g) => g.id !== 'how-i-design');

export function allPillars(groups: SpecialtyGroup[] = specialtyGroups): Pillar[] {
  return groups.flatMap((g) => g.pillars);
}

/** Deduplicated stack, in first-seen order, for the stack strip. */
export function fullStack(groups: SpecialtyGroup[] = specialtyGroups): string[] {
  return Array.from(new Set(groups.flatMap((g) => g.stack)));
}
