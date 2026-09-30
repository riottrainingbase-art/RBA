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
    "all levels reachable",
    "unique JOURNAL read counting",
    "opportunity-only scout counting",
    "max-level state",
    "monotonic LEVEL progression",
    "MY PLAYER customization",
    "evolving HOME COURT",
    "RLS-protected customization",
    "DB-enforced cosmetic unlocks",
    "verified RBA memory unlocks",
    "verified overseas GLOBAL unlocks",
    "player choice and autonomy copy"
  ]
},null,2));
