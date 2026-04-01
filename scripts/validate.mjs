import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

const jsonFiles = [
  ".claude/settings.json",
  ".claude/settings.local.example.json",
  ".mcp.json",
  "package.json",
  "mcp/examples/github-postgres.json",
  "mcp/examples/issue-triage.json"
];

const hookFiles = listFiles(".claude/hooks").filter((file) => file.endsWith(".mjs"));
const scriptFiles = listFiles("scripts").filter((file) => file.endsWith(".mjs"));
const agentFiles = listFiles(".claude/agents").filter((file) => file.endsWith(".md"));
const commandFiles = listFiles(".claude/commands").filter((file) => file.endsWith(".md"));
const skillFiles = listFilesRecursive(".claude/skills").filter((file) => file.endsWith(".md"));
const variantAgentFiles = listFilesRecursive("variants").filter((file) =>
  file.includes("/.claude/agents/") && file.endsWith(".md")
);
const variantCommandFiles = listFilesRecursive("variants").filter((file) =>
  file.includes("/.claude/commands/") && file.endsWith(".md")
);

for (const file of jsonFiles) {
  JSON.parse(readFileSync(join(root, file), "utf8"));
}

for (const file of [...hookFiles, ...scriptFiles]) {
  execFileSync("node", ["--check", file], {
    cwd: root,
    stdio: "inherit"
  });
}

for (const file of [...agentFiles, ...commandFiles, ...variantAgentFiles, ...variantCommandFiles]) {
  const content = readFileSync(join(root, file), "utf8");
  if (!content.startsWith("---\n")) {
    throw new Error(`${file} is missing YAML frontmatter.`);
  }
}

for (const file of skillFiles) {
  const content = readFileSync(join(root, file), "utf8").trim();
  if (!content) {
    throw new Error(`${file} is empty.`);
  }
}

console.log("validate: ok");

function listFiles(dir) {
  const absoluteDir = join(root, dir);
  return readdirSync(absoluteDir)
    .map((name) => join(dir, name))
    .filter((file) => statSync(join(root, file)).isFile());
}

function listFilesRecursive(dir) {
  const absoluteDir = join(root, dir);
  const results = [];

  for (const entry of readdirSync(absoluteDir)) {
    const relativePath = join(dir, entry);
    const absolutePath = join(root, relativePath);
    const stat = statSync(absolutePath);

    if (stat.isDirectory()) {
      results.push(...listFilesRecursive(relativePath));
    } else if (stat.isFile()) {
      results.push(relativePath);
    }
  }

  return results;
}
