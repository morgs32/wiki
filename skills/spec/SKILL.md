---
name: spec
description: >-
  Grill an unresolved design one decision at a time, sharpen the domain model,
  then write or review an implementation plan in the active project's planning
  tree. Defer glossary updates and warranted ADRs until after implementation.
  Use when the user says /spec, requests a design interview, implementation
  plan, or plan review.
---

# Spec (grill → plan)

Use `spec` as the entrypoint for design decisions and plans. Do not create new
spec files. For a requested plan revision, review, or archival, work on that
document directly; do not restart the interview.

## Phase 1 — Grill

Resolve material design choices until you and the user share an understanding.
Ordinary fixes and already specified implementation do not require this workflow.

1. Map the design as a tree of dependent decisions. Ask **one question at a
   time**, with a brief recommended answer; settle prerequisites before asking
   downstream questions. Wait for the user's answer. Stop when no material
   decisions remain silently assumed.
2. Look up facts in the codebase and wiki rather than asking the user. Ask
   about unresolved decisions, not routine implementation details or decisions
   already requested or approved.
3. Challenge vague or overloaded terms with a proposed canonical term. Check
   claims against current code and existing glossary entries; surface
   contradictions. Use concrete scenarios to test domain boundaries.
4. Consult the project's existing glossary and ADRs as reference material.
   Keep agreed terminology, decisions, alternatives, and rationale in the
   conversation, then carry them into the implementation plan. If no glossary
   exists, defer asking to create one until after implementation.
5. Do not update the glossary or create ADRs during the interview or planning.
   These records must reflect what was actually implemented; marking a
   proposal "unimplemented" does not justify writing them early.
6. Do not write code or a new plan until the user confirms shared
   understanding (or explicitly asks for the plan).

### Material decisions and approval

Confirm unrequested abstractions, public-contract changes, named domain
concepts, and runtime or trust-boundary moves before including them in the
design. State the proposed purpose, shape or contract, exact use sites, and
meaningful trade-offs. A new local function or type is not automatically a new
design decision.

Explicit requests and prior approvals settle the corresponding decisions: do
not ask again while writing the plan or implementing it. Routine details
within the approved design need no separate confirmation. When a material
unresolved choice arises during implementation, resolve that choice without
forcing a new document or restarting the interview.

Vet inherited constraints: identify the invariant, trace why today's
dependency exists, test whether proposed ownership still needs it, and
consider removing redundant work before adding coordination. Existing code,
docs, and previous explanations are evidence, not proof that a historical
mechanism must survive.

### Relevant evidence

Use the active project's routing and indexes to find only the architecture
pages, glossary terms, patterns, and source needed for the decision. Reuse
evidence already read. Source establishes current behavior; architecture
documentation describes intended behavior. Report discrepancies rather than
assuming either is authoritative about a new design. Do not require a fixed
reading tour of every documentation tree.

## Document conventions

Use the active project's `wiki/` for shared work and decision records unless
the user explicitly names another destination. Plans are work that a person or
agent can pick up; ADRs explain decisions that still govern the system.

| Kind               | Active path                      | Archive path             |
| ------------------ | -------------------------------- | ------------------------ |
| Plan               | `wiki/plans/XXX-plan-<topic>.md` | `wiki/archive/plans/`    |
| ADR                | `wiki/adrs/XXX-<decision>.md`    | `wiki/archive/adrs/`     |
| Handoff            | `wiki/handoffs/`                 | `wiki/archive/handoffs/` |
| Standalone diagram | `wiki/diagrams/`                 | `wiki/archive/diagrams/` |
| RFC                | `wiki/rfcs/`                     | `wiki/archive/rfcs/`     |
| Research           | `wiki/research/`                 | `wiki/archive/research/` |

1. Read root `AGENTS.md` and locate existing documents before writing. Revise
   existing work instead of creating duplicate records. Keep the glossary at
   its existing location, normally `wiki/glossary.md`. Create directories only
   when there is a document to put in them.
2. Use ordered lists for plan bullets and steps, and numbered findings when
   reviewing a plan.
3. For a new plan, inspect plan and legacy spec filenames under `wiki/` that
   begin with three digits. Use one more than their highest prefix, including
   archived files. Do not count ADRs or filenames without a three-digit prefix.
   Existing specs may inform a plan, but do not create or require a matching
   spec. Reuse an existing number and topic when continuing the same numbered
   work. Allocate ADR numbers independently across `wiki/adrs/` and
   `wiki/archive/adrs/`; link them from related plans. Keep unfinished legacy
   specs in `wiki/specs/` and archived specs in `wiki/archive/specs/`.
4. Move a plan to `wiki/archive/plans/` when no work remains: either its
   implementation and verification are complete, or the user has cancelled
   or superseded it. Record that outcome and where any continuing work lives;
   do not silently abandon unfinished work. Preserve the filename.
5. Keep an ADR in `wiki/adrs/` while it still governs anything, even after its
   originating plan is complete. **Mark a replaced ADR Superseded and link its
   successor.** Archiving is optional: move it to `wiki/archive/adrs/` only
   when it no longer governs anything and the user or repository policy calls
   for archiving inactive decisions. Do not archive an ADR merely because it
   is old or its implementation is complete.
6. Preserve filenames and repair inbound and relative links when moving any
   document. For handoff naming and archival, use
   [handoff](../handoff/SKILL.md#destination-and-lifecycle).

## Phase 2 — Plan

After the user confirms alignment:

1. Sketch the **test seams** for the change. Prefer existing seams and as few
   as practical. Confirm only unresolved material testing choices; reuse seams
   already requested or approved.
2. Write one actionable plan at
   `wiki/plans/XXX-plan-<topic>.md`, unless the user asked only for a
   review or revision. Include the problem, agreed behavior, terminology,
   decisions, alternatives and rationale, implementation steps, verification
   at the chosen seams, and explicit scope. Link relevant existing ADRs as
   reference material. Use project glossary terms where applicable and number
   every list.
3. Include a post-implementation documentation step in the plan, following
   the requirements below. Do not perform that step while planning.
4. Do not publish to an issue tracker unless asked. Keep the plan current as
   implementation changes; use [implement](../implement/SKILL.md) to complete
   the work and archive it according to the lifecycle above.

### Post-implementation documentation

After implementation, reconcile the plan's terminology and decisions with
the actual result before completing its documentation step:

1. Update the existing glossary, normally `wiki/glossary.md`, with implemented
   terminology. If none exists and creation has not been authorized, prompt
   the user to make one and wait for their answer before creating it. Keep
   definitions about domain meaning, not implementation details.
2. Create an ADR only if the implemented decision is **hard to reverse**,
   **surprising without context**, and the result of a **real trade-off**.
   Follow the project's ADR format; otherwise record context, decision,
   alternatives, consequences, and status. Link it from the related plan.
   Do not create ADRs for routine choices or unimplemented proposals.

## Done when

1. Factual questions were answered from current evidence; material decisions
   were settled with the user and not re-asked.
2. Agreed terminology, decisions, alternatives, and rationale remain in the
   conversation and requested plan; no glossary updates or ADR creation
   occurred during the interview or planning.
3. The plan includes post-implementation glossary reconciliation and ADR
   creation only for implemented decisions meeting all three criteria.
4. A requested new plan is actionable and lives in `wiki/plans/`; no new spec
   file was created.
