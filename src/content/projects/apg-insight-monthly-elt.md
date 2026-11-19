---
title: APG Insight — A Monthly ELT That Finds Its Own Categories
subtitle: Discovering What a Month of Messages Was About, Without Publishing a Single Message
description: Volunteer architecture for a nonprofit AI chat platform — a monthly ELT system (Python, dbt, PostgreSQL, DuckDB) that clusters sentence embeddings, has a local open-weight model name each category, and publishes versioned marts and a public portal where a count appears only when ten different people stand behind it; 120 architecture decision records and 100% branch coverage enforced in CI
category: AI Solutions
heroTitle: APG Insight — Monthly ELT With Privacy Built In
heroSubtitle: Categories Discovered From the Data, Counts Withheld Below Ten People, Every Secret With One Reader
technologies:
  - Python
  - dbt
  - PostgreSQL
  - DuckDB
  - Sentence embeddings
  - Qwen3-4B (local)
  - Next.js
  - FastAPI
  - Helm
  - Kustomize
  - KEDA
  - Redis
duration: Volunteer, 2026 – present
status: ongoing
challenge: The ministry wanted to know what the people using its chat platform actually talk about, month by month. There is no fixed list of subjects to count against, the source is a very large export of private conversations, and the people who wrote them were told their data would never be sold or shared. The system had to find the categories itself, run unattended on a month at a time, and publish something the public could read without ever exposing a message, a name or a small group.
solution: A modular monolith with onion boundaries. A monthly run extracts only the requested month (from PostgreSQL, or by streaming a local SQL dump that is never restored), applies the platform's redaction and automation exclusions, builds sentence embeddings, clusters a bounded sample into micro-topics, merges them into categories, and has a local open-weight model name each one and reject groups that are not subjects. Every message is then assigned to its nearest categories, the result is promoted to an immutable versioned set, and dbt publishes the marts. A separate public layer exports only what is public, and a Next.js portal reads it through a read-only API.
results: The reference month — a 27 GB export of about 5.14 million rows — runs end to end in about six minutes on a 24 GB laptop, because the dump is streamed once and rows outside the month are never kept. The repository is held to its own gates, with 120 architecture decision records, 100% branch coverage enforced on more than 4,500 tests, and a Helm and Kustomize install with KEDA-scaled stage workers exercised on minikube against a synthetic fixture. A dbt step that ran for 4 hours 20 minutes without finishing on the first real month now builds in about a minute. The portal is not deployed yet.
techStack: Python with SQLAlchemy ORM adapters behind repository interfaces; dbt on PostgreSQL for the warehouse and on DuckDB for offline dump runs; sentence-transformer embeddings and a local Qwen3-4B model for naming; a stage queue with KEDA-scaled workers on Kubernetes (Helm, Kustomize); a FastAPI read-only portal API with two read-only database roles; a Next.js public site; HMAC-signed webhooks; Redis for the public cache.
architecture: The decision that shaped everything was that each secret has exactly one reader. The public portal holds no store credential and no source-database setting, and refuses to start if handed one, so a compromised portal still cannot reach the pipeline or the object store that holds text. Privacy is enforced as data rules rather than as policy — a cell is shown only when at least ten different people stand behind it, a hidden cell takes the smallest visible cell with it so subtraction cannot recover it, and a category's public name must be earned by words that ten people actually typed. The public run buttons sit behind a kill switch that starts off and reads as off whenever it cannot be read.
lessons: Slow queries only show at full size. The 4-hour dbt step hid behind a 25,000-message slice that happened to contain no flagged message, so the fix was a join in place of a subquery membership test plus a test that fails if the shape comes back. Writing each decision down as an ADR, including the ones that record "measured, no change", is what let a small team keep a month-by-month pipeline honest. The source repository is private, and the portal has not been deployed.
---

# APG Insight — A Monthly ELT That Finds Its Own Categories

## Project Overview

Volunteer architecture for a nonprofit AI chat platform. APG Insight is a monthly ELT system that discovers what a month of messages was about, assigns every eligible message to versioned categories, and publishes monthly category and origin marts, a one-page report, and a public portal. The source repository is private; this page describes the design, not the data.

## The Challenge

- **No fixed category list.** Subjects have to be discovered from the data each month, and their quality varies, so every run records quality findings instead of pretending a taxonomy exists
- **A very large, private source.** The reference month is a 27 GB export of about 5.14 million rows, and none of it may be restored, committed or copied into a ticket
- **A public answer with no exposure.** The public site may show counts and earned names, never a message, a name or a small group

## Technical Solution

### Discover, assign, promote
A bounded stratified sample of distinct texts is clustered into micro-topics and merged into categories. A local open-weight model writes each category's headline and rejects groups that are not subjects. Every message is then assigned to its nearest categories with a confidence, and a message no subject claims goes to a non-topical bucket. The result is promoted to an immutable, versioned category set.

### Two source modes, one contract
In database mode the system reads PostgreSQL and loads assignments idempotently. In SQL-dump mode it parses the file locally in a single streaming pass, spills to disk under memory pressure, builds the marts in an isolated DuckDB, and exports a review file, without ever contacting or restoring the source.

### Privacy as rules in the data
Counts below ten different people are withheld, a hidden cell hides the smallest visible neighbour with it, and category names must be earned by words ten people typed. Answers to a visitor's question are rounded to the nearest five. The artifacts that carry a model headline or a message are never exported.

### A cluster-ready install
A Helm chart and Kustomize overlays run each stage as a KEDA-scaled worker fed by a queue. The public portal API holds two read-only roles and nothing else.

## Keeping It Honest

120 architecture decision records, branch coverage held at 100% by a gate that runs before every push, and an install test that runs the whole system on minikube against a synthetic fixture. Several decisions record what was measured and deliberately left alone.

## Key Learnings

Performance problems in a data pipeline hide behind small fixtures, and privacy holds best when it is a rule the data cannot break rather than a promise the code keeps. The portal is built and tested but not yet deployed.
