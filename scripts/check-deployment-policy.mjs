import fs from "node:fs";

const fail = (message) => {
  console.error("[deployment-policy] " + message);
  process.exitCode = 1;
};

const read = (path) => fs.readFileSync(path, "utf8");

const vercel = JSON.parse(read("vercel.json"));
const deploymentEnabled = vercel?.git?.deploymentEnabled || {};
const enabledBranches = Object.entries(deploymentEnabled)
  .filter(([, value]) => value === true)
  .map(([key]) => key)
  .sort();

if (deploymentEnabled["**"] !== false) {
  fail('vercel.json must keep git.deploymentEnabled["**"] = false');
}

if (deploymentEnabled.main === true) {
  fail("main must not be enabled for Git-triggered Vercel deployments");
}

if (enabledBranches.length !== 1 || enabledBranches[0] !== "preview-rba") {
  fail(`only preview-rba may be enabled for Git deployments; found: ${enabledBranches.join(", ") || "none"}`);
}

if (vercel.ignoreCommand !== "node scripts/vercel-ignore-build.mjs") {
  fail("vercel.json ignoreCommand must remain node scripts/vercel-ignore-build.mjs");
}

const gate = read("scripts/vercel-ignore-build.mjs");

if (!gate.includes('ref !== "preview-rba"')) {
  fail("Vercel ignore gate must reject every Git ref except preview-rba");
}

if (!gate.includes('has("[preview]")')) {
  fail("Vercel ignore gate must require an explicit [preview] checkpoint");
}

if (gate.includes('has("[deploy]")')) {
  fail("legacy [deploy] token must not be accepted by the Vercel Git gate");
}

const docs = read("DEPLOYMENT.md");
for (const required of [
  "Normal code work must not create a Vercel deployment.",
  "promote the verified Preview artifact to Production",
  "Expected total new deployment artifacts per normal release: **1**",
]) {
  if (!docs.includes(required)) {
    fail(`DEPLOYMENT.md is missing required policy statement: ${required}`);
  }
}

if (!process.exitCode) {
  console.log("[deployment-policy] OK: one-preview policy is intact");
}
