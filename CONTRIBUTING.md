# Contributing

Thanks for contributing.

This repository is meant to stay practical, small, and easy to copy into real projects.

## What belongs here

Good contributions:

- safer default settings
- clearer project commands
- reusable subagents
- deterministic hooks
- MCP examples that do not require committing secrets
- concise documentation improvements

Less useful contributions:

- stack-specific assumptions without clear value
- large prompt dumps
- branding-heavy changes
- commands that depend on private infrastructure
- unsafe automation by default

## Contribution style

- Keep changes focused.
- Prefer editing existing files over adding many new ones.
- Make README and docs match the actual starter contents.
- If behavior changes, update examples or docs in the same PR.
- If you add a command or agent, keep the purpose obvious from the filename.

## Validation

Run:

```bash
npm run validate
```

This checks:

- JSON syntax
- hook script syntax
- command and agent frontmatter presence
- installer smoke tests for the base starter and each variant

## Design principles

- shared config should be readable by humans
- safety should be enforced by config or hooks, not hidden lore
- templates should be easy to delete or adapt
- public defaults should be conservative
