---
allowed-tools: Read, Grep, Glob, Bash(git status:*), Bash(git diff:*), Bash(git log:*), Bash(git tag:*)
argument-hint: [scope-or-version]
description: Prepare a release summary, checklist, and rollout plan
---

Prepare this change for release.

Release scope or version: $ARGUMENTS

Use @.claude/docs/release-checklist.md as the baseline.

Produce:

1. Release summary
2. User-visible changes
3. Migration or config changes
4. Risk assessment
5. Rollback plan
6. Final checklist

Keep the output concise and operator-friendly.
