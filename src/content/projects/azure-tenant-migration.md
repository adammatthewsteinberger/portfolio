---
title: Azure Tenant Migration
subtitle: Moving a Production App Between Azure Tenants Without Downtime
description: Migrated a production Python web application, its MongoDB data, and its CI/CD pipeline between Azure tenants using Bicep IaC and OIDC federated credentials
category: Enterprise Development
heroTitle: Azure Tenant Migration
heroSubtitle: Bicep IaC, MongoDB, and Zero-Downtime CI/CD Cutover
technologies:
  - Azure
  - Bicep
  - MongoDB
  - GitHub Actions
  - OIDC Federated Credentials
  - RBAC
duration: Vizius engagement, 2025-2026
status: completed
challenge: A client's production Python web application needed to move from one Azure tenant to another — a full re-platform of infrastructure, data, and CI/CD, with no acceptable window for extended downtime and no appetite for stored secrets sitting in a new GitHub org's pipeline configuration.
solution: Ported the application's Bicep infrastructure-as-code to target the new tenant, migrated the MongoDB data, stood up a new GitHub organization, and rebuilt the CI/CD pipelines on OIDC federated credentials with least-privilege RBAC instead of the long-lived service principal secrets the original setup used.
results: Completed the tenant migration with the application, its data, and its deployment pipeline all live in the new tenant, authenticated entirely through short-lived federated credentials rather than stored secrets. The new GitHub org's pipelines carry no long-lived Azure credentials at all.
techStack: Bicep for infrastructure-as-code, MongoDB for the application's data layer, GitHub Actions for CI/CD, Azure AD workload identity federation (OIDC) for pipeline authentication, and Azure RBAC scoped to the specific resources each pipeline actually touches.
architecture: Zero-credential CI/CD architecture — GitHub Actions authenticates to Azure via short-lived OIDC tokens exchanged for Azure AD access tokens, scoped by role assignment to exactly the resource groups a given pipeline needs. No client secrets, no certificates, no rotation schedule to maintain.
lessons: Tenant migrations are where you find out how much of your "infrastructure as code" was actually hand-configured in the portal. Rebuilding the pipeline on OIDC federation instead of copying the old secrets-based setup forward was more work up front and considerably less risk going forward — there's nothing to leak because there's nothing long-lived to steal.
---

# Azure Tenant Migration

## Project Overview

Moving a production application between Azure tenants is one of those projects that looks simple in a slide deck and is not simple in practice: infrastructure, data, DNS, secrets, and CI/CD all have to move together, in the right order, with the application staying up the whole time.

## The Challenge

- **No Acceptable Downtime Window**: The application had to stay available through the cutover
- **Data in Flight**: MongoDB data needed to migrate without loss or corruption
- **Secrets Sprawl**: The existing pipeline relied on long-lived service principal secrets stored in GitHub — exactly the kind of credential that shows up in a breach report
- **New Organizational Boundary**: The target tenant meant a new GitHub organization, new permission boundaries, and no assumption that old access carried over

## Technical Solution

### Infrastructure as Code, Ported Not Rebuilt
The application's Bicep templates were adapted to target the new tenant's subscription and resource naming conventions, rather than reconstructing the infrastructure by hand — the goal was a migration a future engineer could audit against source control, not a one-time manual effort nobody could reproduce.

### Zero-Credential Pipeline Authentication
Rather than copying the old service-principal-secret pattern into the new GitHub org, the CI/CD pipelines were rebuilt on **OIDC federated credentials**: GitHub Actions exchanges a short-lived OIDC token for an Azure AD access token at pipeline runtime, scoped by RBAC to exactly the resources that pipeline needs. There is no long-lived secret sitting in GitHub's settings for an attacker — or a departing employee — to walk away with.

### Data Migration
MongoDB data moved with a migration strategy designed around consistency checks before final cutover, rather than a single big-bang copy with no verification step.

## Results and Impact

- Application, data, and CI/CD pipeline all live in the new tenant
- Zero long-lived Azure credentials stored anywhere in the new GitHub organization
- A documented, Bicep-defined infrastructure baseline in the new tenant — not a one-off manual setup

## Key Learnings

Migrations like this are a forcing function: you find every place the "real" infrastructure diverged from what's in source control, and you find every credential that's been quietly living somewhere it shouldn't. Rebuilding the CI/CD trust model on OIDC federation instead of just relocating the old secrets was the right trade — more setup work, meaningfully less standing risk.
