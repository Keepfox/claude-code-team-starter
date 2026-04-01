# Frontend Change Checklist

Use this skill when a task changes user-facing UI, component behavior, styling, or interaction flows.

## What to check

- the smallest relevant UI-oriented test or lint path was used before broader runs
- changed states are still understandable: loading, empty, success, and error
- accessibility impact is called out when semantic structure, focus order, or keyboard behavior changes
- responsive behavior or layout fragility is mentioned when components or pages were touched

## Suggested commands

- the repo's smallest relevant lint command
- the narrowest relevant UI test command
- a targeted typecheck when the stack uses TypeScript

## Output shape

- Scope of the UI change
- Verification performed
- UX or accessibility notes

## Suggested pairing

- Pair with `posttool-frontend-quality-context.mjs` for deterministic reminders after edits.
- Pair with the `code-reviewer` subagent when a UI change crosses multiple screens or states.
