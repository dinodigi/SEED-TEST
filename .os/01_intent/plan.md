# LexCore AI — Plan to v1

## Where we are
Project is freshly bootstrapped. Stack is chosen (Next.js 14, TypeScript, Postgres, Clerk, OpenAI, Replit). No code written yet. This plan defines the five milestones that take us from zero to a usable v1 in the hands of real attorneys.

---

## Milestones to v1

### M1 — Foundation (target: ~2 weeks)
**Goal:** Working skeleton deployed on Replit with auth and database connected.

**Includes:**
- Replit environment configured (`.replit`, `replit.nix`, env vars wired)
- Next.js 14 app bootstrapped with TypeScript strict mode
- Tailwind CSS + shadcn/ui component library installed
- Clerk authentication integrated (email/password, magic-link, Google OAuth)
- Prisma schema defined: `User`, `Matter`, `Document`, `Task`, `MatterMember`
- Initial database migration run against Postgres
- Protected route middleware in place
- Basic shell UI: top nav, sidebar, empty dashboard

**Done when:** A new user can sign up, sign in, and see an empty dashboard on the live Replit URL.

---

### M2 — Case Management Core (target: ~2 weeks)
**Goal:** Attorneys can create and manage matters with tasks and deadlines.

**Includes:**
- Matter creation / edit / archive UI and API routes
- Matter detail page (overview, documents tab, tasks tab)
- Task creation with due dates and assignees (matter members)
- Role-based access control enforced server-side (attorney, paralegal, viewer)
- Matter member invite flow
- Basic status badges (Active, Discovery, Trial Prep, Closed)

**Done when:** A user can create a matter, invite a colleague, add tasks with due dates, and see the matter in a dashboard list.

---

### M3 — Document Ingestion & AI Extraction (target: ~3 weeks)
**Goal:** Documents can be uploaded and automatically analysed by AI.

**Includes:**
- File upload UI (drag-and-drop, PDF/DOCX support)
- Server-side document parsing (pdf-parse / mammoth)
- OpenAI extraction pipeline: parties, timeline events, key facts, obligations, risk flags
- Structured extraction stored in Postgres (`DocumentExtraction` table)
- Document detail page showing raw text + extracted intelligence panels
- Background job queue for async processing (or simple server action with streaming status)

**Done when:** Upload a PDF contract → within 60 seconds see extracted parties, a timeline, and key obligations on the document detail page.

---

### M4 — Document Q&A (target: ~2 weeks)
**Goal:** Attorneys can ask natural language questions against the case record and get grounded answers.

**Includes:**
- Text chunking and embedding pipeline (OpenAI `text-embedding-3-small`)
- Vector storage (pgvector extension on Postgres)
- RAG query endpoint: embed question → retrieve top-k chunks → generate cited answer
- Chat UI on matter page: question input, streamed response, cited source snippets
- Conversation history stored per matter

**Done when:** Type "What are the payment obligations under the MSA?" and receive a cited, accurate answer drawn from uploaded documents.

---

### M5 — Polish & Launch Prep (target: ~1 week)
**Goal:** Product is stable, secure, and ready for first real users.

**Includes:**
- End-to-end QA pass across all features
- Error boundaries and user-facing error messages
- Loading skeletons / optimistic UI
- Empty states with onboarding prompts
- Rate limiting on AI endpoints
- Basic usage guardrails (max file size, max documents per matter in free tier)
- `README.md` and environment setup docs
- Final Replit deployment check

**Done when:** Three attorneys from outside the team can complete the core loop (sign up → create matter → upload docs → ask a question) without hitting a blocking error.

---

## Out of scope for v1
- Billing, invoicing, time-tracking
- Court filing / e-filing integrations
- Westlaw / LexisNexis / legal research API integrations
- Real-time collaborative editing
- Mobile native apps
- Custom AI model fine-tuning or BYOM
- Multi-language document support
- Advanced analytics dashboards
- Audit log export / compliance reporting

---

## Beyond v1
- **v1.1** — Billing integration (Stripe), usage-based AI credits, team subscription plans
- **v1.2** — Legal research integration (Casetext / CourtListener API)
- **v1.3** — Timeline visualisation, deposition prep tools
- **v2.0** — Native mobile app, real-time collaboration, AI-generated motion drafts

---

## Risks named
1. **OpenAI latency / cost** — extraction pipelines on large PDFs can be slow and expensive; mitigate with chunking limits and async queuing from day one.
2. **Document parsing quality** — scanned PDFs without OCR will produce poor extractions; scope to text-native documents for v1.
3. **Attorney trust in AI output** — legal professionals are sceptical; every AI output must show citations and be clearly labelled as AI-generated.
4. **Data sensitivity** — legal documents are highly confidential; enforce strict matter-level access control and document no-logging policy with OpenAI from the start.
5. **Scope creep** — legal practice management is a deep domain; hold the line on the "out of scope" list ruthlessly.

---

## How this plan stays alive
- Each milestone maps to a roadmap entry in `roadmap.json`
- Tasks are created and refined per milestone as work begins
- This file is updated at the start of each milestone to reflect scope changes
- Risks are reviewed at each milestone retrospective
