# Use Cases

## 1. Solo consultant

Use this starter to standardize:

- planning
- review
- test fixing
- release notes

Useful commands:

- `/spec`
- `/review`
- `/fix-test`
- `/pr-ready`

## 2. Small product team

Use this starter to share:

- repo memory in `CLAUDE.md`
- common safety rules
- a stable set of subagents
- one or two MCP integrations

Good first MCP additions:

- GitHub
- Postgres
- docs search

## 3. Support and incident triage

Use this starter as a base for:

- issue summarization
- root-cause investigation
- rollback checklists
- PR-ready fixes

Best extensions:

- ticketing MCP
- logging or error tracking MCP
- runbook docs

## 4. Internal platform team

Use this starter to package organization-wide defaults:

- safer permissions
- release checklists
- review style
- repo onboarding

Then create stack-specific overlays on top.

## 5. Frontend team

Use this starter to standardize:

- UI review prompts
- accessibility-aware checks
- component and state-change summaries
- safer design handoff workflows

Best extension:

- the `frontend` variant

## 6. Data team

Use this starter to standardize:

- query and pipeline review
- schema-change summaries
- metric-impact checks
- rollout notes for data consumers

Best extension:

- the `data` variant

## 7. Shared engineering enablement repo

Use this starter as a public or internal baseline when you want one place to maintain:

- common agent roles
- cross-repo review habits
- starter MCP examples
- stack-specific overlays for different teams

Best extensions:

- `backend` for service repos
- `frontend` for UI repos
- `data` for analytics or warehouse repos

## 8. Security-sensitive service

Use this starter to standardize:

- security review language
- threat-model style analysis
- safer auth and secret-handling checks
- release notes that call out residual risk

Best extensions:

- the `security` variant
- GitHub and docs MCP
- error tracking MCP for incident review
