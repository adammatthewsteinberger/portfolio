---
title: Policy Diff Engine
subtitle: Comparing Policy Documents Over Time, Grouped by Department
description: Architected and mentored a junior developer through building a backend that compares policy documents over time, groups changes by department, and ships deltas as PDF reports
category: Enterprise Development
heroTitle: Policy Diff Engine
heroSubtitle: Architecture Guidance and Mentorship, Not Just Code
technologies:
  - Python
  - Document Diffing
  - PDF Generation
  - Azure
duration: Vizius engagement, 2025-2026
status: completed
challenge: A client needed a way to track how policy documents changed over time — not just "did the file change" but which specific provisions changed, grouped in a way that mattered to the department responsible for each policy area — and the engineer building it needed architectural guidance more than a finished spec.
solution: Provided architecture and design mentorship for a junior developer building the diff engine's backend — establishing the approach for comparing policy document versions, grouping detected changes by department, and generating PDF delta reports — while the junior engineer owned the implementation.
results: The junior developer shipped a working policy diff engine that compares document versions, groups the resulting changes by department, and generates PDF delta reports — with the architecture holding up as the engineer implemented it independently.
techStack: Python for the comparison and reporting logic, a document-diffing approach tuned for policy-document structure rather than generic line diffs, PDF generation for the delta reports, and Azure for hosting.
architecture: A comparison pipeline that treats a policy document as structured content rather than plain text — diffing at the provision level so a change report reads as "Section 4.2 changed" rather than an unreadable line-by-line text diff, then grouping the resulting changes by the department each policy area belongs to before generating the PDF report.
lessons: The most valuable thing on this project wasn't a line of code I wrote — it was the architecture decisions that kept a junior developer from reinventing a generic diff tool that would have produced unreadable output. Mentorship on the "why" of an approach, not just the "what," is what let someone else ship it correctly without me in the loop for every decision.
---

# Policy Diff Engine

## Project Overview

Not every engagement is about writing the code yourself. This one was architecture and mentorship: helping a junior developer design and build a backend that compares policy documents over time and reports the changes in a way that's actually useful to the people who have to act on them.

## The Challenge

- **Naive Diffing Produces Noise**: A generic line-by-line text diff on a policy document is close to unreadable — reformatting alone can make it look like everything changed
- **Department Relevance**: Changes needed to be grouped by which department's policy area they belonged to, not presented as an undifferentiated list
- **Junior Developer, Senior Problem**: The engineer building this needed architectural direction on how to approach the comparison problem, not just a spec to implement

## Technical Solution

### Structure-Aware Comparison
Rather than treating a policy document as plain text for diffing purposes, the architecture called for comparing at the level of the document's actual structure — sections and provisions — so a detected change reads as "this specific provision changed" instead of a wall of reformatted text.

### Department-Grouped Reporting
Changes are grouped by the department responsible for the relevant policy area before the report is generated, so a reader gets a report relevant to their part of the organization rather than the entire document's changelog.

### Mentorship-Led Implementation
My role was architecture and design guidance — establishing the comparison approach, the grouping logic, and the report structure — while the junior developer owned and shipped the actual implementation.

## Results and Impact

- A working diff engine that produces department-relevant, readable change reports instead of raw text diffs
- A junior developer who shipped it independently, with the architecture holding up under real implementation
- A repeatable comparison approach that generalizes beyond the first set of policy documents it was built for

## Key Learnings

Some of the highest-leverage work is architecture and mentorship rather than code you write yourself — the diff engine's real value came from deciding *how* to compare documents (structurally, not as plain text) before any implementation started. Getting that decision right up front is what let someone else build it correctly.
