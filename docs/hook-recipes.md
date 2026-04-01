# Hook Recipes

This starter ships a small hook recipe library for teams that want stronger guardrails without enabling heavy automation by default.

Recipes live in `.claude/hooks/recipes/`.

## Why these recipes exist

The base starter already includes:

- sensitive-file protection
- risky shell confirmation
- startup session context

The recipes are for the next layer:

- infrastructure-sensitive repos
- teams that want stronger post-edit reminders
- repos that need more startup context
- teams that want a cleaner stop condition during merge work

## Included recipes

### `pretool-protect-infra.mjs`

Use when:

- the repo contains infrastructure, deployment, or CI files
- edits to `.github/workflows`, `terraform`, `helm`, or `k8s` paths should require an extra confirmation step

Suggested config:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit|MultiEdit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "node .claude/hooks/recipes/pretool-protect-infra.mjs"
          }
        ]
      }
    ]
  }
}
```

### `posttool-quality-context.mjs`

Use when:

- you want Claude to stay disciplined after source edits
- you want a deterministic reminder to run the narrowest relevant test, lint, or typecheck command

Suggested config:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|MultiEdit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "node .claude/hooks/recipes/posttool-quality-context.mjs"
          }
        ]
      }
    ]
  }
}
```

### `sessionstart-project-brief.mjs`

Use when:

- the team wants one more startup note beyond `CLAUDE.md`
- a repo needs a short temporary focus brief during a migration, release, or incident period

Create `.claude/project-brief.md`, keep it short, then add:

```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "startup|resume|clear|compact",
        "hooks": [
          {
            "type": "command",
            "command": "node .claude/hooks/recipes/sessionstart-project-brief.mjs"
          }
        ]
      }
    ]
  }
}
```

### `stop-clean-merge-state.mjs`

Use when:

- the repo often has parallel edits or merge-heavy release work
- you want to block stopping while git still reports unresolved merge conflicts

Suggested config:

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "node .claude/hooks/recipes/stop-clean-merge-state.mjs"
          }
        ]
      }
    ]
  }
}
```

## Where to enable recipes

Recommended pattern:

- enable shared team-safe recipes in `.claude/settings.json`
- enable experimental or personal recipes in `.claude/settings.local.json`

If you are still tuning a workflow, prefer local settings first.

## Keep recipes small

Good recipes:

- inspect only the incoming hook payload
- make one clear decision
- add one clear piece of context
- fail open when the repo does not match expectations

Avoid:

- network calls
- slow hooks
- large repo scans on every edit
- hooks that silently change behavior in ways the team cannot review
