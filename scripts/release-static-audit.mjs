import fs from "node:fs";
import path from "node:path";

const root=process.cwd();
const failures=[];

const read=(p)=>fs.readFileSync(path.join(root,p),"utf8");
const exists=(p)=>fs.existsSync(path.join(root,p));
const fail=(message)=>failures.push(message);

const publicCopyFiles=[
  "components/site-frame.tsx",
  "components/member-login.tsx",
  "components/member-login-entry.tsx",
  "components/localized-home.tsx",
  "components/localized-payments.tsx",
  "components/localized-schedule.tsx",
  "components/public-journal.tsx",
  "components/platform-operating-system.tsx",
  "components/japanese-home.tsx",
  "components/japanese-my-homecourt.tsx",
  "components/global-home.tsx",
  "components/global-my-homecourt.tsx",
];

for(const file of publicCopyFiles){
  const content=read(file);
  if(/RBA ID|ONE ID/.test(content)) fail(`${file}: legacy public ID branding remains`);
}

const canonicalComponents=[
  "components/site-frame.tsx",
  "components/localized-home.tsx",
  "components/localized-payments.tsx",
  "components/japanese-home.tsx",
  "components/japanese-my-homecourt.tsx",
];
for(const file of canonicalComponents){
  const content=read(file);
  if(/href=["'`]\/ja\/home-court/.test(content)) fail(`${file}: legacy /ja/home-court link remains`);
  if(/localePath\([^\n]+["']home-court["']/.test(content)) fail(`${file}: legacy home-court localePath remains`);
}

const sitemap=read("app/sitemap.ts");
for(const legacy of ["/home-court","/schedule","/asia","/connect","/network","/sponsor","/verified"]){
  if(sitemap.includes(`"${legacy}"`)) fail(`sitemap still indexes redirected route: ${legacy}`);
}

const programmes=read("components/programme-data.ts");
if(!/id:\s*"kawasaki"[\s\S]*?registrationClosed:\s*true/.test(programmes)) fail("Kawasaki 2026-09-27 must be closed");
if(!/export function isProgrammeOpen/.test(programmes)) fail("automatic programme expiry helper is missing");

const requiredRoutes=[
  "app/ja/homecourt/explore/page.tsx",
  "app/ja/homecourt/match/page.tsx",
  "app/ja/my-homecourt/app/timeline/page.tsx",
  "app/ja/my-homecourt/app/claim/page.tsx",
  "app/ja/my-homecourt/app/match/page.tsx",
  "app/ja/my-homecourt/app/team-development/page.tsx",
  "app/ja/team-development/page.tsx",
  "lib/rba-operator.ts",
];
for(const route of requiredRoutes) if(!exists(route)) fail(`required route missing: ${route}`);

const migrations=[
  "supabase/migrations/20260928004500_homecourt_development_graph.sql",
  "supabase/migrations/20260928013000_team_development_core.sql",
  "supabase/migrations/20260928013100_team_development_policies.sql",
  "supabase/migrations/20260928013200_homecourt_team_development_hardening.sql",
  "supabase/migrations/20260928013300_homecourt_indexes_policy_cleanup.sql",
  "supabase/migrations/20260928014000_team_development_90_day_cycle.sql",
  "supabase/migrations/20260928014500_homecourt_match_rpc_invoker.sql",
  "supabase/migrations/20260928014600_homecourt_admin_policies.sql",
  "supabase/migrations/20260928014700_rba_operator_scope.sql",
];
for(const migration of migrations) if(!exists(migration)) fail(`migration missing: ${migration}`);

const vercel=JSON.parse(read("vercel.json"));
if(vercel.git?.deploymentEnabled?.["**"]!==false) fail("Vercel default branch deployment gate is not disabled");
if(vercel.git?.deploymentEnabled?.main!==true) fail("Vercel main checkpoint route is not enabled");
if(vercel.git?.deploymentEnabled?.["preview-rba"]!==true) fail("Vercel preview-rba checkpoint route is not enabled");
if(vercel.ignoreCommand!=="node scripts/vercel-ignore-build.mjs") fail("Vercel ignoreCommand is not configured");

if(failures.length){
  console.error("\nRBA RELEASE AUDIT FAILED\n");
  for(const item of failures) console.error("- "+item);
  process.exit(1);
}

console.log("RBA release static audit: PASS");
