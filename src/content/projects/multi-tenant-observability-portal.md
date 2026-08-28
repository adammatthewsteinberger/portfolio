---
title: Multi-Tenant Observability Portal
subtitle: Three Data Planes and an Honesty Contract on Every Payload
description: Customer-facing observability platform that pulls logs, traces, cost, and health back from an APM service, a log-analytics vendor, and the cloud control plane into one portal — a hot streaming plane, a warm analytical plane, and a federated plane, with every payload tagged live, near_realtime, search, or delayed so the UI can never imply data is fresher than it is
category: Enterprise Development
heroTitle: Multi-Tenant Observability Portal
heroSubtitle: Sub-Second Streaming, Analytical Queries, Federated Vendor APIs — Freshness Declared, Not Implied
technologies:
  - Python
  - Azure Event Hubs
  - Azure Data Explorer (KQL)
  - Azure Web PubSub
  - Application Insights
  - Azure Cost Management
  - Azure Resource Graph
  - SAML 2.0
  - Entra ID
  - KEDA
  - Application Gateway
  - MCP
  - vibey-bootstrap
duration: Vizius engagement, 2026 — lead
status: completed
challenge: Telemetry from 17+ repositories was flowing out through the shared platform library into an APM service, a log-analytics vendor, and the cloud control plane — but customers had no single place to see their own logs, traces, cost, and health, and every dashboard quietly blurred the line between "live" and "an hour old."
solution: The deliberate inverse of the platform library — where that library ships telemetry out, this platform pulls it back in — a three-plane architecture with a hot plane (event streaming → workers → real-time push to the browser plus streaming ingestion into an analytics database, sub-second), a warm plane (fast analytical queries with trace correlation via joins), and a federated plane (APM, vendor search API, cost management, resource graph). Five surfaces — CLI, REST API, HMAC-verified webhooks, MCP server, and SDK — over one shared use-case core.
results: Every payload carries a freshness tag — live, near_realtime, search, or delayed — so the UI can never imply data is fresher than it is. SAML 2.0 SSO as a second trusted issuer alongside Entra ID, event-driven autoscaling, application-gateway ingress, and a run of CI work that took the quality-gate suite from red to green. Roughly 8.8k lines of code plus 2.9k of IaC.
techStack: Dogfoods the shared platform library end to end — structured logging with correlation IDs, configuration hydration, transport registry, request middleware with automatic 5xx alerting, tiered alerts and global exception hooks, managed-identity credentials, transient-fault retry, token-bucket rate limiting sized to vendor API limits, and HMAC webhook verification with deduplication.
architecture: The honesty contract is the design. Each of the three planes has a different latency and a different truth, and instead of hiding that behind one dashboard, the API makes the freshness class part of the payload contract. Consumers — including the MCP server and SDK — can display, cache, or alert on data according to what it actually is.
lessons: An observability tool that overstates freshness trains people to trust it exactly when it is wrong. Declaring the freshness class in the payload is a small design choice that changes how every consumer behaves.
execProblem: "A customer asks whether their service is healthy, and the honest answer is that it depends which dashboard you look at."
execOutcome: "One portal pulls logs, traces, cost, and health from three sources into a single view — and every number is labelled with how fresh it actually is, so the screen can never imply data is newer than it is."
---

# Multi-Tenant Observability Portal

## Project Overview

The deliberate inverse of the shared platform library: where [vibey-bootstrap](/open-source) *ships* telemetry out of 17+ repositories, this platform *pulls* logs, traces, cost, and health back in — from an APM service, a log-analytics vendor, and the cloud control plane — into one customer-facing portal. Lead; ~8.8k lines of code plus 2.9k of IaC.

## Three Planes, One Honesty Contract

- **Hot plane** — event streaming → workers → real-time push to the browser, plus streaming ingestion into an analytics database. Sub-second.
- **Warm plane** — fast analytical queries with trace correlation via joins.
- **Federated plane** — APM, vendor search API, cost management, resource graph.

**Every payload carries a freshness tag** — `live`, `near_realtime`, `search`, or `delayed` — so the UI can never imply data is fresher than it is. That is the design decision worth calling out: the latency class is part of the contract, not a footnote.

## Five Surfaces Over One Core

CLI, REST API, HMAC-verified webhooks, MCP server, and SDK — so behavior is identical regardless of entry point. The same five-surface pattern appears across four platforms in this portfolio.

## Dogfooding the Platform Library

Structured logging with correlation IDs, configuration hydration, transport registry, request middleware with automatic 5xx alerting, tiered alerts and global exception hooks, managed-identity credentials, transient-fault retry, token-bucket rate limiting sized to vendor API limits, and HMAC webhook verification with deduplication — all from the shared library rather than re-implemented.

## Platform

SAML 2.0 SSO as a second trusted issuer alongside Entra ID, event-driven autoscaling, application-gateway ingress, and a run of CI work that took the quality-gate suite from red to green.

## Key Learnings

An observability tool that overstates freshness trains people to trust it exactly when it is wrong. Declaring the freshness class in the payload is a small design choice that changes how every consumer — human or agent — behaves.
