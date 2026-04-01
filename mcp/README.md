# MCP Examples

The root `.mcp.json` is intentionally empty:

```json
{
  "mcpServers": {}
}
```

That keeps the starter safe to clone and commit.

## Recommended Approach

- Put shared team MCP servers in `.mcp.json`
- Use environment variables for secrets
- Keep personal servers in user scope instead of the project file

Claude Code supports project-scoped MCP via `.mcp.json`.

Official docs:

- https://docs.anthropic.com/en/docs/claude-code/mcp

## Example Patterns

### Stdio server

```json
{
  "mcpServers": {
    "local-tooling": {
      "command": "python",
      "args": [
        "./tools/mcp_server.py"
      ],
      "env": {
        "API_BASE_URL": "${API_BASE_URL:-http://localhost:3000}"
      }
    }
  }
}
```

### HTTP server

```json
{
  "mcpServers": {
    "example-http": {
      "type": "http",
      "url": "${MCP_HTTP_URL}",
      "headers": {
        "Authorization": "Bearer ${MCP_HTTP_TOKEN}"
      }
    }
  }
}
```

### SSE server

```json
{
  "mcpServers": {
    "example-sse": {
      "type": "sse",
      "url": "${MCP_SSE_URL:-https://example.com/sse}",
      "headers": {
        "Authorization": "Bearer ${MCP_SSE_TOKEN}"
      }
    }
  }
}
```

## Good Starter Integrations

Good first MCP servers for team adoption:

- GitHub
- Postgres or your warehouse
- Sentry
- Jira / Linear / Notion
- internal docs or admin APIs

Keep the first version small. Two or three useful servers beat ten half-working ones.

## Example Profiles

- [examples/data-warehouse.json](examples/data-warehouse.json)
- [examples/github-postgres.json](examples/github-postgres.json)
- [examples/internal-admin.json](examples/internal-admin.json)
- [examples/issue-triage.json](examples/issue-triage.json)
- [examples/product-web.json](examples/product-web.json)
- [examples/release-delivery.json](examples/release-delivery.json)
- [examples/security-review.json](examples/security-review.json)
- [examples/team-onboarding.json](examples/team-onboarding.json)

Use these as starting points, not production-ready drop-ins.

## Bundle-aligned profiles

If you install one of the stack-aware bundles, these are the fastest matching MCP entrypoints:

- `product-web` -> `examples/product-web.json`
- `data-python` -> `examples/data-warehouse.json`
- `admin-console` -> `examples/internal-admin.json`
- `node-service` -> `examples/github-postgres.json`
- `python-service` -> `examples/github-postgres.json` or `examples/security-review.json`

## Suggested onboarding profile

If a new teammate only needs enough context to become productive quickly, start with:

- GitHub for code and pull requests
- docs or knowledge base for internal conventions
- tasks for ticket intake and scope

That is exactly what [examples/team-onboarding.json](examples/team-onboarding.json) is for.
