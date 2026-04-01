# CLAUDE.md

This repository is a public starter kit for Claude Code team workflows.

## Goals

- keep Claude Code usable for real engineering work
- make shared workflows explicit and versioned
- prefer safe defaults over hidden behavior
- keep project automation understandable by humans

## Working Rules

- Prefer small, reviewable changes.
- Use `/spec` before large implementation work.
- Use the `code-reviewer` subagent after meaningful code changes.
- Use the `test-runner` subagent when changing behavior or fixing regressions.
- Use the `debugger` subagent for failures, flaky tests, or unclear symptoms.
- Use the `release-manager` subagent before shipping or tagging a release.
- Never read or modify secrets, tokens, or private keys unless the user explicitly changes the project rules.
- Findings-first review style: bugs, regressions, missing tests, then summary.

## Project Conventions

- Shared Claude Code configuration lives under `.claude/`.
- Project slash commands live in `.claude/commands/`.
- Shared subagents live in `.claude/agents/`.
- Hook implementations live in `.claude/hooks/`.
- Team-shared MCP config lives in `.mcp.json`.
- Personal overrides belong in `.claude/settings.local.json`, not in committed files.

## Editing Discipline

- Keep public starter content generic and reusable.
- Avoid vendor-specific assumptions when a template can stay stack-agnostic.
- When adding commands or agents, optimize for clarity over cleverness.
- Prefer deterministic safeguards in hooks over long prompt instructions.
