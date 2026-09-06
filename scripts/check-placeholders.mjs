#!/usr/bin/env node
/**
 * Pre-launch gate.
 *
 * 1. Lists every `TODO:` placeholder still present in content/ and app/.
 * 2. Fails hard if any of the old WordPress demo data has crept in — the
 *    previous aayuexim.com published the Bizmaster theme's fake Las Vegas
 *    address and Bangladeshi phone numbers as if they were real.
 *
 * Run with `npm run check:placeholders`. Exit code 1 means "not ready to
 * publish"; the TODO list alone is a warning, banned strings are an error.
 */

import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const SCAN_DIRS = ["content", "app", "components"];
const EXTENSIONS = [".ts", ".tsx", ".css", ".md"];

/** Demo data from the old WordPress site. None of this may ever ship. */
const BANNED = [
  "Lav Vegas",
  "Las Vegas",
  "The Veg Street",
  "+880",
  "[email protected]",
  "Lorem Ipsum",
  "lorem ipsum",
];

async function* walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".next") continue;
      yield* walk(full);
    } else if (EXTENSIONS.some((ext) => entry.name.endsWith(ext))) {
      yield full;
    }
  }
}

const todos = [];
const violations = [];

for (const dir of SCAN_DIRS) {
  for await (const file of walk(join(ROOT, dir))) {
    const text = await readFile(file, "utf8");
    const rel = relative(ROOT, file).replaceAll("\\", "/");

    text.split(/\r?\n/).forEach((line, index) => {
      // Skip this script's own banned-string list if it is ever scanned.
      if (rel.startsWith("scripts/")) return;

      if (line.includes("TODO:")) {
        todos.push({ rel, line: index + 1, text: line.trim() });
      }
      for (const banned of BANNED) {
        if (line.includes(banned)) {
          violations.push({ rel, line: index + 1, banned, text: line.trim() });
        }
      }
    });
  }
}

if (todos.length > 0) {
  console.log(`\n${todos.length} placeholder(s) still to be filled in:\n`);
  let current = "";
  for (const todo of todos) {
    if (todo.rel !== current) {
      current = todo.rel;
      console.log(`  ${current}`);
    }
    console.log(`    ${String(todo.line).padStart(4)}  ${todo.text.slice(0, 110)}`);
  }
} else {
  console.log("\nNo TODO placeholders remain.");
}

if (violations.length > 0) {
  console.error(`\nERROR: ${violations.length} banned string(s) from the old demo site found:\n`);
  for (const violation of violations) {
    console.error(`  ${violation.rel}:${violation.line}  contains "${violation.banned}"`);
  }
  console.error("\nRemove these before publishing.\n");
  process.exit(1);
}

if (todos.length > 0) {
  console.log("\nNot ready to publish: fill the placeholders above, then re-run.\n");
  process.exit(1);
}

console.log("Ready to publish.\n");
