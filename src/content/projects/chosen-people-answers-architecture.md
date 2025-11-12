---
title: Chosen People Answers Code Review & Architecture
subtitle: Expert Analysis & Refactor Roadmap for Digital Missions Platform
description: Comprehensive codebase analysis and Onion Architecture refactor plan for AI-built digital missions platform
category: System Modernization
heroTitle: Chosen People Answers Code Review & Architecture
heroSubtitle: Expert Analysis & Refactor Roadmap for Digital Missions Platform
technologies:
  - React
  - Deno
  - TypeScript
  - Supabase
  - Vite
  - Code Review
  - Architecture Design
  - Onion Architecture
  - CI/CD
duration: 10 hours
status: completed
challenge: Chosen People Ministries built a digital missions platform using AI "vibe coding" that was functional but lacked professional software engineering practices. The client needed an expert assessment of performance, security, maintainability, and scalability to transform the platform from a self-taught prototype into an enterprise-grade system capable of serving their mission to reach unbelieving Jewish people and Jewish believers in Jesus.
solution: Conducted comprehensive code review using Claude Code full codebase scan followed by detailed human analysis. Evaluated architecture, code quality, testing coverage, security practices, and technical debt. Delivered multi-phase assessment including initial code scan report, human-reviewed executive summary for senior staff, and complete Onion Architecture refactor plan with actionable roadmap for professional development team.
results: Delivered three comprehensive reports assessing codebase at B- grade (75/100). Identified critical issues including 5% test coverage, 59K-line monolithic files, incomplete TypeScript adoption, and 16 manual maintenance scripts. Created detailed refactor plan with Onion Architecture, TDD methodology, and CI/CD strategy. Provided clear path forward with prioritized phases and 400+ hour effort estimate for reaching industry standards.
techStack: Platform built with React 18, Vite 7, Deno 2.5+, and Supabase PostgreSQL. Features comprehensive gamification system, OpenRouter AI integration for translations, Resend email service, YouTube API, and ESV Bible API. Frontend uses TanStack Query and Radix UI with 35 pages and 102 dependencies.
architecture: Recommended Onion Architecture migration with three layers (Controllers → Services → Repositories). Controllers handle HTTP requests, Services contain business logic, Repositories encapsulate all external system access including Supabase, third-party APIs, and potential LLM integration. Designed for separation of concerns with database access moved entirely out of frontend into backend API layer.
lessons: Self-taught development can produce functional features but has natural limits. Professional software engineering practices (testing, architecture, automation) are essential for long-term sustainability. Early expert review prevents costly complete rebuilds later. AI-built platforms require human expertise to transition from prototype to production-grade systems serving mission-critical needs.
---

# Chosen People Answers Code Review & Architecture

## Project Overview

A 10-hour comprehensive code review and architecture planning engagement for Chosen People Ministries' digital missions platform. The platform serves as a social network for reaching unbelieving Jewish people and Jewish believers in Jesus with gospel content. Using Claude Code for full codebase analysis combined with expert human review, delivered actionable roadmap for transforming AI-built prototype into enterprise-grade system.

## The Challenge

Chosen People Ministries faced a critical inflection point with their platform:

- **Functional But Unsustainable**: AI "vibe coding" produced working features without professional engineering practices
- **Unknown Technical State**: No clear understanding of code quality, security posture, or technical debt
- **Self-Taught Limitations**: Capable missionaries built system but lacked enterprise development expertise
- **Mission Critical**: Platform serves digital missions strategy requiring reliability and scalability
- **Future Development**: Needed assessment before investing in features like mobile app and LLM content moderation
- **Budget Constraints**: Required efficient path forward maximizing impact per dollar

The client specifically requested analysis of performance, security, maintainability, and scalability with clear recommendations for improvement.

## Three-Phase Assessment Solution

### Phase 1: Comprehensive Code Scan

