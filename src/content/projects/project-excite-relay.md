---
title: Project Excite — AI-to-Human Live Chat Relay
subtitle: Handing a Seeker From the AI to a Live Volunteer, Without Losing the Thread
description: Volunteer engineering for a nonprofit AI apologetics chat platform — an adapter-based relay microservice that hands conversations from the AI to live volunteers on Chatwoot or EchoGlobal, with an explicit session state machine, idempotent teardown, HMAC-verified webhooks, and QStash-queued delivery; designed in three technical executive summaries before a line of code, then shipped across split PR stacks
category: AI Solutions
heroTitle: Project Excite — AI-to-Human Live Chat Relay
heroSubtitle: Adapter-Based Relay, Explicit State Machine, Two Very Different Volunteer Platforms
technologies:
  - Next.js
  - Laravel
  - Filament
  - Drizzle
  - PostgreSQL
  - Redis
  - QStash
  - Chatwoot
  - EchoGlobal
  - HMAC Webhooks
  - Sanctum
  - Pusher
  - Vitest / PHPUnit
duration: Volunteer, Apr 2026 – present
status: ongoing
challenge: The platform's AI could hold a conversation, but the moment a seeker was ready to talk to a real person there was no path to one. The two volunteer-facing platforms the ministry uses have fundamentally different integration models — one has a rich API with webhooks, a bot framework, and programmatic conversation control; the other exposes a read-only GraphQL API, a write-only contacts endpoint, and Zapier-based events. Any bridge had to keep the seeker's thread intact across the handoff and never strand a session.
solution: A relay microservice built around an abstract adapter interface with a concrete adapter per volunteer platform, so the relay core never knows which platform it is talking to. Every conversation is an explicit session state machine — chosen over boolean flags precisely to rule out the class of bugs where messages arrive after teardown has begun. A Redis-backed session manager tracks seeker, assigned adapter, state, and platform conversation ID; inbound webhooks are HMAC-verified at the edge; delivery is QStash-queued; and a shared in-session @agent lets the volunteer pull the AI back into the conversation. Teardown fires from any of four triggers and is idempotent, so simultaneous triggers are safe.
results: Designed first — three technical executive summaries (relay architecture, and one per volunteer platform) in April 2026 and a unified relay schema reference in June — then implemented across split PR stacks (schema, relay lib, relay HTTP, backend proxy, client UI, admin monitoring) with Drizzle migrations, Sanctum-token relay sessions, encrypted credential casts, and a Filament admin monitoring surface. Along the way, security hardening in the seeker app (XSS via a DOMPurify SafeHtml wrapper, a CORS allowlist replacing a wildcard, Sentry default PII off, chat-completions rate limiting) and CI/PHPUnit repair. Roughly 68 commits so far. Unpaid, concurrent with full-time work.
techStack: Next.js seeker-facing app on Vercel with Drizzle + Postgres; Laravel/Filament backend hub whose models mirror config into the seeker app's database; Redis session store; QStash + Vercel Cron for jobs; Pusher for real-time events; Chatwoot webhooks and EchoGlobal GraphQL/REST/Zapier surfaces behind adapters; HMAC-verified inbound webhooks; Vitest and PHPUnit.
architecture: The design decision that mattered most was the explicit state machine — every message, command, and teardown trigger is evaluated against a named state, so "message after teardown" and "@agent during handoff" are impossible transitions rather than edge cases to remember. The adapter seam is what makes two wildly different platforms look identical to the core; a mock adapter made the core testable before either real integration existed. Migration planning moved the implementation from the backend hub into the seeker app behind a RELAY_BACKEND flag so cutover is a config change.
lessons: The relay is small; the design work around it is what made it shippable — three audience-specific summaries reviewed by the founder before implementation surfaced the open questions (latency tolerance, who may invoke @agent, Zapier's fitness) that would otherwise have been discovered in production. And volunteering on someone else's codebase is a good test of whether your habits travel — split PR stacks, tests first, no secrets in code.
---

# Project Excite — AI-to-Human Live Chat Relay

## Project Overview

Volunteer engineering for a nonprofit AI apologetics chat platform: a Next.js seeker-facing app plus a Laravel/Filament backend hub. Project Excite is the piece that hands a conversation from the AI to a live volunteer — on Chatwoot or EchoGlobal — without losing the thread. Unpaid, concurrent with full-time work; roughly 68 commits since April 2026.

## The Challenge

- Two volunteer platforms with **fundamentally different integration models**: one rich (API, webhooks, bot framework, conversation control), one narrow (read-only GraphQL, write-only contacts endpoint, Zapier events)
- The seeker's thread has to survive the handoff, and a session must never be stranded
- The AI should stay available to the volunteer mid-conversation

## Technical Solution

### Adapter-based relay
An abstract adapter interface with a concrete adapter per platform. The relay core — gateway, session manager, state machine — never knows which platform it is talking to. A mock adapter made the core testable before either real integration existed.

### Explicit session state machine
Every conversation is a named-state machine rather than a pile of boolean flags. That choice rules out an entire class of bugs — messages arriving after teardown has begun, `@agent` commands during handoff — as impossible transitions instead of edge cases to remember.

### Idempotent, multi-trigger teardown
Sessions end from any of four triggers (inactivity, volunteer close, seeker close, admin force). The teardown sequence is identical and idempotent, so two triggers firing at once is safe.

### The rest of the plumbing
- **Redis-backed session manager** tracking seeker, adapter, state, and platform conversation ID
- **HMAC-verified inbound webhooks** at the edge
- **QStash-queued delivery** and Vercel Cron for background jobs; Pusher for real-time events
- **Shared in-session `@agent`** so the volunteer can pull the AI back in
- **Sanctum-token relay sessions**, Drizzle migrations, encrypted credential casts, and a Filament admin monitoring surface

## Design Before Code

Three technical executive summaries in April 2026 — the relay architecture, and one per volunteer platform — reviewed by the founder before implementation, plus a unified relay schema reference in June. Those reviews surfaced the open questions (latency tolerance, who may invoke `@agent`, whether the Zapier bridge is fit for purpose) before they could become production incidents. A later migration plan moved the implementation from the backend hub into the seeker app behind a `RELAY_BACKEND` flag, so cutover is a configuration change.

## Security Hardening Along the Way

XSS via a DOMPurify `SafeHtml` wrapper, a CORS allowlist replacing a wildcard, Sentry default PII disabled and a hard-coded client DSN removed, and rate limiting on the chat-completions endpoint — plus repairing the backend's CI/PHPUnit suite so the relay work could land on green.

## Key Learnings

The relay is small; the design work around it is what made it shippable. And volunteering on someone else's codebase is a good test of whether your habits travel — split PR stacks, tests first, no secrets in code — when nobody is paying you to keep them.
