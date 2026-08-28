/**
 * Curated, hand-written source text for the "Ask my résumé" RAG bot's
 * knowledge base. Kept separate from the page components (which are JSX,
 * not plain text) so the bot only ever answers from facts a human wrote
 * and reviewed here — never from scraped/rendered markup.
 *
 * scripts/build-kb.ts combines this with dynamically-loaded project and
 * blog content to produce src/generated/kb.json.
 */

import { fullStack, specialtyGroups } from './expertise';

export interface KBSource {
  id: string;
  url: string;
  title: string;
  section: string;
  text: string;
}

/** One chunk per specialty group and one per pillar, generated from src/data/expertise.ts so the bot and /expertise never drift. */
export function expertiseChunks(): KBSource[] {
  return specialtyGroups.flatMap((group) => [
    {
      id: `specialty-${group.id}`,
      url: `/expertise#${group.id}`,
      title: `Expertise: ${group.title}`,
      section: group.title,
      text: `Specialty: ${group.title}. ${group.summary} Stack: ${group.stack.join(', ')}. Case studies: ${group.where.map((slug) => `/work/${slug}`).join(', ')}.`,
    },
    ...group.pillars.map((pillar) => ({
      id: `expertise-${pillar.id}`,
      url: `/expertise#${pillar.id}`,
      title: `Expertise: ${pillar.title}`,
      section: pillar.title,
      text: `${pillar.title}. In plain terms: ${pillar.plain} For engineers: ${pillar.engineer} Rule: ${pillar.rule}`,
    })),
  ]);
}

export const kbSources: KBSource[] = [
  {
    id: 'hire-me-facts',
    url: '/hire-me',
    title: 'Hire Me',
    section: 'At a glance',
    text: `Adam Matthew Steinberger is a Staff Software Architect & AI Automation Engineer, available from September 2026.
Target titles: Staff Software Architect, AI Automation Engineer, Staff/Principal AI Engineer, Solutions Architect.
Location: Greenville, South Carolina — remote preferred; open to US remote anywhere.
Employment types: W2 full-time preferred; contract-to-hire considered.
Work authorization: US citizen, no sponsorship required.
Specialties: Azure (AKS, Functions, Service Bus, Bicep, Terraform, Key Vault); Python and .NET backends; event-driven microservices; RAG, multi-vendor LLM gateways, and AI governance (Claude, GPT, Gemini, Mistral, vLLM); Kubernetes, Helm, GitOps, and secretless DevSecOps; identity governance (Okta IGA, Entra ID, SAML/OIDC).
Verify him: ask the résumé bot at chat.adam.matthewsteinberger.com, read the packages on PyPI, or read the code on GitHub.`,
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
    text: `Adam Matthew Steinberger is a Staff Software Architect and AI Automation Engineer based in Greenville, South Carolina. He builds AI systems that actually work inside enterprise environments — production-grade platforms that handle real data, real security requirements, and real organizational complexity, not just demos. He has 13+ years of professional software engineering experience. His view after those years: the hardest part is never the technology, it is designing so the people who inherit the system get a product that just works — architecture before code, juniors trained in parallel, handoffs that hold.
Adam describes himself as a deep thinker and a purpose-driven craftsman. He documents everything for the same reason a RAG pipeline cites its sources, and he communicates best with written documentation — written specs and async communication rather than live whiteboards or drive-by pings. He does his best work in deep, uninterrupted blocks of time on one hard architecture problem, and works remote-first from Greenville, SC. He primarily develops free and open-source software and is always open for a connection or a coffee; Greenville-remote or US-remote volunteers are welcome to get involved.
Before Vizius: four consulting engagements in six months through Adam Matthew Steinberger LLC (a self-hosted RAG chatbot, a cloud RAG chatbot, a production push-notification system, and a codebase review with a refactor roadmap), and two years moving Lima One Capital's integration layer from Mulesoft to NestJS microservices.`,
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
  ...expertiseChunks(),
  {
    id: 'expertise-stack',
    url: '/expertise',
    title: 'Expertise: The stack',
    section: 'Full technical stack',
    text: `Full stack: ${fullStack().join(', ')}.`,
  },
  {
    id: 'open-source',
    url: '/open-source',
    title: 'Open Source',
    section: 'Packages',
    text: `Adam publishes his open-source work on PyPI under the MIT license. The *loop family — claudeloop, codexloop, cursorloop, agyloop, and qwenloop — are onion-architected autonomous session runners for Claude Code, OpenAI Codex, Cursor Agent, Google Antigravity/Gemini, and a fully local Qwen 2.5 Coder model; they never block on a human and tell an exhausted rate-limit window apart from exhausted credits. vibey is a queue-based, six-phase conductor for autonomous software delivery built on those runners (PostgreSQL row-level locking); vibey-gh is stdlib-only release automation for GitHub repositories (provenance, merge train, dual-channel releases, documentation maintenance); vibey-skills is a Claude Code plugin marketplace of evidence-grounded practitioner references; vibey-bootstrap (formerly azure-bootstrap) is the Azure Functions cross-cutting layer used across 17+ repos. The site lists the packages by name and does not state a count.`,
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
    id: 'join-me',
    url: '/join-me',
    title: 'Join Me',
    section: 'Contributing and volunteering',
    text: `Adam primarily develops free and open-source software and is always open for a connection or a coffee; Greenville-remote or US-remote volunteers are welcome and encouraged to get involved at any time. The /join-me page has everything a developer needs to get started: a generic, free quickstart for the whole stack (install vibey and at least one *loop engine such as claudeloop with uv tool install, run vibey doctor, vibey new, vibey worker, and answer gates with vibey answer — Python 3.12+ and PostgreSQL required), how this very site is built with it (the chat subdomain shipped as a vibey project), ways to contribute (issues, pull requests against develop, new *loop engines, new skills for vibey-skills, documentation), the repositories with their code of conduct and security policy, and his volunteer architecture work for a nonprofit (Project Excite). Contact: adam@matthewsteinberger.com.`,
  },
  {
    id: 'for-executives',
    url: '/for-executives',
    title: 'For Executives',
    section: 'Executive edition',
    text: `The site has two editions. The engineering site (the root and every page on it) is the canonical, default version. The executive edition at /for-executives restates the same work for a non-technical buyer — the problem first, then what changed, then two ways to work with Adam: hire him full-time into an engineering organization (/hire-me), or engage Adam Matthew Steinberger LLC to tailor and whitelabel the platforms to their environment (/for-executives/engage; the service pages are at /services). The engineering site is never reduced to make the executive edition more attractive, and it contains no sales framing. No pricing is published anywhere.`,
  },
  {
    id: 'chat',
    url: '/chat',
    title: 'Ask my résumé',
    section: 'Chat',
    text: `"Ask my résumé" is a small RAG chat assistant that answers questions about Adam's background, experience, technical stack, and availability. It lives full-page at https://chat.adam.matthewsteinberger.com (also reachable at /chat) and as an inline widget on the homepage. It answers only using facts published on this site and is capped at six questions per session. For anything more, visitors can use the contact form or view the Hire Me page.`,
  },
];
