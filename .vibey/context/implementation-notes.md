# Implementation notes — chat.adam.matthewsteinberger.com

Read this before writing code. It complements `spec.md` / `acceptance.md` in this
directory with facts that were verified against this repository before BUILD
started. Do not re-litigate the decisions below; they are settled.

## 0. Orientation (30 seconds)

- You are in a git worktree under `.vibey/worktrees/<cycle>/<item>/`. Run
  `npm run worktree:deps` first — it clones the main checkout's `node_modules`
  into this worktree (APFS copy-on-write, a few seconds). Do **not** `npm ci`,
  do **not** symlink `node_modules` (Turbopack rejects a symlink that points
  outside the project root and `next build` fails).
- Gates, in order, each as a plain command (no shell): `npm run worktree:deps`,
  `npm run typecheck`, `npm run lint`, `npm run test:coverage`, `npm run build`.
  `npm run build` takes ~1–2 minutes; run it once at the end of the item.
- AGENTS.md (CLAUDE.md/GEMINI.md are symlinks to it) is the repo's authoritative
  guide: Tailwind v4 tokens, colocated `__tests__/`, 100% coverage, server-first.
- Tests: vitest include glob is `src/**/*.{test,spec}.{ts,tsx}`. A root-level
  `tests/` dir is NEVER picked up — do not create one.
- Commit with `git add <specific paths>`; never `git add -A`. Never commit the
  `<!-- vibey:begin --> … <!-- vibey:end -->` block that appears in AGENTS.md —
  strip it from the file before staging your real AGENTS.md edits (it is
  re-provisioned automatically).

## 1. What exists today

- `src/components/AskAdam.tsx` — `'use client'`; exports `AskAdam()`. Polls
  `GET /api/ask` on mount (`{ enabled: boolean }`), returns `null` when disabled
  or when `useBotDetection()` is true. Renders a launcher button
  ("Ask my résumé"); when open, a `role="dialog"` panel fixed bottom-right
  (`fixed inset-x-4 bottom-4 sm:right-6 … sm:w-96 z-50`) with: header + ✕ close
  button, intro text, `SUGGESTED_QUESTIONS` chips, message list, "Thinking…",
  citations, error text, turn-limit notice (MAX_TURNS = 6), and a form with a
  hidden honeypot input named `website` plus the real input and Send button.
  Streams SSE from `POST /api/ask` (`data: {type:'delta'|'done'|'error'}`).
  `track('ask_message', { turn })` from `@/lib/analytics` on each send.
- `src/components/__tests__/AskAdam.test.tsx` — comprehensive tests with helpers
  `mockEnabledStatusResponse()`, `mockStreamingResponse(events)`,
  `mockRawStreamingResponse(chunks)`, `mockPendingStreamingResponse()`; mocks
  `@/hooks/useBotDetection` and `@/lib/analytics`. Reuse these helpers/patterns.
- `src/app/page.tsx` renders `<AskAdam />` in the hero CTA row.
- `src/app/api/ask/route.ts` — unchanged. `GET` → `{ enabled }`; `POST` → SSE.
  Disabled unless `ASK_BOT_ENABLED=true` and `ANTHROPIC_API_KEY` are set (so
  locally and in tests it is disabled: the page must still look intentional).
- `src/app/layout.tsx` — root layout with Header, Footer, metadata template
  `'%s | Adam Matthew Steinberger'`, `metadataBase = https://vibewithadam.matthewsteinberger.com`.
- `src/app/hire-me/page.tsx` — a good reference for page structure/metadata:
  `container mx-auto px-4 …` sections, `text-[var(--color-text-primary)]`,
  cards `bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-xl`.
- `src/components/layout/Footer.tsx` — nav links are `<Link>`s with
  `text-[var(--color-text-primary)] hover:text-[var(--color-accent-blue)] font-semibold transition-colors`;
  `src/components/__tests__/Footer.test.tsx` asserts links by role/name.
- `src/app/sitemap.ts` — `staticPages` array with `{ url, lastModified: buildDate, changeFrequency, priority }`.
- `src/data/kb-sources.ts` — array of `{ id, url, title, section, text }` chunks;
  there are tests under `src/data/__tests__/` — extend them for the new chunk.
