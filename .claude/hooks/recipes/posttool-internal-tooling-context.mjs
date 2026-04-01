import { stdin, stdout } from "node:process";

const raw = await readStdin();
const payload = safeParseJson(raw);
const filePath = getFilePath(payload);

if (!filePath) {
  process.exit(0);
}

const normalized = filePath.replaceAll("\\", "/");
const matchers = [
  /(^|\/)(admin|ops|operator|internal|backoffice)\//,
  /(^|\/)(auth|permissions?|roles?|rbac|policy)\//,
  /\.(tsx|jsx|ts|js|py|go)$/
];

const adminPathHint = /(^|\/)(admin|ops|operator|internal|backoffice|auth|permissions?|roles?|rbac|policy)\//;

if (!adminPathHint.test(normalized) && !matchers.some((pattern) => pattern.test(normalized))) {
  process.exit(0);
}

stdout.write(
  JSON.stringify({
    hookSpecificOutput: {
      hookEventName: "PostToolUse",
      additionalContext:
        `Internal tooling file edited at ${normalized}. Before stopping, call out permission boundaries, destructive-action safeguards, and any audit or operator-facing risk. If the repo has targeted tests for auth or admin flows, prefer those before broader runs.`
    }
  })
);

function getFilePath(input) {
  if (!input || typeof input !== "object") return "";
  const toolInput = input.tool_input;
  if (!toolInput || typeof toolInput !== "object") return "";
  if (typeof toolInput.file_path === "string") return toolInput.file_path;
  if (typeof toolInput.path === "string") return toolInput.path;
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
