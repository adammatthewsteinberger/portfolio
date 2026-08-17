---
title: Chat With Your Data — Kubernetes Conversion
subtitle: Migrating a Custom AI Chatbot from Bespoke Infra to Kubernetes-Native IaC
description: Migrated a production AI chatbot from hand-managed infrastructure to Kubernetes-native IaC — Helm, GitOps, centralized secrets, and real observability
category: AI Solutions
heroTitle: Chat With Your Data — Kubernetes Conversion
heroSubtitle: Helm, GitOps, Secrets Management, and Observability
technologies:
  - Kubernetes
  - Helm
  - GitOps
  - Azure
  - Observability
duration: Vizius engagement, 2025-2026
status: completed
challenge: A custom "chat with your data" AI chatbot was running in production on bespoke, hand-managed infrastructure — the kind of setup where deployment was a checklist a person followed rather than a repeatable process, secrets lived in more than one place, and there was no real answer to "how do we know if this is degraded right now."
solution: Migrated the chatbot to Kubernetes-native infrastructure as code — Helm charts for the deployment definition, GitOps for the deployment process itself, centralized secrets management instead of scattered configuration, and an observability stack that actually answers whether the service is healthy.
results: The chatbot now deploys the same way every time, from a Helm chart under source control, through a GitOps pipeline instead of a manual checklist. Secrets live in one managed place instead of several, and there's now a real observability answer to "is this healthy right now."
techStack: Kubernetes for orchestration, Helm for packaging and templated deployment, a GitOps pipeline for deployment automation, centralized secrets management, and an observability stack for metrics, logs, and alerting.
architecture: GitOps-driven deployment — the desired state lives in a Helm chart under source control; a GitOps controller reconciles the cluster to match it, so a deployment is a merged pull request, not a person running commands against production.
lessons: Bespoke infrastructure is often invisible technical debt right up until the person who built it is unavailable and something breaks. Converting to Helm and GitOps wasn't about chasing a trend — it was about making the deployment process legible to anyone on the team, not just the person who originally wired it together.
---

# Chat With Your Data — Kubernetes Conversion

## Project Overview

A working AI chatbot on infrastructure nobody else could safely operate is a liability wearing a demo. This project converted a production "chat with your data" chatbot from bespoke, hand-managed infrastructure to Kubernetes-native infrastructure as code.

## The Challenge

- **Tribal Knowledge Infrastructure**: Deployment was a checklist one person knew, not a repeatable process
- **Scattered Secrets**: Configuration and credentials lived in more than one place, with no single source of truth
- **No Real Observability**: There was no reliable way to answer "is this degraded right now" beyond someone noticing
- **Bus-Factor Risk**: The system's operational knowledge lived in one person's head

## Technical Solution

### Helm-Packaged Deployment
The chatbot's deployment definition moved into a Helm chart — a single, versioned, source-controlled description of what "correctly deployed" means, instead of a sequence of manual steps.

### GitOps Deployment Pipeline
Deployments now happen through a GitOps controller reconciling the cluster against the Helm chart in source control. A deployment is a merged pull request with a visible diff, not a person running `kubectl apply` from memory.

### Centralized Secrets and Real Observability
Secrets moved into a centralized, managed store instead of being scattered across configuration files and environment variables. An observability stack was added so the team has metrics, logs, and alerting instead of finding out about degradation from a user complaint.

## Results and Impact

- Deployment is now a repeatable, auditable process anyone on the team can follow
- Secrets live in one managed place instead of several
- The team has real visibility into the chatbot's health instead of relying on someone noticing something's wrong

## Key Learnings

Migrating working software off bespoke infrastructure is unglamorous work that rarely shows up as a headline feature, but it's the difference between a system the team can operate and a system that depends on one person staying available. GitOps and Helm didn't change what the chatbot does — they changed who can safely operate it.
