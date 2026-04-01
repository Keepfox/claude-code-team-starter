# Variants

Variants are small overlays you can apply on top of the base starter.

Use them when one shared baseline is not specific enough for your workflow.

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

## Install examples

Base starter only:

```bash
node scripts/install.mjs /path/to/project
```

With a variant:

```bash
node scripts/install.mjs /path/to/project --variant backend
```

Preview without writing files:

```bash
node scripts/install.mjs /path/to/project --variant consulting --dry-run
```

Overwrite existing starter files:

```bash
node scripts/install.mjs /path/to/project --variant support-triage --force
```
