import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { cwd, stdout } from "node:process";

const briefPath = join(cwd(), ".claude", "project-brief.md");

try {
  const content = (await readFile(briefPath, "utf8")).trim();
  if (!content) {
    process.exit(0);
  }

  const limited = truncate(content, 1600);
  stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: "SessionStart",
        additionalContext:
          [
            "Additional project brief loaded from .claude/project-brief.md:",
            limited
          ].join("\n\n")
      }
    })
  );
} catch {
  process.exit(0);
}

function truncate(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength - 3)}...`;
}
