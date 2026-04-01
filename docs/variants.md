# Variants

Variants are small overlays you can apply on top of the base starter.

Use them when one shared baseline is not specific enough for your workflow.

You can apply one variant or combine several overlays in order.

When two variants touch the same file, the later one wins.

## Available variants

### `backend`

Best for:

- API teams
- backend services
- migration-heavy repos
- infrastructure-adjacent application code

Adds:

- backend-oriented `CLAUDE.md`
- `/check-api` command

### `consulting`

Best for:

- client delivery work
- scoped implementation projects
- frequent handoff and status communication

Adds:

- consulting-oriented `CLAUDE.md`
- `/client-update` command

### `support-triage`

Best for:

- support engineering
- incident triage
- issue investigation and bug reproduction

Adds:

- triage-oriented `CLAUDE.md`
- `/triage-ticket` command

### `frontend`

Best for:

- UI-heavy repositories
- component libraries
- design implementation work
- product teams that care about interaction quality

Adds:

- frontend-oriented `CLAUDE.md`
- `/check-ui` command

### `data`

Best for:

- analytics engineering
- ETL or ELT pipelines
- warehouse-facing repositories
- metric and reporting work

Adds:

- data-oriented `CLAUDE.md`
- `/check-data` command

### `release-engineering`

Best for:

- release managers
- platform teams handling rollouts
- services with careful migration or flag coordination
- teams that want explicit release-readiness reviews

Adds:

- release-engineering-oriented `CLAUDE.md`
- `/release-readiness` command

### `security`

Best for:

- auth-heavy services
- internal admin tools
- sensitive workflows involving secrets or trust boundaries
- teams that want explicit threat-model reviews before release

Adds:

- security-oriented `CLAUDE.md`
- `/threat-model` command

## Install examples

Base starter only:

```bash
node scripts/install.mjs /path/to/project
```

With a variant:

```bash
node scripts/install.mjs /path/to/project --variant backend
```

With multiple variants:

```bash
node scripts/install.mjs /path/to/project --variant frontend --variant consulting
```

With a comma-separated list:

```bash
node scripts/install.mjs /path/to/project --variant frontend,consulting
```

Preview without writing files:

```bash
node scripts/install.mjs /path/to/project --variant consulting --dry-run
```

Overwrite existing starter files:

```bash
node scripts/install.mjs /path/to/project --variant support-triage --force
```

List available variants:

```bash
npm run list-variants
```

## Composition rule

Variants are simple overlays.

- base starter files are applied first
- variants are applied in the order you pass them
- if two variants write the same file, the later variant overrides the earlier one

This keeps installs predictable and easy to understand.
