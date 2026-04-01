# Security Policy

## Scope

This repository contains shared Claude Code workflow templates:

- project settings
- commands
- subagents
- hooks
- MCP examples

It does not ship a backend service or private hosted component.

## Reporting

If you find a security issue in this starter, open a private report through the repository security workflow if enabled, or open a normal issue with enough detail to reproduce the problem safely.

Please report:

- hooks that can leak secrets or execute unsafe commands by default
- examples that encourage committing credentials
- unsafe permission defaults
- misleading guidance that could cause destructive behavior

## Current expectations

- no committed secrets
- no default network exfiltration hooks
- no destructive shell behavior without an explicit ask/deny flow
- no hidden telemetry

## Safe usage reminder

This starter is only a baseline.

Each team should review:

- `.claude/settings.json`
- `.mcp.json`
- environment variables used by MCP
- any custom hooks added after adoption
