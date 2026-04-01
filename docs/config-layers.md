# Config Layers

This starter is easier to maintain when each kind of change goes into the right file.

The basic rule:

- shared team behavior goes into committed project files
- personal or machine-specific behavior goes into local-only files
- secrets stay out of both and should come from environment variables or secure storage

## Layer map

| File or path | Scope | Commit it | Use it for |
| --- | --- | --- | --- |
| `CLAUDE.md` | Shared | Yes | Repo memory, architecture, workflow rules, team conventions |
| `.claude/settings.json` | Shared | Yes | Shared permissions, shared hooks, shared defaults |
| `.claude/settings.local.json` | Local | No | Personal overrides, machine-specific permissions, local experiments |
| `.claude/settings.local.example.json` | Shared | Yes | Template showing what a local override file can look like |
| `.mcp.json` | Shared | Yes | Team-safe MCP servers that belong to the repository workflow |
| `.claude/commands/` | Shared | Yes | Project slash commands your team should all see |
| `.claude/agents/` | Shared | Yes | Reusable subagents for shared team roles |
| `.claude/hooks/` | Shared | Yes | Deterministic safety or automation hooks worth reviewing as code |
| `variants/*` | Starter source | Yes, in this starter repo | Overlay source files used during install; not usually copied by hand |

## Recommended editing order

When adopting the starter in a real repository, make changes in this order:

1. `CLAUDE.md`
2. `.claude/settings.json`
3. `.mcp.json`
4. `.claude/commands/`
5. `.claude/agents/`
6. `.claude/settings.local.json` only if you still need local exceptions

## What belongs where

### Put it in `CLAUDE.md` when it is:

- shared repo context
- architecture guidance
- testing expectations
- review or delivery conventions
- information every teammate should benefit from

### Put it in `.claude/settings.json` when it is:

- a shared permission default
- a shared hook
- a team-approved behavior guardrail
- configuration that reviewers should see in pull requests

### Put it in `.claude/settings.local.json` when it is:

- personal workflow preference
- machine-specific path or sandbox setup
- temporary local exception
- something that should not silently become team policy

### Put it in `.mcp.json` when it is:

- a team-safe server used by the repo workflow
- an MCP setup that teammates can understand and review
- a server that can be configured via environment variables instead of committed secrets

## Anti-patterns

Avoid these:

- putting secrets in `CLAUDE.md`
- putting personal accounts or sandbox URLs into shared project files
- using `.claude/settings.local.json` as hidden team policy
- dumping long process documents into `CLAUDE.md`
- putting every possible MCP server into `.mcp.json` on day one

## Practical examples

Good shared edits:

- tighten shell permissions in `.claude/settings.json`
- add a team review command in `.claude/commands/`
- document a release checklist in `CLAUDE.md`
- add a GitHub plus docs MCP profile to `.mcp.json`

Good local edits:

- allow an extra local dev command only on your machine
- point a personal sandbox hostname at your own environment
- keep a local-only MCP server outside project config

## Review rule

If a change would surprise another teammate when they pull the repo, it probably does not belong in a local file.

If a change would be risky or noisy to force on every teammate, it probably does not belong in a shared file by default.
