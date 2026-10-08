/**
 * The four vibey audiences on /join-me, in priority order, and everything the
 * page says to each of them. One source: /join-me renders it, the
 * homepage, /contact, the site directory and the shared CTA link to it, and
 * the "Ask about Adam" knowledge base is generated from it (src/data/kb-sources.ts).
 *
 * 1. Developers — help build vibey; how to get started.
 * 2. Nonprofits.
 * 3. Universities and academia.
 * 4. Governments and military.
 *
 * Freelance clients and hiring teams have their own pages (src/data/tracks.ts
 * lists all six in order).
 *
 * Content integrity (AGENTS.md): every claim here is traceable to the vibey
 * repository and links to its source. Nothing claims a customer, contract,
 * clearance, accreditation, endorsement, or institutional affiliation — and
 * src/data/__tests__/audiences.test.ts keeps it that way.
 */

export type AudienceId = 'developers' | 'nonprofits' | 'academia' | 'governments';

export interface Audience {
  id: AudienceId;
  title: string;
  /** Anchor on /join-me. */
  href: string;
  summary: string;
  cta: string;
}

export const audiences: Audience[] = [
  {
    id: 'developers',
    title: 'Developers',
    href: '/join-me#developers',
    summary:
      'I’m looking for developers to help build vibey. Clone it, run the gates, pick an issue, and open a pull request against develop — the whole path is on one page.',
    cta: 'How to get started',
  },
  {
    id: 'nonprofits',
    title: 'Nonprofits',
    href: '/join-me#nonprofits',
    summary:
      'MIT licensed with nothing to subscribe to, local models by preference so the bill does not hinge on one vendor, your own hardware, and a ledger that can answer what a run did — all of it checkable.',
    cta: 'What vibey offers nonprofits',
  },
  {
    id: 'academia',
    title: 'Universities and academia',
    href: '/join-me#academia',
    summary:
      'A research paper that states the model formally, the whole documentation as a book, a citation file, and open-licensed code to reproduce, teach with, and extend.',
    cta: 'The paper and the book',
  },
  {
    id: 'governments',
    title: 'Governments and military',
    href: '/join-me#governments',
    summary:
      'Local models by preference, an append-only ledger you can audit, provenance on every commit, and review bound to the exact code it examined — all MIT licensed and checkable.',
    cta: 'What vibey offers',
  },
];

const REPO = 'https://github.com/the-vibey-project/vibey';
const BLOB = `${REPO}/blob/develop`;
const DOCS = 'https://the-vibey-project.github.io/vibey/main';
const issuesWithLabel = (label: string) =>
  `${REPO}/issues?q=${encodeURIComponent(`is:issue is:open label:"${label}"`)}`;

/** Every external vibey link the page uses, in one place. */
export const VIBEY = {
  repo: REPO,
  pypi: 'https://pypi.org/project/vibey-engine/',
  docs: `${DOCS}/`,
  paperHtml: `${DOCS}/paper/`,
  paperPdf: `${DOCS}/paper.pdf`,
  paperTitle:
    'Ledger-Mediated Orchestration: Vendor-Independent Autonomous Software Delivery over a Pool of Coding Agents',
  companionPaper: `${BLOB}/src/vibey_tools/gh/docs/paper.md`,
  bookPdf: `${DOCS}/book.pdf`,
  bookEpub: `${DOCS}/book.epub`,
  bookPrint: `${DOCS}/book-print.html`,
  contributing: `${BLOB}/CONTRIBUTING.md`,
  nonNegotiables: `${BLOB}/CLAUDE.md`,
  security: `${BLOB}/SECURITY.md`,
  codeOfConduct: `${BLOB}/CODE_OF_CONDUCT.md`,
  citation: `${BLOB}/CITATION.cff`,
  license: `${BLOB}/LICENSE`,
  discussions: `${REPO}/discussions`,
  goodFirstIssues: issuesWithLabel('good first issue'),
  helpWanted: issuesWithLabel('help wanted'),
  bugs: issuesWithLabel('bug'),
  sovereignDesignAdr: `${BLOB}/docs/architecture/decisions/0027-sovereign-design-provider.md`,
  gptossloopAdr: `${BLOB}/docs/architecture/decisions/0064-gptossloop-is-the-sovereign-engine.md`,
  localRunner: `${BLOB}/src/vibey_runners/qwen/README.md`,
  everythingAsCodeAdr: `${BLOB}/docs/architecture/decisions/0018-everything-as-code.md`,
  governmentPage: `${BLOB}/src/vibey_tools/gh/docs/government.md`,
  doctrines: `${BLOB}/src/vibey_tools/gh/docs/doctrines.md`,
  sd01: `${BLOB}/src/vibey_tools/gh/docs/sd-01-counterparties-trust-verification.md`,
} as const;

