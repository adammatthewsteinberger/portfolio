# Open items and assumptions

- Assumption: Netlify's Next.js runtime v5 honours next.config `has: host` conditions (it runs the Next server); the production curl checklist after the alias + DNS exist confirms it. Not a build-time concern.
- Assumption: the owner keeps chat.adam.matthewsteinberger.com resolvable long-term; out of scope for this build.
- Assumption: Playwright e2e is localhost-only and not a gate; adding an e2e spec is optional.
- No open blocking questions.
