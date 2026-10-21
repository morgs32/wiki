---
name: prototype
description: >-
  Explore UI directions with runnable, switchable layout variants in the app,
  then refine the chosen direction. Use for UI prototypes, alternative page
  layouts, visual exploration, interface styling reviews, or UI polish.
  Logic-only and state-model exploration belongs elsewhere.
license: MIT
---

# Prototype

Build enough UI to answer the design question. For exploration, make alternatives
easy to compare in context. For a styling review or polish request, apply the
interface details below to the requested surface; do not introduce variants
unless the user wants alternatives.

## Explore directions

1. Identify the question from the request and the existing page. State the
   exploration in one sentence: which surface, which decision, and where to
   view it. Use the requested number of variants; otherwise start with three.
2. Prefer mounting variants in the existing page, alongside its real header,
   navigation, and surrounding content. Preserve authentication, route params,
   and data loading. Create a clearly named prototype route only when no
   existing page fits, following the project's routing conventions.
3. Make the alternatives disagree about layout, information hierarchy, or the
   primary interaction. Colour and copy changes alone do not answer a layout
   question. Use the project's component library and styling system. Share
   primitives where useful, but let each variant own its composition.
4. Use the same representative data across variants so the comparison is fair.
   Honour supplied mock data. Existing read-only data can provide context;
   prototype interactions use local state or stubs rather than live writes.
   Keep temporary code recognisable and close to the page it explores.

## Make comparison easy

- Select variants with a `?variant=` URL parameter through the framework's
  router. Preserve unrelated search parameters and keep each option linkable
  and stable across reloads.
- Add a compact floating bar at the bottom centre with previous/next buttons
  and a descriptive current label, such as `B — Sidebar`. Wrap around when
  cycling. Keep the bar visually separate from the designs and clear of key
  controls, including on small screens.
- Use labelled buttons. If adding left/right keyboard shortcuts, do not take
  arrow keys from text editing or controls that already use them.
- Keep the switcher and experimental variants out of normal production use
  through the project's development or preview convention. Keep temporary
  switching code local unless an existing shared component already fits.
- Use the existing task runner to start the app, verify the variants render
  and switch in the browser, and provide the route and variant links. Report
  any verification that could not be performed.

## Settle the direction

Let the user choose a variant or combine specific parts. Record the choice and
what it resolves. When implementation is requested, integrate that direction
using normal project standards, then remove the temporary switcher and losing
variants within the authorised scope. A prototype being runnable does not prove
production readiness. Commit, publish, or archive it only when requested.

## Interface details

For UI changes, use [Jakub Krehel's Details that make interfaces feel better](https://jakub.kr/writing/details-that-make-interfaces-feel-better) as a review reference:

- Judge icon and text alignment optically; allow less padding on the icon side of a button and correct asymmetric icons in the SVG where possible.
- Use `text-wrap: balance` for headings and `text-wrap: pretty` for paragraphs where they improve wrapping.
- Keep nested rounded corners concentric: outer radius = inner radius + padding.
- Check macOS text weight; consider `-webkit-font-smoothing: antialiased` consistently at the layout level.
- Use `font-variant-numeric: tabular-nums` for changing or column-aligned numbers.
- Animate contextual icon swaps with opacity, scale, or blur; keep motion restrained.
- Keep interaction animations interruptible; prefer CSS transitions for changing targets and keyframes for staged sequences.
- Stagger entering groups where useful and make exits subtler than entrances.
- Consider layered, low-opacity shadows for depth and a subtle inset outline for images.

## Source

UI exploration adapted from Matt Pocock's
[`prototype`](https://github.com/mattpocock/skills/blob/main/skills/engineering/prototype/SKILL.md)
and [`UI.md`](https://github.com/mattpocock/skills/blob/main/skills/engineering/prototype/UI.md),
reviewed 2026-10-21. Copyright (c) 2026 Matt Pocock; MIT License.
See [LICENSE](LICENSE) for the upstream notice.
