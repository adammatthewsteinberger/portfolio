# Non-functional requirements

## NFR-01: Performance / page weight

Scale: number of additional third-party network requests or new client bundles introduced by /chat beyond what the homepage already loads

Meter: inspect the /chat page source and imports: only AskAdam (already shipped on the homepage) is client-side

Must: 0 new third-party requests, 0 new fonts, no new client dependencies in package.json

Wish: the page variant reuses the exact same AskAdam client bundle

Fit criterion: package.json dependencies unchanged; no <Script>/<link> additions in src/app/chat/page.tsx

## NFR-02: Accessibility

Scale: interactive elements in the page variant reachable by accessible role/name in React Testing Library

Meter: RTL getByRole queries in the component tests

Must: the chat panel is a labelled region (aria-label 'Ask my résumé'), the text input and Send button are reachable by role, suggested questions are buttons, and the honeypot stays aria-hidden with tabIndex -1

Wish: heading hierarchy on /chat is h1 then h2 with no skipped levels

Fit criterion: all page-variant tests locate elements via getByRole/getByLabelText rather than test ids

## NFR-03: SEO canonicality

Scale: number of hosts on which the chat page is indexable without a canonical pointing at the chat host

Meter: metadata export on /chat plus the hire-host /chat redirect rule

Must: canonical is https://chat.adam.matthewsteinberger.com/ and vibewithadam.matthewsteinberger.com/chat 308-redirects there, so exactly one indexable URL exists

Wish: sitemap and llms.txt both reference the chat URL

Fit criterion: AC-01 metadata assertions and AC-06 redirect assertion both pass
