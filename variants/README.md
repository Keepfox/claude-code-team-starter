# Variant Map

Variants are small overlays for common working styles.

Each variant currently adds:

- one workflow-specific `CLAUDE.md`
- one extra project command

## Available variants

### `backend`

- command: `/check-api`
- focus: API changes, migrations, service behavior

### `consulting`

- command: `/client-update`
- focus: scoped delivery, handoff, communication

### `data`

- command: `/check-data`
- focus: schema changes, pipelines, downstream impact

### `frontend`

- command: `/check-ui`
- focus: UI quality, states, accessibility, user-visible changes

### `support-triage`

- command: `/triage-ticket`
- focus: reproduction, investigation, ticket-driven work

## Install example

```bash
node scripts/install.mjs /path/to/your-project --variant frontend
```

See [docs/variants.md](../docs/variants.md) for the longer guide.
