import { access, copyFile, mkdir, readdir, stat } from "node:fs/promises";
import { constants } from "node:fs";
import { dirname, join, resolve } from "node:path";

const root = process.cwd();
const args = process.argv.slice(2);

const options = parseArgs(args);
const targetDir = options.targetDir ? resolve(options.targetDir) : "";

if (!targetDir) {
  printUsage();
  process.exit(1);
}

const variantNames = await getVariantNames();

if (options.variant && !variantNames.includes(options.variant)) {
  console.error(`Unknown variant: ${options.variant}`);
  console.error(`Available variants: ${variantNames.join(", ")}`);
  process.exit(1);
}

await mkdir(targetDir, { recursive: true });

const operations = new Map();
for (const entry of [".claude", ".mcp.json", "CLAUDE.md"]) {
  const absoluteSource = join(root, entry);
  for (const file of await listFilesRecursive(absoluteSource)) {
    operations.set(relativeFrom(root, file), file);
  }
}

if (options.variant) {
  const variantRoot = join(root, "variants", options.variant);
  for (const file of await listFilesRecursive(variantRoot)) {
    operations.set(relativeFrom(variantRoot, file), file);
  }
}

const conflicts = [];
for (const relativePath of operations.keys()) {
  const destination = join(targetDir, relativePath);
  if (await exists(destination)) {
    conflicts.push(relativePath);
  }
}

if (conflicts.length > 0 && !options.force) {
  console.error("Install aborted because target files already exist:");
  for (const file of conflicts) {
    console.error(`- ${file}`);
  }
  console.error("Re-run with --force to overwrite existing files.");
  process.exit(1);
}

for (const [relativePath, source] of operations.entries()) {
  const destination = join(targetDir, relativePath);
  if (options.dryRun) {
    console.log(`would copy ${relativePath}`);
    continue;
  }
  await mkdir(dirname(destination), { recursive: true });
  await copyFile(source, destination);
  console.log(`copied ${relativePath}`);
}

if (options.dryRun) {
  console.log("dry-run complete");
} else {
  console.log(`install complete: ${operations.size} files`);
}

function parseArgs(argv) {
  const parsed = {
    targetDir: "",
    variant: "",
    force: false,
    dryRun: false
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg === "--variant") {
      parsed.variant = argv[i + 1] || "";
      i += 1;
      continue;
    }

    if (arg === "--force") {
      parsed.force = true;
      continue;
    }

    if (arg === "--dry-run") {
      parsed.dryRun = true;
      continue;
    }

    if (!parsed.targetDir) {
      parsed.targetDir = arg;
      continue;
    }
  }

  return parsed;
}

async function getVariantNames() {
  const variantsDir = join(root, "variants");
  const entries = await readdir(variantsDir, { withFileTypes: true });
  return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
}

async function listFilesRecursive(startPath) {
  const startStat = await stat(startPath);
  if (startStat.isFile()) {
    return [startPath];
  }

  const results = [];
  const entries = await readdir(startPath, { withFileTypes: true });

  for (const entry of entries) {
    const nextPath = join(startPath, entry.name);
    if (entry.isDirectory()) {
      results.push(...(await listFilesRecursive(nextPath)));
    } else if (entry.isFile()) {
      results.push(nextPath);
    }
  }

  return results;
}

function relativeFrom(base, absolutePath) {
  return absolutePath.slice(base.length + 1).replaceAll("\\", "/");
}

async function exists(path) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

function printUsage() {
  console.log("Usage:");
  console.log("  node scripts/install.mjs <target-dir> [--variant <name>] [--force] [--dry-run]");
}
