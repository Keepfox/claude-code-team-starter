# Capability Matrix

This file explains what the starter includes today, what is optional, and what is outside the scope of this repository.

Use it when you want to answer:

- what is already in the base starter
- what only appears after installing a variant
- what is just an example and needs team-specific wiring
- what this repository intentionally does not try to become

## Base starter

| Area | Status | Where | Notes |
| --- | --- | --- | --- |
| Project memory | Included | `CLAUDE.md` | Shared repo guidance loaded into Claude Code sessions |
| Shared settings | Included | `.claude/settings.json` | Team-reviewed defaults for permissions and hooks |
| Local settings template | Included | `.claude/settings.local.example.json` | Example for personal overrides |
| Base commands | Included | `.claude/commands/` | Planning, review, release, setup, and diff workflows |
| Base subagents | Included | `.claude/agents/` | Shared reviewer, debugger, docs, test, release, and security roles |
| Base hooks | Included | `.claude/hooks/` | Sensitive-file protection, shell safety, and session context |
| Hook recipe library | Included | `.claude/hooks/recipes/` and `docs/hook-recipes.md` | Optional copy-paste recipes for infra, quality, startup context, and merge hygiene |
| Starter skill examples | Included | `.claude/skills/` | Small reusable skill patterns, including stack-specific and workflow-specific checklists |
| Minimal MCP file | Included | `.mcp.json` | Safe empty project-scoped entrypoint |
| Install helper | Included | `scripts/install.mjs` | Copies the base starter and optional variants |
| Bundle presets | Included | `bundles/` and `docs/bundles.md` | Named install presets for common team shapes, including stack-aware bundle guidance |
| Setup audit | Included | `.claude/scripts/doctor.mjs` and `/check-setup` | Verifies starter presence, gitignore safety, and MCP placeholders |
| Validation | Included | `npm run validate` | Checks JSON, scripts, assets, and smoke installs |
| Public visuals | Included | `assets/` | README and social preview assets |

## Variant capabilities

| Variant | Status | Adds |
| --- | --- | --- |
| `backend` | Included | API-oriented command and backend-focused `CLAUDE.md` overlay |
| `consulting` | Included | Client update workflow and consulting-oriented overlay |
| `data` | Included | Data-review workflow and data-team overlay |
| `frontend` | Included | UI review workflow and frontend overlay |
| `release-engineering` | Included | Release-readiness workflow and delivery-oriented overlay |
| `security` | Included | Threat-model workflow and security-oriented overlay |
| `support-triage` | Included | Ticket triage workflow and support-oriented overlay |

## Example and optional capabilities

These are shipped as examples, not as fully wired production defaults.

| Area | Status | Where | Notes |
| --- | --- | --- | --- |
| MCP profiles | Example only | `mcp/examples/` | Starting points for onboarding, security, release, issue triage, and GitHub plus Postgres |
| Example stacks | Example only | `examples/` | Short adaptation references that pair with stack-specific or workflow-specific skills and hook recipes |
| Local-only settings | Optional | `.claude/settings.local.json` | Personal machine overrides; do not commit |
| Multi-variant overlays | Optional | `scripts/install.mjs --variant ...` | Later variants win when they write the same path |
| Bundle plus extra variant | Optional | `scripts/install.mjs --bundle ... --variant ...` | Start from a preset, then specialize it with one more overlay |
| Stack-aware bundle recommendations | Optional | bundle install output | Prints matching example, skills, and hook recipes for Node, Python, and Go bundles |

## Planned direction

These are reasonable next steps for the repo, but they are not fully shipped yet.

- more copy-paste onboarding bundles for common team setups
- richer stack-specific and workflow-specific skills and hooks beyond the current Node, Python, Go, frontend, and internal tooling examples
- short terminal captures or GIFs for first-run flow
- stronger scenario bundles for common team shapes

## Out of scope

This repository is intentionally not trying to become these things:

- a Claude Code clone
- a terminal runtime or tool-execution engine
- a plugin marketplace
- a managed remote settings system
- a telemetry pipeline
- a team-memory sync service
- a giant workflow framework that hides everything behind automation

## Recommended reading order

If you are new to the repo, read in this order:

1. `README.md`
2. `docs/install.md`
3. `docs/config-layers.md`
4. `docs/variants.md`
5. `mcp/README.md`
