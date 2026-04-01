import { stdout } from "node:process";

stdout.write(
  JSON.stringify({
    hookSpecificOutput: {
      hookEventName: "SessionStart",
      additionalContext:
        [
          "Project starter context:",
          "- Shared commands live in .claude/commands.",
          "- Shared subagents live in .claude/agents.",
          "- Prefer /spec before large changes.",
          "- Prefer the code-reviewer subagent after meaningful code edits.",
          "- Prefer the test-runner subagent when behavior changes.",
          "- Respect .claude/settings.json and do not bypass secret/file safeguards."
        ].join("\n")
    }
  })
);
