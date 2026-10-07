---
title: vibey — Ledger-Mediated Orchestration
subtitle: Autonomous Software Delivery Across a Pool of Coding Agents, With Nothing Lost When One Dies
description: An open-source, queue-based conductor that carries a change from spec interview through design, build, and review across Claude Code, OpenAI Codex, and local models (GPT-OSS on Ollama, Qwen), local engines first — every decision a row in an append-only PostgreSQL ledger, every handoff checked, a human called only at recorded approval gates
category: AI Solutions
heroTitle: vibey
heroSubtitle: Many Agents, One Ledger, No Lost Work
technologies:
  - Python 3.12
  - PostgreSQL
  - SKIP LOCKED leases
  - Claude Code
  - OpenAI Codex
  - GPT-OSS 20B (local, Ollama)
  - Qwen (local)
  - Helm
  - KEDA
  - kopf
  - GitHub Actions
  - PyPI
duration: August 2026 – present, creator and maintainer (MIT)
status: ongoing
challenge: A coding agent is a worker that can vanish mid-task — a rate-limit window closes, credits run out, a process crashes, a vendor has a bad afternoon. Chain several agents together and the failure multiplies. Most orchestration keeps its state in the agent's conversation, so when the agent dies, the plan, the findings, and the half-finished handoff die with it. The work is repeated, or worse, silently skipped. And a pipeline tied to one vendor stops when that vendor stops.
solution: vibey moves the state out of the agent and into a ledger. Every decision, finding, and handoff is a row in an append-only PostgreSQL table where UPDATE and DELETE are no-ops. Workers claim jobs under SKIP LOCKED leases; if a worker dies, its lease lapses and another worker picks the job up from the last recorded row. A change moves through spec interview, design, unattended build, and review, rotating across the *loop engines — the local gptossloop and qwenloop first, then the paid claudeloop and codexloop only when no local engine can take the job — as slots and vendors run out. The design interview and the decomposition of a design into build work run on a local model by default. Before one vendor's work is handed to another, it must pass a model-free no-loss check; if it fails, the job retries, escalates, or parks for a human. The human is called only at recorded approval gates.
results: Chaos test — 500 jobs across 8 workers with 20% dropped mid-job — finished with no job lost and none run twice. vibey-engine 4.2.0 shipped on 7 October 2026, the latest of 25 tagged releases since the project began in August 2026, with 86 architecture decision records. This site is a dogfooding target — the chat subdomain shipped as vibey's first project cycle, 23 of 23 jobs green across two engines in about fifty minutes, with a review gate before merge.
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
2. **Design.** The conductor drafts a design and stops at a gate for your approval. By default the interview and the decomposition into build work run on a local model.
3. **Build.** Workers build unattended. Local engines fill their slots first; a paid engine takes a job only when no local one can, and rotates as rate limits and credits run out.
4. **Review.** The change is reviewed against the spec before it can merge.
5. **Deploy**, if you opt in.

## The guarantees, and how each one is kept

| Guarantee | Mechanism |
|---|---|
| No work lost when an agent dies | Append-only ledger; UPDATE and DELETE are no-ops |
| No job run twice | Workers claim jobs under SKIP LOCKED leases |
| No silent loss at a vendor handoff | A model-free no-loss check; failure means retry, escalate, or park |
| No runaway spend | A per-cycle budget brake and, in hybrid mode, a daily paid-engine cap, both counted from the ledger |
| A human decides the things that matter | Recorded approval gates for design, review, and budget |

The chaos test is the proof: 500 jobs, 8 workers, 20% of workers dropped mid-job. No job was lost. No job ran twice.

## Run it

Ten minutes, Python 3.12+ and PostgreSQL. The full quickstart is on [Join Me](/join-me):

```sh
uv tool install vibey-engine
export VIBEY_PG_URL=postgresql://user@localhost:5432/vibey
vibey new my-app --repo ~/src/my-app --max-cycle-dollars 15
vibey doctor --conformance --record
vibey worker --provider claudeloop --engines claudeloop,codexloop -j 2
```

One install carries every `*loop` engine and the tools. The PyPI distribution is `vibey-engine`; the command it installs is `vibey`. Leave `--provider` off and `vibey worker` runs design and decomposition on the local `gptossloop` (GPT-OSS 20B on Ollama) instead of a paid engine.

## Local first, paid by choice

Since 4.0.0 the engine pool has a declared policy. `gptossloop` is the sovereign default and is on unless you switch it off; `qwenloop` is its opt-in Qwen twin; and `claudeloop-local` is `claudeloop` on a local backend profile. The Cursor and Antigravity runners were retired in 4.0.0, so the paid engines are `claudeloop` and `codexloop`. In singleton mode a local engine is preferred first. In hybrid mode, local engines fill their declared slots, and a paid engine takes a build job only once every eligible local slot is occupied, the job has waited, and the project's daily paid cap has not been reached. Each overflow, each wait, and each measurement is an append-only event on the ledger, so you can read back why a paid engine ran.

## The apps

You can drive vibey from the command line or from the krypton apps: krypton desktop for Linux and for macOS on Apple silicon, the krypton app for Android, iOS, and the web, and krypton for VS Code. They answer gates and watch budgets through the vibey hub. Every release attaches the builds with checksums, and the apps install from PyPI as `krypton-app`.

## Where to help

The most useful contributions right now:

- **A new engine.** The runner contract is small: a run directory, an exit code for graceful wind-down, a completion marker, and a verdict fence. gptossloop and qwenloop are the newest examples.
- **The sovereign path on a real project.** Design and decomposition now run locally by default. How that compares with a paid engine on the same specification, and where it breaks, is the open question.
- **A chaos scenario the test does not cover yet.** If you can make it lose or repeat a job, that is the most valuable issue you can open.
- **A doc that lied to you.** If you had to read the source to find out, the doc was wrong.

The repository carries a CONTRIBUTING guide, a code of conduct, and a security policy. Pull requests go against `develop`; the full contributor path is on [Join Me](/join-me#developers).

## The write-up

The design is described in a paper, [*Ledger-Mediated Orchestration: Vendor-Independent Autonomous Software Delivery over a Pool of Coding Agents*](https://the-vibey-project.github.io/vibey/main/paper/) (not refereed; [PDF](https://the-vibey-project.github.io/vibey/main/paper.pdf)). The architecture, the runbooks, and the 86 ADRs are in [the vibey repository](https://github.com/the-vibey-project/vibey).