export interface Source {
  label: string;
  href: string;
}

export interface GetStartedStep {
  title: string;
  /** Plain text; `backticks` render as inline code. */
  body: string;
  commands: string[];
  links: Source[];
}

/** The contributor path, from vibey's CONTRIBUTING.md (environment, gates, branch model, commits, PRs). */
export const getStartedSteps: GetStartedStep[] = [
  {
    title: 'Set up the repository',
    body: 'You need Python 3.12+, PostgreSQL, and macOS or Linux. The test suite needs no engine binaries and no paid accounts. It reads `VIBEY_TEST_DATABASE_URL` (default `postgresql://$USER@localhost:5432/vibey_test`), and that role needs `CREATEDB`.',
    commands: [
      'git clone https://github.com/the-vibey-project/vibey.git && cd vibey',
      'uv sync --extra dev',
      'uv run pre-commit install --hook-type pre-commit --hook-type commit-msg --hook-type pre-push',
      'uv run vibey-gh install',
    ],
    links: [{ label: 'CONTRIBUTING.md', href: VIBEY.contributing }],
  },
  {
    title: 'Run the gates',
    body: 'Run the same seven gates CI runs: ruff lint and format, `mypy --strict`, the test suite with a 100% branch-coverage floor on each architectural layer, import-linter, bandit, and pip-audit. One command runs them the way the pre-push hook does.',
    commands: ['uv run pre-commit run --all-files --hook-stage pre-push'],
    links: [],
  },
  {
    title: 'Pick an issue',
    body: 'Start with an issue labelled `good first issue` or `help wanted`, or with an open bug. Read CONTRIBUTING.md and the short list of non-negotiables in CLAUDE.md first, because the gates enforce both. Ask usage questions in Discussions, not in the issue tracker.',
    commands: [],
    links: [
      { label: 'Good first issues', href: VIBEY.goodFirstIssues },
      { label: 'Help wanted', href: VIBEY.helpWanted },
      { label: 'Open bugs', href: VIBEY.bugs },
      { label: 'The non-negotiables', href: VIBEY.nonNegotiables },
      { label: 'Discussions', href: VIBEY.discussions },
    ],
  },
  {
    title: 'Branch from develop and commit conventionally',
    body: 'Commit messages follow Conventional Commits (`feat`, `fix`, `docs`, …). The commit-msg hook appends the `Made-With:` provenance trailer. A commit made in the GitHub web UI skips the hooks and fails the Provenance check.',
    commands: ['git checkout -b feature/short-description develop'],
    links: [],
  },
  {
    title: 'Open a pull request into develop, never main',
    body: 'You never press Merge. Once your pull request has one approval, a green `gates` check, and a passing PR-automation gate, the merge train squash-merges it into develop. Later, develop is promoted to main with a rebase merge, and every push to main publishes to PyPI.',
    commands: [],
    links: [{ label: 'Code of Conduct', href: VIBEY.codeOfConduct }],
  },
];

export interface HelpWanted {
  title: string;
  body: string;
  source: Source;
}

/** Where a contribution does the most good right now. */
export const helpWanted: HelpWanted[] = [
  {
    title: 'Test the sovereign path on a real project',
    body: 'The design interview and the decomposition of a design into build work now run on a local model by default (gptossloop, on GPT-OSS 20B), and a paid engine runs only when no local one can. What is not yet known is how the local path compares with a paid engine on the same specification, and where it breaks. Run it on a project you care about and report what you find.',
    source: { label: 'Decision record: gptossloop', href: VIBEY.gptossloopAdr },
  },
  {
    title: 'Fix a reported bug',
    body: 'Open bugs are a fast way to learn the codebase. A fix lands with its tests, under the same 100% branch-coverage floor as everything else.',
    source: { label: 'Open bugs', href: VIBEY.bugs },
  },
  {
    title: 'Add an engine',
    body: 'The *loop contract is small and documented: a run directory, an exit code for graceful wind-down, a completion marker, and a verdict fence. gptossloop and qwenloop, the local engines, are the newest examples of implementing it. The Cursor and Antigravity runners were retired in 4.0.0, so the pool is now claudeloop and codexloop (paid) and the local engines.',
    source: { label: 'Decision record: gptossloop', href: VIBEY.gptossloopAdr },
  },
  {
    title: 'Add a skill',
    body: 'vibey-skills is a marketplace of evidence-grounded practitioner references. Every claim cites the standard, vendor document, or paper it comes from, so bring the citation with the skill.',
    source: { label: 'The repository', href: VIBEY.repo },
  },
  {
    title: 'Improve the docs',
    body: 'The documentation is the product, and it is also published as a book and a research paper on every release. If you had to read the source to find something out, the doc was wrong.',
    source: { label: 'The docs', href: VIBEY.docs },
  },
];

