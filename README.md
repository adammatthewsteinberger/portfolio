# portfolio

Source for [vibewithadam.matthewsteinberger.com](https://vibewithadam.matthewsteinberger.com) (formerly hire.adam.matthewsteinberger.com, which now redirects) — a portfolio site that doubles as a working demo of a shipped RAG feature. Portfolio, blog, a free 33-article course on AI chatbots for business, and an "Ask my résumé" widget that answers from the site's own content, all in one Next.js app.

[![Live site](https://img.shields.io/badge/live-vibewithadam.matthewsteinberger.com-0a7ea4)](https://vibewithadam.matthewsteinberger.com)
[![Next.js 16](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org)
[![TypeScript strict](https://img.shields.io/badge/TypeScript-strict-3178c6)](tsconfig.json)
[![License: MIT](https://img.shields.io/badge/code-MIT-green)](LICENSE) [![Content: CC BY 4.0](https://img.shields.io/badge/content-CC%20BY%204.0-blue)](LICENSE-CONTENT.md)

## Why this repo exists

- **It's the résumé, but it runs.** The site is Adam Matthew Steinberger's hire-me page (Staff Software Architect & AI Automation Engineer, Greenville, SC). Instead of a slide about RAG, the homepage has a RAG widget you can poke at.
- **RAG with the boring parts included.** Feature flag, honeypot, per-IP rate limit, daily spend cap, 6-turn session cap, prompt that refuses to invent facts. All in `src/app/api/ask/` and `src/lib/ask/`.
- **Content is Markdown, not a CMS.** 115 blog posts, 33 Novice to Navigator articles, 17 case studies, 45 service pages — each a `.md` file with typed frontmatter.
- **Discoverability surfaces built in.** RSS (`/feed.xml`), sitemap, `llms.txt`, JSON-LD, per-page OG images.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript 5 strict · Tailwind CSS v4 (CSS-native `@theme` tokens, no `tailwind.config.js`) · `react-markdown` + `gray-matter` · `@anthropic-ai/sdk` + `minisearch` (BM25, no vector DB) · Vitest + Testing Library (100% coverage enforced) · Playwright · Cloudflare Workers via `@opennextjs/cloudflare`.

## Quick start

Node 22 (see `.nvmrc`).

```sh
npm ci
npm run dev            # http://localhost:3000 — predev rebuilds the RAG knowledge base first
npm test               # Vitest (pretest rebuilds the KB)
npm run test:coverage  # must stay at 100% statements/branches/functions/lines
npm run test:e2e       # Playwright (e2e/*.spec.ts)
npm run lint && npm run typecheck
```

Everything works with zero environment variables. The "Ask my résumé" widget stays hidden unless both `ASK_BOT_ENABLED=true` and `ANTHROPIC_API_KEY` are set.

<details>
<summary>All npm scripts</summary>

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server (Turbopack) |
| `npm run preview` / `deploy` | Build the Cloudflare Worker with OpenNext and run it locally / deploy it |
| `npm run build` / `npm start` | Production build / serve |
| `npm run lint` / `lint:fix` | ESLint 9 flat config |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` / `test:watch` / `test:ui` | Vitest |
| `npm run test:coverage` | Vitest with v8 coverage (100% required) |
| `npm run test:e2e` / `test:e2e:ui` / `test:e2e:headed` | Playwright |
| `npm run build-kb` | Rebuild `src/generated/kb.json` (gitignored; also runs before dev/build/test/typecheck) |
| `npm run generate-ebook` | Rebuild the Novice to Navigator PDF/EPUB from its articles |

Husky runs `lint-staged` + `typecheck` on pre-commit and `test` + `build` on pre-push.

</details>

## Content architecture

```
src/content/
├── blog/*.md        # 115 posts            → /blog/[slug]        (directory-scanned)
├── articles/*.md    # 33 N2N articles      → /novice-to-navigator (metadata in src/data/articles.ts)
├── projects/*.md    # 17 case studies      → /work/[slug]        (metadata in src/data/projects.ts)
└── services/*.md    # 45 service pages     → /services/[slug]    (directory-scanned)
src/data/kb-sources.ts   # hand-reviewed text the RAG bot is allowed to answer from
```

Adding content = adding a `.md` file with the frontmatter schema in [`AGENTS.md`](./AGENTS.md#content-model--frontmatter-schemas), then (for articles/projects) an entry in the matching `src/data/*.ts` array. House rules that are enforced on purpose: no pricing anywhere on the site, no invented metrics in case studies, and the books are not for sale — email-capture only.

## The RAG widget (`/api/ask`)

1. `scripts/build-kb.ts` chunks `src/data/kb-sources.ts` plus live case-study and blog content into `src/generated/kb.json` (~900-char chunks; gitignored, rebuilt by npm pre-hooks so it's never stale).
2. `src/lib/ask/kbIndex.ts` builds an in-memory MiniSearch (BM25) index on first request.
3. `POST /api/ask` retrieves the top chunks, builds a per-request system prompt, and streams a Claude response (`max_tokens: 400`, thinking off for latency).
4. `GET /api/ask` reports `{ enabled }`; the widget renders nothing when it's off.

Guardrails: honeypot field, per-IP rate limit and daily output-token cap (`src/lib/ask/rateLimit.ts`, in-memory and documented as best-effort), 6-turn session cap client- and server-side, and a system prompt that must cite the source page and may not invent employment facts.

| Env var | Effect |
| --- | --- |
| `ASK_BOT_ENABLED=true` | Turns the widget on (requires the key too) |
| `ANTHROPIC_API_KEY` | Server-side only; never shipped to the client |
| `GOOGLE_SITE_VERIFICATION` | Optional Search Console tag |

Deploys to Cloudflare Workers from `.github/workflows/deploy.yml` on push to `main` (`npm run deploy` does the same from a logged-in machine; `npm run preview` runs the Worker locally). `ASK_BOT_ENABLED` is a var in `wrangler.jsonc`; `ANTHROPIC_API_KEY` is a Worker secret.

## Docs & links

- [`AGENTS.md`](./AGENTS.md) — the canonical agent/contributor guide (schemas, conventions, RAG internals). `CLAUDE.md`, `WARP.md`, `GEMINI.md`, `.agent`, `.agents` are symlinks to it.
- [`SECURITY.md`](./SECURITY.md) · [`CONTRIBUTING.md`](./CONTRIBUTING.md) · [`LICENSE`](./LICENSE)
- Live: [Hire me](https://vibewithadam.matthewsteinberger.com/hire-me) · [Work](https://vibewithadam.matthewsteinberger.com/work) · [Writing](https://vibewithadam.matthewsteinberger.com/writing) · [Novice to Navigator](https://vibewithadam.matthewsteinberger.com/novice-to-navigator) · [Books](https://vibewithadam.matthewsteinberger.com/books) · [Open source](https://vibewithadam.matthewsteinberger.com/open-source) · [Join me](https://vibewithadam.matthewsteinberger.com/join-me) · [RSS](https://vibewithadam.matthewsteinberger.com/feed.xml) · [llms.txt](https://vibewithadam.matthewsteinberger.com/llms.txt)

## Related repos

Open source (MIT, on PyPI): [claudeloop](https://github.com/adammatthewsteinberger/claudeloop) · [codexloop](https://github.com/adammatthewsteinberger/codexloop) · [cursorloop](https://github.com/adammatthewsteinberger/cursorloop) · [agyloop](https://github.com/adammatthewsteinberger/agyloop) · [qwenloop](https://github.com/adammatthewsteinberger/qwenloop) · [vibey](https://github.com/adammatthewsteinberger/vibey) · [vibey-gh](https://github.com/adammatthewsteinberger/vibey-gh) · [vibey-bootstrap](https://github.com/adammatthewsteinberger/vibey-bootstrap) · [vibey-skills](https://github.com/adammatthewsteinberger/vibey-skills) · [homebrew-tap](https://github.com/adammatthewsteinberger/homebrew-tap)

Sites and books: [engineering-influence](https://github.com/adammatthewsteinberger/engineering-influence) (book manuscripts + PDF/EPUB generator) · [humbleberger](https://github.com/adammatthewsteinberger/humbleberger)

## Contributing

Free and open-source software — issues and pull requests welcome. Start with [`CONTRIBUTING.md`](./CONTRIBUTING.md) and [`AGENTS.md`](./AGENTS.md), or with the wider stack at [/join-me](https://vibewithadam.matthewsteinberger.com/join-me).

## License

Code: [MIT](./LICENSE). Written content (posts, articles, case studies, service pages, curated prose): [CC BY 4.0](./LICENSE-CONTENT.md). Adam's name, likeness, and the book titles and cover art are reserved.

---

Built by [Adam Matthew Steinberger](https://vibewithadam.matthewsteinberger.com) · [more open source](https://vibewithadam.matthewsteinberger.com/open-source)
