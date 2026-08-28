---
title: Identity Governance as Code
subtitle: Two Control Planes That Reconcile Tenant State from Git
description: Two independent control planes — a Kubernetes operator for enterprise directory governance and a bidirectional sync platform for an identity provider's governance surface — that declare tenant state in Git, continuously reconcile drift, auto-fix what is safe, and put a human in front of anything destructive
category: Enterprise Development
heroTitle: Identity Governance as Code
heroSubtitle: Declared in Git, Continuously Reconciled, Destructive Drift Requires a Human
technologies:
  - Python
  - kopf (Kubernetes operator)
  - Okta (core, IGA, Workflows)
  - Microsoft Entra ID
  - Microsoft Graph
  - Workload Identity Federation
  - Private AKS
  - GitOps
  - MCP
  - TypeScript SDK
  - Next.js
  - Kyverno
  - Cosign
duration: Vizius engagement, 2026 — sole author of both platforms
status: completed
challenge: A SOX-regulated enterprise's identity governance lived in consoles and low-code workflow cards. Nobody could diff it, review it, or roll it back; drift accumulated silently; and the automation that did exist held long-lived per-tenant secrets. The thesis was simple — tenant governance state should be declared in Git, continuously reconciled, and destructive change should require a human — but two different governance surfaces needed two different control planes to prove it.
solution: Platform one is a Kubernetes operator (kopf) that reconciles enterprise directory and governance state against declared custom resources, applies trivial fixes automatically, and uses an LLM to draft a pull request for anything requiring judgment. Platform two is a bidirectional sync and drift-reconciliation engine for an identity provider's governance surface — 40 managed resource kinds handled kind-agnostically through six addressing patterns — with drift classification, human-in-the-loop gating on destructive change, and point-in-time reversion. Both ship five surfaces (operator or controller, REST API, CLI, MCP server, SDK) over one core.
results: Fully secretless multi-tenant authentication on the operator — a multi-tenant application with federated credentials exchanges a pod service-account token for a per-customer directory token, with zero stored per-tenant secrets. On the IdP platform, safe drift auto-remediates while destructive drift opens a ticket, raises a pull request, and blocks on an approval annotation; pre/post snapshots give point-in-time reversion; logs ship to both an APM platform and a SIEM. A companion versioned, idempotent sync API replaced an unmaintainable low-code workflow for 114+ directory groups. Twenty-four infrastructure policy findings cleared and a self-review closed a dev-portal auth bypass, a path-traversal check, SSRF on tenant identifiers, and a non-constant-time secret comparison.
techStack: Python operator on kopf with generated CRD manifests; one core domain library powering CLI, controller pods, REST control plane, and MCP server; a TypeScript SDK and Next.js admin portal; an IaC change-request ticketing surface; encrypted storage for API and agent-pool tokens; DevSecOps pipeline with container and IaC scanning, SAST, keyless image signing, and a policy admission controller; GitOps delivery with multi-tenancy lockdown and a shadow mode.
architecture: The design decision that let the resource count scale without the orchestration layer growing was addressing patterns — flat structured, opaque-hash for binary workflow bundles, adopt-only, singleton, one-level nested, and two-level nested. Forty resource kinds spanning governance, core directory, and admin configuration are handled through those six patterns rather than forty bespoke handlers. A read-only monitoring surface for runtime and audit artifacts draws an explicit boundary between "governed" and "observed" — things that should never be reconciled as desired state. AI authoring is grounded in scraped vendor API documentation and is propose-only by design, with schema-constrained structured output, prompt-injection guardrails, an enforced action allowlist, and RAG over a governance corpus.
lessons: Governance as code is a people problem wearing a technical costume — the win is not the reconciler, it's that every change now has a diff, a reviewer, and a rollback. Making the AI propose-only was not a limitation; it was the reason the security team let it near the tenant at all.
execProblem: "In a SOX-regulated enterprise, who has access to what is scattered across consoles, changed by hand, and impossible to prove for last quarter."
execOutcome: "Access is declared in Git and continuously reconciled across 40 resource kinds. Safe drift is fixed automatically, anything destructive waits for a human, and any point in time can be reverted to — with the audit trail the regulator asks for."
---

# Identity Governance as Code

## Project Overview

