# Go Change Checklist

Use this skill when a task changes Go packages, module files, or exported APIs.

## What to check

- the narrowest relevant `go test` target was used before `go test ./...`
- exported function, type, or interface changes are explicit
- formatting and error-path clarity were preserved
- `go.mod` or `go.sum` changes are intentional and justified

## Suggested commands

- `go test ./path/to/package`
- `go test ./...`
- the repo's existing formatting command when it differs from the default

## Output shape

- Scope of the change
- Verification performed
- API or rollout notes

## Suggested pairing

- Pair with the `code-reviewer` subagent for API-shape changes.
- Pair with `posttool-go-quality-context.mjs` when you want deterministic Go-specific follow-through after edits.
