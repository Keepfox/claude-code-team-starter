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

| Bundle | Variants | Recommended MCP profiles | Good fit |
| --- | --- | --- | --- |
| `product-web` | `frontend`, `release-engineering` | `team-onboarding`, `release-delivery` | Small product teams shipping UI changes with staged rollout checks |
| `platform-api` | `backend`, `security`, `release-engineering` | `github-postgres`, `security-review`, `release-delivery` | Service, platform, and infrastructure teams |
| `client-delivery` | `consulting`, `release-engineering` | `team-onboarding`, `release-delivery` | Consulting teams doing scoped delivery and handoff |
| `support-response` | `support-triage`, `security` | `issue-triage`, `security-review` | Support, incident, and escalation workflows |

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
4. try `/review` on a harmless diff
