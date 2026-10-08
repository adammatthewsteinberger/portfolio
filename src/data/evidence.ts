/**
 * The proof, stated once.
 *
 * Two sets of facts, both copied from the résumé (Anthropic and Palantir
 * editions, September 2026) and nowhere else — see the content-integrity rule
 * in AGENTS.md. The homepage, /hire-me, and the RAG knowledge base all render
 * from here so a number can only drift in one place.
 *
 * - `vibeyGuarantees`: what vibey promises an engineer who runs it. Written for
 *   the open-source visitor first — the primary audience.
 * - `staffEvidence`: scope that reaches past one person's code. Written for the
 *   hiring reader — the second audience.
 */

export interface Evidence {
  /** Short label, read first. States the claim, not the topic. */
  claim: string;
  /** The facts that prove it — numbers and nouns, no adjectives. */
  proof: string;
  /** Where to verify it on this site. */
  href: string;
}

export const vibeyGuarantees: Evidence[] = [
  {
    claim: 'No work is lost when an agent dies',
    proof:
      'Every decision, finding, and handoff is a row in an append-only PostgreSQL ledger; UPDATE and DELETE are no-ops. Chaos test: 500 jobs, 8 workers, 20% dropped mid-job. None lost, none run twice.',
    href: '/work/vibey-conductor',
  },
  {
    claim: 'No vendor owns the build',
    proof:
      'One queue carries a change from spec interview through design, build, and review across Claude Code, OpenAI Codex, and local models (GPT-OSS on Ollama, or Qwen), local engines first and a paid one only when no local one can. A cross-vendor handoff must pass a model-free no-loss check or it retries, escalates, or parks for a human.',
    href: '/work/vibey-conductor',
  },
  {
    claim: 'A human decides only where it matters',
    proof:
      'Workers claim jobs under SKIP LOCKED leases and run unattended. They stop at recorded approval gates (design, review, budget) and nowhere else. The spend cap is enforced from the ledger.',
    href: '/join-me',
  },
  {
    claim: 'The gates it asks of you, it passes itself',
    proof:
      '100% branch-coverage floors in CI on the conductor, every runner, and the release tool. The Helm chart (KEDA, kopf operator) installs on minikube in CI. Every hard call is argued in one of 86 written architecture decision records.',
    href: '/open-source',
  },
];

export const staffEvidence: Evidence[] = [
  {
    claim: 'A platform other teams moved onto',
    proof:
      'Sole architect of a policy-enforced LLM gateway. Three product teams migrated onto it and their app-held credentials were retired. The shared platform library, vibey-bootstrap, is adopted by 17+ repositories.',
    href: '/work/ai-governance-gateway',
  },
  {
    claim: 'Identity, at depth',
    proof:
      'Sole author of two identity-governance-as-code control planes: 40 resource kinds, multi-tenant, zero stored tenant secrets. Identity advisory for a SOX-regulated enterprise of about 5,700 identities.',
    href: '/work/identity-governance-as-code',
  },
  {
    claim: 'Built for review, not just for launch',
    proof:
      'Workload-identity auth with no API keys in the path. HMAC-signed, hash-chained, write-once audit trail. SBOMs, keyless signing, and policy-as-code admission. Controls mapped to OWASP LLM Top 10 and NIST AI RMF.',
    href: '/work/ai-governance-gateway',
  },
  {
    claim: 'Handoffs that hold',
    proof:
      'Co-led a 20-microservice AI payroll platform to production-ready architecture by day 45, with a human approval gate on every phase. The junior developer trained in parallel now owns it.',
    href: '/work/enterprise-ai-payroll-processor',
  },
];

/**
 * How Adam works with a customer or a new team. Four steps, in order —
 * the résumé's own wording.
 */
export const method: string[] = ['Discovery', 'A documented solution', 'Decomposition into work', 'A mentored handoff'];

/** Plain-text rendering for the RAG knowledge base and llms.txt. */
export function evidenceText(items: Evidence[]): string {
  return items.map((item) => `${item.claim}: ${item.proof}`).join(' ');
}
