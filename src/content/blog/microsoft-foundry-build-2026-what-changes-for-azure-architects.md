---
title: "Microsoft Foundry at Build 2026: What Actually Changes for Azure Architects"
description: "Microsoft Foundry shipped hosted agent infrastructure, a stable Agent Framework, and procedural memory at Build 2026. Here's what's genuinely new versus repackaged, and how it changes an Azure Service Bus architecture."
category: "AI Infrastructure"
author: "Adam Matthew Steinberger"
publishedDate: "2026-08-12"
readTime: "10 min read"
tags: ["Microsoft Foundry", "Azure", "AI Agents", "Service Bus", "Enterprise AI"]
featured: true
---

Azure AI Foundry became Microsoft Foundry at Ignite 2025. At Build 2026, it grew a hosted agent runtime, a stable Agent Framework, procedural memory, and a governance spec — the pieces you actually need to run agents in production instead of in a demo. I've spent the last several years building Azure microservices for enterprise clients, including a RAG-driven payroll automation on Service Bus, so I read this announcement list the way I read any platform update: what changes the architecture I'd actually design today?

## The parts that matter

**Foundry Agent Service going GA within 30 days** is the headline. It's a framework-agnostic sandbox runtime for hosted agents — meaning you're no longer stitching together your own container orchestration to keep a long-running agent alive between invocations. If you've built an agent that needs to survive across a multi-hour workflow, you know how much of that work is undifferentiated plumbing. Having Microsoft own that plumbing is a real subtraction from your build list.

**Procedural memory**, also in public preview, is the other one worth planning around. Microsoft's own numbers put the success-rate gain at 7–14% for agents that can retain and reuse learned procedures across runs, rather than re-deriving the same multi-step process from scratch every time. That's not a marginal number for anything that runs the same category of task repeatedly — which describes most enterprise automation.

**Toolboxes and an MCP-aligned skills catalog** matter because Model Context Protocol has become the de facto way agents reach tools and data — over a thousand community MCP servers exist at this point. A managed toolbox with tool search built in is Microsoft acknowledging that agents need a standardized, discoverable way to find capabilities, not a hand-wired integration per tool.

## What this changes for a Service Bus-based architecture

The payroll automation I designed used Azure Service Bus for event-driven coordination between a RAG pipeline scanning Outlook and SharePoint, an LLM-driven processing layer, and human-in-the-loop validation checkpoints. If I were architecting that system today, here's what changes:

- **The RAG pipeline's orchestration layer could move onto Foundry Agent Service** instead of a custom Functions-based coordinator, if the workflow fits the hosted-agent model — worth evaluating, not an automatic yes, since Service Bus still wins when you need the transactional guarantees and dead-letter handling that a general-purpose agent runtime doesn't provide out of the box.
- **Procedural memory is a genuine fit for the HITL validation step** — an agent that gets better at flagging the same categories of anomaly over time, instead of treating every payroll run as a cold start.
- **Publishing to Teams and M365 Copilot** matters if the audience for a tool is internal business users rather than a custom frontend — a real option now instead of a custom UI you'd otherwise have had to build and maintain.

## What hasn't changed

Multi-model support (OpenAI, Anthropic, Mistral, DeepSeek, and Microsoft's own MAI models on one control plane) is a genuine capability, but it doesn't remove the need for the model-routing discipline I'd design regardless of platform — you still want to route cheap, fast models to routine tasks and reserve the expensive ones for what actually needs them. And hosted agent infrastructure doesn't change the fundamental RAG lesson: the knowledge base and retrieval quality determine whether the system is trustworthy, not which orchestration layer is running underneath it.

If you're running Azure-native AI workloads and haven't looked at Foundry Agent Service yet, it's worth a real evaluation — not because the marketing says so, but because "someone else owns the hosted-agent runtime plumbing" is a legitimate simplification for the right workload.
