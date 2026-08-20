# Acceptance criteria

## AC-01

Given the Next.js app with a new src/app/chat/page.tsx Server Component

When GET /chat is served

Then the page renders a server-side <h1> 'Ask my résumé', a one-or-two-sentence intro explaining it answers only from what is on the site and is capped at six questions per session, links to /hire-me and /contact, and mounts <AskAdam variant="page" />; its metadata exports title 'Ask my résumé' (the root template appends '| Adam Matthew Steinberger'), a description, alternates.canonical = 'https://chat.adam.matthewsteinberger.com/', and openGraph.url = 'https://chat.adam.matthewsteinberger.com/'

Fit criterion: a vitest test at src/app/chat/__tests__/page.test.tsx renders the page component and asserts the heading, the /hire-me and /contact links, and the exported metadata fields above; `npm run build` lists the /chat route

## AC-02

Given AskAdam rendered with variant="page" and GET /api/ask returning { enabled: true }

When the component mounts

Then the chat panel is shown inline and open immediately — no 'Ask my résumé' launcher button, no close (✕) button, no fixed/bottom-right positioning — with the same intro text, suggested-question chips, message list, citations, streaming, error handling, honeypot, and six-turn limit as the widget; the panel is a labelled region (aria-label 'Ask my résumé') sized to fill the page (e.g. min-h-[60vh] and a taller scroll area)

Fit criterion: vitest tests in src/components/__tests__/AskAdam.test.tsx (or a new colocated test file) render variant="page" and assert: no launcher button, no close button, the region/label, a successful streamed answer, an error message, and the turn-limit notice; coverage remains 100%

## AC-03

Given AskAdam rendered with variant="page" and GET /api/ask returning { enabled: false } (or failing), or a bot user agent

When the component mounts

Then instead of rendering null (the widget's behaviour), the page variant renders a visible notice that the chat is resting right now, linking to /contact and /hire-me; the default widget variant still renders null in these cases

Fit criterion: vitest tests cover enabled:false, a rejected fetch, and useBotDetection returning true for the page variant, asserting the notice and its two links; and assert the widget variant still renders nothing

## AC-04

Given next.config.ts

When a request arrives with Host chat.adam.matthewsteinberger.com for path /

Then it is rewritten (not redirected, URL unchanged, HTTP 200) to /chat via rewrites() returning { beforeFiles: [ { source: '/', has: [{ type: 'host', value: 'chat.adam.matthewsteinberger.com' }], destination: '/chat' } ] }

Fit criterion: a vitest test at src/__tests__/next.config.test.ts imports next.config.ts, awaits rewrites(), and asserts that exact beforeFiles rule exists

## AC-05

Given next.config.ts redirects()

When requests arrive on Host chat.adam.matthewsteinberger.com

Then GET /chat permanently redirects (308) to https://chat.adam.matthewsteinberger.com/; and GET any other path that does not start with /api/ or /_next/ and does not end in a file extension (e.g. /story, /work/x, /hire-me?x=1) permanently redirects to https://hire.adam.matthewsteinberger.com/<same path> with the query string preserved; /api/ask, /_next/static/*, /favicon.ico, /robots.txt, /sitemap.xml, /feed.xml, /images/* and other asset paths are NOT redirected. The rules are, placed FIRST in the redirects array: { source: '/chat', has: [host chat], destination: 'https://chat.adam.matthewsteinberger.com/', permanent: true } and { source: '/:path((?!api/|_next/|.*\\.[a-zA-Z0-9]+$).+)', has: [host chat], destination: 'https://hire.adam.matthewsteinberger.com/:path', permanent: true }

Fit criterion: the vitest test at src/__tests__/next.config.test.ts awaits redirects() and asserts both rules exist with those exact source/destination/has values and permanent: true, and that they precede all other redirects

## AC-06

Given next.config.ts redirects()

When a request arrives with Host hire.adam.matthewsteinberger.com for /chat

Then it permanently redirects (308) to https://chat.adam.matthewsteinberger.com/ via { source: '/chat', has: [{ type: 'host', value: 'hire.adam.matthewsteinberger.com' }], destination: 'https://chat.adam.matthewsteinberger.com/', permanent: true }; requests on any other host (e.g. localhost:3000 in dev/tests, *.netlify.app previews) are untouched so /chat serves directly

Fit criterion: the vitest test asserts this rule and that no host-less rule redirects /chat

## AC-07

Given the site's discoverability surfaces

When the feature ships

Then (a) the AskAdam widget dialog header contains a link labelled 'Open full page' to /chat (internal Next <Link> or <a href="/chat">); (b) Footer.tsx gains a nav link 'Ask my résumé' to /chat alongside the existing links; (c) src/app/sitemap.ts includes { url: 'https://chat.adam.matthewsteinberger.com/', changeFrequency: 'monthly', priority: 0.7 }; (d) public/llms.txt lists '[Ask my résumé](https://chat.adam.matthewsteinberger.com/)' under Key pages with a one-line description; (e) src/data/kb-sources.ts gains a curated chunk (id 'chat', url '/chat', title 'Ask my résumé', section 'Chat') stating that the RAG chat also lives full-page at https://chat.adam.matthewsteinberger.com, answers only from the site, and is capped at six questions per session

Fit criterion: vitest: Footer.test.tsx asserts the new link; AskAdam tests assert the 'Open full page' link in the widget; an existing or new test under src/data/__tests__ asserts the kb-sources chunk fields; src/app/sitemap.ts and public/llms.txt contain the chat URL (grep)

## AC-08

Given AGENTS.md (the canonical agent guide; CLAUDE.md/GEMINI.md are symlinks to it)

When the feature ships

Then AGENTS.md documents: the new src/app/chat/ entry in the directory tree; a short 'Chat subdomain (chat.adam.matthewsteinberger.com)' subsection explaining the host-based rewrite/redirect rules live in next.config.ts and why (same app, one Netlify site); the manual deployment steps (Netlify: add domain alias chat.adam.matthewsteinberger.com to the hire-adam-steinberger site; Porkbun DNS: CNAME chat.adam -> hire-adam-steinberger.netlify.app; HTTPS provisions automatically once DNS resolves); and `npm run worktree:deps` in the Development commands list (bootstraps node_modules in a git worktree by cloning the main checkout's)

Fit criterion: grep AGENTS.md for 'chat.adam.matthewsteinberger.com', 'worktree:deps', 'domain alias', and 'CNAME' all succeed

## AC-09

Given the integrated branch in a clean worktree

When the quality gates run

Then npm run typecheck passes, npm run lint reports 0 errors, npm run test:coverage passes with 100% on all four metrics, and npm run build succeeds and lists the /chat route

Fit criterion: each command exits 0 in the worktree after `npm run worktree:deps`