Two independent control planes applying one thesis to two different governance surfaces: **tenant governance state should be declared in Git, continuously reconciled, and destructive drift should require a human.** Both were built for a SOX-regulated enterprise engagement covering roughly 5,700 workforce identities. Sole author on both.

## Platform 1 — Directory Governance Operator

*~8.4k lines of code plus 2.7k of IaC.*

A Kubernetes operator that continuously reconciles enterprise directory and governance state against declared custom resources, applies trivial fixes automatically, and uses an LLM to draft a pull request for anything that requires judgment.

- **Fully secretless multi-tenant auth** — a multi-tenant application with federated credentials exchanges a pod service-account token for a per-customer directory token. Zero stored per-tenant secrets.
- **AI remediation engine** — schema-constrained structured output, prompt-injection guardrails, an enforced action allowlist, and RAG retrieval over a governance corpus. Propose-only.
- **Five delivery surfaces** — operator, REST API, CLI, MCP server, TypeScript SDK — plus a Next.js admin portal and an IaC change-request ticketing system.
- **DevSecOps pipeline** — container and IaC scanning, SAST, keyless image signing, policy admission controller; GitOps delivery with multi-tenancy lockdown and a shadow mode.
- **Security review of my own work** — closed a dev-portal authentication bypass, added auth to detail routes, fixed a path-traversal check, added SSRF validation on tenant identifiers, converted secret comparison to constant-time, and made the MCP surface fail closed when its credential is unset.
- **24 infrastructure policy findings cleared** (cluster local-admin disabled, ephemeral OS disks, upgrade channels, policy add-on, CSI auto-rotation, TLS enforcement, registry content trust and retention, deny-by-default key vault network ACLs) with documented justifications for the ~10 intentionally skipped.

## Platform 2 — Identity Provider Governance Platform

*~29k lines across 414 files.*

Bidirectional sync and continuous drift reconciliation for an identity provider's governance surface, with human-in-the-loop gating on destructive change and point-in-time reversion.

- **40 managed resource kinds** across governance, core directory, and admin configuration — handled kind-agnostically through **six addressing patterns**: flat structured, opaque-hash for binary workflow bundles, adopt-only, singleton, one-level nested, two-level nested. This is the design decision that let the resource count scale without the orchestration layer growing.
- **Drift classification** — safe drift auto-remediates; destructive drift opens a ticket, raises a pull request, and blocks on a human approval annotation.
- **Point-in-time reversion** via pre/post snapshots.
- **Dual log shipping** to an APM platform and a SIEM.
- **A read-only monitoring surface** for runtime and audit artifacts that intentionally should *not* be reconciled as desired state — an explicit boundary between "governed" and "observed."
- **AI authoring grounded in scraped vendor API documentation**, propose-only by design.
- One core domain library powering CLI, controller pods, REST control plane, and MCP server; strict type checking taken from 116 errors to zero; encrypted storage for API and agent-pool tokens; generated and committed operator CRD manifests.

## Supporting Identity Work

- A **directory-to-IdP group synchronization service** for 114+ groups, implemented as a versioned API the no-code workflow platform calls — rather than unmaintainable low-code cards — with idempotent re-runs tracked in a state table and both dynamic-filter and static-list modes.
- A **deterministic documentation pipeline** turning iPaaS workflow exports and table dumps into per-source markdown, rendered diagrams (PNG + PDF), an indexed catalog, and a narrative executive summary — explicitly **no LLM calls**, so output is reproducible and client data never leaves the machine.
- **Operational recovery tooling**: audited group-membership reversion with generated change plans, dry-run support, and CSV audit trails.
- **Advisory deliverables**: a 20-page identity-governance market survey, an 11-page platform decision report with executive recommendation, a 14-page API/SDK/MCP coverage assessment across eight HR, iPaaS, SIEM, identity, and governance platforms, GxP-classified functional specifications for employee and contractor lifecycles, a SOX-to-IAM risk-reduction mapping, and a governance technology inventory.

## Key Learnings

Governance as code is a people problem wearing a technical costume. The reconciler is the easy part; the win is that every change now has a diff, a reviewer, and a rollback. And keeping the AI propose-only was not a compromise — it was the reason it was allowed near a regulated tenant at all.