export interface Claim {
  title: string;
  body: string;
  source: Source;
}

/**
 * What vibey offers nonprofits — the same checkable properties as the other
 * audiences, put in terms of small budgets, volunteer turnover, and answering
 * to a board or a funder. Stated only as far as the repository supports it.
 */
export const nonprofitClaims: Claim[] = [
  {
    title: 'Nothing to subscribe to',
    body: 'vibey is MIT licensed. There is no seat count and no hosted service to subscribe to. Install it with `uv tool install vibey-engine`, fork it, and keep running it whatever happens to the project.',
    source: { label: 'The license', href: VIBEY.license },
  },
  {
    title: 'A bill that does not hinge on one vendor',
    body: 'The design interview and the decomposition of a design into build work run on a local model by default (gptossloop, on GPT-OSS 20B served by Ollama), and a paid engine runs only when no local one can. In hybrid mode a paid engine takes overflow only after a wait, under a daily spend cap counted from the ledger, so the ceiling is written down before the run starts.',
    source: { label: 'Decision record: gptossloop, the sovereign engine', href: VIBEY.gptossloopAdr },
  },
  {
    title: 'Runs on hardware you choose',
    body: 'vibey runs on your macOS or Linux hosts against your own PostgreSQL, with no cloud control plane. The local runner never downloads model weights on its own: you install the model you choose.',
    source: { label: 'The local runner’s README', href: VIBEY.localRunner },
  },
  {
    title: 'A record you can show a board or a funder',
    body: 'Every decision, finding, and handoff is written to an append-only PostgreSQL ledger before it takes effect. Nothing is updated or deleted; a correction is a new event that supersedes the old one. Any run can be reconstructed after the fact, which is the answer to “what did the software do?”',
    source: { label: 'The research paper', href: VIBEY.paperHtml },
  },
  {
    title: 'Your people decide what ships',
    body: 'Four of the six phases wait for a person: design, review, deployment design, and deployment review. Each one needs an explicit, recorded human verdict before it can close, so the automation never decides on your organization’s behalf.',
    source: { label: 'The research paper', href: VIBEY.paperHtml },
  },
  {
    title: 'Documentation the next volunteer can read',
    body: 'The documentation is the product, and every page of it is published in reading order as one book, as a PDF, an EPUB, and print-ready HTML, on every release. Volunteers change; the book is the same one for each of them.',
    source: { label: 'The book (PDF)', href: VIBEY.bookPdf },
  },
  {
    title: 'Try it on a real project',
    body: 'If your organization has a small project worth trying vibey on, propose it in Discussions or by email. Reports from real use, including where it falls short, are what the project needs most.',
    source: { label: 'Discussions', href: VIBEY.discussions },
  },
];

/**
 * What vibey offers governments and military organizations — stated only as far
 * as the repository supports it, with the known gap named rather than hidden.
 */
