import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, readdirSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
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

const variants = execFileSync("node", ["scripts/install.mjs", "--list-variants"], {
  cwd: root,
  encoding: "utf8"
})
  .split("\n")
  .map((line) => line.trim())
  .filter(Boolean);

smokeInstall([]);
for (const variant of variants) {
  smokeInstall(["--variant", variant]);
}
if (variants.length >= 2) {
  smokeInstall(["--variant", variants[0], "--variant", variants[1]]);
  smokeInstall(["--variant", `${variants[0]},${variants[1]}`]);
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

function smokeInstall(extraArgs) {
  const installTarget = mkdtempSync(join(tmpdir(), "cc-team-starter-"));
  execFileSync("node", ["scripts/install.mjs", installTarget, ...extraArgs], {
    cwd: root,
    stdio: "inherit"
  });

  const requiredBaseFiles = [
    ".claude/settings.json",
    ".claude/commands/spec.md",
    ".claude/agents/code-reviewer.md",
    ".mcp.json",
    "CLAUDE.md"
  ];

  for (const file of requiredBaseFiles) {
    const absolutePath = join(installTarget, file);
    if (!existsSync(absolutePath)) {
      throw new Error(`smoke install missing file: ${file}`);
    }
  }
}
