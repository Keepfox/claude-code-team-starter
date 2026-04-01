# Team Onboarding Walkthrough

This is the fastest low-risk path for a new teammate.

Goal:

- get Claude Code running in one repo
- load a shared starter baseline
- connect a small MCP set
- confirm the workflow feels predictable before adding more power

## 1. Install the base starter

From this repository:

```bash
node scripts/install.mjs /path/to/your-project
```

Use the base starter first. Do not add variants on the first pass unless the repo already has a clear team convention for them.

If the repo obviously fits one of the bundle presets, you can start from `docs/bundles.md` instead of building the install from scratch.

## 2. Start with one small MCP profile

For most teams, begin with:

- GitHub
- docs or knowledge base
- tasks or ticket tracking

The smallest ready-made profile is:

```text
mcp/examples/team-onboarding.json
```

Copy only the servers you actually need into your project `.mcp.json`.

## 3. Open the project and run a quick smoke check

Start Claude Code in the target project:

```bash
cd /path/to/your-project
claude
```

Then run:

```text
/help
/check-setup
/agents
/mcp
```

What you want to see:

- the project commands are visible
- the setup audit does not show obvious gaps
- the shared agents are present
- the MCP servers you added can be discovered

## 4. Make the first safe edits

Review these files before broader team use:

- `.claude/settings.json`
- `CLAUDE.md`
- `.mcp.json`

If you are unsure where a change belongs, use [config-layers.md](config-layers.md) before editing.

Usually the first changes are:

- tighten or relax permissions for the repo
- replace placeholder team guidance in `CLAUDE.md`
- wire real environment variables for MCP access

## 5. Verify behavior on a harmless task

Use a tiny change or sample diff and run:

```text
/review
```

Then try:

```text
/spec
```

This confirms the shared workflow is understandable before anyone depends on it for real delivery work.

## 6. Add variants only after the baseline feels stable

Good next steps:

- `frontend` for UI-heavy repos
- `backend` for service repos
- `security` for higher-risk systems
- `release-engineering` for careful rollout workflows

If you combine variants, later variants win when they write the same file path.

## Suggested first-week rollout

Day 1:

- base starter
- onboarding MCP profile
- `/check-setup`

Day 2:

- one harmless review task
- one harmless planning task

Day 3+:

- add one variant if the repo clearly needs it
- enable one small hook recipe if the repo needs tighter guardrails
- add operational MCP servers only after the baseline works
