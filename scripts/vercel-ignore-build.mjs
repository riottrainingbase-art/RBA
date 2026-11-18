const ref = process.env.VERCEL_GIT_COMMIT_REF || "";
const message = process.env.VERCEL_GIT_COMMIT_MESSAGE || "";

const has = (token) => message.toLowerCase().includes(token);

if (!ref) {
  console.log("[vercel-ignore] manual deployment requested; allow");
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
