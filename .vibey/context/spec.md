# Design spec

## Objective

Host the site's existing 'Ask my résumé' RAG chat (AskAdam + /api/ask) as a full-page experience at https://chat.adam.matthewsteinberger.com, served by this same Next.js 16 app on Netlify: add a /chat route that renders the chat inline (not as a floating dialog), and add host-aware routing in next.config.ts so the chat host's root serves that page while every other page stays canonical on https://vibewithadam.matthewsteinberger.com. The /api/ask contract, guardrails, and knowledge base behaviour are unchanged. Full technical guidance, verified routing rules, and a file map are in .vibey/context/implementation-notes.md — read it before writing code.

## Constraints

- [hard] Follow AGENTS.md/CLAUDE.md conventions exactly: Next.js 16 App Router, React 19, TypeScript strict, Tailwind v4 theme tokens referenced as text-[var(--color-text-primary)] etc. Never hardcode hex colours. Server Components by default; 'use client' only at the leaf that needs state (AskAdam is already a client component).
- [hard] Tests live in colocated __tests__/ directories next to the code (vitest include glob is src/**/*.{test,spec}.{ts,tsx}). NEVER create a root-level tests/ directory — vitest would not run it. The generic vibey house rule about tests/ does NOT apply to this repo. Coverage must stay at 100% statements/branches/functions/lines for src/lib, src/data, src/components, src/hooks (thresholds enforced in vitest.config.ts); new component code must be fully covered.
- [hard] BUILD worktrees (.vibey/worktrees/<cycle>/<item>/) contain no node_modules. Every work item's verification.commands MUST be exactly, in this order: "npm run worktree:deps", "npm run typecheck", "npm run lint", "npm run test:coverage", "npm run build". The gate runner executes each command as a plain argv with no shell: no &&, no pipes, no env assignments, no cd.
- [hard] Host-based routing MUST be implemented only in next.config.ts via rewrites() and redirects() using has: [{ type: 'host', value: '<host>' }] conditions — the exact, already-verified rules are in .vibey/context/implementation-notes.md. Do NOT add middleware.ts, proxy.ts, Netlify _redirects rules, or netlify.toml redirects for this.
- [hard] Do not change src/app/api/ask/route.ts behaviour, src/lib/ask/*, the 6-turn session cap, the honeypot, rate limiting, the daily spend cap, or the system prompt. AskAdam's existing widget behaviour (launcher button + fixed dialog on the homepage) and its existing tests must keep passing.
- [hard] Content integrity: do not invent facts, metrics, or availability details. New copy speaks about Adam in the third person, matches the site's existing voice, and only restates what the site already says. No pricing, no book retail links.
- [hard] Git hygiene: commit only deliverable source files with conventional-commit messages (feat:, test:, docs:, chore:). Stage specific paths with git add <path>; never git add -A or git add . (the worktree contains machinery like .vibey/, .claudeloop/, node_modules, .next, coverage, src/generated that must never be committed). Do not commit the vibey-generated block between <!-- vibey:begin --> and <!-- vibey:end --> markers in AGENTS.md/CLAUDE.md/GEMINI.md/CURSOR.md — it is machinery; stage only your real documentation edits (remove the block from the file before staging, it is re-provisioned automatically).
- [soft] Prefer extracting the chat panel from AskAdam.tsx into a shared piece that both the widget and the page render, over duplicating the SSE streaming logic. Keep the component file count small.
- [soft] Keep the /chat page light: server-rendered static heading/intro (so crawlers and the disabled state still show meaningful content), no new third-party scripts, no new fonts.

## Non-goals

- No new backend, API route, auth, database, or vector store — /api/ask is reused as-is.
- No separate Netlify site or deploy pipeline; the subdomain is a domain alias on the existing site plus one DNS CNAME (manual steps, documented only).
- No Header/Footer redesign and no new route group/layout; the /chat page uses the root layout with the normal Header and Footer.
- No Playwright e2e run as a verification gate (unit tests via vitest plus a production build are the gates). Adding an e2e spec file is optional.
- No changes to the bot's knowledge-base retrieval or prompt; only a short curated KB chunk describing where the full-page chat lives may be added.

## Walking skeleton

Thinnest end-to-end slice: (1) add src/app/chat/page.tsx with the h1, intro, links and <AskAdam variant="page" />; (2) give AskAdam a `variant?: 'widget' | 'page'` prop (default 'widget') where 'page' renders the existing panel inline/open with no launcher or close button and shows the resting notice instead of null when disabled; (3) add the four verified host rules to next.config.ts (rewrite chat-host / -> /chat; redirect chat-host /chat -> chat root; redirect chat-host other paths -> hire host; redirect hire-host /chat -> chat root), placed first; (4) add the colocated tests for the page, the variant, and next.config so coverage stays 100%. Gates: npm run worktree:deps, typecheck, lint, test:coverage, build.
