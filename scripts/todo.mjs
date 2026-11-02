// Lists every [placeholder] still in the site's content.
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const dir = new URL("../content/", import.meta.url).pathname;
const seen = new Map();
for (const file of readdirSync(dir).filter((f) => f.endsWith(".ts"))) {
  const lines = readFileSync(join(dir, file), "utf8").split("\n");
  lines.forEach((line, i) => {
    if (line.trim().startsWith("//")) return;
    for (const m of line.matchAll(/\[([^\]\[]{2,200})\]/g)) {
      const key = m[1];
      if (key.includes("\"") || key.includes("(")) continue;
      if (!seen.has(key)) seen.set(key, `${file}:${i + 1}`);
    }
  });
}
console.log(`${seen.size} placeholders left:\n`);
for (const [k, where] of seen) console.log(`  [${k}]  — ${where}`);
