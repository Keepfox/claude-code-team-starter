import { access, copyFile, mkdir, readFile, readdir, stat } from "node:fs/promises";
import { constants } from "node:fs";
import { dirname, join, resolve } from "node:path";

const root = process.cwd();
const args = process.argv.slice(2);

const options = parseArgs(args);
const targetDir = options.targetDir ? resolve(options.targetDir) : "";
const bundleManifests = await getBundleManifests();

if (options.listVariants) {
  for (const name of await getVariantNames()) {
    console.log(name);
  }
  process.exit(0);
}

if (options.listBundles) {
  for (const bundle of bundleManifests) {
    console.log(bundle.name);
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
const bundleNames = bundleManifests.map((bundle) => bundle.name);
const bundleMap = new Map(bundleManifests.map((bundle) => [bundle.name, bundle]));
const selectedBundles = normalizeNames(options.bundles);
const selectedVariants = normalizeVariants(options.variants);
const unknownBundles = selectedBundles.filter((bundle) => !bundleNames.includes(bundle));
const unknownVariants = selectedVariants.filter((variant) => !variantNames.includes(variant));

if (unknownBundles.length > 0) {
  console.error(`Unknown bundle${unknownBundles.length > 1 ? "s" : ""}: ${unknownBundles.join(", ")}`);
  console.error(`Available bundles: ${bundleNames.join(", ")}`);
  process.exit(1);
}

if (unknownVariants.length > 0) {
  console.error(`Unknown variant${unknownVariants.length > 1 ? "s" : ""}: ${unknownVariants.join(", ")}`);
  console.error(`Available variants: ${variantNames.join(", ")}`);
  process.exit(1);
}

const bundleVariants = selectedBundles.flatMap((bundle) => bundleMap.get(bundle)?.variants || []);
const finalVariants = normalizeNames([...bundleVariants, ...selectedVariants]);
const bundleProfiles = normalizeNames(
  selectedBundles.flatMap((bundle) => bundleMap.get(bundle)?.recommendedMcpProfiles || [])
);

await mkdir(targetDir, { recursive: true });

const operations = new Map();
for (const entry of [".claude", ".mcp.json", "CLAUDE.md"]) {
  const absoluteSource = join(root, entry);
  for (const file of await listFilesRecursive(absoluteSource)) {
    operations.set(relativeFrom(root, file), file);
  }
}

for (const variant of finalVariants) {
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

if (selectedBundles.length > 0) {
  console.log(`bundles: ${selectedBundles.join(", ")}`);
}

if (finalVariants.length > 0) {
  console.log(`variants: ${finalVariants.join(", ")}`);
}

if (bundleProfiles.length > 0) {
  console.log(`recommended mcp profiles: ${bundleProfiles.join(", ")}`);
  console.log("see docs/bundles.md for bundle guidance");
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
    bundles: [],
    force: false,
    dryRun: false,
    listVariants: false,
    listBundles: false,
    help: false
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg === "--variant") {
      parsed.variants.push(argv[i + 1] || "");
      i += 1;
      continue;
    }

    if (arg === "--bundle") {
      parsed.bundles.push(argv[i + 1] || "");
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

    if (arg === "--list-bundles") {
      parsed.listBundles = true;
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

async function getBundleManifests() {
  const bundlesDir = join(root, "bundles");
  const entries = await readdir(bundlesDir, { withFileTypes: true });
  const bundleFiles = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
    .map((entry) => entry.name)
    .sort();

  const bundles = [];
  for (const file of bundleFiles) {
    const contents = JSON.parse(await readFile(join(bundlesDir, file), "utf8"));
    bundles.push(contents);
  }
  return bundles;
}

function normalizeNames(values) {
  const seen = new Set();
  const results = [];

  for (const value of values) {
    for (const piece of value.split(",")) {
      const name = piece.trim();
      if (!name || seen.has(name)) {
        continue;
      }
      seen.add(name);
      results.push(name);
    }
  }

  return results;
}

function normalizeVariants(values) {
  return normalizeNames(values);
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
  console.log("  node scripts/install.mjs <target-dir> [--bundle <name>] [--variant <name>] [--variant <name>] [--force] [--dry-run]");
  console.log("  node scripts/install.mjs --list-variants");
  console.log("  node scripts/install.mjs --list-bundles");
  console.log("  node scripts/install.mjs --help");
  console.log("");
  console.log("Notes:");
  console.log("  - Bundles apply a named set of variants for a common team shape.");
  console.log("  - Use repeated --variant flags or a comma-separated value to apply multiple overlays.");
  console.log("  - Explicit --variant values are applied after bundle variants.");
  console.log("  - Later variants override earlier files when they touch the same path.");
}
