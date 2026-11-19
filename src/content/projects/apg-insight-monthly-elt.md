---
title: APG Insight — Topic Discovery for a Nonprofit AI Chat
subtitle: Finding What a Month of Messages Was About, Then Publishing Only What Ten People Stand Behind
description: Volunteer architecture for a nonprofit AI chat platform — a monthly pipeline (Python, dbt, PostgreSQL, DuckDB) that discovers topics by clustering multilingual embeddings, has a local open-weight model judge and name each one, goes three levels deep into subtopics, scores tone with a teacher and student model, and answers a visitor's question from the data under a ten-person rule
category: AI Solutions
heroTitle: APG Insight — Topic Discovery for a Nonprofit AI Chat
heroSubtitle: Topics Discovered by Machine Learning, Named by a Local Model, Published Only When Ten People Stand Behind Them
technologies:
  - Python
  - dbt
  - PostgreSQL
  - DuckDB
  - Sentence embeddings
  - k-means
  - Qwen3-4B (local)
  - scikit-learn
  - Next.js
  - FastAPI
  - Helm
  - Kustomize
  - KEDA
  - Redis
duration: Volunteer, 2026 – present
status: ongoing
challenge: The ministry wanted to know what the people using its AI chat actually talk about, month by month. There is no list of subjects to count against and the chat is multilingual, so the subjects have to be found in the data and stay recognisable from one month to the next. The source is a very large export of private conversations whose authors were promised their data would never be sold or shared. The pipeline had to find the topics itself, run unattended one month at a time, and publish something the public can read without exposing a message, a name or a small group.
solution: Each monthly run reads only the requested month, either from PostgreSQL or by streaming a local SQL dump that is never restored, and drops anything the platform marked redacted or automated. Multilingual sentence embeddings of a stratified sample are clustered into 40 micro-topics and merged into 12 categories, none larger than a fifth of the sample. A local open-weight model (Qwen3-4B) reads each category's top words and five sample messages, judges whether it is a real subject, and writes its headline. Every message then joins its nearest category and up to two more it sits close to, and a message no subject claims goes to a non-topical bucket. Large, stable categories are split again into named subtopics up to three levels deep. An optional tone stage scores messages from Hostile to Friendly, with the local model as the teacher on a sample and a trained classifier as the student for the rest. dbt publishes versioned marts, and a separate public layer feeds a read-only portal API and a Next.js site.
results: Discovery and assignment for 120,901 messages take about two minutes on a 24 GB laptop, and a 27 GB SQL dump of 5.14 million rows is read in about 2.5 minutes without being restored. Categories keep their keys from run to run, because each run's clusters are matched to the last run's by centroid, and a stability check refits on subsamples and flags any category that does not reproduce. A visitor's question is answered from the month's own message vectors, split into topics that come from the data, with counts rounded to five and every cell under ten people withheld. The repository carries 120 architecture decision records and 100% branch coverage on more than 4,500 tests, and a queue-driven install is exercised on minikube, including stopping a pod mid-task. The portal is built and tested but not deployed yet.
techStack: Python with SQLAlchemy adapters behind repository interfaces; sentence-transformer embeddings, k-means on PCA-projected vectors, a capped merge, Hungarian-matched stability checks and centroid-matched category keys; a local Qwen3-4B model for naming and tone; dbt on PostgreSQL for the warehouse and on DuckDB for offline dump runs; a stage queue and control-plane database with KEDA-scaled workers on Kubernetes (Helm, Kustomize); a FastAPI portal API with two read-only database roles; a Next.js public site; Redis for the public cache.
architecture: The pipeline is a modular monolith with onion boundaries, enforced by tests that fail on any layering or one-class-per-file violation. Discovery and publication are separate responsibilities, so a month can be rediscovered without touching what was published. Categories are versioned, and a rerun replaces only its own version inside its own date window. The live month reruns every two hours as a version that is replaced in place. Privacy is a rule the data cannot break. A count is shown only when ten different people stand behind it, a hidden cell takes its smallest visible neighbour with it so subtraction cannot recover it, and a category's public name must be earned by words ten people actually typed. Each secret has exactly one reader, so a compromised portal still cannot reach the pipeline or the store that holds text, and the public run buttons sit behind a kill switch that starts off.
lessons: Slow queries only show at full size. A dbt step that ran 4 hours 20 minutes without finishing on the first real month hid behind a 25,000-message slice with no flagged message; the fix was a join in place of a subquery membership test, it now builds in about a minute, and a test fails if the shape returns. A model's headline is a claim about the data, so every one is checked against what people actually typed before it is public. Writing every decision down as an ADR, including the ones that record "measured, left as it is", is what keeps a month-by-month pipeline honest. The source repository is private, and nothing here is a claim about a deployed system.
---

