import { stdin, stdout } from "node:process";

const raw = await readStdin();
const payload = safeParseJson(raw);
const command = getCommand(payload);

if (!command) {
  process.exit(0);
}

const normalized = command.trim();

const denyRules = [
  {
    pattern: /\brm\s+-rf\s+\/($|\s)/,
    reason: "Refusing a destructive root delete command."
  },
  {
    pattern: /\bmkfs\b/,
    reason: "Refusing a filesystem format command."
  },
  {
    pattern: /:\(\)\s*\{\s*:\|:\&\s*\};:/,
    reason: "Refusing a fork bomb."
  },
  {
    pattern: /\b(shutdown|reboot|halt)\b/,
    reason: "Refusing a machine shutdown or reboot command."
  }
];

const askRules = [
  {
    pattern: /\brm\s+-rf\b/,
    reason: "Destructive delete command requires confirmation."
  },
  {
    pattern: /\bgit\s+push\b.*--force/,
    reason: "Force push requires confirmation."
  },
  {
    pattern: /\b(terraform|tofu)\s+destroy\b/,
    reason: "Infrastructure destroy command requires confirmation."
  },
  {
    pattern: /\bkubectl\s+delete\b/,
    reason: "Cluster delete command requires confirmation."
  },
  {
    pattern: /\bdocker\s+system\s+prune\b/,
    reason: "Docker cleanup command requires confirmation."
  },
  {
    pattern: /\b(npm|pnpm|yarn)\s+publish\b/,
    reason: "Publishing a package requires confirmation."
  },
  {
    pattern: /\b(curl|wget)\b.*\|\s*(sh|bash)\b/,
    reason: "Piping a remote script into a shell requires confirmation."
  }
];

for (const rule of denyRules) {
  if (rule.pattern.test(normalized)) {
    emitPreToolDecision("deny", `${rule.reason} Command: ${normalized}`);
    process.exit(0);
  }
}

for (const rule of askRules) {
  if (rule.pattern.test(normalized)) {
    emitPreToolDecision("ask", `${rule.reason} Command: ${normalized}`);
    process.exit(0);
  }
}

process.exit(0);

function emitPreToolDecision(permissionDecision, permissionDecisionReason) {
  stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        permissionDecision,
        permissionDecisionReason
      }
    })
  );
}

function getCommand(payload) {
  if (!payload || typeof payload !== "object") return "";
  const toolInput = payload.tool_input;
  if (!toolInput || typeof toolInput !== "object") return "";
  if (typeof toolInput.command === "string") return toolInput.command;
  return "";
}

function safeParseJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    return {};
  }
}

function readStdin() {
  return new Promise((resolve) => {
    let data = "";
    stdin.setEncoding("utf8");
    stdin.on("data", (chunk) => {
      data += chunk;
    });
    stdin.on("end", () => resolve(data));
  });
}
