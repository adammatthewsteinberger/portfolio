/**
 * The site has two editions (see AGENTS.md → "Two editions"):
 *
 * - engineering — the default. Every pre-existing URL, including the root.
 * - exec — the executive edition under /for-executives. Reached only by an
 *   explicit, secondary link; never the target of a rewrite or redirect.
 *
 * Header, footer, and CTAs read the edition from the pathname so the exec
 * pages get their own navigation without any file moving.
 */
export type Edition = 'engineering' | 'exec';

export const EXEC_PREFIX = '/for-executives';

export function editionFor(pathname: string | null | undefined): Edition {
  if (!pathname) return 'engineering';
  return pathname === EXEC_PREFIX || pathname.startsWith(`${EXEC_PREFIX}/`) ? 'exec' : 'engineering';
}
