---
allowed-tools: Read, Grep, Glob, Bash(git status:*), Bash(git diff:*), Bash(git log:*)
argument-hint: [focus]
description: Review the current working tree and report findings first
---

Review the current working tree like a senior engineer.

Context:

- Git status: !`git status --short`
- Current branch: !`git branch --show-current`
- Recent commits: !`git log --oneline -5`

Focus: $ARGUMENTS

Instructions:

- Review behavior, regressions, security, and test coverage first.
- Prioritize findings by severity.
- Quote exact files and functions when possible.
- Keep the summary brief.
- If no meaningful issues are found, say so directly and mention residual risks.
