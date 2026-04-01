import { stdin, stdout } from "node:process";

const raw = await readStdin();
const payload = safeParseJson(raw);
const filePath = getFilePath(payload);

if (!filePath) {
  process.exit(0);
}

const normalized = filePath.replaceAll("\\", "/");

const denyMatchers = [
  /(^|\/)\.env(\.|$)/,
  /(^|\/)secrets?\//,
  /(^|\/)\.git\//,
  /(^|\/)id_rsa$/,
  /\.pem$/,
  /\.key$/
];

const askMatchers = [
  /(^|\/)package-lock\.json$/,
  /(^|\/)pnpm-lock\.yaml$/,
  /(^|\/)yarn\.lock$/,
  /(^|\/)bun\.lockb$/,
  /(^|\/)Cargo\.lock$/,
  /(^|\/)go\.sum$/,
  /(^|\/)poetry\.lock$/,
  /(^|\/)uv\.lock$/,
  /(^|\/)Gemfile\.lock$/
];

if (denyMatchers.some((pattern) => pattern.test(normalized))) {
  emitPreToolDecision(
    "deny",
    `Editing sensitive path is blocked by project policy: ${normalized}`
  );
  process.exit(0);
}

if (askMatchers.some((pattern) => pattern.test(normalized))) {
  emitPreToolDecision(
    "ask",
    `This looks like a lockfile or generated dependency manifest: ${normalized}. Confirm before editing.`
  );
  process.exit(0);
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

function getFilePath(payload) {
  if (!payload || typeof payload !== "object") return "";
  const toolInput = payload.tool_input;
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