- `public/llms.txt` — "## Key pages" list of `- [Name](URL): description`.
- `next.config.ts` — exports `nextConfig` with an `async redirects()` returning a
  long array. There is no `rewrites()` yet and no middleware/proxy (keep it so).

## 2. Verified host-routing rules (copy exactly)

These were verified against `next build && next start` with spoofed `Host`
headers: chat-host `/` → 200 page; chat-host `/chat` → 308 chat root;
chat-host `/story`, `/story?x=1`, `/work/<slug>` → 308 to the hire host with the
query preserved; chat-host `/api/ask`, `/_next/static/*`, `/favicon.ico`,
`/images/*`, `/font-awesome.min.css`, `/robots.txt`, `/sitemap.xml`, `/feed.xml`
→ 200 (not redirected); hire-host `/chat` → 308 chat root; `localhost` is
untouched (`/chat` serves directly, `/story` serves directly).

```ts
const CHAT_HOST = 'chat.adam.matthewsteinberger.com';
const HIRE_HOST = 'vibewithadam.matthewsteinberger.com';

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        // chat.adam.matthewsteinberger.com/ serves the /chat page (URL unchanged).
        { source: '/', has: [{ type: 'host', value: CHAT_HOST }], destination: '/chat' },
      ],
    };
  },
  async redirects() {
    return [
      // --- chat subdomain: keep exactly one canonical URL per page ---
      // chat host: /chat is canonical at the root.
      { source: '/chat', has: [{ type: 'host', value: CHAT_HOST }], destination: `https://${CHAT_HOST}/`, permanent: true },
      // chat host: every other page belongs to the hire host (assets/API/_next excluded).
      {
        source: '/:path((?!api/|_next/|.*\\.[a-zA-Z0-9]+$).+)',
        has: [{ type: 'host', value: CHAT_HOST }],
        destination: `https://${HIRE_HOST}/:path`,
        permanent: true,
      },
      // hire host: /chat lives on the chat host.
      { source: '/chat', has: [{ type: 'host', value: HIRE_HOST }], destination: `https://${CHAT_HOST}/`, permanent: true },
      // ...existing redirects follow unchanged...
    ];
  },
};
```

Notes: the three redirects go **first** in the array. The `source` regex uses a
negative lookahead so `/api/*`, `/_next/*` and anything with a file extension
keep serving on the chat host; `.+` (not `.*`) keeps `/` itself out of the rule
so the rewrite above can serve it. Next.js preserves the query string on
redirects automatically. Do not escape the dots in the `has.value` host strings.

Netlify's Next.js runtime (v5, `@netlify/plugin-nextjs`) runs the Next server,
so `has: host` conditions work there; no Netlify-level redirects are needed.

## 3. `/chat` page (`src/app/chat/page.tsx`)

Server Component, root layout (Header/Footer stay). Suggested shape:

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { AskAdam } from '@/components/AskAdam';

const CHAT_URL = 'https://chat.adam.matthewsteinberger.com/';

export const metadata: Metadata = {
  title: 'Ask my résumé',
  description:
    "Chat with Adam Matthew Steinberger's résumé — a small RAG assistant that answers questions about his experience, stack, and availability using only what's on his site.",
  alternates: { canonical: CHAT_URL },
  openGraph: { title: 'Ask my résumé | Adam Matthew Steinberger', description: '…', url: CHAT_URL },
};

export default function ChatPage() {
  return (
    <div>
      <section className="container mx-auto px-4 pt-8 pb-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-4">Ask my résumé</h1>
        <p className="text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto">
          Ask about Adam's experience, stack, or availability. Answers come only from what's actually on this site, and each session is capped at six questions.
        </p>
      </section>
      <section className="container mx-auto px-4 pb-12">
        <div className="max-w-3xl mx-auto">
          <AskAdam variant="page" />
          <p className="mt-6 text-sm text-center text-[var(--color-text-muted)]">
            Prefer the short version? See <Link href="/hire-me">Hire Me</Link> or <Link href="/contact">get in touch</Link>.
          </p>
        </div>
      </section>
    </div>
  );
}
```

Copy must stay third-person and factual (no new claims). The page is static;
`AskAdam` is the only client code.

## 4. `AskAdam` page variant

Add `interface AskAdamProps { variant?: 'widget' | 'page' }` (default
`'widget'`). Keep the widget behaviour byte-for-byte. For `'page'`:

- Always open: no launcher button, no ✕ close button.
- Container: not fixed. Use a labelled region, e.g.
  `<section role="region" aria-label="Ask my résumé" className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-xl shadow-2xl flex flex-col min-h-[60vh]">`
  with the scroll area `flex-1 overflow-y-auto p-4 space-y-3 min-h-[320px]`.
- Header row: title only (or title + the suggested-question intro).
- Disabled/bot states render a notice instead of `null`:
  "Ask my résumé is resting right now — it needs a live model key to answer.
  In the meantime, the <Link href="/hire-me">Hire Me</Link> page has the
  short version, or <Link href="/contact">get in touch</Link> directly."
  Use `text-[var(--color-text-muted)]` text inside the same card styling.
- Widget variant additionally gets a small `Open full page` link (`href="/chat"`)
  in the dialog header next to the close button, styled like the citations links
  (`text-xs underline text-[var(--color-text-muted)] hover:text-[var(--color-accent-blue)]`).
- Analytics: pass `surface: variant` in the existing `track('ask_message', …)` params.

Cleanest refactor: keep a single component and branch on `variant` for the
wrapper, header, and disabled state; the message list + form JSX is shared.
Keep 100% branch coverage: every new conditional needs a test for both sides.

## 5. Tests to add/extend

- `src/components/__tests__/AskAdam.test.tsx` (or a sibling
  `AskAdam.page.test.tsx`): page variant open-by-default, no launcher/close
  buttons, region with aria-label, streamed answer renders, error renders,
  turn-limit notice, disabled notice (enabled:false), rejected fetch notice, bot
  notice, `Open full page` link in the widget, `track` called with
  `surface: 'page'`.
- `src/components/__tests__/Footer.test.tsx`: new link `/chat` named
  "Ask my résumé".
- `src/app/chat/__tests__/page.test.tsx`: renders `ChatPage`, asserts h1, the
  `/hire-me` and `/contact` links, and `metadata.alternates.canonical`,
  `metadata.openGraph.url`, `metadata.title`. Mock `@/components/AskAdam` to a
  stub so the page test stays independent.
- `src/__tests__/next.config.test.ts`: `import nextConfig from '../../next.config'`;
  `await nextConfig.rewrites!()` / `await nextConfig.redirects!()`; assert the
  four rules exactly (source, destination, has, permanent) and that the three
  redirects are `redirects[0..2]`. Type the results (`Redirect[]` from `next/dist/lib/load-custom-routes` or structural typing) to satisfy strict TS.
- `src/data/__tests__/*`: assert the new `chat` chunk (id/url/title/section, text
  mentions `chat.adam.matthewsteinberger.com` and six questions).

## 6. Other deliverables

- `src/app/sitemap.ts`: append `{ url: 'https://chat.adam.matthewsteinberger.com/', lastModified: buildDate, changeFrequency: 'monthly', priority: 0.7 }` to `staticPages`.
- `public/llms.txt`: under "## Key pages" add
  `- [Ask my résumé](https://chat.adam.matthewsteinberger.com/): A small RAG chat that answers questions about Adam's experience, stack, and availability using only the content of this site (six questions per session).`
- `src/data/kb-sources.ts`: add `{ id: 'chat', url: '/chat', title: 'Ask my résumé', section: 'Chat', text: '…' }` — keep it factual: lives at https://chat.adam.matthewsteinberger.com (also /chat), answers only from the site, six questions per session, for anything more use the contact form.
- `AGENTS.md`: directory tree entry `chat/ # Full-page "Ask my résumé" chat; served at chat.adam.matthewsteinberger.com via host rules in next.config.ts`; a subsection "Chat subdomain" under The RAG bot explaining the rules in §2; Development commands: `npm run worktree:deps  # Bootstrap node_modules inside a git worktree by cloning the main checkout's (used by vibey BUILD worktrees)`; Deployment: manual steps — Netlify → Domain management → add domain alias `chat.adam.matthewsteinberger.com` to site `hire-adam-steinberger`; Porkbun DNS for matthewsteinberger.com → CNAME `chat.adam` → `hire-adam-steinberger.netlify.app`; Netlify provisions the certificate once DNS resolves.

## 7. Definition of done for the whole feature

All acceptance criteria AC-01…AC-09 satisfied; gates green; no generated files
or vibey machinery committed; AskAdam's original tests still pass unchanged in
intent.
