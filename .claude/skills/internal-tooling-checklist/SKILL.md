# Internal Tooling Checklist

Use this skill when a task changes admin panels, operator tools, permission-sensitive flows, or internal dashboards.

## What to check

- permission boundaries, role checks, or scope checks are still explicit
- destructive actions still require clear confirmation or safe guardrails
- auditability or operator visibility concerns are called out when relevant
- the narrowest auth, admin, or policy tests were preferred before broader runs

## Suggested commands

- the smallest relevant auth or admin test target
- the repo's existing lint or typecheck command
- any targeted policy or permissions verification command the repo already uses

## Output shape

- Scope of the internal tool change
- Verification performed
- Permission or operational risk notes

## Suggested pairing

- Pair with `posttool-internal-tooling-context.mjs` for consistent follow-through after edits.
- Pair with `security-reviewer` when the change touches auth, roles, policies, or admin APIs.
