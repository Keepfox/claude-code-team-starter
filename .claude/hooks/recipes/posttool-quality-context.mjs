import { stdin, stdout } from "node:process";

const raw = await readStdin();
const payload = safeParseJson(raw);
const filePath = getFilePath(payload);

if (!filePath) {
  process.exit(0);
}

const normalized = filePath.replaceAll("\\", "/");
const sourcePattern = /(^|\/)(src|app|lib|pkg|cmd|internal|services|api)\//;
const codeExtensionPattern = /\.(ts|tsx|js|jsx|py|go|rs|rb|java|kt)$/;

if (!sourcePattern.test(normalized) && !codeExtensionPattern.test(normalized)) {
  process.exit(0);
}

stdout.write(
  JSON.stringify({
    hookSpecificOutput: {
      hookEventName: "PostToolUse",
      additionalContext:
        `A code file was edited at ${normalized}. Before stopping, run the narrowest relevant test, lint, or typecheck command and summarize the result.`
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
