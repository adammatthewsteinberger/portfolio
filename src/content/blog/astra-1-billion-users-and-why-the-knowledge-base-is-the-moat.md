---
title: "Astra Solved 10 Open Math Problems for $2,000. ChatGPT Hit 1 Billion Users. Neither Changes the Advice I Give Clients."
description: "OpenAI's Astra proved out formal theorem-solving for the cost of a nice laptop. ChatGPT crossed a billion users. GPT-5.6 got 80% cheaper. Intelligence is getting commoditized fast — which is exactly why the knowledge base is the only part of your AI system that's actually yours."
category: "AI Trends"
author: "Adam Matthew Steinberger"
publishedDate: "2026-08-05"
readTime: "8 min read"
tags: ["AI Trends", "RAG", "Business Strategy", "OpenAI"]
featured: false
---

Three things happened in the same week at the end of July: OpenAI's internal Astra model solved ten previously open problems in mathematics and theoretical computer science, publishing formal Lean proofs on GitHub, for roughly $2,000 in compute. ChatGPT crossed one billion active users, the fastest a consumer software platform has ever hit that number. And OpenAI cut GPT-5.6's price by 80%, to $0.20 per million input tokens.

None of that changes the advice I give a client who's trying to figure out whether their AI chatbot is worth the money they're spending on it.

## Capability is getting cheap. That's the point.

Stanford HAI has been tracking this trend for a while: the cost to get GPT-3.5-equivalent quality dropped more than 280-fold between late 2022 and late 2024, and it hasn't stopped since. Astra solving formal math proofs for the cost of a nice laptop and GPT-5.6 getting 80% cheaper in the same month aren't two separate stories — they're the same story. Raw model intelligence is becoming a utility, priced like one.

This is genuinely good news if you're building on top of frontier models. It's also the reason the advice hasn't changed: when intelligence is cheap and available to everyone, it stops being the thing that differentiates your system from a competitor's. What's left is what was always the actual hard part.

## The finding that hasn't gotten old

A 2020 paper from Facebook AI Research found that Retrieval-Augmented Generation — connecting a model to a curated, business-specific knowledge base instead of relying on what it memorized during training — cut hallucination rates by up to 70% in knowledge-intensive tasks. That finding is six years old now and it's more relevant with every price cut, not less, because it points at exactly the thing model improvements don't touch: whether the system knows your business.

I've seen this play out directly. A financial services client's chatbot factual error rate dropped from roughly 34% to under 6% in one week — not because we swapped the underlying model, but because we rebuilt the retrieval pipeline so it was answering from their actual documents instead of from the model's training-time memory. The model was the same before and after. The knowledge architecture wasn't.

## What this means practically

If you're evaluating an AI vendor right now, in a market where a billion people use ChatGPT and the per-token cost keeps dropping, the question that actually predicts whether their system will work for you isn't "which model do you use." It's "how is the knowledge base structured, and what does it contain that a generic competitor can't access." Every component in a RAG stack — the model, the vector database, the orchestration framework — is available to anyone with a budget. What's not available to your competitors is your own documentation, your own operational history, your own customers' actual language.

Astra, the billion users, and the 80% price cut are all real and all worth paying attention to. They're also all evidence for the same conclusion: the technology is a commodity, and the moat was never going to be there.
