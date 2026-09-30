/**
 * Every package in Adam's open-source family, all MIT licensed.
 *
 * Since vibey 1.0.0 (ADR-0037) the family lives in one repository,
 * the-vibey-project/vibey, and ships as one PyPI distribution, `vibey`: the
 * old per-package repositories and PyPI projects no longer exist. So each
 * package links to its source directory in that repository, and only vibey
 * itself links to PyPI (VIBEY_DISTRIBUTION below).
 *
 * House rule: the site never states a *count* of these packages — it lists them.
 * Counts drifted three times in one month ("seven", "eight", "seven"); names
 * don't. src/data/__tests__/open-source.test.ts fails on any spelled-out or
 * numeric package count in app, component, data, or llms.txt copy, and on any
 * link to a retired per-package repository or PyPI project.
 */
export interface PackageLink {
  label: string;
  href: string;
}

export interface OpenSourcePackage {
  name: string;
  /** `loop` = an autonomous session runner engine; `vibey` = the conductor and its tooling. */
  family: 'loop' | 'vibey';
  tagline: string;
  description: string;
  links: PackageLink[];
}

const REPO = 'https://github.com/the-vibey-project/vibey';
const TREE = `${REPO}/tree/develop`;

/** The one distribution, the one repository, and the docs every package ships in. */
export const VIBEY_DISTRIBUTION = {
  install: 'uv tool install vibey',
  pypi: 'https://pypi.org/project/vibey/',
  repo: REPO,
  docs: 'https://the-vibey-project.github.io/vibey/main/',
} as const;

const source = (dir: string): PackageLink[] => [{ label: 'Source', href: `${TREE}/${dir}` }];

export const openSourcePackages: OpenSourcePackage[] = [
  {
    name: 'claudeloop',
    family: 'loop',
    tagline: 'Onion-architected, autonomous Claude Code session runner',
    description:
      'A full Anthropic SDK CLI that never blocks on a human — it distinguishes an exhausted rate-limit window from exhausted credits and resumes safely across usage windows. Built on the official claude-agent-sdk.',
    links: source('src/vibey_runners/claude'),
  },
  {
    name: 'codexloop',
    family: 'loop',
    tagline: 'The same runner for OpenAI Codex',
    description:
      'Same onion architecture, same rate-limit-vs-credits distinction, same never-block-on-a-human guarantee — driving the OpenAI Codex agent.',
    links: source('src/vibey_runners/codex'),
  },
  {
    name: 'cursorloop',
    family: 'loop',
    tagline: 'The same runner for Cursor Agent',
    description:
      'The *loop contract on top of the Cursor Agent CLI, so a vibey build can rotate onto Cursor when another vendor is exhausted.',
    links: source('src/vibey_runners/cursor'),
  },
  {
    name: 'agyloop',
    family: 'loop',
    tagline: 'The same runner for Google Antigravity / Gemini',
    description:
      'The *loop contract for Google Antigravity and Gemini — same session semantics, same resume-across-windows behaviour, different vendor.',
    links: source('src/vibey_runners/agy'),
  },
  {
    name: 'qwenloop',
    family: 'loop',
    tagline: 'The same runner, fully local, on Qwen 2.5 Coder',
    description:
      'An autonomous local Qwen 2.5 Coder 14B runner — a portable llama.cpp profile by default, BF16 through vLLM on Linux NVIDIA systems. Model installation is always explicit: the package never downloads weights on its own.',
    links: source('src/vibey_runners/qwen'),
  },
  {
    name: 'vibey',
    family: 'vibey',
    tagline: 'A queue-based, six-phase conductor for autonomous software delivery',
    description:
      'You describe what you want. Vibey interviews you until the spec is sharp, optionally runs a visual-design pass, builds autonomously on top of the *loop runners, reviews its own work, and asks whether to deploy. PostgreSQL-backed with FOR UPDATE SKIP LOCKED.',
    links: [
      { label: 'PyPI', href: VIBEY_DISTRIBUTION.pypi },
      { label: 'Repository', href: VIBEY_DISTRIBUTION.repo },
      { label: 'Docs', href: VIBEY_DISTRIBUTION.docs },
    ],
  },
  {
    name: 'vibey-gh',
    family: 'vibey',
    tagline: 'Release automation for a GitHub repository, stdlib only',
    description:
      'Provenance fingerprints, derived version bumps, exact-head AI review and repair, a merge train, dual-channel releases, documentation maintenance, and post-release branch realignment. No dependencies, because it runs in every CI job of every repository that adopts it.',
    links: source('src/vibey_tools/gh'),
  },
  {
    name: 'vibey-bootstrap',
    family: 'vibey',
    tagline: 'The Azure Functions cross-cutting layer, solved once',
    description:
      'Configuration loading wants logging to report progress; App Insights logging wants configuration to initialize. vibey-bootstrap breaks that cycle with a four-phase startup sequence, then layers on structured logging, Service Bus plumbing, rate limiting, and a scaffold CLI. Used across 17+ Azure Functions repos.',
    links: source('src/vibey_tools/bootstrap'),
  },
  {
    name: 'vibey-skills',
    family: 'vibey',
    tagline: 'A Claude Code plugin marketplace of evidence-grounded practitioner references',
    description:
      'Security, cloud infrastructure, DevSecOps, AI/ML, software architecture, agile delivery, and technical writing as Agent Skills. Every claim cites the standard, vendor doc, or paper it comes from.',
    links: source('src/vibey_tools/skills'),
  },
];

/** "claudeloop, codexloop, …, and vibey-skills" — for prose that names the packages. */
export function packageNameList(packages: OpenSourcePackage[] = openSourcePackages): string {
  const names = packages.map((p) => p.name);
  return `${names.slice(0, -1).join(', ')}, and ${names[names.length - 1]}`;
}
