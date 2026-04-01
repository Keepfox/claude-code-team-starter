# Customize This Starter

## 1. Choose the right layer first

Before editing anything, decide whether the change is:

- shared team behavior
- local-only personal behavior
- MCP configuration
- repo memory and conventions

Read [config-layers.md](config-layers.md) first if you are unsure.

## 2. Adjust permissions first

Open `.claude/settings.json` and review:

- `permissions.allow`
- `permissions.ask`
- `permissions.deny`
- `hooks`

For most teams, this is the first file to tune.

If the change is only for you or only for your machine, put it in `.claude/settings.local.json` instead of changing the shared project file.

## 3. Replace generic commands with team workflows

The starter commands are intentionally broad.

Adapt them to your real workflow:

- replace `/ship` with your release process
- replace `/incident` with your on-call or support flow
- add commands for migrations, docs, or PR summaries

## 4. Tighten subagent scopes

If a subagent should not edit files, remove `Edit`, `MultiEdit`, and `Write`.

If a subagent should not run commands, remove `Bash`.

Treat subagents like small roles with explicit power boundaries.

## 5. Customize hooks conservatively

Hooks are powerful because they run deterministically.

Good hook use cases:

- protect secrets
- ask before destructive shell commands
- add startup context
- run formatters or validators in known repos
- add repo-specific guardrails with small reviewable recipes

Avoid:

- networked hooks that exfiltrate data
- long-running hooks
- hooks that assume one language stack unless this repo is stack-specific

Start from [hook-recipes.md](hook-recipes.md) if you want to add workflow-aware hooks without designing them from scratch.

## 6. Add MCP by scope

Recommended pattern:

- shared team servers in `.mcp.json`
- personal/private servers in user config
- sensitive credentials through environment variables

Use `mcp/examples/` only as a starting point.

Keep the project file readable enough that reviewers can understand what each server is for.

If you need a quick overview of what the starter already includes versus what is optional, use [capabilities.md](capabilities.md).

## 7. Keep `CLAUDE.md` short

Use `CLAUDE.md` for:

- architecture and conventions
- review style
- test expectations
- repo-specific rules

If you want stack-specific guidance, start from one of the examples in `examples/` or install a variant first.

For Node, Python, Go, frontend-heavy, or internal-tooling repositories, pair the example `CLAUDE.md` with the matching skill and post-edit hook recipe.

If your repository has higher auth, compliance, or secret-handling risk, start from the `security` variant and tighten from there.

Do not turn it into a giant policy document no one will maintain.
