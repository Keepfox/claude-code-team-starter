import { stdin, stdout } from "node:process";

const raw = await readStdin();
const payload = safeParseJson(raw);
const filePath = getFilePath(payload);

if (!filePath) {
  process.exit(0);
}

const normalized = filePath.replaceAll("\\", "/");
const matchers = [
  /\.py$/,
  /(^|\/)(pyproject\.toml|requirements(\.[^.]+)?\.txt|poetry\.lock|uv\.lock|Pipfile|Pipfile\.lock)$/
];

if (!matchers.some((pattern) => pattern.test(normalized))) {
  process.exit(0);
}

stdout.write(
  JSON.stringify({
    hookSpecificOutput: {
      hookEventName: "PostToolUse",
      additionalContext:
        `Python-related file edited at ${normalized}. Prefer the smallest relevant pytest target plus the repo's formatter or linter before stopping, and keep dependency changes explicit if lockfiles or requirements changed.`
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
