# Release Checklist Skill

Use this skill when you need a compact release-readiness pass before merge, tag, or deployment.

## What to check

- user-visible behavior changes
- configuration or environment changes
- migrations
- rollback path
- operational risk
- missing verification

## Output shape

- Release summary
- Operational checklist
- Risk summary
- Rollback notes

## Suggested pairing

- Use with the `release-manager` subagent for a deeper release pass.
- Use with `/ship` when you want a project command to drive the same workflow.
