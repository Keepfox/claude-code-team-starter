import { stdin, stdout } from "node:process";

const raw = await readStdin();
const payload = safeParseJson(raw);
const filePath = getFilePath(payload);

if (!filePath) {
  process.exit(0);
}

const normalized = filePath.replaceAll("\\", "/");
const askMatchers = [
  /(^|\/)\.github\/workflows\/.+\.ya?ml$/,
  /(^|\/)(terraform|infra|deploy|helm|k8s|kubernetes)\//,
  /\.tfvars(\.json)?$/,
  /(^|\/)docker-compose\.ya?ml$/,
  /(^|\/)values(\.[^.]+)?\.ya?ml$/
];

if (!askMatchers.some((pattern) => pattern.test(normalized))) {
  process.exit(0);
}

stdout.write(
  JSON.stringify({
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      permissionDecision: "ask",
      permissionDecisionReason: `Editing infrastructure or deployment-sensitive file requires confirmation: ${normalized}`
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
