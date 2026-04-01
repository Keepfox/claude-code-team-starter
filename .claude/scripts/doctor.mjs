import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const scriptDir = dirname(scriptPath);
const projectRoot = resolve(scriptDir, "..", "..");
const asJson = process.argv.includes("--json");

const checks = [
  checkFile("Project memory", "CLAUDE.md"),
  checkFile("Project settings", ".claude/settings.json"),
  checkFile("MCP config", ".mcp.json"),
  checkDirCount("Project commands", ".claude/commands", ".md"),
  checkDirCount("Project agents", ".claude/agents", ".md"),
  checkDirCount("Hook scripts", ".claude/hooks", ".mjs"),
  checkDirCount("Starter scripts", ".claude/scripts", ".mjs"),
  checkGitIgnore(),
  checkMcpEnvVars()
];

const status = checks.some((check) => check.status === "warn") ? "warn" : "ok";

if (asJson) {
  console.log(JSON.stringify({ status, projectRoot, checks }, null, 2));
  process.exit(status === "ok" ? 0 : 1);
}

console.log(`starter-doctor: ${status.toUpperCase()}`);
console.log(`project: ${projectRoot}`);
console.log("");

for (const check of checks) {
  console.log(`${check.status.toUpperCase()}  ${check.label}: ${check.detail}`);
}

if (status === "ok") {
  console.log("");
  console.log("Starter setup looks healthy.");
} else {
  console.log("");
  console.log("Review the WARN lines before rolling this setup out more broadly.");
}

function checkFile(label, relativePath) {
  const absolutePath = join(projectRoot, relativePath);
  const present = existsSync(absolutePath);

  return {
    label,
    status: present ? "ok" : "warn",
    detail: present ? `${relativePath} found` : `${relativePath} missing`
  };
}

function checkDirCount(label, relativePath, suffix) {
  const absolutePath = join(projectRoot, relativePath);
  if (!existsSync(absolutePath)) {
    return {
      label,
      status: "warn",
      detail: `${relativePath} missing`
    };
  }

  const count = readdirSync(absolutePath)
    .filter((name) => statSync(join(absolutePath, name)).isFile() && name.endsWith(suffix))
    .length;

  return {
    label,
    status: count > 0 ? "ok" : "warn",
    detail: count > 0 ? `${count} file(s) in ${relativePath}` : `no ${suffix} files found in ${relativePath}`
  };
}

function checkGitIgnore() {
  const gitIgnorePath = join(projectRoot, ".gitignore");
  if (!existsSync(gitIgnorePath)) {
    return {
      label: "Git ignore safety",
      status: "warn",
      detail: ".gitignore missing"
    };
  }

  const content = readFileSync(gitIgnorePath, "utf8");
  const requiredPatterns = [".claude/settings.local.json", ".env", ".env.*"];
  const missing = requiredPatterns.filter((pattern) => !content.includes(pattern));

  return {
    label: "Git ignore safety",
    status: missing.length === 0 ? "ok" : "warn",
    detail:
      missing.length === 0
        ? "local settings and env files are ignored"
        : `missing ignore pattern(s): ${missing.join(", ")}`
  };
}

function checkMcpEnvVars() {
  const mcpPath = join(projectRoot, ".mcp.json");
  if (!existsSync(mcpPath)) {
    return {
      label: "MCP environment variables",
      status: "warn",
      detail: ".mcp.json missing"
    };
  }

  const text = readFileSync(mcpPath, "utf8");
  const matches = [...text.matchAll(/\$\{([A-Z0-9_]+)(:-[^}]*)?\}/g)];
  if (matches.length === 0) {
    return {
      label: "MCP environment variables",
      status: "ok",
      detail: "no env placeholders found"
    };
  }

  const seen = new Set();
  const resolved = [];
  const usingDefault = [];
  const missing = [];

  for (const match of matches) {
    const name = match[1];
    const hasDefault = Boolean(match[2]);
    if (seen.has(name)) {
      continue;
    }
    seen.add(name);

    if (process.env[name]) {
      resolved.push(name);
    } else if (hasDefault) {
      usingDefault.push(name);
    } else {
      missing.push(name);
    }
  }

  const detailParts = [];
  if (resolved.length > 0) {
    detailParts.push(`set: ${resolved.join(", ")}`);
  }
  if (usingDefault.length > 0) {
    detailParts.push(`defaulted: ${usingDefault.join(", ")}`);
  }
  if (missing.length > 0) {
    detailParts.push(`missing: ${missing.join(", ")}`);
  }

  return {
    label: "MCP environment variables",
    status: missing.length === 0 ? "ok" : "warn",
    detail: detailParts.join(" | ")
  };
}
