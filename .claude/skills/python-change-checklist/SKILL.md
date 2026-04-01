# Python Change Checklist

Use this skill when a task changes Python application code, package metadata, or dependency files.

## What to check

- the smallest relevant `pytest` target was preferred before broader test runs
- the repo's existing formatter and linter choices were respected
- dependency changes in `pyproject.toml`, `requirements*.txt`, or lockfiles are explicit and justified
- changed behavior is covered by tests when the repo has a test suite

## Suggested commands

- `pytest -q`
- a narrower module, class, or test path when available
- the repo's existing lint or format command

## Output shape

- Scope of the change
- Verification performed
- Dependency or runtime notes

## Suggested pairing

- Pair with the `test-runner` subagent after logic changes.
- Pair with `posttool-python-quality-context.mjs` when you want consistent Python-specific stop discipline.
