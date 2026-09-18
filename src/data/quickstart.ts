/**
 * The ten-minute path from nothing to an autonomous software-engineering
 * agent, lifted from vibey's README (vibey 1.0.0: one `vibey` install carries
 * every *loop engine and the tools) and kept generic on purpose — nothing
 * here is tailored to this site or to any customer. Rendered on the homepage
 * and on /join-me.
 */
export interface QuickstartStep {
  cmd: string;
  note: string;
}

export const quickstart: QuickstartStep[] = [
  { cmd: 'uv tool install vibey', note: 'or pipx / pip. One install carries all five *loop engines and the tools. Python 3.12+ and PostgreSQL required; Windows is not a target.' },
  { cmd: 'export VIBEY_PG_URL=postgresql://user@localhost:5432/vibey', note: 'every database-backed command reads it; vibey never guesses a database' },
  { cmd: 'vibey new my-app --repo ~/src/my-app --max-cycle-dollars 15', note: 'a real budget brake, enforced from the ledger' },
  { cmd: 'vibey doctor --conformance --record', note: 'pre-flight: engines and auth, plus a recorded contract check per engine for the new project' },
  { cmd: 'vibey worker --provider claudeloop --engines claudeloop,agyloop -j 2', note: 'a live design interview, then an unattended build across the engine pool (the default provider is an offline test double)' },
  { cmd: 'vibey answer <gate-id> --defaults', note: 'when it parks for your input: design gates, review, budget grants' },
];

/** The invitation, verbatim from the bio. One source so every surface says the same thing. */
export const INVITATION =
  'Greenville-remote or US-remote volunteers are welcome and encouraged to get involved at any time.';
export const INVITATION_CTA = 'Everything a developer needs to get started';
