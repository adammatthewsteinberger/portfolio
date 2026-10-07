/**
 * Every package in Adam's open-source family, all MIT licensed.
 *
 * Since vibey 1.0.0 (ADR-0037) the family lives in one repository,
 * the-vibey-project/vibey, and the engine family ships as one PyPI distribution,
 * `vibey-engine` (which installs the `vibey` command, the `*loop` engines, and
 * the tools): the old per-package repositories and PyPI projects no longer
 * exist. The apps ship separately as `krypton-app` (ADR-0069). So each package
 * links to its source directory in that repository, and only vibey itself
 * links to PyPI (VIBEY_DISTRIBUTION below).
 *
 * vibey 4.0.0 (ADR-0078) retired the Cursor and Antigravity runners, so the
 * paid engines are claudeloop and codexloop and the local ones gptossloop and
 * qwenloop. src/data/__tests__/open-source.test.ts fails if the retired
 * runners are named as current anywhere in copy.
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
  install: 'uv tool install vibey-engine',
  pypi: 'https://pypi.org/project/vibey-engine/',
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
      'A full Anthropic SDK CLI that never blocks on a human — it distinguishes an exhausted rate-limit window from exhausted credits and resumes safely across usage windows. Built on the official claude-agent-sdk. Pointed at a local backend profile it is also claudeloop-local, a local engine.',
    links: source('src/vibey_runners/claude'),
  },
  {
    name: 'codexloop',
    family: 'loop',
    tagline: 'The same runner for OpenAI Codex',
    description:
      'Same onion architecture, same rate-limit-vs-credits distinction, same never-block-on-a-human guarantee — driving the OpenAI Codex agent. With claudeloop it is one of the two paid engines.',
    links: source('src/vibey_runners/codex'),
  },
  {
    name: 'gptossloop',
    family: 'loop',
    tagline: 'The sovereign default: the same runner, fully local, on GPT-OSS 20B',
    description:
      'Runs GPT-OSS 20B on your own machine through Ollama and is on by default. It is vibey’s sovereign provider for the design interview and for decomposing a design into build work, and a local engine is preferred first, so a paid engine runs only when no local one can. The package never downloads model weights on its own.',
    links: source('src/vibey_runners/qwen'),
  },
  {
    name: 'qwenloop',
    family: 'loop',
    tagline: 'The same runner, fully local, on Qwen',
    description:
      'The opt-in Qwen twin of gptossloop: Qwen 3 14B through Ollama, llama.cpp, or vLLM, switched on with VIBEY_FEATURE_QWENLOOP=1. Model installation is always explicit: the package never downloads weights on its own.',
    links: source('src/vibey_runners/qwen'),
  },
  {
    name: 'vibey',
    family: 'vibey',
    tagline: 'A queue-based, six-phase conductor for autonomous software delivery',
    description:
      'You describe what you want. Vibey interviews you until the spec is sharp, optionally runs a visual-design pass, builds autonomously on top of the *loop runners, reviews its own work, and asks whether to deploy. PostgreSQL-backed with FOR UPDATE SKIP LOCKED. Local engines fill their slots first; in hybrid mode a paid engine takes overflow only after a wait, and only under a daily spend cap counted from the ledger.',
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
      'More than a hundred plugins and several hundred Agent Skills, from security, cloud infrastructure, DevSecOps, AI/ML, and software architecture to law, medicine, valuation, and writing craft. Every claim cites the standard, vendor doc, or paper it comes from.',
    links: source('src/vibey_tools/skills'),
  },
  {
    name: 'krypton',
    family: 'vibey',
    tagline: 'The apps for talking to vibey: desktop, mobile, web, and your editor',
    description:
      'krypton desktop for Linux (a Flatpak and an Ubuntu build, x86_64 and arm64) and macOS on Apple silicon, the krypton app for Android, iOS, and the web, and krypton for VS Code (also on Open VSX). They answer gates and watch budgets through the vibey hub. Every release attaches the builds with checksums; the apps install from PyPI as krypton-app.',
    links: [
      { label: 'Downloads', href: `${VIBEY_DISTRIBUTION.docs}guides/downloads/` },
      { label: 'Source', href: `${TREE}/clients` },
    ],
  },
];

/** "claudeloop, codexloop, …, and vibey-skills" — for prose that names the packages. */
export function packageNameList(packages: OpenSourcePackage[] = openSourcePackages): string {
  const names = packages.map((p) => p.name);
  return `${names.slice(0, -1).join(', ')}, and ${names[names.length - 1]}`;
}