**Automated Analysis with Claude Code**
Performed full codebase scan analyzing:
- 190+ markdown documentation files
- 35 React pages with 102 dependencies
- Deno backend with custom router
- Supabase PostgreSQL database with RLS policies
- 59,000-line functions.js monolithic file
- 32,000-line supabaseFunctions.js file
- Complete gamification system (XP, shekels, 50+ achievements)

**Initial Findings Documented**
Created detailed technical report assessing:
- Architecture patterns and code organization
- Testing infrastructure (or lack thereof)
- TypeScript adoption rate and type safety
- Security implementation (authentication, authorization, validation)
- Performance bottlenecks and optimization opportunities
- Technical debt across SOLID principles, DRY, error handling

**Assessment: B- Grade (75/100)**
- Strengths: Feature-rich, comprehensive gamification, strong security foundations, modern tech stack, excellent documentation
- Critical Issues: 5% test coverage, monolithic files, 40% TypeScript adoption, backend auth gaps, 16 legacy manual scripts

### Phase 2: Executive Summary for Leadership

**Human Review and Analysis**
Translated technical findings into business impact for senior staff presentation:

**What's Working Well**
- Feature-rich user experience with sophisticated gamification
- Security-conscious implementation with proper authentication and RLS
- Modern technology choices (React 18, Deno, Supabase)
- Excellent documentation showing commitment to knowledge transfer

**Critical Issues Requiring Professional Expertise**
1. Near-zero testing (5% vs 60-80% industry standard) - changes break functionality without detection
2. Unsustainable code organization (59K-line files vs 200-500 line standard) - impossible for new developers
3. Incomplete TypeScript adoption (40%) - runtime errors that tools should catch at build
4. Backend security gaps (missing authentication middleware) - potential bypass vulnerabilities
5. 16 manual maintenance scripts - platform cannot be maintained by non-technical staff

**Ministry Impact Translation**
- No testing = staff fear updates, platform stagnates
- Poor organization = impossible to onboard volunteers or contractors
- Manual processes = missionary time on servers instead of content
- Performance issues = frustrated users in low-bandwidth regions
- Security gaps = potential data exposure of ministry partners

**Recommendation: Hire Professional Web Developers**
Presented clear case that self-taught development reached natural limit. Platform success demands professional expertise for testing infrastructure, TypeScript migration, DevOps/CI/CD, database optimization, and security best practices.

### Phase 3: Detailed Refactor Plan

**Onion Architecture Strategy**
Designed three-layer architecture for clarity and maintainability:

**Layer 1: Controllers** (HTTP/GraphQL request/response)
- Handle incoming requests and outgoing responses
- Validate input and format output

↓

**Layer 2: Services** (Business logic orchestration)
- Contain core business rules and domain logic
- Orchestrate workflows across multiple repositories

↓

**Layer 3: Repositories** (Supabase, 3rd-party APIs, LLM)
- Encapsulate all external system access
- Provide clean interfaces for data operations

**Key Principles**
1. Onion Architecture by default (only deviate if framework forces another pattern)
2. Less is more (fewer files/constructs = lower risk, easier maintenance)
3. Contracts first (strong types, explicit request/response schemas)
4. Test-Driven Development (TDD when feasible: Red → Green → Refactor)
5. Automate everything (tests, lint, security, build, deploy)
6. Separation of concerns (Frontend = UI, Backend = logic, Repositories = DB access)

**Repository Layout Redesign**

