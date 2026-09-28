const ref = process.env.VERCEL_GIT_COMMIT_REF || "";
const message = process.env.VERCEL_GIT_COMMIT_MESSAGE || "";

const has = (token) => message.toLowerCase().includes(token);

if (!ref) {
  console.log("[vercel-ignore] no Git ref detected; allow manual deployment");
  process.exit(1);
}

if (ref === "main") {
  if (has("[deploy]")) {
    console.log("[vercel-ignore] production checkpoint detected");
    process.exit(1);
  }
  console.log("[vercel-ignore] skip main commit without [deploy]");
  process.exit(0);
}

if (ref === "preview-rba") {
  if (has("[preview]") || has("[deploy]")) {
    console.log("[vercel-ignore] preview checkpoint detected");
    process.exit(1);
  }
  console.log("[vercel-ignore] skip preview-rba commit without [preview]");
  process.exit(0);
}

console.log(`[vercel-ignore] skip branch ${ref}`);
process.exit(0);
