# Examples

These files show how a short `CLAUDE.md` can look for different stacks without turning into a long internal policy document.

Included examples:

- `frontend/CLAUDE.md`
- `internal-tooling/CLAUDE.md`
- `node/CLAUDE.md`
- `python/CLAUDE.md`
- `go/CLAUDE.md`

Suggested companions:

- `frontend` example plus `.claude/skills/frontend-change-checklist/` and `posttool-frontend-quality-context.mjs`
- `internal-tooling` example plus `.claude/skills/internal-tooling-checklist/` and `posttool-internal-tooling-context.mjs`
- `node` example plus `.claude/skills/node-change-checklist/` and `posttool-node-quality-context.mjs`
- `python` example plus `.claude/skills/python-change-checklist/` and `posttool-python-quality-context.mjs`
- `go` example plus `.claude/skills/go-change-checklist/` and `posttool-go-quality-context.mjs`

Use them in one of two ways:

## Option 1: Copy a starting point

Pick the closest file and adapt it into your project root:

```bash
cp examples/node/CLAUDE.md /path/to/your-project/CLAUDE.md
```

## Option 2: Merge one section into your existing `CLAUDE.md`

This is usually better when you already have:

- team review rules
- test expectations
- architecture notes

Keep the final file short. The examples are meant to supply stack defaults, not replace project memory.
