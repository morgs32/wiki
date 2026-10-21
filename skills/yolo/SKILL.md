---
name: yolo
description: >-
  Apply clean-slate design and a hard cutover when the user invokes yolo:
  preserve requirements, reconsider the implementation, and replace legacy paths.
---

# Yolo mode

YOLO means clean-slate design, hard cutover, and reset of affected obsolete state
within the authorized scope.

## Rules

- Preserve requirements and explicitly chosen concepts. Reconsider their
  implementation, ownership, storage, and lifecycle from scratch; keeping a
  concept does not mean keeping its implementation.
- DISREGARD all existing machinery. Do not be constrained to a bad design!
- Include required lifecycle behavior now, including replacement and rotation.
  YOLO does not justify deferring requirements.
- Implement one coherent target design. Carry forward no legacy tables,
  provisioning states, migrations, aliases, deprecated wrappers, or compatibility
  paths by default. Retain existing implementation only when the target design
  independently justifies it or the user explicitly requires it.
- Reset affected obsolete state within the authorized scope. A skill invocation
  does not authorize deleting unrelated storage or credentials; resolve missing
  target or deletion authorization before performing a reset.
- Validate the resulting design and behavior with appropriate scoped checks.

## Example

An instance needs secret and publishable credentials. Preserve those requirements,
then redesign credential ownership, provisioning, replacement, and rotation from
scratch. Inherit no existing table layout or provisioning states, and add no
migration or compatibility paths by default. Any reset or credential deletion
must stay within the authorized scope.
