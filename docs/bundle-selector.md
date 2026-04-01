# Bundle Selector

Use this file when you want to choose a starter path quickly without reading every variant and bundle manifest.

If nothing feels like a clean match, start with the base install plus `mcp/examples/team-onboarding.json`.

## Fast picks

| If your repo looks like this | Start here | Why |
| --- | --- | --- |
| User-facing web app or product frontend | `product-web` | Frontend review language, release workflow, and product-web MCP guidance |
| Internal dashboard, operator console, admin UI | `admin-console` | Frontend plus security plus release workflow, with internal-tooling guidance |
| Node.js or TypeScript API | `node-service` | Backend plus release workflow with Node-focused follow-through |
| Python service or job runner | `python-service` | Backend plus security plus release workflow with Python-focused follow-through |
| Go service | `go-service` | Backend plus release workflow with Go-specific checks |
| Platform or infrastructure API | `platform-api` | Backend plus security plus release workflow with stronger guardrails |
| Analytics, ETL, warehouse-facing Python repo | `data-python` | Data workflow plus Python checks and warehouse MCP starting point |
| Client delivery or consulting repo | `client-delivery` | Consulting workflow, handoff framing, and release packaging |
| Support, incident, or escalation repo | `support-response` | Triage plus security workflow for fast investigation and safer fixes |

## Copy-paste install commands

```bash
node scripts/install.mjs /path/to/your-project --bundle product-web
node scripts/install.mjs /path/to/your-project --bundle admin-console
node scripts/install.mjs /path/to/your-project --bundle node-service
node scripts/install.mjs /path/to/your-project --bundle python-service
node scripts/install.mjs /path/to/your-project --bundle go-service
node scripts/install.mjs /path/to/your-project --bundle platform-api
node scripts/install.mjs /path/to/your-project --bundle data-python
node scripts/install.mjs /path/to/your-project --bundle client-delivery
node scripts/install.mjs /path/to/your-project --bundle support-response
```

## CLI shortcut

List bundle names:

```bash
npm run list-bundles
```

Describe every bundle with variants, MCP profiles, examples, skills, and hook recipes:

```bash
npm run describe-bundles
```

Describe one bundle before installing it:

```bash
node scripts/install.mjs --describe-bundles --bundle product-web
```

## If you are still unsure

Choose by primary risk:

- mostly UI quality and rollout risk: `product-web`
- mostly auth, permissions, or operator risk: `admin-console`
- mostly service correctness and deploy risk: `node-service`, `python-service`, `go-service`, or `platform-api`
- mostly data correctness and schema risk: `data-python`
- mostly stakeholder handoff and delivery clarity: `client-delivery`
- mostly response speed and escalation quality: `support-response`

Choose by primary stack:

- Node or TypeScript backend: `node-service`
- Python backend or analytics: `python-service` or `data-python`
- Go backend: `go-service`
- Frontend-heavy repo: `product-web`
- Internal tooling UI: `admin-console`

Choose by team maturity:

- first Claude Code rollout: base starter plus `team-onboarding`
- team already knows its workflow shape: install a bundle first
- team already knows its integrations: install a bundle, then copy the matching MCP profile
