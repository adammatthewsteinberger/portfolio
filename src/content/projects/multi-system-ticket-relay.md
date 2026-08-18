---
title: Multi-System Ticket Relay
subtitle: N-Way Ticket Synchronization With No Privileged Hub
description: Multi-tenant relay that keeps an issue synchronized N-ways across ticketing systems around a symmetric schema — N-way version vectors, echo suppression, a conflict policy engine that fails to manual hold, edge HMAC verification, and a config-driven generic connector — verified by 653 tests at 93% coverage plus property, mutation, and chaos testing
category: Enterprise Development
heroTitle: Multi-System Ticket Relay
heroSubtitle: Version Vectors, Echo Suppression, and a Domain With Zero Third-Party Imports
technologies:
  - Python
  - Onion Architecture
  - import-linter
  - Hypothesis
  - mutmut
  - mypy --strict
  - HMAC Webhooks
  - Azure Key Vault
  - Private AKS
  - GitOps
  - Cosign
duration: Vizius engagement, 2026 — sole author
status: completed
challenge: Tickets lived in several systems at once — a client's, a vendor's, an internal one — and every "integration" so far had quietly picked one as the hub, which meant the other systems' edits either lost or looped. Echoes re-triggered syncs, conflicting edits silently overwrote each other, and every new ticketing system was another bespoke connector module.
solution: A multi-tenant relay built around a symmetric schema in which no system is architecturally privileged. The hard distributed-systems problems are solved explicitly rather than hand-waved — N-way version vectors, echo suppression, conflict detection with a policy engine, link-cycle detection, bounded twin-of-twin link resolution, worklog merging, and redelivery hardening. New ticketing systems onboard through a declarative, config-driven generic signed-webhook connector rather than a new Python module.
results: A genuinely pure domain layer with zero third-party imports, enforced by import-linter contracts in CI — value objects, entities, 14 port interfaces, pure algorithms. 653 passing tests at ~93% coverage against a 90% floor, strict type checking clean, lint clean, all import contracts held, plus property-based testing, mutation testing, and a bidirectional ping-pong chaos test proving convergence. A supply-chain self-review fixed a signing identity-pinning weakness and removed a pull-request-scoped OIDC credential. Roughly 20,500 lines across 275 files, documented in a 12-part architecture set with a STRIDE threat model.
techStack: Python with a strictly layered onion architecture; HMAC signature verification at the edge before any payload reaches a connector, with per-tenant secrets resolved through a vault-backed provider; a documented HMAC contract, normalization contract, and onboarding guide for the generic connector; keyless-signed images and GitOps delivery to private AKS.
architecture: The conflict policy engine supports authoritative-system auto-resolution and manual hold — and, notably, unimplemented strategies safely downgrade to manual hold rather than silently misapplying. That "fail to a human" stance repeats everywhere — layering is enforced mechanically, not merely intended; edge verification means a bad signature never reaches business logic; and convergence is proved by a chaos test, not assumed.
lessons: The value of a symmetric schema is that no team has to accept that their system is "secondary." The value of enforcing the domain's purity in CI is that it stays pure after the author leaves.
---

# Multi-System Ticket Relay

## Project Overview

A multi-tenant relay that keeps an issue synchronized N-ways across ticketing systems, built around a **symmetric schema in which no system is architecturally privileged as a hub**. Sole author; ~20,500 lines across 275 files.

## The Challenge

- Every previous integration had picked one system as the hub, so edits made anywhere else were lost or looped
- Echoes: a sync-caused update re-triggered a sync in the other direction
- Conflicting edits overwrote each other silently
- Every new ticketing system was another bespoke connector, another Python module to maintain

## Technical Solution

### A genuinely pure domain layer
Zero third-party imports in the domain — enforced by **import-linter contracts in CI**, not by code review. Value objects, entities, 14 port interfaces, and pure algorithms.

### The distributed-systems problems, solved explicitly
- **N-way version vectors** for causality
- **Echo suppression** so a relayed change never re-triggers itself
- **Conflict detection with a policy engine** — authoritative-system auto-resolution, manual hold, and *unimplemented strategies that safely downgrade to manual hold rather than silently misapplying*
- **Link-cycle detection** and bounded twin-of-twin link resolution
- **Worklog merging** and redelivery hardening

### Extensibility without new code
A declarative, config-driven **generic signed-webhook connector**: a new ticketing system onboards via configuration, backed by a documented HMAC contract, normalization contract, and onboarding guide.

### Edge-first security
HMAC signature verification happens at the edge before any payload reaches a connector, with per-tenant secrets resolved through a vault-backed provider. Layering is enforced, not merely intended.

## Verification

- **653 passing tests, ~93% coverage** against a 90% floor
- Strict type checking clean, lint clean, all import contracts held
- **Property-based testing** (Hypothesis), **mutation testing** (mutmut), and a **bidirectional ping-pong chaos test** proving convergence
- Supply-chain self-review: fixed a signing identity-pinning weakness and removed a pull-request-scoped OIDC credential

## Documentation

A 12-part architecture set (~57 pages) — system context, backend architecture, the mirroring engine (twin identity, loop suppression, deduplication, conflict resolution, field mapping), data/state/messaging, network and platform, integration surfaces and connectors, AI-gateway integration, identity/security/compliance with a **STRIDE threat model**, admin portal, reliability/observability/FinOps, and delivery/DevSecOps/governance — including a dedicated Segmentation Map that exists only to justify the decomposition. Also issued as a consolidated 31-page document.

## Key Learnings

The symmetric schema is as much a political decision as a technical one — no team has to accept that their system is "secondary." And enforcing the domain's purity in CI is what keeps it pure after the author leaves.
