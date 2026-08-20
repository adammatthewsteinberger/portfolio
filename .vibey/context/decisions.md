# Decisions

Settled during the DESIGN interview (2026-08-20). Do not re-litigate.

- Scope is hosting the EXISTING RAG Q&A (AskAdam + /api/ask) at https://chat.adam.matthewsteinberger.com — no new backend, no WebSockets, no persistence, no accounts, no rate-limit changes. src/app/api/ask/route.ts and src/lib/ask/* are frozen.
- Same Next.js app, same Netlify site. The subdomain is a Netlify domain alias + one Porkbun CNAME (manual, documented in AGENTS.md), never automated in code.
- Host-aware routing lives ONLY in next.config.ts (rewrites()/redirects() with has:[{type:'host'}]); the exact rules are in implementation-notes.md §2 and were verified with next build + next start + spoofed Host headers. No middleware.ts, proxy.ts, _redirects, or netlify.toml rules.
- /chat is a Server Component page using the root layout (Header/Footer stay); canonical and openGraph.url are https://chat.adam.matthewsteinberger.com/; hire-host /chat 308s to the chat root; localhost and preview hosts serve /chat directly.
- One prop drives everything: AskAdam accepts variant?: 'widget' | 'page' (default 'widget'). 'page' = always open, no launcher, no close button, role='region' aria-label='Ask my résumé', min-h-[60vh]; disabled/bot state renders the 'resting' notice (links /hire-me, /contact) instead of null. track('ask_message', { turn, surface: variant }).
- Widget header gains <a href="/chat" target="_blank" rel="noopener noreferrer">Open full page</a> (relative href on purpose).
- Discoverability: Footer link 'Ask my résumé' → /chat; sitemap entry for the chat URL; public/llms.txt Key-pages line; one curated kb-sources chunk (id 'chat').
- Tests are colocated under __tests__/ (vitest glob src/**/*.{test,spec}.{ts,tsx}); coverage stays 100%; next.config.ts rules are unit-tested in src/__tests__/next.config.test.ts; the /chat page gets src/app/chat/__tests__/page.test.tsx. Never create a root tests/ directory.
- Verification gates per work item, argv only: npm run worktree:deps, npm run typecheck, npm run lint, npm run test:coverage, npm run build.
- Commit discipline: stage specific paths only; never commit generated files, machinery dirs, or the vibey-generated block in AGENTS.md/CLAUDE.md.
