---
title: "MCP Became the REST of Agents. Here's How I'd Expose a Legacy System to One Safely."
description: "Model Context Protocol has over 1,000 community servers and is now the default way agents reach tools and data. If you're wiring a legacy .NET or NestJS system up to an agent, the hard part isn't the protocol — it's the guardrails."
category: "AI Agents"
author: "Adam Matthew Steinberger"
publishedDate: "2026-08-10"
readTime: "8 min read"
tags: ["MCP", "AI Agents", "Legacy Systems", "Security", "Architecture"]
featured: true
---

Model Context Protocol crossed 1,000 community-built servers sometime this year, and it's settled into the role REST settled into fifteen years ago: the boring, standard way one system talks to another, except this time the caller on the other end is an LLM-driven agent instead of a browser or another service. If you build enterprise systems, the question isn't whether you'll be asked to expose one to an agent. It's when, and whether you'll do it safely.

## The protocol part is the easy part

Wiring an MCP server up to expose a set of tools is genuinely not hard — you define a schema, you implement handlers, you're done in an afternoon for a simple case. I've built microservices architectures on NestJS and gRPC for years now, and MCP's shape is familiar: it's an RPC protocol with a bias toward tool discovery. The interesting engineering problem isn't the protocol. It's what happens on the other side of that RPC call when the caller is a language model rather than a human clicking a button in a UI.

## Treat the agent as an untrusted, internet-connected user

This is the single most important architectural principle for exposing anything to an agent, and it's not optional. An LLM can be manipulated by content it reads — a malicious instruction hidden in a document it retrieves, a prompt injection buried in a support ticket it's summarizing — into calling your tools in ways you never intended. OWASP's LLM Top 10 puts prompt injection at #1 for the second consecutive edition, and the newest entry, vector and embedding weaknesses, exists specifically because RAG systems are a fresh attack surface.

What this means concretely for an MCP server sitting in front of a legacy .NET or NestJS backend:

- **Every tool call gets the same authorization check a human API caller would get.** The fact that the caller is an agent doesn't earn it a shortcut through your access control. If the human whose session the agent is acting on behalf of can't see a customer's SSN, the agent can't either.
- **Prefer a plan-then-execute pattern over letting the model call tools directly and unsupervised.** Have the agent propose a plan, validate the plan against deterministic rules, then execute — rather than trusting a model's live tool-calling loop with write access to production data.
- **Put hard limits on everything.** Iteration caps, token budgets, time budgets, retry limits per tool. I've watched an "AI cost snowball" happen in a client environment where an unbounded agent loop kept retrying a failing tool call — this is a documented incident class, not a theoretical risk, and the fix is a config value, not a research project.
- **Never let the agent's output touch your system unsanitized.** If a tool response ever ends up rendered in a UI, validate it with the same rigor you'd apply to user input — the model is generating text, and generated text can contain the same injection payloads a malicious user could type by hand.

## The legacy-system part

The genuinely tricky part of MCP-enabling an older system is usually not MCP — it's that legacy backends frequently don't have a clean authorization boundary to hang the tool-level checks on. If your NestJS service's authorization logic is scattered across a dozen controllers instead of centralized in a service layer, "add an MCP tool that respects the same permissions" surfaces every place that logic was never actually consistent. I've done exactly this kind of architecture review before — the code review that turned into a phased Onion Architecture refactor for a client wasn't primarily about MCP, but the same finding applies: you can't safely bolt a new caller onto a system whose authorization boundary was never made explicit in the first place.

If you're planning to expose an internal system to an agent, the honest first question isn't "how do I write the MCP server." It's "where does my authorization logic actually live, and would I trust it if the caller were adversarial." For most legacy systems I've reviewed, the answer to that second question starts as no — which is useful information, because it tells you the MCP server isn't the project. Fixing the authorization boundary is.
