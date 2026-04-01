# Bundle Presets

Bundles are named install presets for common team shapes.

Each bundle starts from the base starter and applies a small set of variants in a known order.

Use a bundle when:

- you want a faster first install
- your team shape is obvious
- you do not want to choose variants one by one on day one

Use raw variants when:

- your repo has unusual needs
- you want tighter control over every overlay
- you are still exploring the workflow surface

## Available bundles

| Bundle | Variants | Stack layer | Recommended MCP profiles | Good fit |
| --- | --- | --- | --- | --- |
| `admin-console` | `frontend`, `security`, `release-engineering` | Node example, Node checklist, Node post-edit recipe, infra-protection recipe | `team-onboarding`, `security-review`, `release-delivery` | Internal admin tools, operator dashboards, and auth-sensitive web consoles |
| `product-web` | `frontend`, `release-engineering` | Node example, Node checklist, Node post-edit recipe | `team-onboarding`, `release-delivery` | Small product teams shipping UI changes with staged rollout checks |
| `platform-api` | `backend`, `security`, `release-engineering` | Release checklist, infra-protection recipe | `github-postgres`, `security-review`, `release-delivery` | Service, platform, and infrastructure teams |
| `client-delivery` | `consulting`, `release-engineering` | Release checklist | `team-onboarding`, `release-delivery` | Consulting teams doing scoped delivery and handoff |
| `data-python` | `data`, `release-engineering` | Python example, Python checklist, Python post-edit recipe | `github-postgres`, `release-delivery` | Python-heavy analytics, ETL, and warehouse-facing repositories |
| `support-response` | `support-triage`, `security` | Infra-protection recipe | `issue-triage`, `security-review` | Support, incident, and escalation workflows |
| `node-service` | `backend`, `release-engineering` | Node example, Node checklist, Node post-edit recipe | `github-postgres`, `release-delivery` | Node.js or TypeScript services |
| `python-service` | `backend`, `security`, `release-engineering` | Python example, Python checklist, Python post-edit recipe | `github-postgres`, `security-review`, `release-delivery` | Python services with stronger security and delivery needs |
| `go-service` | `backend`, `release-engineering` | Go example, Go checklist, Go post-edit recipe | `github-postgres`, `release-delivery` | Go services that care about API stability and rollout checks |

## Install examples

Base starter plus one bundle:

```bash
node scripts/install.mjs /path/to/your-project --bundle product-web
```

Bundle plus an extra variant:

```bash
node scripts/install.mjs /path/to/your-project --bundle client-delivery --variant frontend
```

List bundle names:

```bash
node scripts/install.mjs --list-bundles
```

Dry-run a stack-specific bundle:

```bash
node scripts/install.mjs /path/to/your-project --bundle python-service --dry-run
```

## Order rules

- bundle variants are applied first
- explicit `--variant` values are applied after bundle variants
- later overlays win when they write the same path

That means you can start from a bundle and still add one more variant to specialize the result.

## Recommended first step after install

After installing a bundle:

1. run `/check-setup`
2. review `.claude/settings.json`
3. copy one of the recommended MCP profiles into your project `.mcp.json`
4. if the bundle recommends a stack example, merge the matching file from `examples/` into your project `CLAUDE.md`
5. if the bundle recommends a skill or hook recipe, enable the smallest useful one first
6. try `/review` on a harmless diff

## Stack-aware bundle guidance

Some bundles now recommend one extra stack layer:

- a short stack-specific `CLAUDE.md` example from `examples/`
- one or more reusable skills from `.claude/skills/`
- one or more optional hook recipes from `.claude/hooks/recipes/`

The install script prints these recommendations after bundle selection so the next steps are visible without opening the manifest files.
