---
title: vibey — Ledger-Mediated Orchestration
subtitle: Autonomous Software Delivery Across a Pool of Coding Agents, With Nothing Lost When One Dies
description: An open-source, queue-based conductor that carries a change from spec interview through design, build, and review across Claude Code, OpenAI Codex, Cursor Agent, Google Antigravity, and a local Qwen model — every decision a row in an append-only PostgreSQL ledger, every handoff checked, a human called only at recorded approval gates
category: AI Solutions
heroTitle: vibey
heroSubtitle: Many Agents, One Ledger, No Lost Work
technologies:
  - Python 3.12
  - PostgreSQL
  - SKIP LOCKED leases
  - Claude Code
  - OpenAI Codex
  - Cursor Agent
  - Google Antigravity
  - Qwen (local)
  - Helm
  - KEDA
  - kopf
  - GitHub Actions
  - PyPI
duration: August 2026 – present, creator and maintainer (MIT)
status: ongoing
challenge: A coding agent is a worker that can vanish mid-task — a rate-limit window closes, credits run out, a process crashes, a vendor has a bad afternoon. Chain several agents together and the failure multiplies. Most orchestration keeps its state in the agent's conversation, so when the agent dies, the plan, the findings, and the half-finished handoff die with it. The work is repeated, or worse, silently skipped. And a pipeline tied to one vendor stops when that vendor stops.
solution: vibey moves the state out of the agent and into a ledger. Every decision, finding, and handoff is a row in an append-only PostgreSQL table where UPDATE and DELETE are no-ops. Workers claim jobs under SKIP LOCKED leases; if a worker dies, its lease lapses and another worker picks the job up from the last recorded row. A change moves through spec interview, design, unattended build, and review, rotating across the *loop engines — claudeloop, codexloop, cursorloop, agyloop, and qwenloop — as vendors run out. Before one vendor's work is handed to another, it must pass a model-free no-loss check; if it fails, the job retries, escalates, or parks for a human. The human is called only at recorded approval gates.
results: Chaos test — 500 jobs across 8 workers with 20% dropped mid-job — finished with no job lost and none run twice. vibey reached 1.0.0 on PyPI with 11 releases between August and September 2026, 188 merged pull requests, about 100k lines of source, about 121k lines of tests, and 37 architecture decision records. This site is a dogfooding target — the chat subdomain shipped as vibey's first project cycle, 23 of 23 jobs green across two engines in about fifty minutes, with a review gate before merge.
techStack: Python 3.12 conductor and CLI; PostgreSQL as the single source of truth (append-only ledger, row-level locking, SKIP LOCKED job leases); one runner package per coding-agent vendor behind a shared contract; vibey-gh for release automation; vibey-skills as a plugin marketplace of practitioner references; a Helm chart with KEDA autoscaling and a kopf operator for cluster installs.
architecture: The ledger is the only place state lives, which makes every other component disposable. A worker is a loop that claims a lease, runs one step through an engine, and writes the result as a new row — it holds nothing a crash could lose. Vendor independence falls out of the same design; an engine is an adapter with a run directory, an exit code for graceful wind-down, a completion marker, and a verdict fence, so adding a vendor is one package, not a rewrite. The no-loss check is deliberately model-free — a deterministic comparison, not another model's opinion — because the thing checking a handoff should not fail in the same way as the things being handed off.
lessons: The model is not the product; the gates are. On this site's first cycle the agents did the mechanical work well and still skipped a core routing criterion, used a relative canonical, and wrote in the wrong person on one page — all caught at review. Autonomous delivery in 2026 is only as good as the spec it starts from and the checks it has to pass. The project holds itself to the same rule. It was built with AI coding agents under its own CI gates, with 100% branch-coverage floors on the conductor, every runner, and the release tool.
---

# vibey — Ledger-Mediated Orchestration

## The problem, in one sentence

A coding agent can die at any moment, and most pipelines keep their memory inside the agent.

## What vibey does instead

vibey keeps its memory in PostgreSQL. The agent is a worker; the ledger is the record. When a worker dies, the next one reads the ledger and carries on from the last row.

The phases a change moves through, in order:

1. **Spec interview.** You answer questions until the change has acceptance criteria and non-functional requirements.
2. **Design.** The conductor drafts a design and stops at a gate for your approval.
3. **Build.** Workers build unattended, rotating across vendors as rate limits and credits run out.
4. **Review.** The change is reviewed against the spec before it can merge.
5. **Deploy**, if you opt in.

## The guarantees, and how each one is kept

| Guarantee | Mechanism |
|---|---|
| No work lost when an agent dies | Append-only ledger; UPDATE and DELETE are no-ops |
| No job run twice | Workers claim jobs under SKIP LOCKED leases |
| No silent loss at a vendor handoff | A model-free no-loss check; failure means retry, escalate, or park |
| No runaway spend | A per-cycle budget brake, enforced from the ledger |
| A human decides the things that matter | Recorded approval gates for design, review, and budget |

The chaos test is the proof: 500 jobs, 8 workers, 20% of workers dropped mid-job. No job was lost. No job ran twice.

## Run it

Ten minutes, Python 3.12+ and PostgreSQL. The full quickstart is on [Join Me](/join-me):

```sh
uv tool install vibey-engine
export VIBEY_PG_URL=postgresql://user@localhost:5432/vibey
vibey new my-app --repo ~/src/my-app --max-cycle-dollars 15
vibey doctor --conformance --record
vibey worker --provider claudeloop --engines claudeloop,agyloop -j 2
```

One install carries every `*loop` engine and the tools. The PyPI distribution is `vibey-engine`; the command it installs is `vibey`.

## Where to help

The most useful contributions right now:

- **A new engine.** The runner contract is small: a run directory, an exit code for graceful wind-down, a completion marker, and a verdict fence. qwenloop is the newest example.
- **A chaos scenario the test does not cover yet.** If you can make it lose or repeat a job, that is the most valuable issue you can open.
- **A doc that lied to you.** If you had to read the source to find out, the doc was wrong.

The repository carries a CONTRIBUTING guide, a code of conduct, and a security policy. Pull requests go against `develop`; the full contributor path is on [Join Me](/join-me#developers).

## The write-up

The design is described in a paper, [*Ledger-Mediated Orchestration: Vendor-Independent Autonomous Software Delivery over a Pool of Coding Agents*](https://the-vibey-project.github.io/vibey/main/paper/) (not refereed; [PDF](https://the-vibey-project.github.io/vibey/main/paper.pdf)). The architecture, the runbooks, and the 37 ADRs are in [the vibey repository](https://github.com/the-vibey-project/vibey).
