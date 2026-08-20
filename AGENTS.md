# AGENTS.md

Guidance for AI coding agents (Claude Code, Cursor, Codex CLI, Gemini CLI, Copilot, Windsurf, and others) working in this repository. This is the canonical, vendor-neutral source of truth — `CLAUDE.md`, `WARP.md`, `GEMINI.md`, `.agent`, and `.agents` are all symlinks to this file, so every tool reads the same content. `.cursor/rules/project.mdc` is a thin Cursor-native pointer at this file (Cursor rule files use a special frontmatter format Cursor requires, so it can't be a plain symlink).

## What this is

`hire.adam.matthewsteinberger.com` — a personal "hire me" site for Adam Matthew Steinberger, positioned as **Staff Software Architect & AI Automation Engineer**. It is not a generic business template: it is a portfolio, blog, educational content hub, and lightweight RAG-powered Q&A widget, all served from one Next.js app. Primary goal of the site is full-time employment; consulting services are a secondary, demoted track.

## Tech stack (verify before trusting anything older)

- **Framework**: Next.js 16.2.11, App Router, React 19.2, TypeScript 5 (strict mode)
- **Styling**: **Tailwind CSS v4** via `@theme` tokens in `src/app/globals.css` — there is no `tailwind.config.js`; the theme is entirely CSS-native. Colors are defined as CSS custom properties (`oklch()` primitives → semantic tokens → component usage) and referenced in JSX as `text-[var(--color-text-primary)]` etc. **Do not use Bootstrap** — despite what stale docs elsewhere may say, Bootstrap was removed.
- **Content**: Markdown + `gray-matter` frontmatter, rendered with `react-markdown` + `remark-gfm` + `rehype-highlight`
- **Forms**: `@formspree/react` for the contact form
- **RAG bot**: `@anthropic-ai/sdk` (Claude) + `minisearch` (BM25 lexical retrieval, no vector DB/embeddings vendor)
- **Validation**: `zod` for the `/api/ask` request/response contract
- **Testing**: Vitest 4 + React Testing Library + `@testing-library/user-event`, coverage via `@vitest/coverage-v8` — **100% statements/branches/functions/lines required**, enforced in `vitest.config.ts`. Playwright for e2e (`e2e/*.spec.ts`).
- **Tooling**: ESLint 9 flat config (`eslint.config.mjs`, `eslint-config-next`), Husky pre-commit/pre-push hooks, `lint-staged`
- **Deployment**: Netlify via `@netlify/plugin-nextjs` (`netlify.toml`); no `tailwind.config.js`, no `postcss.config.js` beyond `@tailwindcss/postcss`

If you find code, comments, or docs claiming Bootstrap, Next 15.x, or a `tailwind.config.js`, they are stale — trust this file and the actual `package.json`/`src/` tree over them.

## Directory structure

```
src/
├── app/                          # Next.js App Router — one folder per route
│   ├── layout.tsx                # Root layout: metadata, JSON-LD (Person + WebSite), GA4, deferred Font Awesome
│   ├── page.tsx                  # Homepage
│   ├── story/                    # "About" page (renamed from /about; old URL 301s in next.config.ts)
│   ├── hire-me/                  # Primary conversion page — the main CTA target
│   ├── chat/                     # Full-page "Ask my résumé" chat; served at chat.adam.matthewsteinberger.com via host rules in next.config.ts
│   ├── expertise/                # 10 technical pillars, CEO/engineer dual-audience copy
│   ├── work/, work/[slug]/       # Case studies (renamed from /projects; old URL 301s)
│   ├── open-source/              # PyPI package showcase
│   ├── writing/                  # Hub linking to Blog, Novice to Navigator, Books
│   ├── blog/, blog/[slug]/       # 110+ posts, dynamic OG images, JSON-LD Article schema
│   ├── novice-to-navigator/      # 33-article free educational series + readiness quiz
│   │   └── readiness/            # Interactive chatbot-readiness quiz (client component)
│   ├── books/                    # Both books — neither is for sale; email-capture only
│   ├── services/, services/[slug]/  # Consulting services — demoted, no pricing anywhere on the site
│   ├── contact/, privacy/, site-directory/
│   ├── api/ask/route.ts          # RAG bot streaming endpoint (see below)
│   ├── feed.xml/route.ts         # RSS 2.0
│   ├── sitemap.ts                # Dynamic sitemap, real per-post lastModified dates
│   ├── opengraph-image.tsx       # Root OG image (edge runtime)
│   ├── blog/[slug]/opengraph-image.tsx, work/[slug]/opengraph-image.tsx  # Per-page OG images (Node runtime — they call fs-backed content utils, so edge is NOT used here)
├── components/                   # Shared React components; layout/ has Header + Footer
├── content/
│   ├── blog/*.md                 # 116 posts
│   ├── projects/*.md             # 12 case studies
│   ├── services/*.md             # 45 service pages
│   └── articles/*.md             # 33 Novice to Navigator articles
├── data/                         # Metadata arrays (articles.ts, projects.ts, services.ts) + kb-sources.ts
├── lib/                          # Content utils (blogUtils, projectUtils, serviceUtils, markdownUtils), analytics.ts, ask/ (RAG bot retrieval + rate limiting)
├── hooks/                        # useConsent, useBotDetection, useScrollDepth
├── test/setup.ts                 # Vitest global setup (jsdom polyfills, mocks)
└── generated/kb.json             # RAG bot knowledge base — GITIGNORED, rebuilt by scripts/build-kb.ts before dev/build/test/typecheck
scripts/
├── build-kb.ts                   # Chunks src/data/kb-sources.ts + live project/blog content into src/generated/kb.json
└── generate-ebook.ts             # Builds the Novice to Navigator PDF/EPUB from articles
e2e/                               # Playwright specs
```

## Content model — frontmatter schemas

Adding content means adding a `.md` file with the right frontmatter, **not** editing a database. Match these schemas exactly (see `src/lib/*Utils.ts` for the TypeScript interfaces that parse them):

- **Blog** (`src/content/blog/*.md`): `title, description, category, author, publishedDate ("YYYY-MM-DD"), readTime, tags[], featured?`
- **Projects/case studies** (`src/content/projects/*.md`): `title, subtitle, description, category, heroTitle, heroSubtitle, technologies[], duration, status (completed|ongoing|archived), challenge, solution, results, techStack, architecture, lessons`
- **Services** (`src/content/services/*.md`): see `src/lib/serviceUtils.ts` — larger, more free-form schema; **no pricing fields are rendered anywhere**, don't add any
- **Articles** (Novice to Navigator, metadata in `src/data/articles.ts`, body in `src/content/articles/*.md`): `slug, title, description, section, sectionDescription, order`

After adding a `.md` file, also add its slug/metadata to the corresponding `src/data/*.ts` array where one exists (projects and articles are metadata-array-driven; blog and services are directory-driven via `getAllBlogSlugs()`/`getAllServiceSlugs()`).

## Content integrity rule

Do not invent or round up metrics in case studies, blog posts, or anywhere else on the site. Every stat on `/work/*` should be traceable to the résumé, LinkedIn, or a source doc — if you can't verify a number, use honest qualitative language instead ("significant growth" rather than "10x growth"). This has already caused one cleanup pass (removing fabricated percentages from several case studies) — don't reintroduce the pattern.

## The RAG bot (`/api/ask`)

"Ask my résumé" — a small Claude-powered Q&A widget on the homepage (`src/components/AskAdam.tsx`), backed by `src/app/api/ask/route.ts`.

- **Knowledge base**: `scripts/build-kb.ts` combines curated static text (`src/data/kb-sources.ts`) with live project (`getAllProjects`/`getProjectBySlug`) and recent blog (`getAllBlogPosts`) content into `src/generated/kb.json` — chunked to ~900 chars per chunk. This file is **gitignored** and regenerated by `predev`/`prebuild`/`pretest`/`pretest:coverage`/`pretypecheck` npm hooks (`scripts/build-kb.ts`), so it's never stale in CI or on a fresh clone, and never committed.
- **Retrieval**: `src/lib/ask/kbIndex.ts` builds an in-memory MiniSearch (BM25) index from `kb.json` on first use — no vector DB, no embeddings API.
- **Model**: `claude-sonnet-5`, streamed via `@anthropic-ai/sdk`'s `client.messages.stream()`, thinking disabled for latency, `max_tokens: 400`. System prompt is rebuilt per-request from the top-5 retrieved chunks — see `buildSystemPrompt()` in the route.
- **Guardrails**: feature-flagged off unless both `ASK_BOT_ENABLED=true` and `ANTHROPIC_API_KEY` are set (checked via `GET /api/ask`, which the widget polls on mount and renders nothing if disabled); 6-turn session cap enforced client- and server-side; honeypot field; in-memory per-IP rate limiting and a daily output-token spend cap in `src/lib/ask/rateLimit.ts` (documented there as best-effort only — it resets on cold start and doesn't share state across concurrent Netlify Function instances, which is an accepted tradeoff for this widget's stakes); system prompt explicitly forbids inventing employment facts and requires citing the source page.
- If you add new pages that should be answerable by the bot, add curated source text to `src/data/kb-sources.ts` — don't try to scrape JSX from page components, the bot should only ever answer from hand-reviewed text.

### Chat subdomain (`chat.adam.matthewsteinberger.com`)

The RAG chat is also hosted as a full-page experience at `https://chat.adam.matthewsteinberger.com/` (rendered by `src/app/chat/page.tsx`). Host-based routing rules live in `next.config.ts` via `rewrites()` and `redirects()` using `has: [{ type: 'host', value: '<host>' }]` conditions:
- **Rewrite**: Requests to `chat.adam.matthewsteinberger.com/` are rewritten to `/chat` (URL stays clean at the root, HTTP 200).
- **Redirects**:
  - `chat.adam.matthewsteinberger.com/chat` permanently redirects (308) to `https://chat.adam.matthewsteinberger.com/`.
  - Non-chat pages on `chat.adam.matthewsteinberger.com` (e.g. `/story`, `/work/*`) permanently redirect (308) to `https://hire.adam.matthewsteinberger.com/:path` (query strings preserved; `/api/*`, `/_next/*`, and static assets excluded via regex lookahead).
  - `hire.adam.matthewsteinberger.com/chat` permanently redirects (308) to `https://chat.adam.matthewsteinberger.com/`.
  - `localhost` and preview hosts are untouched so `/chat` serves directly.

This allows both the primary site and the chat subdomain to be served from the same Next.js application on a single Netlify site instance without middleware or separate deployments.

## Development commands

```sh
npm run dev              # Dev server (Turbopack). predev rebuilds the KB first.
npm run build             # Production build. prebuild rebuilds the KB first.
npm start                 # Start production server
npm run lint / lint:fix   # ESLint
npm run typecheck         # tsc --noEmit (pretypecheck rebuilds the KB first — kb.json is a resolveJsonModule import, so it must exist for TS to resolve it)
npm run test               # Vitest (pretest rebuilds the KB first)
npm run test:coverage      # Vitest with coverage — must stay at 100% across all four metrics
npm run test:e2e           # Playwright
npm run build-kb           # Manually rebuild src/generated/kb.json
npm run generate-ebook     # Rebuild the Novice to Navigator PDF/EPUB
npm run worktree:deps      # Bootstrap node_modules inside a git worktree by cloning the main checkout's (used by vibey BUILD worktrees)
```

Husky runs `lint-staged` + `npm run typecheck` on pre-commit, and `npm run test` + `npm run build` on pre-push — both paths already rebuild the KB via the hooks above, so you don't need to run `build-kb` manually before committing.

## Conventions

- **Path alias**: `@/*` → `./src/*` (see `tsconfig.json`)
- **Styling**: Tailwind utility classes + CSS custom properties for theme tokens (`var(--color-text-primary)` etc.), defined in `src/app/globals.css`. Never hardcode hex colors in JSX — use a theme token, and if the color you need doesn't have one, add it to `globals.css` first.
- **Server-first**: default to Server Components; add `'use client'` only at the leaf that actually needs interactivity/state (see `AskAdam.tsx`, `AudienceToggle.tsx`, `ReadinessQuiz.tsx` for examples of the pattern)
- **No pricing anywhere on the site** — this was a deliberate removal; don't reintroduce dollar figures on `/services/*` or elsewhere
- **Books are not for sale** — no Amazon links, no prices; only email-capture "get notified" CTAs (Mailchimp, `https://eepurl.com/jiYXCQ`)
- **Redirects** for renamed/merged routes live in `next.config.ts` under the `redirects()` function — add one there whenever a route is renamed or a duplicate page is merged, don't just delete the old page
- **Tests are colocated** in `__tests__/` directories next to the code they cover, and coverage must stay at 100% — see `vitest.config.ts` for the exact include/exclude globs (roughly: `src/lib`, `src/data`, `src/components`, `src/hooks`; `src/app/**` route handlers and pages are intentionally excluded from the coverage requirement, matching how `/api/ask/route.ts` and the OG image routes are handled)

## Deployment

Netlify, `@netlify/plugin-nextjs`, build command `npm run build`, publish directory `.next`. Required environment variables in the Netlify dashboard:

- `GOOGLE_SITE_VERIFICATION` — Search Console verification (optional; omitted safely if unset)
- `ANTHROPIC_API_KEY` + `ASK_BOT_ENABLED=true` — required together to enable the RAG bot; the site functions completely normally with the widget simply absent if either is unset

### Subdomain setup (manual steps)

To route `chat.adam.matthewsteinberger.com` to the existing deployment:
1. **Netlify**: In Site configuration → Domain management, add domain alias `chat.adam.matthewsteinberger.com` to the `hire-adam-steinberger` site.
2. **Porkbun DNS**: For `matthewsteinberger.com`, add a CNAME record: `chat.adam` → `hire-adam-steinberger.netlify.app`.
3. **SSL/TLS**: Netlify automatically provisions and renews the Let's Encrypt TLS certificate once the DNS CNAME record resolves.

## SEO / GEO surface

`sitemap.ts`, `robots.txt` (with a `Sitemap:` line), `public/llms.txt` (AI-crawler discoverability), `feed.xml` (RSS), JSON-LD on the root layout (`Person` + `WebSite`) and per-page (`ProfilePage` on `/story`, `Article` on blog posts, `CreativeWork` on case studies, `Book` ×2 on `/books`), and dynamic per-page OG images via `next/og`'s `ImageResponse`.

<!-- vibey:begin -->
This section is generated by vibey. Do not edit inside these markers --
changes here are overwritten on the next provisioning run.

## Non-negotiables

- None

## Skill plugins

none

## Full context

See .vibey/context/ for the accepted spec, acceptance criteria, NFRs, decisions, and open items.
<!-- vibey:end -->
