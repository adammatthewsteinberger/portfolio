---
title: "Vibe Coding Was Word of the Year. Agentic Engineering Is the Job. Here's the Difference."
description: "Collins Dictionary named 'vibe coding' its 2026 Word of the Year. A METR study found AI made experienced developers 19% slower on familiar code while they believed they were 20% faster. What actually separates fast-and-reckless from fast-and-correct."
category: "AI Development"
author: "Adam Matthew Steinberger"
publishedDate: "2026-08-03"
readTime: "9 min read"
tags: ["Vibe Coding", "Agentic Engineering", "Scrum", "AI Development", "Security-First Scrum"]
featured: false
---

Collins Dictionary named "vibe coding" its 2026 Word of the Year — a year after Andrej Karpathy coined it to describe building software by describing what you want and accepting whatever an AI generates, iterating through conversation instead of a text editor. Somewhere around 92% of US developers report using it in some form now, and roughly 60% of new code written this year is AI-generated in some sense.

There's a study that should sit right next to that statistic. METR ran a randomized controlled trial in July 2025 and found that AI tooling made experienced developers 19% *slower* on tasks in codebases they already knew well — while those same developers believed, going in, that they'd be about 20% faster. That's not a small gap. That's a fundamental miscalibration about what the tools are actually doing to your team's output, and it's exactly the gap between vibe coding and what I've started calling agentic engineering: the disciplined version of the same underlying tools.

## What actually separates them

Vibe coding, done as Karpathy originally described it, is appropriate for prototyping — you're exploring a space, the code is disposable, and the cost of a wrong turn is low. It becomes dangerous the moment it's the process for production work, because the failure mode isn't obvious. Veracode found in 2025 that 45% of AI-generated code samples introduced a detectable OWASP Top 10 vulnerability, with cross-site scripting failing 86% of the time. Apiiro tracked a 10x spike in new security findings per month tied to AI-assisted commits, with privilege-escalation paths up 322%. None of that shows up as a broken build. It shows up as a production incident three months later.

Agentic engineering is the same tools, aimed the same direction, with the guardrails that make "fast" and "correct" the same word instead of a trade-off:

- **Spec-driven development instead of vibe-driven iteration.** Write what the system needs to do before you generate code that does it, so there's a source of truth to check the output against.
- **The same testing discipline you'd apply to human-written code — arguably more.** Intensify testing when using AI-assisted development, don't relax it. If your team's change-failure rate climbs after adopting AI tooling, the fix is your testing and review pipeline, not less AI.
- **Security gates that don't get bypassed under deadline pressure.** AI-generated code goes through the same SAST/secrets/dependency-scanning pipeline as anything a human wrote — the pipeline is a security control, and skipping it to hit a date is exactly the failure mode the Veracode and Apiiro numbers describe.

## This is Security-First Scrum, applied to the tools writing the code

I run engagements on a framework I call Security-First Scrum, and its ordering is deliberate: secure, working, tested, clean code — in that order, never inverted under schedule pressure. Extending that to AI-assisted development doesn't require a new framework. It requires treating the AI as another contributor whose output goes through the same gates a junior engineer's would — not because you distrust the tool specifically, but because you'd never skip code review for *any* contributor just because the code compiled quickly.

The tools I use for my own work — a family of autonomous session runners I've built and open-sourced (`claudeloop`, `codexloop`, `cursorloop`, `agyloop`) — are onion-architected specifically so the fast, autonomous part and the tested, reviewable part stay separated. The agent can move fast inside its own layer. The dependency rule still points inward, toward a core that isn't the AI's to touch unsupervised.

"Vibe coding" earned its Word of the Year for a reason — it names something real about how software gets written now. The teams that will still be shipping reliably in two years are the ones who read the METR study, believed the 19%, and built the discipline that turns the same speed into something they can actually trust.
