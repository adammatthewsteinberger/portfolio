---
title: AI Governance Gateway
subtitle: One Policy-Enforced API in Front of Every Model Vendor
description: Centralized, policy-enforcing gateway that puts the full Azure AI surface plus Anthropic, OpenAI/Codex, Cursor, Grok, and Gemini behind one governed, OpenAI-compatible client — with per-project cost caps, multi-unit rate limiting, a tamper-evident audit trail, and zero API keys anywhere in the path
category: AI Solutions
heroTitle: AI Governance Gateway
heroSubtitle: Five Vendors, One Governed Surface, No Credentials in the Path
technologies:
  - Python
  - FastAPI
  - Azure OpenAI / Foundry
  - Anthropic Claude
  - OpenAI / Codex
  - Gemini
  - Redis
  - Azure Service Bus
  - Entra ID
  - Workload Identity
  - Private AKS
  - KEDA
  - GitOps
  - MCP
  - Next.js 15
duration: Vizius engagement, 2026 — sole architect
status: completed
challenge: Every product team was calling AI services its own way — its own credentials, its own retry logic, no shared view of spend, and no way to answer "which project made this call, under which policy, and what did it cost?" Adding a new vendor meant every team re-solving auth, rate limits, and cost tracking. Nothing was auditable end to end, and a runaway loop in one service could exhaust a shared quota for everyone.
solution: A single governed gateway with four request paths — synchronous inference, durable async over a message queue, multi-agent orchestration, and typed service proxies — over one governance pipeline (resolve connection → evaluate policy → rate limit → invoke adapter → compute cost → write usage record). An OpenAI-compatible surface makes migration a two-line change; runtime vendor dispatch spans five model providers, and transport switches at runtime between a managed AI platform and direct vendor APIs. Memory, artifacts, chat sessions, a vector-store registry with pluggable RAG backends, a web-search registry, and a deep-research orchestration are first-class governed resources.
results: Three separate product teams were migrated onto the gateway — embeddings, document intelligence, search-index lifecycle, and LLM calls cut over — and their app-side credentials and role assignments were then deleted from infrastructure. Every request, control-plane mutation, and auth denial is HMAC-signed and hash-chained into a write-once store with a verification endpoint. Roughly 54,000 lines across 581 files, deployed as 9 independently scaling pods on private AKS.
techStack: Python service layer with adapters per vendor; Redis for multi-unit rate limiting (tokens, pages, characters, seconds, calls); message-queue-backed async path; Entra ID app-role gating with interactive sign-in for users and federated workload identity for services; a Python SDK, a CLI, and an MCP server for IDE/agent integration; a Next.js 15 admin portal as the human control plane; private endpoints throughout, secrets via CSI driver + workload identity, GitOps delivery, automated TLS.
architecture: Policy is data, not code — per-project allowlists and allow/deny/fallback rules per model and service hot-reload in about thirty seconds. Cost is attributed per call in USD and enforced as a spend cap, which turns a denial-of-wallet attack into a policy denial. Security events fail closed. Agent sandboxing runs subprocesses with secret-scrubbed environments, egress network policy, and instance-metadata blocking; outbound webhooks pass SSRF validation; optional content-safety input guardrails and authenticated MCP transport round it out — all mapped to OWASP LLM / Agentic Top 10 and NIST AI RMF in a dedicated threat model. Retired services return structured migration guidance rather than opaque failures.
lessons: The AI is a commodity; the governance is the product. Once one client wraps every vendor, "add a provider" stops being a cross-team project and becomes one adapter class. And the audit trail only earns trust if it stores metadata and body hashes rather than bodies — auditable without holding anyone's PII.
---

# AI Governance Gateway

## Project Overview

The strategic goal was simple to state and hard to do: make every AI call from every team flow through one system, subject to the same policy, the same cost control, and the same audit — without slowing anyone down or making them learn a new API.

The gateway proxies the entire Azure AI service surface plus Anthropic, OpenAI/Codex, Cursor, xAI Grok, and Google Gemini behind a single OpenAI-compatible client. Migrating an existing service is a two-line change. Sole architect; roughly 54,000 lines across 581 files.

## The Challenge

- **Credential sprawl**: each product team held its own AI keys and role assignments — the exact thing a breach report lists first
- **No cost attribution**: nobody could say which project spent what, or stop a runaway loop before it drained a shared quota
- **No audit**: requests, policy decisions, and denials weren't recorded anywhere tamper-evident
- **Vendor lock-in per team**: switching or adding a model provider meant every team re-solving auth, retries, and rate limits

## Technical Solution

### One governance pipeline, four request paths
Synchronous inference, durable async via message queue, multi-agent orchestration, and typed service proxies all pass through the same pipeline: resolve connection → evaluate policy → rate limit → invoke adapter → compute cost → write usage record. There is no path around it.

### Multi-vendor by design
An OpenAI-compatible surface with runtime vendor dispatch across five model providers. Transport switches at runtime between a managed AI platform and direct vendor APIs, so a vendor incident is a configuration change, not an outage.

### Governed platform stores
Memory, artifacts, chat sessions, a vector-store registry with pluggable RAG backends (four implementations), a web-search provider registry, and a deep-research orchestration — decompose → search and retrieve → verify → synthesize with citations — are all governed resources under the same policy and cost model.

### Controls that actually enforce
- Per-project allowlists; allow / deny / fallback policy per model and service, hot-reloaded in ~30 seconds
- Multi-unit rate limiting in Redis — tokens, pages, characters, seconds, and calls
- Per-call USD cost attribution with **enforced spend caps** as a denial-of-wallet control
- **Tamper-evident audit**: every request, control-plane mutation, and auth denial HMAC-signed and hash-chained into a write-once store, with a verification endpoint; security events fail closed

### Zero-credential authentication
Entra ID tokens with app-role gating on every call. Users sign in interactively; workloads use federated workload identity. There are no API keys anywhere in the path.

### AI-safety hardening
Agent sandboxing with secret-scrubbed subprocess environments, egress network policy and instance-metadata blocking, SSRF validation on webhooks, optional content-safety input guardrails, and authenticated MCP transport — mapped to OWASP LLM / Agentic Top 10 and NIST AI RMF, documented in a dedicated threat model.

### Three front-ends over one surface
A Python SDK, a terminal CLI, and an MCP server for IDE and agent integration, plus a Next.js 15 admin portal as the human control plane. Retired services return structured migration guidance rather than failing opaquely; restricted capabilities gate behind approval flows.

## Deployment

Private AKS, 9 independently scaling pods (HPA plus event-driven autoscaling), all Azure connectivity over private endpoints, secrets via CSI driver and workload identity, GitOps continuous delivery, automated TLS.

## Results and Impact

- **Three product teams migrated** — embeddings, document intelligence, search-index lifecycle, and LLM calls cut over, with their app-side credentials and role assignments then *retired* from infrastructure
- Every AI call is now attributable to a project, a policy decision, and a cost
- Adding a vendor is one adapter class, not a cross-team project
- Documented in a three-tier package: a 43-page technical design, a 10-page executive summary, and a one-page one-sheet

## Key Learnings

Governance only works if the governed path is also the easiest path. The OpenAI-compatible surface and the two-line migration mattered more to adoption than any policy feature. And the moment the gateway existed, the conversation with each team changed from "please rotate your keys" to "delete them."
