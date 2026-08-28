---
title: Enterprise Microservices Suite
subtitle: Moving Lima One Capital's Integration Layer from Mulesoft to NestJS
description: Two years replacing a mortgage lender's legacy Mulesoft integration layer with NestJS microservices (gRPC and REST) on PostgreSQL, and leading full-stack work on the broker platform — credit-report and pricing-engine integrations included
category: Enterprise Development
heroTitle: Enterprise Microservices Suite
heroSubtitle: From Mulesoft to NestJS, Without Stopping the Lending Business
technologies:
  - NestJS
  - TypeScript
  - PostgreSQL
  - gRPC
  - REST APIs
  - .NET
  - ReactJS
  - Microservices
  - Enterprise Integration
duration: 2 years (2023–2025)
status: completed
challenge: Lima One Capital's integrations with credit bureaus, pricing, and partner systems ran through a legacy Mulesoft layer that was expensive to change and opaque to the engineers who depended on it. Every new broker-platform feature that touched an external system meant working around it, and the team wanted an integration layer it could own, test, and extend itself.
solution: Architected and delivered a suite of NestJS microservices with PostgreSQL, exposing gRPC for service-to-service calls and REST for external clients, and migrated the legacy Mulesoft APIs onto it incrementally so lending operations never paused. In parallel, led full-stack development on the mortgage broker platform (.NET and ReactJS), including the credit-report integration and the pricing-engine APIs that sit at the core of loan origination.
results: The Mulesoft layer was retired in favour of services the team owns end to end — typed contracts, tests, and deployments they control — and the broker platform gained the credit-reporting and pricing integrations it needed. The same engagement produced the ETL pipelines connecting HubSpot, SharePoint, Snowflake, and Salesforce, and Snow Portal, the Snowflake job scheduler built as an Alteryx alternative.
techStack: NestJS and TypeScript for the services, PostgreSQL per service, gRPC with Protocol Buffers between services, REST for external integrations, .NET Web APIs and ReactJS for the broker platform, credit-bureau and pricing-engine API integrations.
architecture: Microservices with explicit service boundaries around lending workflows, database-per-service, gRPC internally and a REST edge externally, and an incremental strangler-style migration off Mulesoft — each legacy API replaced behind a stable contract before the old route was switched off.
lessons: An integration layer nobody on the team can read is a liability no matter how well it works. Migrating it incrementally — one contract at a time, behind stable interfaces — is slower to start and far safer to finish than a cut-over, and it leaves the team with something they can actually maintain.
---

# Enterprise Microservices Suite

## Project Overview

Two years at Lima One Capital, a Greenville, SC mortgage lender, moving the integration layer from a legacy Mulesoft platform to NestJS microservices the engineering team could own, and leading full-stack work on the broker platform that depended on it.

## The Challenge

- **An opaque integration layer.** Credit-bureau, pricing, and partner integrations ran through Mulesoft. Changing them was slow and expensive, and the engineers who depended on them couldn't read or test them.
- **Broker-platform features blocked on it.** Loan-origination work on the .NET/React broker platform kept waiting on integration changes it couldn't make itself.
- **No pause available.** Lending operations run continuously; the migration had to happen underneath a live business.

## Technical Solution

### NestJS microservices on PostgreSQL

A suite of TypeScript services with clear boundaries around lending workflows, a PostgreSQL database per service, gRPC (Protocol Buffers) for service-to-service calls, and a REST edge for external clients and partners.

### Incremental migration off Mulesoft

Each legacy Mulesoft API was re-implemented behind a stable contract, verified against the existing behaviour, and only then switched over — a strangler-style migration rather than a cut-over, so no lending workflow ever depended on a half-finished layer.

### Broker platform

Led full-stack development on the mortgage broker platform using .NET Web APIs and ReactJS, including the credit-report integration and the pricing-engine APIs at the core of loan origination.

### Data and automation alongside it

The same engagement produced [ETL pipelines across HubSpot, SharePoint, Snowflake, and Salesforce](/work/enterprise-etl-integrations) and [Snow Portal](/work/snow-portal-job-scheduler), a Snowflake job scheduler built as an Alteryx alternative.

## Results

- The Mulesoft layer was retired in favour of services the team owns — typed contracts, tests, and deployments under their control.
- The broker platform gained the credit-reporting and pricing integrations it needed.
- The migration completed without interrupting lending operations.

## Key Learnings

- **Ownership beats elegance.** An integration layer nobody on the team can read is a liability regardless of how well it runs.
- **Strangle, don't cut over.** One contract at a time behind stable interfaces is slower to start and much safer to finish.
- **Service boundaries follow the business.** Splitting along lending workflows — not technical layers — is what kept the services independently changeable.
