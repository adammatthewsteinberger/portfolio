/**
 * Every package Adam has published on PyPI, all MIT licensed.
 *
 * House rule: the site never states a *count* of these packages — it lists them.
 * Counts drifted three times in one month ("seven", "eight", "seven"); names
 * don't. src/data/__tests__/open-source.test.ts fails on any spelled-out or
 * numeric package count in app, component, data, or llms.txt copy.
 */
export interface OpenSourcePackage {
  name: string;
  /** `loop` = an autonomous session runner engine; `vibey` = the conductor and its tooling. */
  family: 'loop' | 'vibey';
  tagline: string;
  description: string;
  pypi: string;
  repo: string;
}

const GITHUB = 'https://github.com/adammatthewsteinberger';

export const openSourcePackages: OpenSourcePackage[] = [
  {
    name: 'claudeloop',
    family: 'loop',
    tagline: 'Onion-architected, autonomous Claude Code session runner',
    description:
      'A full Anthropic SDK CLI that never blocks on a human — it distinguishes an exhausted rate-limit window from exhausted credits and resumes safely across usage windows. Built on the official claude-agent-sdk.',
    pypi: 'https://pypi.org/project/claudeloop/',
    repo: `${GITHUB}/claudeloop`,
  },
  {
    name: 'codexloop',
    family: 'loop',
    tagline: 'The same runner for OpenAI Codex',
    description:
      'Same onion architecture, same rate-limit-vs-credits distinction, same never-block-on-a-human guarantee — driving the OpenAI Codex agent.',
    pypi: 'https://pypi.org/project/codexloop/',
    repo: `${GITHUB}/codexloop`,
  },
  {
    name: 'cursorloop',
    family: 'loop',
    tagline: 'The same runner for Cursor Agent',
    description:
      'The *loop contract on top of the Cursor Agent CLI, so a vibey build can rotate onto Cursor when another vendor is exhausted.',
    pypi: 'https://pypi.org/project/cursorloop/',
    repo: `${GITHUB}/cursorloop`,
  },
  {
    name: 'agyloop',
    family: 'loop',
    tagline: 'The same runner for Google Antigravity / Gemini',
    description:
      'The *loop contract for Google Antigravity and Gemini — same session semantics, same resume-across-windows behaviour, different vendor.',
    pypi: 'https://pypi.org/project/agyloop/',
    repo: `${GITHUB}/agyloop`,
  },
  {
    name: 'qwenloop',
    family: 'loop',
    tagline: 'The same runner, fully local, on Qwen 2.5 Coder',
    description:
      'An autonomous local Qwen 2.5 Coder 14B runner — a portable llama.cpp profile by default, BF16 through vLLM on Linux NVIDIA systems. Model installation is always explicit: the package never downloads weights on its own.',
    pypi: 'https://pypi.org/project/qwenloop/',
    repo: `${GITHUB}/qwenloop`,
  },
  {
    name: 'vibey',
    family: 'vibey',
    tagline: 'A queue-based, six-phase conductor for autonomous software delivery',
    description:
      'You describe what you want. Vibey interviews you until the spec is sharp, optionally runs a visual-design pass, builds autonomously on top of the *loop runners, reviews its own work, and asks whether to deploy. PostgreSQL-backed with FOR UPDATE SKIP LOCKED.',
    pypi: 'https://pypi.org/project/vibey/',
    repo: `${GITHUB}/vibey`,
  },
  {
    name: 'vibey-gh',
    family: 'vibey',
    tagline: 'Release automation for a GitHub repository, stdlib only',
    description:
      'Provenance fingerprints, derived version bumps, exact-head AI review and repair, a merge train, dual-channel releases, documentation maintenance, and post-release branch realignment. No dependencies, because it runs in every CI job of every repository that adopts it.',
    pypi: 'https://pypi.org/project/vibey-gh/',
    repo: `${GITHUB}/vibey-gh`,
  },
  {
    name: 'vibey-bootstrap',
    family: 'vibey',
    tagline: 'The Azure Functions cross-cutting layer, solved once',
    description:
      'Configuration loading wants logging to report progress; App Insights logging wants configuration to initialize. vibey-bootstrap breaks that cycle with a four-phase startup sequence, then layers on structured logging, Service Bus plumbing, rate limiting, and a scaffold CLI. Used across 17+ Azure Functions repos.',
    pypi: 'https://pypi.org/project/vibey-bootstrap/',
    repo: `${GITHUB}/vibey-bootstrap`,
  },
  {
    name: 'vibey-skills',
    family: 'vibey',
    tagline: 'A Claude Code plugin marketplace of evidence-grounded practitioner references',
    description:
      'Security, cloud infrastructure, DevSecOps, AI/ML, software architecture, agile delivery, and technical writing as Agent Skills. Every claim cites the standard, vendor doc, or paper it comes from.',
    pypi: 'https://pypi.org/project/vibey-skills/',
    repo: `${GITHUB}/vibey-skills`,
  },
];

/** "claudeloop, codexloop, …, and vibey-skills" — for prose that names the packages. */
export function packageNameList(packages: OpenSourcePackage[] = openSourcePackages): string {
  const names = packages.map((p) => p.name);
  return `${names.slice(0, -1).join(', ')}, and ${names[names.length - 1]}`;
}
