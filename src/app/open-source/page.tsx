import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Open Source | Adam Matthew Steinberger',
  description:
    'Eight packages on PyPI: onion-architected autonomous AI-agent runners, a 71-skill Claude Code plugin marketplace, and a production Azure bootstrap library.',
  openGraph: {
    title: 'Open Source | Adam Matthew Steinberger',
    description:
      'Eight packages on PyPI: onion-architected autonomous AI-agent runners, a 71-skill Claude Code plugin marketplace, and a production Azure bootstrap library.',
    url: 'https://hire.adam.matthewsteinberger.com/open-source',
  },
};

interface Package {
  name: string;
  tagline: string;
  description: string;
  pypi?: string;
  repo: string;
}

const packages: Package[] = [
  {
    name: 'claudeloop',
    tagline: 'Onion-architected, autonomous Claude Code session runner',
    description:
      'A full Anthropic SDK CLI that never blocks on a human — it distinguishes an exhausted rate-limit window from exhausted credits and resumes safely across usage windows. Built on the official claude-agent-sdk.',
    pypi: 'https://pypi.org/project/claudeloop/',
    repo: 'https://github.com/adammatthewsteinberger/claudeloop',
  },
  {
    name: 'codexloop / cursorloop / agyloop',
    tagline: 'The same runner, three more engines',
    description:
      'Autonomous session runners for OpenAI Codex, Cursor Agent, and Google Antigravity/Gemini — same onion architecture, same rate-limit-vs-credits distinction, same never-block-on-a-human guarantee.',
    repo: 'https://github.com/adammatthewsteinberger?tab=repositories&q=loop',
  },
  {
    name: 'vibey',
    tagline: 'A queue-based, six-phase conductor for autonomous software delivery',
    description:
      'You describe what you want. Vibey interviews you until the spec is sharp, optionally runs a visual-design pass, builds autonomously on top of the *loop runners, reviews its own work, and asks whether to deploy. PostgreSQL-backed with FOR UPDATE SKIP LOCKED.',
    pypi: 'https://pypi.org/project/vibey/',
    repo: 'https://github.com/adammatthewsteinberger/vibey',
  },
  {
    name: 'vibey-skills',
    tagline: '18 plugins. 71 Agent Skills. MIT licensed.',
    description:
      'A Claude Code plugin marketplace of evidence-grounded practitioner references — security, cloud infrastructure, DevSecOps, AI/ML, software architecture, agile delivery, and technical writing. Every claim cites the standard, vendor doc, or paper it comes from.',
    pypi: 'https://pypi.org/project/vibey-skills/',
    repo: 'https://github.com/adammatthewsteinberger/vibey-skills',
  },
  {
    name: 'vibey-bootstrap',
    tagline: 'The Azure Functions cross-cutting layer, solved once',
    description:
      'Configuration loading wants logging to report progress; App Insights logging wants configuration to initialize. vibey-bootstrap breaks that cycle with a four-phase startup sequence, then layers on structured logging, Service Bus plumbing, rate limiting, and a scaffold CLI. Used across 17+ Azure Functions repos.',
    pypi: 'https://pypi.org/project/vibey-bootstrap/',
    repo: 'https://github.com/adammatthewsteinberger/vibey-bootstrap',
  },
  {
    name: 'engineering-influence-skills',
    tagline: 'The 14-phase content pipeline as six Claude Code Agent Skills',
    description:
      'The methodology behind Novice to Navigator and Engineering Influence — from a vague topic to a falsifiable thesis, a verified non-fiction book, a novel, a screenplay, an AI-generated film, and distribution. Every phase has entry conditions and a quality gate; architecture is always written before prose.',
    pypi: 'https://pypi.org/project/engineering-influence-skills/',
    repo: 'https://github.com/adammatthewsteinberger/engineering-influence-skills',
  },
];

export default function OpenSourcePage() {
  return (
    <div>
      <section className="container mx-auto px-4 pt-8 pb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-4">
          Open Source
        </h1>
        <p className="text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto">
          Eight packages on PyPI, all MIT licensed. This is the part of my work you can read
          before you ever talk to me.
        </p>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {packages.map((pkg) => (
            <div key={pkg.name} className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-xl p-6">
              <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-1">{pkg.name}</h2>
              <p className="text-[var(--color-accent-blue)] font-medium text-sm mb-3">{pkg.tagline}</p>
              <p className="text-[var(--color-text-muted)] mb-4">{pkg.description}</p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={pkg.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-[var(--color-accent-blue)] hover:underline"
                >
                  GitHub →
                </a>
                {pkg.pypi && (
                  <a
                    href={pkg.pypi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-[var(--color-accent-blue)] hover:underline"
                  >
                    PyPI →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-8 text-center">
        <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto">
          This site is open source too —{' '}
          <a
            href="https://github.com/adammatthewsteinberger/hire-adam-steinberger"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-accent-blue)] hover:underline"
          >
            the repo is on GitHub
          </a>
          .
        </p>
      </section>
    </div>
  );
}
