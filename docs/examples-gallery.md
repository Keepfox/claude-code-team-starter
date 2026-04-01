# Examples Gallery

These are copy-paste starter paths for common repo shapes.

Each path pairs a bundle with the smallest useful MCP profile and the extra reusable layer that makes the bundle more concrete.

## Product web app

- install: `node scripts/install.mjs /path/to/your-project --bundle product-web`
- MCP starting point: `mcp/examples/product-web.json`
- `CLAUDE.md` example: `examples/frontend/CLAUDE.md`
- starter skills: `frontend-change-checklist`, `release-checklist`
- hook recipes: `posttool-frontend-quality-context.mjs`

Use this for user-facing frontend work where UI quality, staged rollout, and product telemetry matter.

## Internal admin console

- install: `node scripts/install.mjs /path/to/your-project --bundle admin-console`
- MCP starting point: `mcp/examples/internal-admin.json`
- `CLAUDE.md` example: `examples/internal-tooling/CLAUDE.md`
- starter skills: `internal-tooling-checklist`, `release-checklist`
- hook recipes: `posttool-internal-tooling-context.mjs`, `pretool-protect-infra.mjs`

Use this for operator dashboards, auth-sensitive consoles, and admin tools where the blast radius of mistakes is higher than in a typical product UI.

## Platform or service API

- install: `node scripts/install.mjs /path/to/your-project --bundle platform-api`
- MCP starting point: `mcp/examples/github-postgres.json`
- starter skills: `release-checklist`
- hook recipes: `pretool-protect-infra.mjs`

Use this for backend services, platform repos, and infrastructure-facing delivery work.

## Node service

- install: `node scripts/install.mjs /path/to/your-project --bundle node-service`
- MCP starting point: `mcp/examples/github-postgres.json`
- `CLAUDE.md` example: `examples/node/CLAUDE.md`
- starter skills: `node-change-checklist`, `release-checklist`
- hook recipes: `posttool-node-quality-context.mjs`

Use this when the repo is clearly a Node.js or TypeScript service and the team wants stack-specific follow-through from day one.

## Python service

- install: `node scripts/install.mjs /path/to/your-project --bundle python-service`
- MCP starting points: `mcp/examples/github-postgres.json`, `mcp/examples/security-review.json`
- `CLAUDE.md` example: `examples/python/CLAUDE.md`
- starter skills: `python-change-checklist`, `release-checklist`
- hook recipes: `posttool-python-quality-context.mjs`

Use this for Python services where deploy risk and security review are both important.

## Go service

- install: `node scripts/install.mjs /path/to/your-project --bundle go-service`
- MCP starting point: `mcp/examples/github-postgres.json`
- `CLAUDE.md` example: `examples/go/CLAUDE.md`
- starter skills: `go-change-checklist`, `release-checklist`
- hook recipes: `posttool-go-quality-context.mjs`

Use this for Go repos that care about API stability, test discipline, and rollout quality.

## Data Python repo

- install: `node scripts/install.mjs /path/to/your-project --bundle data-python`
- MCP starting point: `mcp/examples/data-warehouse.json`
- `CLAUDE.md` example: `examples/python/CLAUDE.md`
- starter skills: `python-change-checklist`, `release-checklist`
- hook recipes: `posttool-python-quality-context.mjs`

Use this for analytics, ETL, warehouse, and metric-facing repositories.

## Client delivery repo

- install: `node scripts/install.mjs /path/to/your-project --bundle client-delivery`
- MCP starting points: `mcp/examples/team-onboarding.json`, `mcp/examples/release-delivery.json`
- starter skills: `release-checklist`

Use this for consulting, scoped delivery, and repos where handoff clarity matters as much as the code itself.

## Support and incident repo

- install: `node scripts/install.mjs /path/to/your-project --bundle support-response`
- MCP starting points: `mcp/examples/issue-triage.json`, `mcp/examples/security-review.json`
- hook recipes: `pretool-protect-infra.mjs`

Use this for response teams that care more about predictable investigation and safer hotfixes than about deep stack specialization.
