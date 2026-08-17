---
title: AI Report Generator & Email Intake
subtitle: A Kubernetes Queue That Reads a Shared Inbox and Ships PDF Reports
description: Built a Kubernetes-based intake pipeline that reviews attachments from a shared Outlook mailbox, flags client signals with AI, and ships PDF reports back to senders while archiving copies to SharePoint
category: AI Solutions
heroTitle: AI Report Generator & Email Intake
heroSubtitle: Kubernetes Queue, AI Attachment Review, Automated PDF Delivery
technologies:
  - Kubernetes
  - Azure
  - AI Document Review
  - Microsoft Graph API
  - SharePoint
  - PDF Generation
duration: Vizius engagement, 2025-2026
status: completed
featured: true
challenge: A shared Outlook mailbox was the intake point for client documents that needed review, but every attachment required a human to open it, read it, decide whether it flagged something worth escalating, generate a report, and file a copy — a manual bottleneck that didn't scale with volume and was easy to fall behind on.
solution: Built a Kubernetes-queued pipeline that watches the shared mailbox via Microsoft Graph, pulls attachments as they arrive, uses AI to review each document and flag client signals worth human attention, generates a PDF report, sends it back to the original sender, and archives a copy to SharePoint automatically.
results: Attachment review and report delivery now happen without a human opening every email first — the AI review step surfaces what actually needs attention, and the PDF-and-archive step happens automatically instead of being a manual filing task.
techStack: A Kubernetes-based queue consuming from the shared mailbox via Microsoft Graph API, an AI review step over each attachment, PDF generation for the outbound report, and Microsoft Graph/SharePoint integration for archival.
architecture: Queue-based intake — new mail triggers a Kubernetes job that pulls the attachment, runs it through AI-assisted review, generates a PDF report, emails it back to the sender, and writes an archival copy to SharePoint, all without manual intervention unless the AI review step flags something for a human to look at.
lessons: The bottleneck in a workflow like this was never really "can AI read a document" — it was building a queue that reliably watches a shared mailbox, handles retries when Graph API calls fail, and doesn't lose an attachment between steps. The AI review step is the visible part; the boring queueing and retry logic underneath it is what makes it trustworthy enough to run unattended.
---

# AI Report Generator & Email Intake

## Project Overview

A shared inbox is a deceptively hard automation target: mail arrives asynchronously, attachments vary in format, and the cost of silently dropping one is high. This project turned a manual "open every email, read the attachment, decide, report, file" workflow into a Kubernetes-queued pipeline.

## The Challenge

- **Manual Bottleneck**: Every attachment required a person to open it before anything happened
- **Inconsistent Turnaround**: Report generation and filing depended on whoever was watching the mailbox that day
- **No Backpressure Handling**: A burst of incoming documents had no queueing mechanism — it was just a growing pile in an inbox
- **Archival Discipline**: Filing a copy to SharePoint was a manual step that was easy to skip under time pressure

## Technical Solution

### Kubernetes-Queued Intake
New mail in the shared mailbox triggers a Kubernetes job via Microsoft Graph API polling/webhooks, rather than relying on someone checking the inbox. The queue absorbs bursts and retries failed steps instead of losing work.

### AI-Assisted Document Review
Each attachment is reviewed by an AI step trained to flag the client signals that matter for this workflow — the goal isn't to replace human judgment on what to do about a flagged document, it's to remove the "did anyone actually read this" bottleneck.

### Automated PDF Delivery and Archival
Once review completes, a PDF report is generated and emailed back to the original sender, with an archival copy written to SharePoint — the two steps that used to be manual filing tasks now happen as part of the same pipeline run.

## Results and Impact

- Attachments are reviewed and reported on without a human opening every email first
- Archival to SharePoint happens automatically instead of being a step someone can forget
- The pipeline absorbs bursts of incoming mail instead of backing up in an inbox

## Key Learnings

The AI review step gets the attention, but the actual reliability of this system comes from the unglamorous parts: a queue that doesn't drop messages, retry logic for Graph API calls that occasionally fail, and idempotent processing so a retried job doesn't send the same report twice. Automating a shared mailbox is a distributed-systems problem wearing an AI costume.
