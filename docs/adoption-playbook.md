# Adoption Playbook

This starter works best when introduced in stages.

## Stage 1: Shared baseline

Roll out only:

- `CLAUDE.md`
- `.claude/settings.json`
- 2-3 project commands

Goal:

- give the team a common workflow
- avoid overwhelming people with too many moving parts

## Stage 2: Shared subagents

Add:

- `code-reviewer`
- `test-runner`
- `debugger`
- `security-reviewer` for repos with higher risk around auth, secrets, or shell automation

Goal:

- standardize common specialist tasks
- reduce prompt repetition

## Stage 3: Hooks

Enable deterministic guardrails:

- sensitive file protection
- risky bash confirmation
- startup context

Goal:

- reduce accidental unsafe behavior
- move safety out of tribal knowledge

## Stage 4: MCP

Add 1-3 shared MCP servers:

- source control or issue tracker
- docs or knowledge source
- one operational or data system

Goal:

- keep the starter useful without turning it into a giant integration surface

## Stage 5: Team-specific packs

Once the baseline works, create focused variants:

- web app starter
- backend starter
- data or analytics starter
- security review starter
- support triage starter
- release engineering starter

Each variant should stay small and opinionated.

## Anti-patterns

Avoid:

- adding every possible command on day one
- granting broad permissions before the team trusts the workflow
- committing secrets into `.mcp.json`
- writing giant internal process documents into `CLAUDE.md`
- letting hooks become a hidden policy engine no one understands
