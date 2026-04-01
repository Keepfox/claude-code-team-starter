# Customize This Starter

## 1. Adjust permissions first

Open `.claude/settings.json` and review:

- `permissions.allow`
- `permissions.ask`
- `permissions.deny`
- `hooks`

For most teams, this is the first file to tune.

## 2. Replace generic commands with team workflows

The starter commands are intentionally broad.

Adapt them to your real workflow:

- replace `/ship` with your release process
- replace `/incident` with your on-call or support flow
- add commands for migrations, docs, or PR summaries

## 3. Tighten subagent scopes

If a subagent should not edit files, remove `Edit`, `MultiEdit`, and `Write`.

If a subagent should not run commands, remove `Bash`.

Treat subagents like small roles with explicit power boundaries.

## 4. Customize hooks conservatively

Hooks are powerful because they run deterministically.

Good hook use cases:

- protect secrets
- ask before destructive shell commands
- add startup context
- run formatters or validators in known repos

Avoid:

- networked hooks that exfiltrate data
- long-running hooks
- hooks that assume one language stack unless this repo is stack-specific

## 5. Add MCP by scope

Recommended pattern:

- shared team servers in `.mcp.json`
- personal/private servers in user config
- sensitive credentials through environment variables

Use `mcp/examples/` only as a starting point.

Keep the project file readable enough that reviewers can understand what each server is for.

## 6. Keep `CLAUDE.md` short

Use `CLAUDE.md` for:

- architecture and conventions
- review style
- test expectations
- repo-specific rules

If you want stack-specific guidance, start from one of the examples in `examples/` or install a variant first.

Do not turn it into a giant policy document no one will maintain.
