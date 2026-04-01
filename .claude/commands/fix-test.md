---
argument-hint: [test-command]
description: Run the smallest relevant test command and fix failures
---

Fix a failing test or broken verification flow.

Preferred test command: $ARGUMENTS

Workflow:

1. Determine the smallest relevant verification command.
2. Reproduce the failure.
3. Explain the root cause briefly.
4. Implement the smallest fix that preserves original intent.
5. Re-run verification.
6. Summarize what changed and what remains risky.

Constraints:

- Do not broaden scope unless required to make tests pass.
- Prefer fixing production code before rewriting tests.
- If the test itself is wrong, explain why before editing it.
