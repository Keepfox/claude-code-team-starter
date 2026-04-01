import { stdin, stdout } from "node:process";

const raw = await readStdin();
const payload = safeParseJson(raw);
const filePath = getFilePath(payload);

if (!filePath) {
  process.exit(0);
}

const normalized = filePath.replaceAll("\\", "/");
const matchers = [
  /(^|\/)(src|app|pages|components|ui)\//,
  /\.(tsx|jsx|css|scss|sass|less|html)$/
];

if (!matchers.some((pattern) => pattern.test(normalized))) {
  process.exit(0);
}

stdout.write(
  JSON.stringify({
    hookSpecificOutput: {
      hookEventName: "PostToolUse",
      additionalContext:
        `Frontend-related file edited at ${normalized}. Before stopping, check the smallest relevant UI test or lint path, then call out responsive behavior, loading or empty states, and accessibility impact if the change affects user-facing screens.`
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
