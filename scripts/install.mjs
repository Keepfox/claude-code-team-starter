import { access, copyFile, mkdir, readdir, stat } from "node:fs/promises";
import { constants } from "node:fs";
import { dirname, join, resolve } from "node:path";

const root = process.cwd();
const args = process.argv.slice(2);

const options = parseArgs(args);
const targetDir = options.targetDir ? resolve(options.targetDir) : "";

if (options.listVariants) {
  for (const name of await getVariantNames()) {
    console.log(name);
  }
  process.exit(0);
}

if (options.help) {
  printUsage();
  process.exit(0);
}

if (!targetDir) {
  printUsage();
  process.exit(1);
}

const variantNames = await getVariantNames();
const selectedVariants = normalizeVariants(options.variants);
const unknownVariants = selectedVariants.filter((variant) => !variantNames.includes(variant));

if (unknownVariants.length > 0) {
  console.error(`Unknown variant${unknownVariants.length > 1 ? "s" : ""}: ${unknownVariants.join(", ")}`);
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

for (const variant of selectedVariants) {
  const variantRoot = join(root, "variants", variant);
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

if (selectedVariants.length > 0) {
  console.log(`variants: ${selectedVariants.join(", ")}`);
}

if (options.dryRun) {
  console.log("dry-run complete");
} else {
  console.log(`install complete: ${operations.size} files`);
}

function parseArgs(argv) {
  const parsed = {
    targetDir: "",
    variants: [],
    force: false,
    dryRun: false,
    listVariants: false,
    help: false
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg === "--variant") {
      parsed.variants.push(argv[i + 1] || "");
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

    if (arg === "--list-variants") {
      parsed.listVariants = true;
      continue;
    }

    if (arg === "--help" || arg === "-h") {
      parsed.help = true;
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

function normalizeVariants(values) {
  const seen = new Set();
  const results = [];

  for (const value of values) {
    for (const piece of value.split(",")) {
      const variant = piece.trim();
      if (!variant || seen.has(variant)) {
        continue;
      }
      seen.add(variant);
      results.push(variant);
    }
  }

  return results;
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
  console.log("  node scripts/install.mjs <target-dir> [--variant <name>] [--variant <name>] [--force] [--dry-run]");
  console.log("  node scripts/install.mjs --list-variants");
  console.log("  node scripts/install.mjs --help");
  console.log("");
  console.log("Notes:");
  console.log("  - Use repeated --variant flags or a comma-separated value to apply multiple overlays.");
  console.log("  - Later variants override earlier files when they touch the same path.");
}
