import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

const config = [
  // .vibey/ holds vibey's BUILD worktrees (full checkouts with their own .next/ and
  // coverage/); the engine state dirs are session transcripts. None of it is product.
  { ignores: ['coverage/**', '.vibey/**', '.claudeloop/**', '.codexloop/**', '.cursorloop/**', '.agyloop/**'] },
  ...nextVitals,
  ...nextTypescript,
];

export default config;
