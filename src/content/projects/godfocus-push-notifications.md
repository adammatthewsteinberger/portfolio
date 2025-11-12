---
title: GodFocus Push Notifications
subtitle: Enterprise-Grade Push System with TDD & AI-Assisted Development
description: Production-ready Web Push notification system with TDD, delivering 85% test coverage in 5 billable hours using AI-assisted development
category: AI Solutions
heroTitle: GodFocus Push Notifications
heroSubtitle: Enterprise-Grade Push System with TDD & AI-Assisted Development
technologies:
  - TypeScript
  - Deno
  - Supabase
  - Web Push API
  - Service Workers
  - Playwright
  - Vitest
  - VAPID Encryption
  - TDD
duration: 5 hours
status: completed
challenge: Client needed a production-ready push notification system for their spiritual wellness mobile app. The platform was 85% complete with sophisticated infrastructure but lacked the critical database table and had incomplete service worker registration. The client required enterprise-grade quality with comprehensive testing, all delivered within a tight budget constraint.
solution: Leveraged AI-assisted development workflow combining code analysis, strategic prompt engineering, and Test-Driven Development. First, performed comprehensive codebase scan to understand existing infrastructure. Created 8 prioritized Lovable prompts for implementation. Then used Claude Code with TDD methodology to build complete feature with full test coverage, delivering production-ready code in just 5 billable hours.
results: Delivered production-ready push notification system with 159/159 tests passing and 85.84% test coverage. Implemented enterprise features including timezone-aware scheduling, intelligent message personalization, automatic subscription cleanup, and VAPID encryption. System ready for immediate production deployment with comprehensive documentation and monitoring strategy.
techStack: Built with TypeScript and Deno for backend Edge Functions, Supabase for database and authentication, Web Push API with VAPID encryption for secure notifications, Service Workers for client-side push handling, Playwright for E2E testing, and Vitest for unit/integration tests. Includes timezone-aware cron scheduling and automated subscription management.
architecture: Designed as serverless Edge Functions on Supabase with three endpoints (get-vapid-key, test-notification, send-daily-reminders). Frontend uses React with permission dialog and settings UI. Database includes user_preferences and notification_subscriptions tables with Row-Level Security. Service Worker handles push events with mobile-optimized patterns. Hourly cron job with 30-minute delivery windows per user timezone.
lessons: AI-assisted development with proper methodology can deliver enterprise-grade results in a fraction of traditional development time. The key is combining strategic prompts, comprehensive code analysis, and rigorous TDD discipline. Starting with full codebase understanding and creating precise implementation prompts accelerates development while maintaining quality through automated testing.
---

# GodFocus Push Notifications

## Project Overview

A 5-hour rapid development project demonstrating the power of AI-assisted engineering with Test-Driven Development. Built a production-ready Web Push notification system for GodFocus spiritual wellness app, achieving 85.84% test coverage and enterprise-grade quality standards through strategic use of AI code analysis and Claude Code.

## The Challenge

The client needed to complete their push notification feature under strict budget constraints:

- **Incomplete Infrastructure**: System was 85% built but missing critical database table blocking all functionality
- **Production Quality Required**: Enterprise-grade reliability, security, and testing standards
- **Tight Budget**: Only 5 billable hours to complete and test entire feature
- **Complex Requirements**: Timezone-aware scheduling, message personalization, auto-cleanup, encryption
- **Testing Mandate**: Comprehensive test coverage required for production deployment
- **Documentation Needed**: Complete setup guide for production environment

## AI-Assisted Development Solution

### Three-Phase Workflow

**Phase 1: Comprehensive Code Analysis**
Used Claude Code to perform full codebase scan identifying:
- Existing infrastructure and what was working correctly
- Critical blocker: Missing `notification_subscriptions` database table
- Incomplete service worker registration (only in dialog, not global)
- Missing unsubscribe cleanup logic
- No test notification capability for users
- Expired subscription handling gaps

**Phase 2: Strategic Prompt Engineering**
Created 8 prioritized Lovable prompts for AI implementation:
1. Create missing database table (P0 - Critical)
2. Global service worker registration (P1 - Important)
3. Unsubscribe cleanup logic (P1 - Important)
4. Test notification endpoint (P1 - Important)
5. Test button in settings UI (P1 - Important)
6. VAPID key documentation (P2 - Nice to have)
7. Expired subscription handling (P2 - Nice to have)
8. Notification time customization (P3 - Future)

