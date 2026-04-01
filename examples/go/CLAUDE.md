# CLAUDE.md

## Go Project Defaults

- Prefer `go test ./...` only after narrower package tests.
- Keep exported APIs stable unless the task explicitly requires a breaking change.
- Use small functions and clear error paths.
- Run formatting and tests before calling a change complete.
