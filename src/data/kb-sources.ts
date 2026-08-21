/**
 * Curated, hand-written source text for the "Ask my résumé" RAG bot's
 * knowledge base. Kept separate from the page components (which are JSX,
 * not plain text) so the bot only ever answers from facts a human wrote
 * and reviewed here — never from scraped/rendered markup.
 *
 * scripts/build-kb.ts combines this with dynamically-loaded project and
 * blog content to produce src/generated/kb.json.
 */

export interface KBSource {
  id: string;
  url: string;
  title: string;
  section: string;
  text: string;
}

export const kbSources: KBSource[] = [
  {
    id: 'hire-me-facts',
    url: '/hire-me',
    title: 'Hire Me',
    section: 'At a glance',
    text: `Adam Matthew Steinberger is a Staff Software Architect & AI Automation Engineer, available September 2026.
Target titles: Staff Software Architect, AI Automation Engineer, Staff/Principal AI Engineer, Solutions Architect.
Location: Greenville, South Carolina — remote preferred; open to US remote anywhere.
Employment types: W2 full-time preferred; contract-to-hire considered.
Work authorization: US citizen, no sponsorship required.
Core stack: Python, TypeScript/NestJS, C#/.NET, Next.js/React, PostgreSQL/pgvector, Snowflake, Azure (Functions, Service Bus, App Config, Key Vault, App Insights, AKS), Docker, vLLM/Ollama/FAISS, LangChain/MCP, Claude/GPT/Gemini/Mistral.`,
  },
  {
    id: 'hire-me-looking',
    url: '/hire-me',
    title: 'Hire Me',
    section: "What Adam is looking for",
    text: `What Adam is looking for: a team where AI, automation, and architecture are the core of the role, not a side quest; ownership of hard, ambiguous problems with room to design the solution, not just implement a ticket; a culture that treats written specs and async communication as a strength, not a workaround; Greenville, SC-based or fully remote work.
What Adam is not looking for: pure front-end or design roles with no backend/architecture component; on-call-heavy support rotations with no engineering ownership attached; roles requiring daily in-person presence in an office outside the Greenville area.`,
  },
  {
    id: 'story-bio',
    url: '/story',
    title: 'My Story',
    section: 'Who Adam is',
    text: `Adam Matthew Steinberger is a Staff Software Architect and AI Automation Engineer based in Greenville, South Carolina. He builds RAG systems, event-driven microservices, and automation pipelines, and writes documentation thorough enough that the person who inherits a system can actually run it. He has 13+ years of professional software engineering experience.
Adam does his best work in deep, uninterrupted blocks of time on one hard architecture problem, communicating via written specs and async communication rather than live whiteboards or drive-by pings. He works remote-first from Greenville, SC.`,
  },
  {
    id: 'story-vizius',
    url: '/story',
    title: 'My Story',
    section: 'The Vizius Group engagement',
    text: `Adam spent a year as Senior Azure & AI Development Engineer at The Vizius Group, a cybersecurity firm in Greenville, SC (September 2025 to August 2026). He is available from September 2026. At Vizius he was sole architect of an AI governance gateway (five model vendors — Azure AI, Anthropic, OpenAI/Codex, Cursor, Grok, Gemini — behind one policy-enforced OpenAI-compatible API with per-project USD cost caps, multi-unit rate limiting, an HMAC-signed hash-chained audit trail, and Entra ID / workload identity auth with no API keys; three product teams were migrated onto it and their credentials retired), co-lead of a 20-microservice AI payroll automation platform (~420k lines, four human-approved phases, 585 test modules, Terraform/Helm/GitOps on private AKS; architecture production-ready at day 45, junior developer trained in parallel now owns it), lead of a technical report generation platform (event-driven ingestion, multi-vendor instrument parsers, standards-aware deterministic analysis plus LLM review, SAML 2.0 + Entra SSO, SOC 2 readiness assessment and threat model), sole author of two identity-governance-as-code control planes for a SOX-regulated enterprise (a kopf Kubernetes operator with fully secretless multi-tenant auth and LLM-drafted PRs; an IdP governance platform managing 40 resource kinds through six addressing patterns with human-gated destructive drift and point-in-time reversion; plus a versioned sync API for 114+ directory groups), sole author of a multi-system ticket relay (N-way version vectors, echo suppression, conflict policy engine, 653 tests at 93% coverage, import-linter-enforced pure domain, property/mutation/chaos tested), and lead of a multi-tenant observability portal (three data planes with freshness tags on every payload). He authored the shared Python platform library vibey-bootstrap (formerly azure-bootstrap; three major versions on PyPI, adopted by 17+ repos), implemented secretless DevSecOps (OIDC workload identity federation across 20 CI workflows in 9 repos; SAST, SCA, IaC scanning, secret detection, SBOM, Cosign keyless signing, Kyverno/OPA admission), and did security self-reviews that closed an auth bypass, path traversal, SSRF, timing-unsafe comparison, an injection flaw, and an over-scoped CI credential. Non-code work: five formal architecture document sets (~180 pages, including a 43-page design / 10-page executive summary / one-sheet package and a STRIDE threat model), identity-governance advisory for ~5,700 workforce identities (20-page market survey, 11-page platform decision report, 14-page API/SDK/MCP coverage assessment across eight platforms, GxP-classified functional specifications, SOX-to-IAM risk mapping), the Security-First Scrum framework (framework, two training manuals, four AI-agent rulesets), an evidence-based delivery velocity playbook, a ~110,000-word technical reference library later published as vibey-skills, mentoring junior developers across three projects, and the firm's LinkedIn thought-leadership program (audit, 28-week playbook, a narrative white paper on export-control compliance and cloud enclave architecture that he produced and wrote from recorded expert interviews, and a six-post distribution series). Client identities, credentials, endpoints, and commercial terms are not disclosed.`,
  },
  {
    id: 'volunteer-project-excite',
    url: '/work/project-excite-relay',
    title: 'Project Excite (volunteer)',
    section: 'Volunteer work',
    text: `Since April 2026 Adam has volunteered (unpaid, concurrent with full-time work) as software architect for a nonprofit AI apologetics chat platform — a Next.js seeker-facing app plus a Laravel/Filament backend hub. His main contribution is Project Excite, an adapter-based relay microservice that hands a seeker from the AI to a live volunteer on Chatwoot or EchoGlobal: an abstract adapter interface with a concrete adapter per platform, an explicit session state machine with idempotent multi-trigger teardown, a Redis-backed session manager, HMAC-verified inbound webhooks, QStash-queued delivery, Pusher real-time events, and a shared in-session @agent assistant. He wrote three technical executive summaries (April 2026) and a unified relay schema reference (June 2026) before implementation, then shipped across split PR stacks (schema, relay lib, relay HTTP, backend proxy, client UI, Filament admin monitoring) with Drizzle migrations, Sanctum-token relay sessions, and encrypted credential casts; he also hardened the seeker app (XSS via DOMPurify, CORS allowlist, Sentry PII off, chat-completions rate limiting) and repaired CI/PHPUnit. About 68 commits so far. Separately, in 2026 he authored business plans and software architecture documents for two SaaS concepts of his own — a mobile-first social platform (React Native, FastAPI, Azure Container Apps, PostgreSQL) and a decentralized confidential-AI protocol — which he does not name publicly.`,
  },
  {
    id: 'story-timeline',
    url: '/story',
    title: 'My Story',
    section: 'Career timeline',
    text: `Career timeline: B.A. Computer Science, Skidmore College (2012). Town & Country Computer Services, junior engineer, insurance software (2013-2015). New York State Insurance Fund — migrated VB6 to C# MVC, mentored junior devs (2015-2019). Bestpass — toll billing systems, introduced automated testing to a legacy codebase (2019-2020). Akmazio — led Agile delivery for a mobile networking platform (2020-2021). Certified ScrumMaster (2021). LeaseTrack — Python + AWS Textract for insurance document parsing (2021-2022). Transcat — .NET Web APIs and React for lab equipment calibration (2022-2023). Lima One Capital, Greenville SC — NestJS/gRPC microservices suite, replaced legacy Mulesoft (2023-2025). Adam Matthew Steinberger LLC — self-hosted RAG, cloud RAG, production push notifications (March-August 2025). The Vizius Group — Senior Azure & AI Development Engineer (September 2025-August 2026). Available as Staff Software Architect & AI Automation Engineer (September 2026).`,
  },
  {
    id: 'expertise-ai-ml',
    url: '/expertise#ai-ml',
    title: 'Expertise: AI & ML',
    section: 'AI & ML',
    text: `AI & ML. In plain terms: Adam helps distinguish a genuine AI opportunity from a vendor pitch — most of what gets sold as "AI" is a decision tree with better marketing. For engineers: AI contains ML contains deep learning contains transformers/LLMs, a nested hierarchy, and knowing where a use case sits in it is the first question before choosing a vendor or a model. Build order: prompting, then RAG, then fine-tuning, in that order, because each step adds cost and most problems never need the third. Rule: the word "AI" in a vendor pitch tells you nothing about which level of that hierarchy is actually involved.`,
  },
  {
    id: 'expertise-rag',
    url: '/expertise#rag-chat-systems',
    title: 'Expertise: RAG chat systems',
    section: 'RAG chat systems',
    text: `RAG chat systems. In plain terms: a chatbot with a 35% resolution rate and one with an 85% resolution rate are almost never running different AI models — they're running on different data. For engineers: RAG turns a closed-book exam into an open-book one — retrieval, indexing, and generation, each of which can fail independently. Parent-child chunking, contextual retrieval, and hybrid search close most of the gap before the model is ever touched. Rule: the AI is a commodity. The knowledge base is the only genuinely proprietary part of the stack.`,
  },
  {
    id: 'expertise-agents',
    url: '/expertise#agents-automation',
    title: 'Expertise: Agents & automation',
    section: 'Agents & automation',
    text: `Agents & automation. In plain terms: the hard part of an AI agent is never the model — it's the guardrails, the limits that stop it from running away with a cloud bill or doing something you didn't ask for. For engineers: hard iteration caps, token/time budgets per run, explicit completion criteria, and human-in-the-loop checkpoints are mandatory production controls, not polish. Model Context Protocol (MCP) is becoming the standard way agents reach tools and data. Rule: single-agent architectures handle roughly 80% of real cases; multi-agent adds cost and non-determinism most problems don't need.`,
  },
  {
    id: 'expertise-process',
    url: '/expertise#process-engineering',
    title: 'Expertise: Process engineering',
    section: 'Process engineering',
    text: `Process engineering. In plain terms: most expensive project mistakes aren't technical failures — they're scope decisions made before the technical work even begins, or never made at all. For engineers: Cynefin for method selection (the most damaging error is treating a Complex problem as merely Complicated and over-planning the unknowable); structured interviews as the highest-yield requirements technique; Event Storming and Example Mapping to surface bounded contexts before a line of code is written. Rule: no single methodology wins — context-fit and execution discipline win.`,
  },
  {
    id: 'expertise-scrum',
    url: '/expertise#scrum-agile',
    title: 'Expertise: Scrum & Agile',
    section: 'Scrum & Agile',
    text: `Scrum & Agile. Adam is a Certified ScrumMaster who runs "Security-First Scrum": secure, working, tested, clean code, in that order, never traded away for speed. Threat modeling belongs in backlog refinement (a 5-10 minute STRIDE pass), not a waterfall gate. Retrospective action items get a single named owner and become backlog tickets, or they die. Rule: psychological safety is a security control — teams without it hide vulnerabilities instead of reporting them.`,
  },
  {
    id: 'expertise-architecture',
    url: '/expertise#software-architecture',
    title: 'Expertise: Software architecture',
    section: 'Software architecture',
    text: `Software architecture. In plain terms: every architecture decision is a trade-off. For engineers: start with a modular monolith, not microservices — roughly 80% of microservices' benefits come from logical boundaries, not independent deployment, and the infrastructure cost runs 3.75-6x higher. Split along business boundaries, not technical layers. Rule: a dedicated "release coordination manager" role is the tell-tale sign of a distributed monolith, not a real microservices win.`,
  },
  {
    id: 'expertise-onion',
    url: '/expertise#onion-clean-layering',
    title: 'Expertise: Onion / clean layering',
    section: 'Onion / clean layering',
    text: `Onion / clean layering. In plain terms: Adam builds systems where the core business logic doesn't know or care what database or framework is running underneath it, so swapping either one later doesn't require a rewrite. For engineers: Hexagonal, Clean, and Onion architecture are the same idea in three vocabularies — a dependency rule pointing inward to a framework-independent domain core, with adapters at the edges. Domain has zero dependencies on API or infrastructure, no exceptions. Rule: dependencies point inward only.`,
  },
  {
    id: 'expertise-microservices',
    url: '/expertise#microservices',
    title: 'Expertise: Microservices',
    section: 'Microservices',
    text: `Microservices. In plain terms: Adam doesn't reach for microservices by default — only when a specific business boundary or compliance requirement genuinely demands independent deployment. For engineers: event-driven patterns via Azure Service Bus (ordering, transactions, DLQ), Event Grid (reactive pub/sub), and Event Hubs are complementary, not competing. The Outbox pattern is mandatory wherever a business change and an event need to land together. Rule: redundancy is architecture; resiliency is behavior.`,
  },
  {
    id: 'expertise-azure',
    url: '/expertise#azure-cloud',
    title: 'Expertise: Azure cloud',
    section: 'Azure cloud',
    text: `Azure cloud. Adam has spent 13+ years building on Azure — Service Bus, Functions, Key Vault, App Config, AKS — and knows which of its 250+ built-in roles map to a data-plane action. Control-plane "*" in Actions does not grant DataActions, the single most common source of production RBAC incidents. Managed identity, zero stored secrets, OIDC federation for CI/CD. Cosmos DB partition key is an irreversible decision. Rule: Owner can fully manage a storage account and still not read a single blob without a separate data-plane role assignment.`,
  },
  {
    id: 'expertise-data',
    url: '/expertise#data-integration-pipelines',
    title: 'Expertise: Data & integration pipelines',
    section: 'Data & integration pipelines',
    text: `Data & integration pipelines. In plain terms: Adam connects systems that don't want to talk to each other — HubSpot, SharePoint, Snowflake, Salesforce, legacy APIs — without a fragile spaghetti of point-to-point scripts. For engineers: ELT is the production default on modern warehouses; idempotency is non-negotiable so re-running a failed job never double-writes. dbt three-layer discipline: staging views with no joins, intermediate as ephemeral, marts capped at 4-6 joins. Rule: watermark storage belongs in an audit table in the target database, not just an orchestrator variable.`,
  },
  {
    id: 'expertise-stack',
    url: '/expertise',
    title: 'Expertise: The stack',
    section: 'Full technical stack',
    text: `Full stack: Python, TypeScript/NestJS, C#/.NET, Next.js/React, PostgreSQL/pgvector, MongoDB, Snowflake, Azure Functions, Azure Service Bus, Azure App Config & Key Vault, Azure App Insights, AKS/Helm/GitOps, Bicep, Docker/Kubernetes, vLLM/Ollama/FAISS, LangChain/MCP, Claude/GPT/Gemini/Mistral, Grafana/Prometheus, GitHub Actions/Bitbucket/Azure DevOps, Jira/Scrum (CSM).`,
  },
  {
    id: 'open-source',
    url: '/open-source',
    title: 'Open Source',
    section: 'Packages',
    text: `Adam has authored and published seven open-source packages on PyPI: claudeloop, codexloop, cursorloop, and agyloop (onion-architected autonomous session runners, MIT licensed), vibey (a queue-based six-phase conductor using PostgreSQL row-level locking), vibey-skills (18 plugins, 71 skills for Claude Code), and vibey-bootstrap (a Python library for bootstrapping Azure Functions, used across multiple Azure Functions repos).`,
  },
  {
    id: 'books',
    url: '/books',
    title: 'Books',
    section: 'Novice to Navigator and Engineering Influence',
    text: `Adam has written two books, both currently in development and not yet for sale. Novice to Navigator is a guide to AI chatbots for business — the first edition's chapters are free to read online as web articles; a second edition is in development. Engineering Influence: A Playbook for the Remnant to Bring Christian Culture Back to America is a field manual on influence, attention, and culture, written from a Messianic Jewish Christian perspective, including a chapter on cognitive difference. Readers can get notified when either ships via the email signup on the books page.`,
  },
  {
    id: 'readiness-quiz',
    url: '/novice-to-navigator/readiness',
    title: 'Chatbot Readiness Quiz',
    section: 'Interactive quiz',
    text: `Adam built an interactive Chatbot Readiness Quiz — a 15-factor, four-pillar self-assessment (Organizational, Technical, Security & Compliance, Operational) that scores an organization's actual readiness to deploy a custom AI chatbot, based on the "Four Pillars of Chatbot Readiness" framework from his Novice to Navigator book.`,
  },
  {
    id: 'chat',
    url: '/chat',
    title: 'Ask my résumé',
    section: 'Chat',
    text: `"Ask my résumé" is a small RAG chat assistant that answers questions about Adam's background, experience, technical stack, and availability. It lives full-page at https://chat.adam.matthewsteinberger.com (also reachable at /chat) and as an inline widget on the homepage. It answers only using facts published on this site and is capped at six questions per session. For anything more, visitors can use the contact form or view the Hire Me page.`,
  },
];
