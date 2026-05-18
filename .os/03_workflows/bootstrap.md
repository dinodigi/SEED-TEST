---
id: bootstrap
# Intentionally empty. Bootstrap is NOT on the event-driven dispatch path
# in v1: discovery completion is a user-initiated UI action that calls
# runWorkflow directly with createBootstrapApplier. The _triggers.json map
# still names discovery.completed → bootstrap as the future autonomous
# wiring (see S-002); v1 invokes this playbook directly, not via the
# event router. Do not "fix" this empty array to make the trigger appear —
# the deliberate omission is the contract.
triggers: []
loads:
  - 00_identity/discovery.json
output_schema: schemas/bootstrap-output.schema.json
description: Take a completed discovery transcript and produce a complete .os/ folder + root scaffolding.
---

# Bootstrap a new project

You are setting up a new project from a discovery transcript. The user has just answered 8-15 questions about what they're building. Your job is to turn those answers into a fully-functioning `.os/` folder and the deploy-target-specific root files.

## Inputs

- `00_identity/discovery.json` — the complete answer transcript

## Outputs (write via core operations)

1. `00_identity/project.json` — the project identity record
2. `00_identity/stack.json` — the stack choices
3. `01_intent/brief.md` — distilled product brief (~80-100 lines, structured: what / who / what it does / what it isn't / core promise / out of scope)
4. `01_intent/plan.md` — milestones with target dates, scope per milestone, out-of-scope-for-v1 list
5. `01_intent/architecture.md` — tech overview, stack rationale, key decisions
6. `01_intent/roadmap.json` — structured milestone data
7. `02_state/tasks/` — 8-12 starter tasks seeded based on stack choices
8. `02_state/epics/` — initial epics grouping the seed tasks
9. `04_knowledge/library/*` — snapshot library entries relevant to chosen features
10. `05_agent/system.md` — project-specific agent prompt
11. Root scaffolding files based on `stack.json.deploy_target`

## How to think about seed tasks

Look at `stack.json` and `discovery.json.answers.mvp_features`. For each MVP feature, seed 1-3 tasks. For each stack choice that requires setup (auth, db, deploy), seed a setup task.

Examples:
- If `auth_needed` includes magic-link → seed "Set up Clerk + magic-link auth" task
- If `database` is postgres → seed "Initial schema + migrations" task
- If `deploy_target` is replit → seed "Configure .replit + replit.nix" task

## How to think about library snapshots

Look at `discovery.json.answers.mvp_features` and tags. For each feature that maps to a library category (auth, multi-tenancy, payments, file-uploads, search, notifications, feature-flags, observability, ai-features), copy that category's entries into the user's `library/`. Pin the version in `library/_version.json`.

## How to write brief.md

Use this structure exactly:
1. ## What we're building (3-5 sentences, no marketing-speak)
2. ## Who it's for (specific audience, not "everyone")
3. ## What it does (numbered: capture / surface / edit / keep, or the equivalent for their product)
4. ## What it isn't (3-5 explicit non-goals)
5. ## Core loop (one-line narrative)
6. ## MVP scope (bulleted)
7. ## Out of scope v1 (bulleted)

## How to write plan.md

Use the structure in our own `01_intent/plan.md` as a template:
- ## Where we are
- ## Milestones to v1 (5 milestones, each with goal/includes/done-when)
- ## Out of scope for v1
- ## Beyond v1 (rough roadmap)
- ## Risks named
- ## How this plan stays alive

## Output expectations

- Every artifact validates against its schema (run validation before writing)
- Every file write goes through core operations
- Append a `project.bootstrapped` event when complete
- Append a `bootstrap.summary` changelog entry with the counts of generated files/tasks/library entries
