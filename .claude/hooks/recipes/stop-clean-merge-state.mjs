import { spawnSync } from "node:child_process";
import { cwd, stdout } from "node:process";

const result = spawnSync("git", ["status", "--porcelain"], {
  cwd: cwd(),
  encoding: "utf8"
});

if (result.status !== 0) {
  process.exit(0);
}

const lines = result.stdout
  .split("\n")
  .map((line) => line.trimEnd())
  .filter(Boolean);

const unresolved = lines.filter((line) => /^(AA|AU|DD|DU|UA|UD|UU)\s/.test(line));

if (unresolved.length === 0) {
  process.exit(0);
}

stdout.write(
  JSON.stringify({
    decision: "block",
    reason: `Resolve merge conflicts before ending the session: ${unresolved.join(", ")}`
  })
);
