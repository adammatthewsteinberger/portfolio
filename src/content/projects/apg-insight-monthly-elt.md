---
title: APG Insight — A Monthly Pipeline That Finds Its Own Categories
subtitle: What a Month of Messages Was About, Published Without a Single Message
description: Volunteer architecture for a nonprofit AI chat platform — a monthly ELT pipeline (Python, dbt, PostgreSQL, DuckDB) that clusters embeddings into subjects, has a local open-weight model name them, and publishes only counts that ten different people stand behind; a 27 GB export runs end to end in about six minutes
category: AI Solutions
heroTitle: APG Insight — A Monthly Pipeline That Finds Its Own Categories
heroSubtitle: Subjects Discovered From the Data, Counts Withheld Below Ten People, Every Secret With One Reader
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
challenge: The ministry wanted to know what the people using its chat platform actually talk about, month by month. There is no list of subjects to count against, the source is a very large export of private conversations, and the people who wrote them were promised their data would never be sold or shared. The pipeline had to find the subjects itself, run unattended one month at a time, and publish something the public can read without ever exposing a message, a name or a small group.
solution: Each monthly run reads only the requested month, either from PostgreSQL or by streaming a local SQL dump that is never restored, and drops anything the platform marked redacted or automated. Sentence embeddings are clustered into micro-topics and merged into categories; a local open-weight model names each one and rejects groups that are not subjects. Every message is then assigned to its nearest categories, the result is frozen as a versioned set, and dbt publishes the marts. A separate public layer exports only what is public, and a Next.js portal reads it through a read-only API.
results: A 27 GB export of about 5.14 million rows runs end to end in about six minutes on a 24 GB laptop, because the file is streamed once and rows outside the month are never kept. A dbt step that ran 4 hours 20 minutes without finishing on the first real month now builds in about a minute. The repository carries 120 architecture decision records and 100% branch coverage on more than 4,500 tests, and a Helm and Kustomize install with KEDA-scaled stage workers is exercised on minikube against a synthetic fixture. The portal is built and tested but not deployed yet.
techStack: Python with SQLAlchemy adapters behind repository interfaces; dbt on PostgreSQL for the warehouse and on DuckDB for offline dump runs; sentence-transformer embeddings and a local Qwen3-4B model for naming; a stage queue with KEDA-scaled workers on Kubernetes; a FastAPI portal API with two read-only database roles; a Next.js public site; Redis for the public cache.
architecture: Each secret has exactly one reader. The portal holds no store credential and no source-database setting and refuses to start if handed one, so a compromised portal still cannot reach the pipeline or the store that holds text. Privacy is a rule the data cannot break rather than a promise the code keeps. A cell is shown only when ten different people stand behind it, a hidden cell takes its smallest visible neighbour with it so subtraction cannot recover it, and a category's public name has to be earned by words ten people actually typed. The public run buttons sit behind a kill switch that starts off, and reads as off whenever it cannot be read.
lessons: Slow queries only show at full size. The four-hour dbt step hid behind a 25,000-message slice that held no flagged message; the fix was a join in place of a subquery membership test, and a test now fails if that shape returns. Writing every decision down as an ADR, including the ones that record "measured, left as it is", is what keeps a month-by-month pipeline honest. The source repository is private, and nothing here is a claim about a deployed system.
---

# APG Insight — A Monthly Pipeline That Finds Its Own Categories

## Project Overview

Volunteer architecture for a nonprofit AI chat platform. APG Insight finds what a month of messages was about, assigns every eligible message to versioned categories, and publishes monthly marts, a one-page report and a public portal. The source repository is private; this page describes the design, not the data.

## The Challenge

- **No fixed list of subjects.** Categories have to be discovered each month, and their quality varies, so every run records quality findings instead of pretending there is a taxonomy
- **A very large, private source.** The reference month is a 27 GB export of about 5.14 million rows that must never be restored, committed or copied into a ticket
- **A public answer with no exposure.** The public site may show counts and earned names, never a message, a name or a small group

## Technical Solution

### Discover, assign, freeze
A bounded sample of distinct texts is clustered into micro-topics and merged into categories. A local open-weight model writes each headline and rejects groups that are not subjects. Every message is assigned to its nearest categories with a confidence, and a message no subject claims goes to a non-topical bucket. The result is frozen as an immutable, versioned set.

### Two source modes, one contract
Database mode reads PostgreSQL and loads assignments idempotently. SQL-dump mode parses the file locally in a single streaming pass, spills to disk under memory pressure, builds the marts in an isolated DuckDB and exports a review file, without ever contacting or restoring the source.

### Privacy as rules in the data
Counts under ten different people are withheld, a hidden cell hides its smallest visible neighbour, and a category's name must be earned by words ten people typed. Answers to a visitor's question are rounded to the nearest five. Artifacts that carry a model headline or a message are never exported.

### A cluster-ready install
A Helm chart and Kustomize overlays run each stage as a KEDA-scaled worker fed by a queue. The public portal API holds two read-only roles and nothing else.

## Keeping It Honest

120 architecture decision records, 100% branch coverage enforced by a gate that runs before every push, and an install test that runs the whole system on minikube against a synthetic fixture. Several decisions record what was measured and deliberately left alone.

## Key Learnings

Performance problems in a data pipeline hide behind small fixtures, and privacy holds best as a rule the data cannot break. The portal is built and tested but not yet deployed.
