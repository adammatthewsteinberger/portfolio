# Security Policy

This is a personal portfolio and hire-me site, not a service that handles payments, user accounts, or sensitive personal data. Its attack surface is small and mostly consists of: a static Next.js frontend, a contact form (Formspree, hosted off-site), and one server-side API route (`/api/ask`) that proxies questions to Claude.

## Scope

In scope for reports:

- The Next.js application in this repository (`src/`, `scripts/`, `netlify.toml`, `next.config.ts`)
- The `/api/ask` RAG bot endpoint and its guardrails (rate limiting, honeypot, spend caps)
- Build and deployment configuration

Out of scope:

- Third-party services this site links to or embeds (Formspree, Google Analytics, Mailchimp, TidyCal, GitHub, PyPI) — report those to the respective vendor
- Social engineering, physical security, or denial-of-service testing against the live site
- Findings that require a compromised or malicious npm dependency already flagged by `npm audit` — please report those upstream to the package maintainer first

## Supported versions

This is a single, continuously-deployed application on `main` — there is no versioned release history to track. Only the version currently deployed at [vibewithadam.matthewsteinberger.com](https://vibewithadam.matthewsteinberger.com) is "supported"; there's no LTS branch.

## Reporting a vulnerability

Please email **adam@matthewsteinberger.com** with a description of the issue, steps to reproduce, and potential impact. Do not open a public GitHub issue for security reports.

You can expect an acknowledgment within a few days. Since this is a personal site maintained by one person rather than a funded security team, response and fix timelines are best-effort rather than SLA-backed — but genuine vulnerabilities (especially anything that could leak the `ANTHROPIC_API_KEY`, bypass the RAG bot's rate limiting in a costly way, or execute arbitrary code) will be prioritized and fixed promptly.

## Notes on the RAG bot specifically

`/api/ask` calls the Anthropic API server-side using a key stored only in Netlify's environment variables — it is never exposed to the client. The endpoint has a feature flag (`ASK_BOT_ENABLED`), a honeypot field, a per-IP rate limit, and a daily output-token spend cap (see `src/lib/ask/rateLimit.ts`). Those in-memory limits are a best-effort backstop, not a hard guarantee, since Netlify Functions can scale to multiple instances with independent memory — this is a known, accepted tradeoff documented in the source, not an oversight. If you find a way to bypass them at meaningful cost or abuse scale, please report it.
