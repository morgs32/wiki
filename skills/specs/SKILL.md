---
name: specs
description: >-
  Write, review, or organize Zerospin behavioral tests by assigning input
  validation to RPC and SDK boundaries and testing internal methods with valid
  props. Use for method specs and test coverage decisions, not architecture
  specifications or a repository-wide quality pass.
---

# Specs

Test each method over its admitted input domain. Test malformed input at the
boundary that admits it. Test business failures where the business decision
happens.

## Choose the subject and its guarantees

Trace the requested method's callers, RPC decoding, and SDK construction. Identify
which guarantees actually hold before the method runs. A TypeScript annotation
alone is not runtime validation; neither is a schema refinement necessarily
represented by its inferred TypeScript type. Do not assume every SDK export
parses, or that every reader of persisted data admits untrusted input.

Assign each case to its owner:

| Subject | What to exercise |
| --- | --- |
| Internal method | Valid props; outputs, state changes, business refusals, and relevant dependency failures |
| Public RPC handler | Successful admission; malformed requests, mapped errors, and absence of downstream work |
| SDK constructor | Construction, normalization, identity, and runtime invariants it promises |
| Authored TypeScript API | Accepted types, inference, and rejected calls in the typecheck lane |

Valid props do not imply success. A well-formed identifier may name a missing
entity; an admitted quantity may exceed available stock. Authorization, conflicts,
ordering, cancellation, retry, and recovery still need coverage when the method
owns those promises. Do not move these cases to a schema suite.

## Write or review the specs

- Use valid fixtures for internal calls. Use the real SDK constructor when it
  establishes required identity or invariants; plain typed literals are sufficient
  when no such construction is required. Do not cast malformed props into an
  internal method to invent defensive behavior outside its contract.
- Exercise malformed requests through the public RPC handler that decodes them.
  Assert its mapped error and that the next repo or chain operation did not run.
  Include successful admission. Do not substitute direct schema decoding for
  evidence that the handler uses the schema correctly.
- Test SDK runtime invariants at the constructor that owns them. Keep static
  misuse cases in a compiler-checked file; ordinary Vitest execution does not
  establish type safety. Avoid repeating either guarantee in downstream specs.
- Test application-specific parsing and cross-field rules where they are owned.
  Avoid catalogs that merely re-test schema-library primitives, values the actual
  transport cannot deliver, or artificial corruption of bytes this process wrote
  unless corruption handling is part of the requested contract.
- Assert observable promises, not incidental helpers or call order. Name suites
  after behavior. Before removing a case, identify its surviving coverage or the
  obsolete contract; a validation-looking failure may protect a domain invariant.

## Run in the owning runtime

Consult the active repository's `wiki/patterns/index.md` and test configuration.
Keep Node, workerd, React, and browser integration in their existing lanes; do not
rename a generic spec suffix merely because another package uses `.node.spec.ts`.
Use `it.effect` for Effect-native specs and capture expected failures with
`Effect.exit`. Keep fixtures local and use deterministic coordination for ordering.
Run the affected Nx target, plus typechecking when authored API assertions change.
Stay within the requested methods; this skill does not authorize a broad cleanup.

Read [examples](references/examples.md) when choosing case placement or writing
Effect/Vitest assertions. It includes RPC, SDK, and typecheck examples and concise
supporting literature.
