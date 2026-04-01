---
allowed-tools: Read, Grep, Glob, Bash(git status:*), Bash(git diff:*), Bash(git log:*)
argument-hint: [scope]
description: Prepare a PR-ready summary with risks, tests, and follow-up notes
---

Prepare the current work for a pull request.

Scope: $ARGUMENTS

Use the current working tree and recent commits to produce:

1. Title candidates
2. Summary
3. Why this change exists
4. Test evidence
5. Risks
6. Follow-up items

Keep it concise and reviewer-friendly.
