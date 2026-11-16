const ref = process.env.VERCEL_GIT_COMMIT_REF || "";
const message = process.env.VERCEL_GIT_COMMIT_MESSAGE || "";

const has = (token) => message.toLowerCase().includes(token);

if (!ref) {
  console.log("[vercel-ignore] manual deployment requested; allow");
  process.exit(1);
}

// Isolated RBA Instagram link-hub release build. This override lives only on
// the dedicated release branch and never changes the existing preview-rba rule.
if (
  ref === "release/instagram-conversion-hub-20261117" &&
  (process.env.VERCEL_PROJECT_ID === "prj_ToviFjFURKMeQe7Gci5K4XLAfwAE" ||
   process.env.VERCEL_PROJECT_NAME === "rba_site_v11_portal_ready")
) {
  console.log("[vercel-ignore] allow scoped RBA Instagram link-hub release build");
  process.exit(1);
}

if (ref !== "preview-rba") {
  console.log(`[vercel-ignore] skip Git deployment for ${ref}; only preview-rba may build`);
  process.exit(0);
}

if (has("[preview]")) {
  console.log("[vercel-ignore] explicit preview checkpoint detected; allow one preview build");
  process.exit(1);
}

console.log("[vercel-ignore] skip preview-rba commit without [preview]");
process.exit(0);