**backend/**
- **src/**
  - **routes/** - Wire routes to controllers
  - **controllers/** - HTTP handlers, thin
  - **services/** - Business logic
  - **repositories/** - Supabase, LLM, external APIs
  - **models/** - Domain models & types
  - **contracts/** - Request/response DTOs
  - **middleware/** - Auth, rate limiting, logging
  - **utils/** - Non-domain helpers only
- **tests/**
  - **unit/** - Isolated function/class tests
  - **integration/** - Multi-component tests
  - **contract/** - API contract validation
  - **e2e/** - End-to-end test scenarios
- **deno.json** - Configuration and scripts

**Testing Strategy (80%+ Coverage Target)**
- Unit Tests (60% coverage): Single function/class isolation with mocks
- Integration Tests (30% coverage): Multiple classes together with test DB
- Contract Tests: Validate request/response shapes, flag breaking changes
- E2E/Smoke Tests (10% coverage): Full app paths with headless browser

**Four-Phase Implementation Roadmap**

**Phase 2A: Critical Fixes (Priority 1)**
1. Testing Infrastructure: Install Vitest + React Testing Library + Playwright, CI testing with GitHub Actions, target 30% coverage from 5%
2. Code Organization: Split functions.js (59K lines) into domain modules, extract repository layer, create DTO transformers
3. Backend Security: Implement JWT verification middleware, role-based route decorators, rate limiting per endpoint
4. Environment Security: Create .env.example, Zod validation for environment variables, document all variables

**Phase 2B: TypeScript Migration (Priority 2)**
1. Enable Strict Type Checking: Set noImplicitAny: true, remove exclusions, add return types
2. Migrate Core Files: functions.js → TypeScript modules, supabaseFunctions.js → Repository classes
3. Generate Types from Schema: Use Drizzle introspection for database types, create shared type definitions

**Phase 2C: Automation & Developer Experience (Priority 3)**
1. Automate Legacy Functions: Migrate 16 scripts to backend API endpoints, implement Supabase Cron, add admin UI
2. Component Library: Extract common components, set up Storybook, create design system with Tailwind
3. CI/CD Pipeline: Automated testing on PR, bundle size analysis, automated deployments

**Phase 2D: Performance Optimization (Priority 4)**
1. Bundle Optimization: Route-based lazy loading, split Article page (400KB → chunks), target <300KB initial
2. Database Optimization: Add indexes for frequent queries, audit N+1 patterns, normalize 62-column users table
3. Asset Optimization: Image optimization pipeline with Sharp, WebP/AVIF conversion, lazy loading

**Estimated Effort: 400+ Hours**
- Testing Infrastructure: 45 points (Critical)
- Monolithic File Refactor: 30 points (Critical)
- TypeScript Migration: 60 points (High)
- Backend Auth Middleware: 14 points (High)
- Legacy Functions Automation: 21 points (High)
- Component Library + Storybook: 90 points (Medium)
- Database Optimization: 30 points (Medium)
- CI/CD Pipeline: 20 points (Medium)
- Performance Optimization: 30 points (Low)

## Results and Impact

### Deliverables Completed
1. **Initial Code Review Report**: Comprehensive technical analysis from Claude Code full scan with detailed findings on architecture, testing, TypeScript adoption, security, and technical debt
2. **Executive Summary**: Business-focused presentation for senior staff translating technical issues into ministry impact with clear recommendation to hire professional developers
3. **Onion Architecture Refactor Plan**: Detailed implementation roadmap with guiding principles, repository layout, testing strategy, four-phase implementation plan, and 400+ hour effort estimate

### Technical Assessment
- **Current Grade: B- (75/100)** - Functional features with security foundations but critical technical debt
- **SOLID Principles: 6.4/10** - Monolithic files violate Single Responsibility Principle
- **DRY: 6/10** - Duplicate API calls, validation, and component patterns
- **Type Safety: 5/10** - noImplicitAny: false, 60% JavaScript files
- **Error Handling: 6/10** - Inconsistent patterns, no global ErrorBoundary
- **Separation of Concerns: 6/10** - Business logic in components, mixed layers

### Strategic Insights for Client
- **Self-Taught Development Reality**: Capable missionaries can build functional systems but lack professional training for enterprise-grade development
- **Natural Limits**: What got the platform here won't get it where it needs to go
- **Cost of Inaction**: Without professional expertise, mounting technical debt will eventually require complete rebuild
- **Investment Needed**: Not criticism of past work, but recognition that platform's success demands professional talent
- **Question Reframed**: Not whether they can afford to hire developers, but whether they can afford not to

### Path Forward Clarity
- **Immediate Need**: Hire 1-2 professional web developers with TypeScript/React, testing infrastructure, DevOps/CI/CD, database optimization, and security expertise
- **Phased Approach**: Critical fixes first (testing, security, organization), then TypeScript migration, then automation and performance
- **Sustainable Development**: Proper practices prevent technical debt accumulation and enable long-term feature development
- **Mission Enablement**: Reliable, scalable platform serves digital missions strategy effectively

## Technical Deep Dive

### Code Quality Analysis

**Monolithic Files**
- functions.js: 59,000 lines of code (industry standard: 200-500 lines per file)
- supabaseFunctions.js: 32,000 lines
- Impact: Nearly impossible for new developers to understand or modify, high defect injection rate

**Testing Infrastructure**
- Current: 5% test coverage (virtually no unit, integration, or E2E tests)
- Industry Standard: 60-80% coverage
- Impact: Every update is a gamble, bugs reach production regularly, staff fear making changes

**TypeScript Adoption**
- Current: 40% TypeScript, 60% JavaScript
- Missing: noImplicitAny: true, proper return types, interface definitions
- Impact: Runtime errors that professional tools would catch at build time

**Backend Security**
- Missing: JWT verification middleware for API endpoints
- Current: Relying solely on database Row-Level Security policies
- Risk: Potential authentication bypass vulnerabilities

**Manual Maintenance**
- Problem: 16 critical operations require developer intervention
- Impact: Platform cannot be maintained by non-technical staff, missionary time spent on server maintenance

### Architecture Recommendations

**Controllers (Request/Response Layer)**
- Validate and parse incoming requests using zod schemas
- Call appropriate service methods with parsed data
- Map service results to HTTP responses
- No business rules or database code
- Thin, focused solely on HTTP concerns

**Services (Business Logic Layer)**
- Orchestrate business logic using domain models
- Call multiple repositories as needed
- Small, focused methods following Single Responsibility Principle
- Stateless when possible for easier testing
- Pure domain logic, no framework coupling

**Repositories (External System Adapters)**
- One repository per external system (SupabaseUserRepo, PaymentsRepo, LlmRepo)
- All Supabase SDK calls live here exclusively
- If swapping database or vendor, only this layer changes
- Interface-driven for easy mocking in unit tests
- Encapsulates all I/O operations

**Frontend Guidance**
- Thin src/api/ layer with fetch wrappers to backend only
- Remove all direct Supabase client calls from browser
- Coalesce types into frontend/src/models/ for discoverability
- Functions are fine in React (don't mirror backend class structure)
- Keep components focused on UI concerns

### CI/CD Pipeline Design

**On Every Pull Request**
1. Build and type-check all code
2. Run linting with automatic fixes
3. Execute full test suite (unit/integration/contract)
4. Generate coverage report and enforce 80% gate
5. Run security vulnerability scans
6. Check bundle size limits

**On Merge to Develop**
- Build production artifacts
- Deploy to development environment
- Run smoke tests against deployed version
- Generate SBOM (Software Bill of Materials)

**On Merge to Main**
- Build production artifacts
- Run full test suite one final time
- Deploy to production environment
- Send deployment notifications
- Archive build artifacts

**Quality Gates**
- Tests must pass (no failures allowed)
- Coverage must be ≥80% (temporary waivers require issue link)
- No high/critical security vulnerabilities
- Bundle size within limits
- TypeScript compilation with no errors

## Security and Best Practices

### Authentication and Authorization
- **Supabase Auth**: Continue as system of record for user identity
- **Backend JWT**: Require Bearer tokens for all API endpoints
- **Role-Based Access**: Claims in token, controllers extract and pass to services
- **Key Rotation**: Support token expiry and rotation, store secrets in environment variables
- **Rate Limiting**: Add per-endpoint rate limiting to prevent abuse
- **Audit Logging**: Log all sensitive operations for security review

### Database Best Practices
- **Migrations**: Code-reviewed, versioned, never manual modifications
- **Repositories**: Use Supabase SDK through repository layer only
- **Seed Data**: Store under backend/seed/, script-driven with ENV gates
- **Indexes**: Add for frequent queries identified through performance monitoring
- **Normalization**: Normalize 62-column users table into related entities

### Testing Discipline
- **AAA Pattern**: Arrange → Act → Assert for every test
- **TDD Loop**: RED (write failing test) → GREEN (make it pass) → REFACTOR (improve code)
- **Coverage Gates**: Global ≥80% lines/branches, critical modules ≥90%
- **Contract Tests**: Validate request/response shapes using zod schemas
- **Dependency Injection**: Use interfaces to enable easy mocking

## Key Learnings

### Self-Taught Development Reality
- **Functional Features**: Capable individuals can build working systems with modern AI tools
- **Professional Practices**: Testing, architecture, security require formal training and experience
- **Natural Limits**: Self-taught expertise plateaus before reaching enterprise-grade standards
- **Not a Failure**: Recognition that platform success demands professional expertise

### Code Review Insights
- **Early Assessment Valuable**: Expert review prevents costly complete rebuilds later
- **AI Tools Accelerate**: Claude Code full scan provides comprehensive starting point quickly
- **Human Expertise Essential**: Translation from technical issues to business impact requires experience
- **Actionable Roadmaps**: Specific phases with effort estimates enable informed decision-making

### Architecture Lessons
- **Onion Pattern Scales**: Clear layer separation enables long-term maintainability
- **Interfaces Enable Testing**: Dependency injection through interfaces makes comprehensive testing feasible
- **Repository Pattern Flexible**: Encapsulating external systems in repositories enables vendor swaps
- **Frontend Separation**: Moving database access to backend API layer improves security and auditability

### Business Impact Translation
- **Technical Debt Has Cost**: Accumulated shortcuts eventually require complete rebuild
- **Security Gaps Are Risk**: Vulnerabilities put user data and organizational reputation at risk
- **Poor Performance Drives Away Users**: 400KB page loads frustrate users in low-bandwidth regions
- **Manual Processes Don't Scale**: Requiring developer intervention for maintenance prevents growth

## Documentation Consolidation Strategy

Recommended minimal documentation set:
- **README.md**: Quickstart, architecture diagram, environment setup, run commands
- **CONTRIBUTING.md**: Branch strategy, commit message style, test/lint commands, coding standards
- **LICENSE**: Project license terms
- **AI_ASSISTANT.md**: Policy for AI tools (Claude/Cursor/Lovable): prompts, limits, code review norms, "less is more" rules

All other documentation can live in GitHub issues or single docs/notes.md file. Reduces maintenance burden while ensuring critical information remains accessible.

## Optional LLM Integration Path

**Separate Layer Design**
Client expressed interest in local LLM for content moderation. Architecture plan provides clean integration path:

**LLM Integration Flow:**
Frontend → Backend (Controller/Service) → LlmRepository → LLM Server (vLLM/FastLLM)

This flow ensures clean separation where the frontend calls backend endpoints, which use the service layer for business logic, which then calls the LLM Repository to interact with the local LLM server.

**Benefits of Repository Pattern**
- Avoid coupling to specific LLM provider
- Keep ability to swap vendors or models
- Easy mocking for unit tests
- Add request/response contracts for prompts/results
- Integration tests against local LLM in CI or nightly job

**Potential Use Cases**
- Automated comment moderation (replacing deterministic matrix multiplication)
- Content recommendations based on user interests
- Personalized spiritual content generation
- Translation assistance (complementing OpenRouter integration)

This project demonstrates the critical value of expert code review for AI-built platforms. Strategic assessment combining automated analysis with human expertise provides clear path from prototype to production-grade system. Early investment in professional review and architecture planning prevents costly complete rebuilds while enabling informed decisions about development team needs and phased improvement strategies.
