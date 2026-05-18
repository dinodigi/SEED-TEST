# LexCore AI — Architecture

## Overview
LexCore AI is a monolithic Next.js 14 application using the App Router, deployed on Replit. It combines a React frontend, Next.js API routes / server actions as the backend, Postgres (with pgvector) as the primary datastore, Clerk for authentication, and OpenAI for all AI capabilities. The architecture prioritises simplicity and rapid iteration over microservices complexity.

---

## Stack at a glance

| Layer | Choice | Rationale |
|---|---|---|
| Framework | Next.js 14 (App Router) | Full-stack TypeScript, excellent DX, RSC for data fetching |
| Language | TypeScript (strict) | Type safety critical in legal data domain |
| Styling | Tailwind CSS + shadcn/ui | Fast UI iteration, accessible components out of the box |
| Auth | Clerk | Managed auth with magic-link + OAuth, minimal setup, good Next.js middleware support |
| Database | Postgres (Neon / Replit DB) | Relational data fits case/matter domain; pgvector for embeddings |
| ORM | Prisma | Type-safe queries, migration management, schema-as-code |
| AI | OpenAI (GPT-4o + embeddings) | Best-in-class extraction and Q&A; function calling for structured extraction |
| Vector search | pgvector | Keeps vector search in Postgres, no extra infra |
| Validation | Zod | Runtime + compile-time safety for all API inputs and AI outputs |
| Deploy | Replit | Frictionless deployment, collaborative editing, easy env var management |

---

## Application structure

```
/app
  /(auth)/          — Clerk-managed sign-in / sign-up pages
  /(dashboard)/
    /dashboard/     — Matter list, overview
    /matters/[id]/  — Matter detail (docs, tasks, chat)
    /matters/new/   — Create matter
  /api/
    /documents/     — Upload, process, fetch
    /matters/       — CRUD
    /chat/          — RAG query endpoint (streaming)
    /webhooks/      — Clerk webhooks (user sync)
/components/        — Shared UI components
/lib/
  /ai/              — Extraction pipeline, embedding, RAG
  /db/              — Prisma client, query helpers
  /auth/            — Clerk helpers, RBAC utilities
  /parsers/         — PDF / DOCX text extraction
/prisma/
  schema.prisma
/middleware.ts      — Clerk auth middleware (protect all /dashboard routes)
```

---

## Data model (key entities)

```
User              — synced from Clerk via webhook
Matter            — a legal case or matter (name, status, type, client)
MatterMember      — join table: User ↔ Matter with role (attorney | paralegal | viewer)
Document          — uploaded file metadata (name, storage path, mime type, status)
DocumentChunk     — text chunks with pgvector embeddings for RAG
DocumentExtraction— structured AI output (parties, timeline[], facts[], obligations[], risks[])
Task              — deadline-tracked action item linked to a Matter
ChatMessage       — per-matter Q&A history (question, answer, cited chunk ids)
```

---

## AI pipelines

### Extraction pipeline (async, triggered on upload)
1. File received → stored (Replit object storage or `/tmp` for v1)
2. Text extracted (pdf-parse for PDF, mammoth for DOCX)
3. Text chunked (512 token windows, 64 token overlap)
4. OpenAI `gpt-4o` called with structured extraction prompt → JSON output validated with Zod
5. Extracted entities persisted to `DocumentExtraction`
6. Each chunk embedded with `text-embedding-3-small` → stored in `DocumentChunk` with pgvector

### RAG query pipeline (real-time, streaming)
1. User question received
2. Question embedded with `text-embedding-3-small`
3. Top-8 chunks retrieved via pgvector cosine similarity, scoped to the matter
4. Context window assembled: system prompt + retrieved chunks + conversation history
5. `gpt-4o` streams answer with inline source citations
6. Response and citations stored in `ChatMessage`

---

## Authentication & authorisation
- Clerk handles all authentication (sessions, JWTs, OAuth, magic-link)
- `middleware.ts` protects all `/dashboard/*` and `/api/*` routes
- Matter-level RBAC enforced in server actions / API route handlers:
  - `attorney` — full read/write on their matters
  - `paralegal` — upload docs, manage tasks, no matter settings
  - `viewer` — read-only
- Users are synced to Postgres `User` table via Clerk webhook on `user.created` / `user.updated`

---

## Key architectural decisions

**1. Monolith over microservices**
For v1, one Next.js app is faster to build and deploy. AI pipeline can be extracted to a worker service in v2 if latency becomes an issue.

**2. pgvector over a dedicated vector DB**
Keeps the stack minimal. Avoids managing Pinecone/Weaviate. Revisit if vector search performance degrades at scale (>1M chunks).

**3. Server Actions for mutations**
Next.js server actions eliminate the boilerplate of separate API routes for form submissions. Complex or public-facing endpoints (file upload, chat stream) use Route Handlers.

**4. Streaming responses for chat**
The RAG endpoint uses the Vercel AI SDK's streaming helpers to give instant feedback — critical for perceived performance in a chat interface.

**5. Scoped AI context per matter**
All RAG queries are scoped to the matter the user is currently in. This enforces data isolation and keeps answers relevant, preventing cross-matter data leakage.

---

## Deployment (Replit)
- `.replit` configures the run command (`npm run dev` → `next start` after build)
- `replit.nix` pins Node.js 20 and system deps (including poppler for PDF rendering if needed)
- Environment variables set via Replit Secrets UI
- Postgres provisioned via Replit's built-in database or Neon free tier
- pgvector extension enabled via `CREATE EXTENSION vector;` in a migration
