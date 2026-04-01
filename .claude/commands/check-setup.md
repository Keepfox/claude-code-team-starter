---
argument-hint: [optional-focus]
description: Audit starter setup, gitignore safety, and MCP environment gaps
---

Audit the current starter setup.

Optional focus: $ARGUMENTS

Workflow:

1. Run `node .claude/scripts/doctor.mjs --json`.
2. Report WARN items first.
3. If everything is healthy, say that clearly.
4. Recommend the smallest follow-up actions.

Keep the output compact and operational.
