---
allowed-tools: Read, Grep, Glob, Bash(git diff:*), Bash(git status:*)
argument-hint: [scope]
description: Summarize the current working tree in plain engineering language
---

Summarize the current diff.

Scope: $ARGUMENTS

Output:

- What changed
- Why it changed
- Main files affected
- Risk level
- Missing verification, if any

Do not produce marketing language. Write like an engineer handing off work to another engineer.
