/**
 * The ten-minute path from nothing to an autonomous software-engineering
 * agent, lifted from vibey's README and kept generic on purpose — nothing
 * here is tailored to this site or to any customer. Rendered on the homepage
 * and on /join-me.
 */
export interface QuickstartStep {
  cmd: string;
  note: string;
}

export const quickstart: QuickstartStep[] = [
  { cmd: 'uv tool install vibey', note: 'or pipx / pip. Python 3.12+ and PostgreSQL required; Windows is not a target.' },
  { cmd: 'uv tool install claudeloop', note: 'at least one engine; add codexloop, cursorloop, agyloop, or qwenloop for rotation' },
  { cmd: 'vibey doctor --conformance --record', note: 'pre-flight: database, engines, auth — and a recorded contract check per engine' },
  { cmd: 'vibey new my-app --repo ~/src/my-app --max-cycle-dollars 15', note: 'a real budget brake, enforced from the ledger' },
  { cmd: 'vibey worker --project <id> --engines claudeloop -j 1', note: 'unattended build; pin --project so a second worker never takes over yours' },
  { cmd: 'vibey answer <gate-id> --defaults', note: 'when it parks for your input: design gates, review, budget grants' },
];

/** The invitation, verbatim from the bio. One source so every surface says the same thing. */
export const INVITATION =
  'Greenville-remote or US-remote volunteers are welcome and encouraged to get involved at any time.';
export const INVITATION_CTA = 'Everything a developer needs to get started';
