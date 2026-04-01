# Command Catalog

This starter ships with a small base command set plus extra commands from optional variants.

Keep the names simple. The best commands are the ones your team can remember without opening a wiki.

## Base commands

## `/check-setup`

Use when you want a quick audit of starter files, local ignore rules, and missing MCP environment variables.

## `/fix-test`

Use when a test or verification step is failing and you want the smallest safe fix.

## `/incident`

Use when a bug report, production issue, or flaky symptom needs structured triage.

## `/pr-ready`

Use when you want a merge-oriented summary with tests, risks, and follow-up notes.

## `/review`

Use when you want a findings-first review of the current working tree.

## `/review-security`

Use when you want the current changes checked for security issues before merge or release.

## `/ship`

Use when you want release notes, rollout risks, and a final change summary.

## `/spec`

Use when you want a plan before implementation starts.

## `/summarize-diff`

Use when you want a compact changelog-style summary of the current changes.

## Variant commands

These commands appear only when you install the matching variant.

## `/check-api`

Variant: `backend`

Use when you want an API-focused pass over service behavior, migrations, and request or response changes.

## `/check-data`

Variant: `data`

Use when you want a data-oriented review of schema changes, downstream dependencies, and pipeline impact.

## `/check-ui`

Variant: `frontend`

Use when you want a UI-quality pass over states, accessibility, and visible regressions.

## `/client-update`

Variant: `consulting`

Use when you want a client-facing status update with scope, risks, and next steps.

## `/release-readiness`

Variant: `release-engineering`

Use when you want an operator-friendly check of rollout steps, rollback safety, and monitoring gaps.

## `/threat-model`

Variant: `security`

Use when you want a quick pass over trust boundaries, abuse paths, and secret or auth risk.

## `/triage-ticket`

Variant: `support-triage`

Use when you want a ticket-driven investigation flow with reproduction, evidence, and next actions.
