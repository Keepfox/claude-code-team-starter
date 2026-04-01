---
allowed-tools: Read, Grep, Glob, Bash(git status:*), Bash(git diff:*), Bash(git log:*), Bash(rg:*)
argument-hint: [scope]
description: Review the current changes with a security-first lens
---

Review the current working tree for security issues.

Scope: $ARGUMENTS

Instructions:

1. Inspect the current diff and the smallest relevant surrounding files.
2. Prioritize auth, authorization, input validation, secret handling, unsafe shell usage, and external trust boundaries.
3. Focus on concrete exploitability and impact.
4. Report findings first, ordered by severity.
5. If no meaningful security issues are found, say so directly and mention any limits in the review.