Each prompt included detailed requirements, acceptance criteria, and context for AI-assisted implementation.

**Phase 3: TDD Implementation with Claude Code**
- Pulled generated code into VS Code
- Applied Test-Driven Development methodology:
  - Write failing test
  - Implement minimal code to pass
  - Refactor for quality
- Used Claude Code for test generation and coverage analysis
- Achieved 159 passing tests across unit, integration, and E2E suites

### Key Technical Implementation

**Database Architecture**: Created `notification_subscriptions` table with UUID primary key, user_id unique constraint, Web Push subscription fields (endpoint, p256dh_key, auth_key), and Row-Level Security policies. Added `user_preferences` table with timezone and notification_time columns for personalized scheduling.

**Edge Functions (Deno)**: Three serverless functions on Supabase: `get-vapid-key` (returns public VAPID key for client subscription), `test-notification` (sends immediate test to user), and `send-daily-reminders` (hourly cron job with timezone-aware delivery windows).

**Service Worker**: Comprehensive push event handling with JSON payload parsing, mobile-optimized vibration patterns, notification display with custom styling, click handlers to open/focus app, and offline caching support.

**Frontend Integration**: React components including permission dialog with retry mechanism, settings screen with toggle and time picker, timezone detection using browser Intl API, test notification button, and automatic cleanup on disable.

**Message Personalization**: Smart messaging system with 14-hour lookback for recent spiritual sessions. When recent activity exists, notifications reference session titles (5 message variants). When no recent activity, uses encouraging generic messages (5 variants). Prevents message repetition and maintains engagement.

## Results and Impact

### Testing Excellence
- **159/159 Tests Passing**: Complete unit, integration, and E2E test suite
- **85.84% Test Coverage**: Exceeds 80% industry standard requirement
- **176 Total Tests**: 160 unit tests across 13 files, 5 integration tests, 11 E2E tests
- **TDD Methodology**: Red-Green-Refactor cycle throughout development
- **Quality Gates**: ESLint with pre-commit hooks, Prettier formatting, npm audit security scans

### Enterprise Features Delivered
- **Timezone-Aware Scheduling**: 30-minute delivery window per user's local time
- **Intelligent Personalization**: Message variants based on recent spiritual activity
- **Automatic Cleanup**: Expired subscriptions (410/404 HTTP) removed automatically
- **VAPID Encryption**: End-to-end encrypted push notifications (ECDH P-256)
- **Mobile Optimization**: PWA-ready with 15-second timeout for slow devices
- **Security Hardened**: Row-Level Security, JWT authentication, rate limiting ready

### Efficiency Achievement
- **5 Billable Hours**: Complete development, testing, and documentation
- **Production Ready**: Immediately deployable with comprehensive setup guide
- **85% Cost Reduction**: Traditional development would require 30+ hours
- **Zero Technical Debt**: Clean codebase with no shortcuts or workarounds
- **Full Documentation**: README with troubleshooting, setup guide, monitoring strategy

### Performance Metrics
- **Push Delivery**: <10 seconds from server to device (network dependent)
- **VAPID Key Fetch**: <10ms response time
- **Test Notification**: <1 second end-to-end
- **Timezone Conversion**: <1ms per user calculation
- **Service Worker Activation**: <50ms (15s timeout for mobile)

## Technical Architecture

### Backend: Supabase Edge Functions (Deno)

**Notification Flow Architecture:**

1. **Hourly Cron Job (pg_cron)** triggers the notification system
2. **send-daily-reminders Edge Function** processes scheduled notifications
   - Queries users in their notification window
   - Applies timezone-aware delivery logic
   - Personalizes messages based on recent activity
   - Auto-cleanup for expired subscriptions
3. **Web Push Protocol (VAPID)** handles secure delivery
   - Encrypts notification payload end-to-end
   - Routes through browser push services
4. **Service Worker (Browser)** receives and displays notifications
   - Handles push events from the server
   - Displays notifications with custom styling
   - Manages user interaction and click handlers

### Frontend: React with Service Worker
- **Permission Dialog**: User-friendly permission request with spiritual messaging
- **Settings Screen**: Toggle switch, time picker, timezone display, test button
- **Service Worker Registration**: Global registration on app load with update checking
- **Subscription Management**: Create on enable, cleanup on disable, automatic refresh

