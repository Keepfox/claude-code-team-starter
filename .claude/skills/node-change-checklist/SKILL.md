# Node Change Checklist

Use this skill when a task changes Node.js or TypeScript application code, build scripts, or package metadata.

## What to check

- the smallest relevant `npm`, `pnpm`, `yarn`, or `bun` command exists and was used before broad test runs
- typecheck, lint, and test expectations still match the repository scripts
- `package.json` or lockfile changes are intentional and explained
- user-facing or developer workflow changes are reflected in docs when needed

## Suggested commands

- `npm run lint`
- `npm run test`
- `npm run typecheck`
- a narrower package or file-specific test target when the repo provides one

## Output shape

- Scope of the change
- Verification performed
- Risk or follow-up notes

## Suggested pairing

- Pair with the `test-runner` subagent when behavior changed.
- Pair with `posttool-node-quality-context.mjs` when you want deterministic reminders after edits.
