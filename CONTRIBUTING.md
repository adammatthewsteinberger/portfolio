# Contributing

This is a personal site, and it is free and open-source software (code MIT, content CC BY 4.0). Issues and pull requests are welcome — the same house rules apply to everyone, including the owner.

## Issues welcome

Open a GitHub issue for:

- Broken links, rendering bugs, accessibility problems, or wrong facts on the live site
- Typos in blog posts, articles, or case studies (include the URL and the exact text)
- Problems running the project locally per the README quick start

Security issues: do **not** open a public issue — see [`SECURITY.md`](./SECURITY.md).

## Pull requests

For anything larger than a typo, open an issue first so the change is agreed before the work. Then send a PR against `develop`:

1. Read [`AGENTS.md`](./AGENTS.md) — it has the content schemas, conventions, and the rules the site enforces on purpose (no pricing, no invented metrics, books not for sale).
2. `npm ci`, then make sure `npm run lint`, `npm run typecheck`, `npm run test:coverage` (100% required), and `npm run test:e2e` pass. Husky runs most of this on commit/push anyway.
3. Keep PRs small and single-purpose. Content changes and code changes go in separate PRs.

## Contact

adam@matthewsteinberger.com · [hire.adam.matthewsteinberger.com/contact](https://hire.adam.matthewsteinberger.com/contact)
