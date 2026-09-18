# AGENTS.md

Guidance for AI coding agents (Claude Code, Cursor, Codex CLI, Gemini CLI, Copilot, Windsurf, and others) working in this repository. This is the canonical, vendor-neutral source of truth — `CLAUDE.md`, `WARP.md`, `GEMINI.md`, `.agent`, and `.agents` are all symlinks to this file, so every tool reads the same content. `.cursor/rules/project.mdc` is a thin Cursor-native pointer at this file (Cursor rule files use a special frontmatter format Cursor requires, so it can't be a plain symlink).

## What this is

Free and open-source: code under MIT (`LICENSE`), written content under CC BY 4.0 (`LICENSE-CONTENT.md`). Public repository: https://github.com/adammatthewsteinberger/portfolio.

`vibewithadam.matthewsteinberger.com` — Adam Matthew Steinberger's site, positioned as **Staff Software Architect & AI Automation Engineer**. It is not a generic business template: it is the front door to Adam's free and open-source work, plus a portfolio, blog, educational content hub, and lightweight RAG-powered Q&A widget, all served from one Next.js app. **It carries no "looking for work" copy** (the-vibey-project/vibey#238): no hiring page, no availability pill, no résumé download, no consulting or booking pitch. It is for three audiences, in this order: **(1) developers who want to help build vibey** — how to get started; **(2) governments and military**; **(3) universities and academia**. All three live on `/join-me` (`#developers`, `#governments`, `#academia`), driven by `src/data/audiences.ts`.

## Tech stack (verify before trusting anything older)

- **Framework**: Next.js 16.2.11, App Router, React 19.2, TypeScript 5 (strict mode)
- **Styling**: **Tailwind CSS v4** via `@theme` tokens in `src/app/globals.css` — there is no `tailwind.config.js`; the theme is entirely CSS-native. Colors are defined as CSS custom properties (`oklch()` primitives → semantic tokens → component usage) and referenced in JSX as `text-[var(--color-text-primary)]` etc. **Do not use Bootstrap** — despite what stale docs elsewhere may say, Bootstrap was removed.
- **Content**: Markdown + `gray-matter` frontmatter, rendered with `react-markdown` + `remark-gfm` + `rehype-highlight`
- **Forms**: `@formspree/react` for the contact form
- **RAG bot**: `@anthropic-ai/sdk` (Claude) + `minisearch` (BM25 lexical retrieval, no vector DB/embeddings vendor)
- **Validation**: `zod` for the `/api/ask` request/response contract
- **Testing**: Vitest 4 + React Testing Library + `@testing-library/user-event`, coverage via `@vitest/coverage-v8` — **100% statements/branches/functions/lines required**, enforced in `vitest.config.ts`. Playwright for e2e (`e2e/*.spec.ts`).
- **Tooling**: ESLint 9 flat config (`eslint.config.mjs`, `eslint-config-next`), Husky pre-commit/pre-push hooks, `lint-staged`
- **Deployment**: Cloudflare Workers via `@opennextjs/cloudflare` (`wrangler.jsonc`, `open-next.config.ts`), deployed by `.github/workflows/deploy.yml` on push to `main`; no `tailwind.config.js`, no `postcss.config.js` beyond `@tailwindcss/postcss`

If you find code, comments, or docs claiming Bootstrap, Next 15.x, or a `tailwind.config.js`, they are stale — trust this file and the actual `package.json`/`src/` tree over them.

## Directory structure

```
src/
├── app/                          # Next.js App Router — one folder per route
│   ├── layout.tsx                # Root layout: metadata, JSON-LD (Person + WebSite), GA4, self-hosted fonts (fonts.ts)
│   ├── page.tsx                  # Homepage
│   ├── story/                    # "About" page (renamed from /about; old URL 301s in next.config.ts)
│   ├── join-me/                  # The primary page: developers (how to get started on vibey), then governments and military, then universities and academia — see "Audiences"
│   ├── chat/                     # Full-page "Ask about Adam" chat; served at chatwithadam.matthewsteinberger.com via host rules in next.config.ts
│   ├── expertise/                # 10 technical pillars, CEO/engineer dual-audience copy
│   ├── work/, work/[slug]/       # Case studies (renamed from /projects; old URL 301s)
│   ├── open-source/              # Package showcase: one repo (the-vibey-project/vibey), one PyPI distribution (vibey); links from src/data/open-source.ts
│   ├── writing/                  # Hub linking to Blog, Novice to Navigator, Books
│   ├── blog/, blog/[slug]/       # 110+ posts, dynamic OG images, JSON-LD Article schema
│   ├── novice-to-navigator/      # 33-article free educational series + readiness quiz
│   │   └── readiness/            # Interactive chatbot-readiness quiz (client component)
│   ├── books/                    # Both books — neither is for sale; email-capture only
│   ├── contact/, privacy/, site-directory/
│   ├── api/ask/route.ts          # RAG bot streaming endpoint (see below)
│   ├── feed.xml/route.ts         # RSS 2.0
│   ├── sitemap.ts                # Dynamic sitemap, real per-post lastModified dates
│   ├── opengraph-image.tsx       # Root OG image (edge runtime)
│   ├── blog/[slug]/opengraph-image.tsx, work/[slug]/opengraph-image.tsx  # Per-page OG images; fonts loaded as bundled assets (no fs) so they run on Workers
├── components/                   # Shared React components; layout/ has Header + Footer; Icon.tsx + icons/sprite.ts (inline SVG, generated by scripts/build-icon-sprite.py — no icon font)
├── content/
│   ├── blog/*.md                 # 115 posts
│   ├── projects/*.md             # 17 case studies
│   └── articles/*.md             # 33 Novice to Navigator articles
├── data/                         # Metadata arrays (articles.ts, projects.ts, open-source.ts, expertise.ts, audiences.ts, quickstart.ts) + kb-sources.ts (KB chunks for expertise are generated from expertise.ts)
├── lib/                          # Content utils (blogUtils, projectUtils, markdownUtils), analytics.ts, hostRouting.ts, siteEnv.ts, ask/ (RAG bot retrieval + rate limiting)
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
- **Articles** (Novice to Navigator, metadata in `src/data/articles.ts`, body in `src/content/articles/*.md`): `slug, title, description, section, sectionDescription, order`

After adding a `.md` file, also add its slug/metadata to the corresponding `src/data/*.ts` array where one exists (projects and articles are metadata-array-driven; blog is directory-driven via `getAllBlogSlugs()`).

## Content integrity rule

Do not invent or round up metrics in case studies, blog posts, or anywhere else on the site. Every stat on `/work/*` should be traceable to the résumé, LinkedIn, or a source doc — if you can't verify a number, use honest qualitative language instead ("significant growth" rather than "10x growth"). This has already caused one cleanup pass (removing fabricated percentages from several case studies) — don't reintroduce the pattern.

## Audiences (no looking-for-work copy)

The operator's instruction (the-vibey-project/vibey#238): the site **does not contain any "looking for work" copy**, and it focuses on three audiences, in priority order. Concretely:

- **One primary page.** `/join-me` has three sections in this order: `#developers` (help build vibey: set up, run the gates, pick an issue, branch from develop, open a PR into develop — plus the user quickstart and where help matters most), `#governments` (what vibey offers, each claim linked to its source in the vibey repo, contact through official channels, and an explicit statement that the page claims no government or military customer, contract, clearance, accreditation, or endorsement), and `#academia` (the research paper, the book, `CITATION.cff`, reproducibility, open licenses, research collaboration — and no claimed affiliation).
- **One source.** `src/data/audiences.ts` holds the audiences, the contributor steps, and the claims. `/join-me`, the homepage "Who This Is For" cards, `/contact`, `MultipleCTAs`, the site directory, and the chat bot's knowledge base (`joinMeChunks()` in `src/data/kb-sources.ts`) all read it, so they cannot drift. Every claim must be traceable to the vibey repository; the known gap (sovereign decomposition, vibey#115) is stated, not hidden, and nothing claims an SBOM, which vibey does not publish.
- **Retired, with redirects.** `/hire-me` → `/join-me`. The executive edition (`/for-executives/*`) existed to sell — hire full-time, or engage the LLC — so each page redirects to the engineering page it mirrored (`/`, `/work`, `/work/:slug`, `/contact`). The consulting catalogue (`/services`, `/services/:slug`, and its legacy root aliases like `/ai-greenville.html`) redirects to `/`. The consulting calls to action at the end of blog posts and Novice to Navigator articles are gone. All redirects are in `next.config.ts` and tested in `src/__tests__/next.config.test.ts` and `e2e/redirects.spec.ts`.
- **Enforced, not promised.** `src/__tests__/no-looking-for-work.test.ts` scans every copy surface (`src/app`, `src/components`, `src/data`, `src/lib`, `src/hooks`, `public/llms.txt`, and all Markdown under `src/content`) for hiring, availability, résumé, consulting, and booking copy, and for links to the retired pages. If you have a legitimate new use of a guarded phrase, add a narrowly scoped exception there with a comment saying why.

## The RAG bot (`/api/ask`)

"Ask about Adam" — a small Claude-powered Q&A widget on the homepage (`src/components/AskAdam.tsx`), backed by `src/app/api/ask/route.ts`.

- **Knowledge base**: `scripts/build-kb.ts` combines curated static text (`src/data/kb-sources.ts`) with live project (`getAllProjects`/`getProjectBySlug`) and recent blog (`getAllBlogPosts`) content into `src/generated/kb.json` — chunked to ~900 chars per chunk. This file is **gitignored** and regenerated by `predev`/`prebuild`/`pretest`/`pretest:coverage`/`pretypecheck` npm hooks (`scripts/build-kb.ts`), so it's never stale in CI or on a fresh clone, and never committed.
- **Retrieval**: `src/lib/ask/kbIndex.ts` builds an in-memory MiniSearch (BM25) index from `kb.json` on first use — no vector DB, no embeddings API.
- **Model**: `claude-sonnet-5`, streamed via `@anthropic-ai/sdk`'s `client.messages.stream()`, thinking disabled for latency, `max_tokens: 400`. System prompt is rebuilt per-request from the top-5 retrieved chunks — see `buildSystemPrompt()` in the route.
- **Guardrails**: feature-flagged off unless both `ASK_BOT_ENABLED=true` and `ANTHROPIC_API_KEY` are set (checked via `GET /api/ask`, which the widget polls on mount and renders nothing if disabled); 6-turn session cap enforced client- and server-side; honeypot field; in-memory per-IP rate limiting and a daily output-token spend cap in `src/lib/ask/rateLimit.ts` (documented there as best-effort only — it resets on cold start and doesn't share state across Worker isolates, which is an accepted tradeoff for this widget's stakes); system prompt forbids inventing facts (dates, titles, customers, contracts, affiliations), deflects hiring and consulting questions to `/join-me`, and requires citing the source page. When `checkDailySpendCap()` fails or Anthropic returns a credit/billing error (`isCreditsExhausted()` in `src/lib/ask/messages.ts`), the API surfaces the `OUT_OF_COFFEE` message with a `/join-me` CTA instead of a generic failure string.
- If you add new pages that should be answerable by the bot, add curated source text to `src/data/kb-sources.ts` — don't try to scrape JSX from page components, the bot should only ever answer from hand-reviewed text.

### Chat subdomain (`chatwithadam.matthewsteinberger.com`)

The RAG chat is also hosted as a full-page experience at `https://chatwithadam.matthewsteinberger.com/` (rendered by `src/app/chat/page.tsx`). Host-based routing rules live in `next.config.ts` via `rewrites()` and `redirects()` using `has: [{ type: 'host', value: '<host>' }]` conditions:
- **Rewrite**: Requests to `chatwithadam.matthewsteinberger.com/` are rewritten to `/chat` (URL stays clean at the root, HTTP 200).
- **Redirects**:
  - `chatwithadam.matthewsteinberger.com/chat` permanently redirects (308) to `https://chatwithadam.matthewsteinberger.com/`.
  - Non-chat pages on `chatwithadam.matthewsteinberger.com` (e.g. `/story`, `/work/*`) permanently redirect (308) to `https://vibewithadam.matthewsteinberger.com/:path` (query strings preserved; `/api/*`, `/_next/*`, and static assets excluded via regex lookahead).
  - `vibewithadam.matthewsteinberger.com/chat` permanently redirects (308) to `https://chatwithadam.matthewsteinberger.com/`.
  - `localhost` and preview hosts are untouched so `/chat` serves directly.

This allows both the primary site and the chat subdomain to be served from the same Next.js application on a single Cloudflare Worker (both hosts are custom domains in `wrangler.jsonc`) without middleware or separate deployments.

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
- **No pricing and no looking-for-work copy anywhere on the site** — both were deliberate removals; don't reintroduce dollar figures, hiring pages, availability pills, résumé downloads, or consulting and booking calls to action (see "Audiences")
- **Books are not for sale** — no Amazon links, no prices; only email-capture "get notified" CTAs (Mailchimp, `https://eepurl.com/jiYXCQ`)
- **Redirects** for renamed/merged routes live in `next.config.ts` under the `redirects()` function — add one there whenever a route is renamed or a duplicate page is merged, don't just delete the old page
- **Every page sets its own `alternates.canonical`** (static pages in `metadata`, dynamic routes in `generateMetadata`), and the root layout must never declare one — Next.js does not deep-merge `alternates`, so a root canonical is inherited verbatim by every page that omits it (that bug shipped once: every URL canonicalized to the homepage). `src/__tests__/canonicals.test.ts` guards both halves.
- **Never state a count of the open-source packages** — list them by name from `src/data/open-source.ts`. Counts drifted three times in a month; `src/data/__tests__/open-source.test.ts` fails on any spelled-out or numeric package count in `src/app`, `src/components`, `src/data`, or `public/llms.txt`.
- **Audience copy** (the three audiences, the contributor path, the government and academia claims) comes from `src/data/audiences.ts`, never a literal on a page.
- **Expertise has one source**: `src/data/expertise.ts` drives the homepage specialties, `/expertise`, and the RAG KB chunks. Each pillar carries `engineer` + `rule` (rendered on the engineering pages) and `plain` (fed to the knowledge base only — never rendered on the pages; `src/__tests__/positioning.test.ts` checks).
- **Tests are colocated** in `__tests__/` directories next to the code they cover, and coverage must stay at 100% — see `vitest.config.ts` for the exact include/exclude globs (roughly: `src/lib`, `src/data`, `src/components`, `src/hooks`; `src/app/**` route handlers and pages are intentionally excluded from the coverage requirement, matching how `/api/ask/route.ts` and the OG image routes are handled)

## Deployment (Cloudflare Workers)

The site runs on Cloudflare Workers through the OpenNext adapter — free plan: 100k requests/day, unlimited static bandwidth, no "site paused" mode. Netlify was dropped on 2026-08-28 after its free tier suspended the site.

- `wrangler.jsonc` — Worker name, `nodejs_compat`, the static-assets binding, `ASK_BOT_ENABLED` var, and the custom domains: **canonical** `vibewithadam.matthewsteinberger.com` (site) and `chatwithadam.matthewsteinberger.com` (chat); **deprecated** `hire.adam.*` and `chat.adam.*` (the homes until 2026-08-28) plus apex and `www`, all kept attached only so the Worker can 301 them to the canonical hosts with path and query preserved (`LEGACY_HOSTS` in `src/lib/hostRouting.ts`). Never remove a deprecated host from `routes` — inbound links and search results still use them.
- `worker-entry.ts` — the Worker's `main`: applies **host routing** (`src/lib/hostRouting.ts`, unit-tested) and then hands off to the OpenNext handler. The chat-subdomain rewrite/redirects and the deprecated-host 301s live there for production; the equivalent rules in `next.config.ts` remain for `next start`, previews, and tests — OpenNext's router does not honour host-conditioned rewrites or regex sources, which is why the Worker does it.
- `open-next.config.ts` — adapter config with the read-only **static-assets incremental cache**: OpenNext serves prerendered dynamic-segment pages (`/work/[slug]`, `/blog/[slug]`, …) and `force-static` routes from the incremental cache, so without it they 404 in production.
- OG-image fonts are embedded as Latin subsets in `src/app/_og/fonts.generated.ts` (regenerate with `scripts/build-og-fonts.py`); Workers cannot `fetch` bundled files or read the filesystem.
- **Preview site** — `develop` is live at `preview.vibewithadam.matthewsteinberger.com` / `preview.chatwithadam.matthewsteinberger.com`: a second Worker (`portfolio-preview`, the `preview` environment in `wrangler.jsonc`) deployed by `.github/workflows/deploy-preview.yml` on every push to `develop`, built with `SITE_ENV=preview` (`src/lib/siteEnv.ts`: `noindex`, a preview banner, no analytics; canonicals still point at production). `npm run deploy:preview` does it from a logged-in machine. Host routing treats the preview pair exactly like production (`HOST_PAIRS` in `src/lib/hostRouting.ts`).
- `npm run preview` — builds, populates the prerender cache, and serves the Worker locally with workerd (the truest local check). `wrangler dev` stamps every request with the **first** custom domain in `wrangler.jsonc`, so to exercise another host locally use `npx wrangler dev --host chatwithadam.matthewsteinberger.com` (or the apex) rather than a spoofed `Host` header. Raw `wrangler dev` after a build also needs `npx opennextjs-cloudflare populateCache local` first, or every prerendered slug route 404s. `npm run deploy` — builds and deploys with your own `wrangler login`. Production deploys run from `.github/workflows/deploy.yml` on every push to `main`.
- **The Workers runtime has no filesystem**, so every route that reads Markdown must be prerendered: `generateStaticParams` on `blog/[slug]`, `work/[slug]`, `novice-to-navigator/[slug]`, and `force-static` on `feed.xml`. Only `/api/ask` and the OG-image routes run on the Worker at request time, and they read nothing from disk (OG fonts are bundled assets). Adding a new dynamic route that calls `blogUtils`/`projectUtils`/`serviceUtils`/`markdownUtils` at request time will break in production — prerender it.
- `src/generated/kb.json` must exist before `next build`; `npm run deploy`/`preview` and the workflow run `npm run build-kb` first because the adapter invokes `next build` directly (not the npm `prebuild` hook).

### Secrets and variables

- `ANTHROPIC_API_KEY` — a GitHub Actions secret; the deploy workflow pushes it to the Worker with `wrangler secret put` on every run (it is never baked into the bundle). Pairs with `ASK_BOT_ENABLED=true` in `wrangler.jsonc`; the widget stays hidden unless both are set.
- `CLOUDFLARE_API_TOKEN` (Workers Scripts: Edit + Zone DNS: Edit) and `CLOUDFLARE_ACCOUNT_ID` — GitHub repository secrets for the workflow.
- `GOOGLE_SITE_VERIFICATION` — optional GitHub secret, baked in at build.

### One-time dashboard steps (manual)

1. **Cloudflare → Add a site**: `matthewsteinberger.com` (free plan). Cloudflare imports the existing DNS records; check MX/TXT came across.
2. **Porkbun**: change the domain's nameservers to the two Cloudflare assigns. Registrar stays Porkbun.
3. First deploy (`npm run deploy` after `npx wrangler login`, or push to `main` with the GitHub secrets set). The custom domains in `wrangler.jsonc` are created on deploy; remove any old CNAME records for `hire.adam` / `chat.adam` that still point at Netlify.
4. Add `ANTHROPIC_API_KEY` to the repository's Actions secrets; the next deploy syncs it to the Worker.
5. Netlify: delete the site (or at least remove its custom domains) so nothing answers there.

## SEO / GEO surface

`sitemap.ts`, `robots.txt` (with a `Sitemap:` line), `public/llms.txt` (AI-crawler discoverability), `feed.xml` (RSS), JSON-LD on the root layout (`Person` + `WebSite`) and per-page (`ProfilePage` on `/story`, `Article` on blog posts, `CreativeWork` on case studies, `Book` ×2 on `/books`), and dynamic per-page OG images via `next/og`'s `ImageResponse`.
