---
name: implement
description: >-
  Implement an approved plan or specified change, resolve unfinished work and
  required verification in the same chat, and archive a completed plan. Use for
  implementation and for continuing incomplete implementation work.
---

# Implement

Own the work through verified completion. Use the active repository's `AGENTS.md`,
project guidance, and permitted checks. A failed, blocked, unrun, or explicitly
deferred required check is unfinished work, even when the code is written.

## Work

1. Read the approved plan or request, relevant code and guidance, current diff,
   and any existing work in progress. Keep settled decisions settled. Implement
   the complete requested behavior, including its error and resume paths; do
   not leave known results unwired, stubs, or no-op hooks.
2. Keep edits within the approved scope. Preserve unrelated work and relevant
   comments, and update documentation affected by the change. Follow the
   repository's [scoped execution guidance](../use-morgs32-wiki-patterns/references/patterns/tooling/scoped-execution.md)
   for discovery and checks when available.
3. Verify at the relevant seams as work progresses, using checks allowed by
   the active repository. Review the result against the plan's behavior and
   the repository's conventions. Resolve in-scope failures in this chat, then
   rerun the checks affected by each fix. Do not stop at a list of files
   changed while required work remains.
4. If an existing issue outside scope blocks a required check, diagnose enough
   to propose a bounded repair and ask before expanding scope. When progress
   requires a material decision, credentials, permission, or an external-state
   change, identify the exact blocker and recommended next action. Do not
   repeatedly retry without new evidence. Keep an unanswered question open;
   when the user answers, resume the same implementation through verification
   and archival.

## Plan status

When an active plan exists, keep a **Remaining work** section at its end. List
unfinished behavior and every failed, blocked, unrun, or explicitly deferred
required check, with the evidence and next action for each. Keep the plan
active when implementation is complete but verification is pending.

After implementation and required verification are complete, record the
outcome, set **Remaining work: None**, and archive the plan according to the
active project's conventions. In projects using [`spec` document conventions](../spec/SKILL.md#document-conventions),
preserve the filename and repair inbound and relative links. Cancellation or
supersession follows those conventions; do not present it as verified completion.
If the request exists only in chat, track its remaining work there instead of
creating a plan just for archival. Keep governing ADRs active.

## Report

When blocked, lead with **INCOMPLETE — decision needed**. Put the exact
remaining items and a recommended resolution before the change summary, and
ask a concrete blocking question. Do not hide them in a verification paragraph.

Every final implementation report ends with **Remaining work:** followed by
the actionable items or **None**. Include concise verification evidence and a
link to the active or archived plan when one exists. Invoking this skill does
not itself authorize committing, publishing, destructive operations, or work
in another chat.
