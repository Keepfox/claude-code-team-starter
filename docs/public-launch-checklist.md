# Public Launch Checklist

Before publishing this starter on GitHub:

## Repository

- Pick a final name.
- Set description and topics.
- Add a license.
- Add a clear non-affiliation note.

## Safety

- Re-read `.claude/settings.json`.
- Verify hooks do not call external services.
- Verify `.mcp.json` contains no secrets.
- Confirm `.gitignore` excludes `.claude/settings.local.json` and `.env*`.

## Content

- Make README match the actual files.
- Remove placeholders you would be embarrassed to support.
- Keep command and agent names clear and generic.
- Add one screenshot or terminal gif if you want higher adoption.

## Adoption

- Test the starter in a fresh sample repo.
- Test both the base install and at least one variant install.
- Run `/help`, `/agents`, and `/mcp` to confirm discovery works.
- Replace any stack-specific assumptions you do not want to support publicly.
- Make sure `docs/install.md` matches the actual install script flags.

## Positioning

- Market it as a workflow starter, not a Claude Code replacement.
- Emphasize settings, commands, agents, hooks, and MCP.
- Keep the repo clean enough that people can copy files selectively.
