import fs from "node:fs";
import assert from "node:assert/strict";

const game=fs.readFileSync("lib/homecourt-game.ts","utf8");
const ui=fs.readFileSync("components/homecourt-player-journey.tsx","utf8");
const member=fs.readFileSync("components/member-app.tsx","utf8");
const publicPage=fs.readFileSync("components/my-homecourt.tsx","utf8");
const studio=fs.readFileSync("components/homecourt-player-studio.tsx","utf8");
const migration=fs.readFileSync("supabase/migrations/20260930141000_homecourt_player_customization.sql","utf8");

assert.ok(member.includes("HomecourtPlayerJourney"),"MY HOME COURT must render Player Journey");
assert.ok(publicPage.includes("HomecourtPlayerJourneyPreview"),"Actual public MY HOME COURT page must preview Player Journey");
assert.ok(ui.includes("HomecourtPlayerStudio"),"Player Journey must include MY PLAYER studio");
assert.ok(member.includes("userId={userId}"),"Authenticated RBA ID must be passed into MY PLAYER studio");
assert.ok(studio.includes("RbaPlayerAvatar"),"MY PLAYER studio must render the avatar");
assert.ok(studio.includes("RbaHomeCourtScene"),"MY PLAYER studio must render the evolving HOME COURT");
assert.ok(studio.includes('eq("attendance_status","attended")'),"Official memories must require attended status");
assert.ok(studio.includes("RBA VERIFIED"),"Verified RBA memories must have a distinct surface");
assert.ok(studio.includes("setLoadError(true)"),"Customization load failure must enter a safe error state");
assert.ok(studio.includes("既存設定を上書きしないため、編集を停止しています。"),"Load failure must explicitly prevent accidental overwrite");
assert.ok(studio.includes('select("id",{count:"exact",head:true})'),"Official-memory count must not depend on the six displayed cards");
assert.ok(studio.includes('events!inner(country)'),"Verified overseas unlock must use a dedicated full-history query");
assert.ok(studio.includes("WORLD MEMORY UNLOCKED"),"Older overseas memories must not produce a blank WORLD label");
assert.ok(studio.includes("MEMORY WALL / RBA VERIFIED"),"Verified events must appear on a dedicated memory wall");
assert.ok(ui.includes("DEMO / YOUR COURT EVOLVES"),"Public signup preview must show a live MY PLAYER court demo");
assert.ok(member.includes('.eq("item_type","opportunity")'),"Scout progress must count opportunity saves only");
assert.ok(member.includes('.eq("item_type","journal")'),"Learning progress must count JOURNAL views only");
assert.ok(member.includes('new Set((viewsQ.data||[]).map(row=>row.item_key)'),"JOURNAL XP must use unique item keys rather than reload count");

for(const forbidden of [
  ["random progression",/Math\.random/],
  ["paid progression",/hasPaidMembership|subscription|checkout/i],
  ["login streak pressure",/連続ログイン|毎日ログイン|ログインを続け/i],
  ["public leaderboard",/leaderboard|ランキング順位|全国順位/i],
  ["player ability score",/シュート\s*[:：]?\s*\d+|ドリブル\s*[:：]?\s*\d+|能力値\s*[:：]\s*\d+/i],
]){
  assert.ok(!game.match(forbidden[1]),`Progression rule contains ${forbidden[0]}`);
  assert.ok(!ui.match(forbidden[1]),`Player Journey UI contains ${forbidden[0]}`);
  assert.ok(!studio.match(forbidden[1]),`MY PLAYER studio contains ${forbidden[0]}`);
}

assert.ok(game.includes("Math.min(history,8)*35"),"History XP must remain capped");
assert.ok(game.includes("Math.min(saves,5)*25"),"Saved-opportunity XP must remain capped");
assert.ok(game.includes("Math.min(views,10)*12"),"Journal-view XP must remain capped");
assert.ok(game.includes("Momentum counts different kinds of engagement"),"Momentum must be breadth-based, not consecutive-day based");
assert.ok(game.includes("const maxLevel="),"Max-level state must be explicit");
assert.ok(game.includes("levelProgress=maxLevel?100"),"Max-level progress bar must stay at 100%");

