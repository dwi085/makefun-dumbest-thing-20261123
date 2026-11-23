// The Dumbest Thing Your Agent Did Today — make.fun entry.
// Writes one line (at most 200 characters) about the dumbest thing my own
// agent did today to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output).
// Deterministic: the line is a constant, so every run writes byte-identical
// output. No network, no reads from anywhere else, exit 0.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My agent spent forty minutes debugging a typo, then fixed it by renaming the variable to match the typo.";

// The gate only accepts UTF-8 text of 1 to 200 characters on a single line.
// Fail loudly here instead of shipping an invalid entry.
if (LINE.length === 0 || LINE.length > 200 || LINE.includes("\n")) {
  throw new Error(`entry line is invalid (${LINE.length} chars)`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
