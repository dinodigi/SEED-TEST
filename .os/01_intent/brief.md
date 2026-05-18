# LexCore AI — Product Brief

## What we're building
LexCore AI is an AI-native legal case management and document intelligence platform built for law firms, litigation teams, and solo attorneys. It combines structured case workflow management with deep document analysis powered by large language models. Legal professionals can upload case files, contracts, and discovery documents and immediately get extracted timelines, key facts, entities, and risk flags. The platform acts as a second brain for every active matter.

## Who it's for
- **Law firms** (small to mid-size, 1–50 attorneys) managing active litigation or transactional matters
- **Litigation teams** that deal with high document volume and need rapid extraction and synthesis
- **Solo attorneys** who need the leverage of a full team but operate alone

Not for: enterprises with bespoke legal ops infrastructure, non-legal document review workflows, or purely administrative practice management (billing, payroll).

## What it does
1. **Capture** — Ingest case documents (PDF, DOCX, email exports) and associate them with a matter/case
2. **Extract** — AI automatically pulls out timelines, parties, key facts, obligations, deadlines, and risk signals
3. **Surface** — Query documents in natural language; get cited, grounded answers from the case record
4. **Organise** — Track case status, tasks, deadlines, and team assignments in a structured case workspace
5. **Keep** — Maintain a persistent, searchable record of every matter for institutional memory

## What it isn't
- Not a billing or time-tracking system (no invoicing, no LEDES exports in v1)
- Not a court filing or e-filing integration
- Not a general-purpose document storage product (not a Dropbox replacement)
- Not a compliance or regulatory reporting tool
- Not a multi-jurisdictional legal research engine (no Westlaw/LexisNexis integration in v1)

## Core loop
Attorney opens a matter → uploads documents → AI extracts and indexes key facts → attorney queries, reviews, and acts on the intelligence → case moves forward faster.

## MVP scope
- User authentication (email/password, magic-link, Google OAuth) via Clerk
- Case/matter creation and management dashboard
- Document upload with automatic AI extraction (parties, timeline, key facts, obligations)
- Natural language document Q&A with source citations
- Basic task and deadline tracking per matter
- Role-based access (attorney, paralegal, viewer) per matter
- Responsive web UI (Next.js + Tailwind)
- Postgres persistence via Prisma ORM
- Deployment on Replit

## Out of scope v1
- Mobile native apps
- Billing, invoicing, or time-tracking
- Court filing / e-filing integrations
- Legal research database integrations (Westlaw, LexisNexis)
- Real-time collaboration / live cursors
- Custom AI model fine-tuning
- Advanced analytics and reporting dashboards
- Multi-language document support