export const governmentClaims: Claim[] = [
  {
    title: 'Local models by preference, not as a fallback',
    body: 'The project’s governing rules make the local path the preferred way to run (sub-doctrine 8.a), because every paid platform can raise its price, change its terms, or refuse service. The design interview and the decomposition of a design into build work run on a local model by default: gptossloop, on GPT-OSS 20B served by Ollama. Local engines are preferred first for build, and a paid engine runs only when no local one can. In hybrid mode it takes overflow only after a wait, under a daily spend cap counted from the ledger. qwenloop, on Qwen, is the opt-in local alternative.',
    source: { label: 'Decision record: gptossloop, the sovereign engine', href: VIBEY.gptossloopAdr },
  },
  {
    title: 'Built to run on your own hardware',
    body: 'vibey runs on your macOS or Linux hosts against your own PostgreSQL, with no cloud control plane. The local runner never downloads model weights on its own: you install the model you choose, and for qwenloop that is an explicit `qwenloop model install`. Research on the local path reads only evidence an operator supplies, and it refuses to invent a citation.',
    source: { label: 'The local runner’s README', href: VIBEY.localRunner },
  },
  {
    title: 'An append-only ledger you can audit',
    body: 'Every decision, finding, and handoff is written to an append-only PostgreSQL ledger before it takes effect. Nothing is updated or deleted; a correction is a new event that supersedes the old one. Delivery state is a function of the ledger alone, so any run can be reconstructed after the fact.',
    source: { label: 'The research paper', href: VIBEY.paperHtml },
  },
  {
    title: 'Human authority is part of the structure',
    body: 'Four of the six phases wait for a person: design, review, deployment design, and deployment review. Each one needs an explicit, recorded human verdict before it can close. A worker never blocks while it waits. The question is parked as a job and a gate record until someone answers.',
    source: { label: 'The research paper', href: VIBEY.paperHtml },
  },
  {
    title: 'Provenance and exact-head review',
    body: 'Every source file carries a provenance header and every commit carries a provenance trailer. A pre-push hook and a required CI check enforce both. Every check, review, and merge is tied to the exact commit it examined, so an old approval can never pass newer code.',
    source: { label: 'vibey-gh for governments', href: VIBEY.governmentPage },
  },
  {
    title: 'Everything as code, behind the same gates',
    body: 'The project’s rule is everything as code: branch protection, pipelines, policy, and infrastructure are declared in the repository and reconciled from it, never set by hand on a settings page. Changes to the conductor pass the gates CI enforces: static security analysis (bandit), a dependency vulnerability audit (pip-audit), strict typing, enforced layering, and a 100% branch-coverage floor on each architectural layer.',
    source: { label: 'Decision record: everything as code', href: VIBEY.everythingAsCodeAdr },
  },
  {
    title: 'Written rules for machine agents',
    body: 'vibey’s agent instructions carry standing subdoctrine SD-01 word for word. Under it, every counterparty, whether a person, a company, or a state, starts unverified until a tangible check establishes its identity, authority, and intent. An actor assessed as bad is never re-rated on anyone’s say-so.',
    source: { label: 'SD-01', href: VIBEY.sd01 },
  },
];

/** What vibey offers universities and researchers. */
export const academiaItems: Claim[] = [
  {
    title: 'The research paper',
    body: `${VIBEY.paperTitle} states the ledger invariant, the queue semantics, the no-loss handoff gate, and the gate-soundness argument formally. Its companion paper, on the exact-head release calculus, is in the same repository.`,
    source: { label: 'Read it online', href: VIBEY.paperHtml },
  },
  {
    title: 'The book',
    body: 'Every page of the documentation, in reading order, as one book. It comes as a PDF, an EPUB, and print-ready HTML, rebuilt on every release.',
    source: { label: 'Download the PDF', href: VIBEY.bookPdf },
  },
  {
    title: 'Reproducible from the repository',
    body: 'The paper is typeset from Markdown in the repository and republished with every release. The properties it relies on are pure, deterministic code under a 100% branch-coverage floor, backed by property tests and a chaos test against a real PostgreSQL. The paper also says what it does not yet report: live runs beyond two paid engines. Independent replication is welcome.',
    source: { label: 'The repository', href: VIBEY.repo },
  },
  {
    title: 'Cite it',
    body: 'The repository has a CITATION.cff file, so GitHub’s “Cite this repository” button and citation managers can read it directly. No DOI or preprint identifier has been assigned yet.',
    source: { label: 'CITATION.cff', href: VIBEY.citation },
  },
  {
    title: 'Open licenses for teaching and research',
    body: 'vibey is MIT licensed. Use it in a course, fork it for an experiment, and publish what you find. The writing on this site is licensed CC BY 4.0.',
    source: { label: 'The license', href: VIBEY.license },
  },
  {
    title: 'Collaboration and research partnerships',
    body: 'Some open questions worth a study: how the local path compares with paid engines on the same specifications, how the no-loss handoff gate behaves at scale, and live evaluation across the paid and the local engines. Propose a study, a course project, or a research partnership in Discussions or by email.',
    source: { label: 'Discussions', href: VIBEY.discussions },
  },
];
