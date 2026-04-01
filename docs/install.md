# Install Guide

This guide covers the fastest ways to copy the starter into a real project.

## Prerequisites

- Node.js 18 or newer
- Claude Code installed locally

```bash
npm install -g @anthropic-ai/claude-code
```

## Option 1: Copy the starter files directly

From this repository:

```bash
cp -R .claude /path/to/your-project/
cp CLAUDE.md /path/to/your-project/
cp .mcp.json /path/to/your-project/
```

Use this when you want full control over which files are copied.

## Option 2: Use the install script

Base starter:

```bash
node scripts/install.mjs /path/to/your-project
```

Preview without writing files:

```bash
node scripts/install.mjs /path/to/your-project --dry-run
```

Overwrite an existing starter setup:

```bash
node scripts/install.mjs /path/to/your-project --force
```

Install with a variant:

```bash
node scripts/install.mjs /path/to/your-project --variant frontend
```

Install with multiple variants:

```bash
node scripts/install.mjs /path/to/your-project --variant frontend --variant consulting
```

You can also use a comma-separated list:

```bash
node scripts/install.mjs /path/to/your-project --variant frontend,consulting
```

Show supported variants:

```bash
node scripts/install.mjs --list-variants
```

Show script help:

```bash
npm run install-help
```

## First-run smoke check

After copying the files into your project:

1. Open the project root.
2. Start `claude`.
3. Run `/help`.
4. Run `/check-setup`.
5. Run `/agents`.
6. Run `/mcp`.
7. Review `.claude/settings.json` before making broader permissions changes.

## Recommended first edits

Change these first:

- `.claude/settings.json`
- `CLAUDE.md`
- `.mcp.json`

Then adapt:

- `.claude/commands/` for your workflow
- `.claude/agents/` for your team roles
- `.claude/hooks/` for your safety model

If you combine multiple variants, later variants win when they write the same file path.
