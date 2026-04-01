# Hook Recipes

These recipes are optional copy-paste examples for teams that want stricter or more workflow-aware hook behavior.

They are not enabled by default.

Use them when you want to extend the base starter without turning `.claude/settings.json` into a large custom policy file on day one.

Included recipes:

- `pretool-protect-infra.mjs`
  Ask before editing deployment, infrastructure, or workflow files.
- `posttool-quality-context.mjs`
  Remind Claude to run the smallest relevant test or lint command after source edits.
- `posttool-node-quality-context.mjs`
  Add Node.js and TypeScript-specific verification reminders after edits.
- `posttool-python-quality-context.mjs`
  Add Python-specific verification reminders after edits.
- `posttool-go-quality-context.mjs`
  Add Go-specific verification reminders after edits.
- `sessionstart-project-brief.mjs`
  Load extra startup context from `.claude/project-brief.md` when that file exists.
- `stop-clean-merge-state.mjs`
  Block stopping while the git worktree still contains unresolved merge conflicts.

See `docs/hook-recipes.md` for configuration examples.
