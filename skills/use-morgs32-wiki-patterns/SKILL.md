---
name: use-morgs32-wiki-patterns
description: >-
  Consult Morgan's shared TypeScript, Effect, RPC, runtime, testing, and naming
  patterns when implementing or reviewing code, or when asked about those
  conventions. Read only references relevant to the task.
---

# Use Morgs32 Wiki Patterns

Shared reference library from `morgs32/wiki`. Repository instructions and
project-local patterns take precedence when they are more specific.

Search [the pattern index](references/patterns/index.md) for task keywords and
read only matching references. Code examples show preferred shapes; `@bad`
tags identify rejected shapes. When no pattern matches, follow repository and
user instructions rather than generalizing an unrelated example.

For proposed capabilities, guarantees, abstractions, compatibility paths, or
cross-owner coordination, consult
[YAGNI and coordination cost](references/patterns/runtime/yagni-before-coordination.md).
For exploration and verification, consult
[scoped execution](references/patterns/tooling/scoped-execution.md).

Apply relevant guidance within the requested scope. To change this library,
use `$update-morgs32-wiki` in the canonical `morgs32/wiki` checkout. Its `skills/`
directory is the source; `~/.agents/skills` may link directly to it.
