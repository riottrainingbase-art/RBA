import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const sources = [
  "components/localized-torsten.tsx",
  "components/torsten-coach-campaign-ja.tsx",
];
const forbidden = [
  /levanga(?:\\.com|\\s+hokkaido|北海道)?/i,
  /レバンガ北海道/,
  /레반가\\s*홋카이도/,
];
const findings = [];
for (const filename of sources) {
  const content = readFileSync(resolve(process.cwd(), filename), "utf8");
  for (const pattern of forbidden) {
    if (pattern.test(content)) findings.push(`${filename}: forbidden club reference ${pattern}`);
  }
}
if (findings.length) {
  console.error("Torsten campaign rights-safe check failed:\\n" + findings.join("\\n"));
  process.exit(1);
}
console.log("Torsten campaign rights-safe check passed (source-level only).");
