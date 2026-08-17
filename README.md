# Hire Adam Matthew Steinberger

The personal "hire me" site for Adam Matthew Steinberger — Staff Software Architect & AI Automation Engineer, based in Greenville, SC. It's a portfolio, a blog, a 33-article free educational series on AI chatbots for business, and a small Claude-powered "ask my résumé" widget, all in one Next.js app.

Live at [hire.adam.matthewsteinberger.com](https://hire.adam.matthewsteinberger.com).

> **Working on this repo with an AI coding assistant?** Read [`AGENTS.md`](./AGENTS.md) first — it's the canonical, detailed guide (content schemas, the RAG bot's architecture, coverage requirements, conventions). `CLAUDE.md`, `WARP.md`, `GEMINI.md`, `.agent`, and `.agents` are all symlinks to it.

## Tech stack

- **Framework**: [Next.js](https://nextjs.org) 16 (App Router), React 19, TypeScript 5 (strict mode)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com), theme tokens defined as CSS custom properties in `src/app/globals.css` — there's no `tailwind.config.js`
- **Content**: Markdown files with `gray-matter` frontmatter, rendered via `react-markdown`
- **RAG bot**: `@anthropic-ai/sdk` (Claude) + `minisearch` for lexical retrieval over the site's own content
- **Testing**: Vitest + React Testing Library (100% coverage enforced) and Playwright for e2e
- **Deployment**: [Netlify](https://netlify.com), via `@netlify/plugin-nextjs`

## Getting started

```sh
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The dev server automatically rebuilds the RAG bot's knowledge base first (`predev` → `scripts/build-kb.ts`) — no extra setup needed to browse the site locally. The "Ask my résumé" widget itself stays hidden unless `ASK_BOT_ENABLED=true` and `ANTHROPIC_API_KEY` are set in your environment; everything else works with no environment variables at all.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` / `lint:fix` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Run the Vitest suite |
| `npm run test:coverage` | Run tests with coverage (must stay at 100%) |
| `npm run test:e2e` | Run the Playwright e2e suite |
| `npm run build-kb` | Manually rebuild `src/generated/kb.json`, the RAG bot's knowledge base |
| `npm run generate-ebook` | Rebuild the Novice to Navigator PDF/EPUB from its source articles |

## Project structure

```
src/
├── app/            # Next.js App Router pages and API routes
├── components/     # Shared React components
├── content/        # Markdown content: blog/, projects/, services/, articles/
├── data/           # Content metadata arrays + the RAG bot's curated source text
├── lib/            # Content utilities, analytics, RAG bot retrieval/rate-limiting
├── hooks/          # Shared React hooks
└── generated/      # Build-time generated files (gitignored) — the RAG bot's kb.json
```

See [`AGENTS.md`](./AGENTS.md) for the full breakdown, including the exact frontmatter schema each content type expects.

## Adding content

1. Add a `.md` file to the relevant `src/content/{blog,projects,services,articles}/` directory with the frontmatter fields documented in `AGENTS.md`.
2. For projects and articles, also add a metadata entry to `src/data/projects.ts` or `src/data/articles.ts` — those two content types are metadata-array-driven rather than directory-scanned.
3. Run `npm run build` locally to confirm the new page renders and the sitemap/RSS feed pick it up.

Metrics and claims in case studies and blog posts should be traceable to a real source (résumé, LinkedIn, or the author's own record) — don't round up or invent numbers.

## The RAG bot

The homepage includes an "Ask my résumé" widget, backed by `POST /api/ask` — a streaming Claude endpoint that answers questions using only content retrieved from this site (never invented facts, never outside knowledge). It's feature-flagged off by default; see [`AGENTS.md`](./AGENTS.md#the-rag-bot-apiask) for the full architecture, guardrails, and required environment variables.

## Deployment

Deploys to Netlify. Build command is `npm run build`, publish directory is `.next`, configured in `netlify.toml` via `@netlify/plugin-nextjs`. Set `ANTHROPIC_API_KEY` and `ASK_BOT_ENABLED=true` in the Netlify dashboard to enable the RAG bot; `GOOGLE_SITE_VERIFICATION` is optional for Search Console.

## License

Private, all rights reserved — this is a personal site, not an open-source project. (See [`/open-source`](https://hire.adam.matthewsteinberger.com/open-source) on the live site for Adam's actual MIT-licensed packages.)
