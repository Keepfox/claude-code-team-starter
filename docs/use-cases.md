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

Recommended bundle:

- `product-web`

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

Recommended bundle:

- `platform-api`

## 5. Frontend team

Use this starter to standardize:

- UI review prompts
- accessibility-aware checks
- component and state-change summaries
- safer design handoff workflows

Best extension:

- the `frontend` variant

Recommended bundle:

- `product-web`

## 6. Data team

Use this starter to standardize:

- query and pipeline review
- schema-change summaries
- metric-impact checks
- rollout notes for data consumers

Best extension:

- the `data` variant

Recommended bundle:

- `data-python`

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

Recommended bundle:

- `python-service` or `platform-api`

## 9. Release engineering or delivery team

Use this starter to standardize:

- release-readiness reviews
- rollout and rollback notes
- migration and feature-flag coordination
- post-release monitoring expectations

Best extensions:

- the `release-engineering` variant
- GitHub, docs, errors, and deploy control MCP

Recommended bundles:

- `platform-api`
- `client-delivery`

## 10. New team member onboarding

Use this starter to standardize:

- first-week repo orientation
- shared command discovery
- quick access to docs, tickets, and pull requests
- a safe baseline before broader tool permissions are added

Best extensions:

- `mcp/examples/team-onboarding.json`
- `/check-setup`
- `/review`

## 11. Internal admin tool or operator console

Use this starter to standardize:

- security-aware UI review
- auth and permission-sensitive release checks
- safer rollout notes for internal operators
- common MCP access for code, docs, and release coordination

Recommended bundle:

- `admin-console`