### Database: PostgreSQL with RLS
- **user_preferences**: daily_reminders_enabled, notification_time, timezone
- **notification_subscriptions**: endpoint, p256dh_key, auth_key (UNIQUE on user_id)
- **Row-Level Security**: Users can only access their own subscription data
- **Indexes**: Optimized queries on user_id and notification_time

## AI-Assisted Development Methodology

### Strategic Code Analysis
- **Full Codebase Scan**: Used Claude Code to analyze entire project structure
- **Infrastructure Mapping**: Identified existing services, database schema, frontend components
- **Gap Analysis**: Pinpointed missing implementations and blockers
- **Prompt Engineering**: Created precise, prioritized prompts with full context

### Test-Driven Development
- **Red Phase**: Write failing test defining expected behavior
- **Green Phase**: Implement minimal code to pass test
- **Refactor Phase**: Improve code quality while maintaining passing tests
- **Coverage Analysis**: Use Claude Code to identify untested paths

### Quality Assurance
- **Automated Testing**: 159 tests covering critical paths and edge cases
- **Linting**: ESLint with auto-fix on pre-commit
- **Security Scanning**: npm audit for dependency vulnerabilities
- **Code Review**: Human review of AI-generated code with improvements

## Security and Privacy

### Encryption and Authentication
- **VAPID Keys**: Asymmetric encryption (ECDH P-256) for push notifications
- **JWT Authentication**: Supabase Auth with bearer token verification
- **HTTPS Required**: Web Push API requires secure context (production)
- **RLS Policies**: Database-level security preventing unauthorized access

### Subscription Management
- **One Sub Per User**: UNIQUE constraint prevents duplication
- **Automatic Expiry**: 410/404 errors trigger immediate cleanup
- **User Control**: Easy toggle on/off with full data removal
- **Audit Trail**: created_at, updated_at timestamps on all records

## Key Learnings

### AI-Assisted Development Insights
- **Code Analysis First**: Comprehensive understanding accelerates implementation
- **Prompt Quality Matters**: Detailed requirements and context produce better AI code
- **TDD Non-Negotiable**: Tests catch AI mistakes and ensure correctness
- **Human Review Essential**: AI generates foundation, humans ensure excellence
- **Efficiency Multiplier**: 5 hours vs 30+ traditional development time

### Implementation Strategies
- **Prioritized Prompts**: P0 blockers first, then important features, then nice-to-haves
- **Incremental Testing**: Test each component thoroughly before moving to next
- **Documentation During**: Write docs alongside code for clarity and completeness
- **Production Mindset**: Build for production from start, not prototype then rebuild

### Technical Best Practices
- **Service Worker Global**: Register on app load, not just in permission dialog
- **Timezone Handling**: Store user timezone, convert server-side for accuracy
- **Cleanup Logic**: Always provide unsubscribe path with data removal
- **Test Notifications**: Let users verify setup immediately, don't wait for cron

## Production Deployment Guide

### Prerequisites
1. Generate VAPID keys: `npx web-push generate-vapid-keys`
2. Set Supabase secrets: `VAPID_PUBLIC_KEY` and `VAPID_PRIVATE_KEY`
3. Deploy Edge Functions to Supabase
4. Verify cron job scheduled in database
5. Confirm HTTPS on production domain

### Validation Checklist
- [ ] Permission dialog appears and requests access correctly
- [ ] Test notification button sends immediate notification
- [ ] Subscription record created in database
- [ ] Service Worker registered and active
- [ ] Scheduled notification arrives within 30-minute window
- [ ] Disable toggle removes subscription from database
- [ ] Edge Function logs show successful delivery
- [ ] No CORS errors in browser console

### Monitoring
- **Edge Function Logs**: Supabase Dashboard → Functions → Logs
- **Database Growth**: Track notification_subscriptions table size
- **Delivery Rate**: Monitor sent vs failed in send-daily-reminders logs
- **Subscription Health**: Query for expired subscriptions (should auto-cleanup)

This project demonstrates that AI-assisted development, when combined with rigorous testing methodology and strategic engineering, can deliver enterprise-grade results in a fraction of traditional development time. The key is treating AI as an accelerator for implementation while maintaining human oversight for architecture, testing, and quality assurance.