# APG Insight — Topic Discovery for a Nonprofit AI Chat

## Project Overview

Volunteer architecture for a nonprofit AI chat platform. APG Insight works out what people talk about in the chat, month by month, with no list of subjects written in advance. It assigns every eligible message to versioned, data-derived categories and publishes monthly marts, a one-page report and a public portal. The source repository is private; this page describes the design, not the data.

## The Challenge

- **No fixed list of subjects, and many languages.** Topics have to be discovered each month, and they must stay recognisable from one month to the next so a chart can follow them
- **A very large, private source.** The reference month is a 27 GB export of about 5.14 million rows that must never be restored, committed or copied into a ticket
- **A public answer with no exposure.** The public site may show counts and earned names, never a message, a name or a small group

## Technical Solution

### Discovering topics
A stratified sample of distinct texts is embedded with a multilingual model and clustered into 40 micro-topics, then merged down to 12 categories with no category allowed more than a fifth of the sample. Each category is checked for stability by refitting on subsamples and matching clusters with the Hungarian algorithm. A local open-weight model reads each category's top words and five sample messages, judges whether it is a subject at all, and writes the headline. Categories judged not to be subjects are dropped.

### Assigning every message
Every distinct text joins its nearest category and up to two more it sits inside the calibrated radius of. A message no subject claims goes to a reserved non-topical bucket, and a low-confidence one stays unknown. The result is frozen as an immutable, versioned category set, and each category keeps its key across runs because its centroid is matched to the previous run's.

### Depth, tone and conversations
Every run splits each large, stable category into named subtopics, up to three levels deep, naming a child by the words particular to it. An optional tone stage scores messages from Hostile to Friendly on two axes, toward the ministry and about each category's subject. A local model scores a sample as the teacher, a classifier trained on its scores labels the rest as the student, and the student is checked out of fold. A category the student cannot judge is withheld, not guessed at. dbt traces conversations from message structure, so topic and tone also roll up per conversation.

### Two source modes, one contract
Database mode reads PostgreSQL and loads assignments idempotently. SQL-dump mode parses the file locally in a single streaming pass, spills to disk under memory pressure, builds the marts in an isolated DuckDB and exports a review file, without ever contacting or restoring the source.

### A portal that answers a question
A visitor asks what a month talked about. The question is embedded and matched against the month's saved message vectors, with the threshold read from the month itself, and the matches are split into topics by the same machinery that finds subtopics. Too few matches means "not enough data". The question never reaches a language model, a log or the control plane, and counts are rounded to the nearest five.

### A cluster-ready install
A Helm chart and Kustomize overlays run each stage as a KEDA-scaled worker fed by a queue, with the accelerated stages optionally running natively on a laptop against the cluster's queue. The public portal API holds two read-only roles and nothing else.

## Keeping It Honest

120 architecture decision records, 100% branch coverage enforced by a gate that runs before every push, a textbook for the codebase that is rebuilt from the code on every push, and an install test that runs the whole system on minikube against a synthetic fixture, including stopping a pod mid-task. Several decisions record what was measured and deliberately left alone.

## Key Learnings

Performance problems in a data pipeline hide behind small fixtures, a model's headline is a claim that has to be checked against the data, and privacy holds best as a rule the data cannot break. The portal is built and tested but not yet deployed.