const match=game.match(/PLAYER_JOURNEY_LEVEL_THRESHOLDS=\[([^\]]+)\]/);
assert.ok(match,"Level thresholds are missing");
const thresholds=match[1].split(",").map(x=>Number(x.trim()));
assert.equal(thresholds[0],0,"Level 1 must start at zero");
for(let i=1;i<thresholds.length;i++)assert.ok(thresholds[i]>thresholds[i-1],"Level thresholds must strictly increase");
const setupOnlyXp=150;
assert.ok(setupOnlyXp<thresholds[1],"Completing onboarding alone must remain Level 01");
assert.ok(setupOnlyXp+12>=thresholds[1],"One unique JOURNAL read must be enough to reach Level 02");
assert.ok(setupOnlyXp+25>=thresholds[1],"One saved opportunity must be enough to reach Level 02");
assert.ok(setupOnlyXp+35>=thresholds[1],"One Passport experience must be enough to reach Level 02");

const maxXp=100+8*35+5*25+10*12+50;
assert.ok(maxXp>=thresholds.at(-1),"Highest level must be reachable within capped XP");
assert.ok(maxXp-thresholds.at(-1)<=25,"Highest level should be reachable only after broad durable engagement");
assert.ok(!game.includes("(input.teamLinked?80:0)"),"Transient team links must not increase LEVEL XP");
assert.ok(!game.includes("(input.hasNextEvent?80:0)"),"Future events must not increase LEVEL XP");
assert.ok(game.includes("LEVEL is intentionally monotonic"),"LEVEL must be explicitly designed not to fall when schedules change");

assert.ok(migration.includes("enable row level security"),"Customization table must use RLS");
assert.ok(migration.includes("(select auth.uid())=user_id"),"Customization ownership must be enforced by RLS");
assert.ok(migration.includes("private.validate_homecourt_player_customization"),"Locked cosmetics must be validated in the database");
assert.ok(migration.includes("security definer"),"Private trigger must be privileged only for validation");
assert.ok(migration.includes("v_uid <> new.user_id"),"Privileged trigger must still verify the authenticated owner");
assert.ok(migration.includes("attendance_status='attended'"),"Verified-only cosmetics must depend on attended RBA participation");
assert.ok(migration.includes("coalesce(e.country,'JP') <> 'JP'"),"GLOBAL cosmetics must require verified overseas participation");
assert.ok(migration.includes("when v_xp >= 160 then 2"),"DB validator must match Level 02 threshold");
assert.ok(migration.includes("when v_xp >= 660 then 8"),"DB validator must match maximum Journey threshold");
assert.ok(migration.includes("is distinct from old.shoe_style"),"Existing verified cosmetics must not block unrelated edits after record correction");
assert.ok(migration.includes("is distinct from old.court_theme"),"Existing court themes must not block unrelated edits after record correction");

assert.ok(ui.includes("XPは上手さや序列ではなく"),"UI must explain XP is not player ability");
assert.ok(ui.includes("公開ランキングはありません"),"UI must explicitly reject public ranking");
assert.ok(ui.includes("NO RANKING / NO PAY-TO-WIN"),"Safety design statement must remain visible");
assert.ok(ui.includes("毎日やる必要はありません"),"Quest UI must avoid daily-pressure language");
assert.ok(ui.includes("正解は一つではありません"),"Player choice/autonomy copy must remain visible");

console.log(JSON.stringify({
  status:"passed",
  maxXp,
  highestThreshold:thresholds.at(-1),
  checks:[
    "deterministic progression",
    "capped grind sources",
    "no paid XP",
    "no login streak pressure",
    "no public leaderboard",
    "no ability scoring",
    "Level 01 onboarding start",
    "any first durable action reaches Level 02",
    "all levels reachable",
    "unique JOURNAL read counting",
    "opportunity-only scout counting",
    "max-level state",
    "monotonic LEVEL progression",
    "safe customization load failure",
    "full verified-memory unlock summary",
    "older overseas GLOBAL unlock",
    "MY PLAYER customization",
    "evolving HOME COURT",
    "RLS-protected customization",
    "DB-enforced cosmetic unlocks",
    "verified RBA memory unlocks",
    "verified overseas GLOBAL unlocks",
    "player choice and autonomy copy"
  ]
},null,2));
