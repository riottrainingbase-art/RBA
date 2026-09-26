import fs from "node:fs";
import assert from "node:assert/strict";

const files=[
  "components/homecourt-page.tsx",
  "components/my-homecourt.tsx",
  "components/member-app.tsx",
  "components/homecourt-overview.tsx",
  "components/homecourt-premium.tsx",
  "components/homecourt-planner.tsx",
  "components/homecourt-plus-pulse.tsx",
  "components/homecourt-weekly-loop.tsx",
  "components/homecourt-monthly-review.tsx",
  "components/homecourt-development-report.tsx",
  "components/basketball-passport.tsx",
  "components/passport-media.tsx",
  "components/global-development-profile.tsx",
  "components/japan-team-map.tsx",
  "components/member-billing.tsx",
  "components/member-journey.tsx",
  "components/member-login.tsx",
  "components/member-login-entry.tsx",
  "components/notification-preferences.tsx",
  "components/calendar-import.tsx",
];

const forbidden=[
  ["member-label-concatenation",/MEMBERMEMBER|MEMBERWEEKLY|MEMBERCONDITION|MEMBERSMART/],
  ["legacy-japanese-save",/[\u3040-\u30ff\u3400-\u9fff][^\n]{0,70}\bSave\b|\bSave\b[^\n]{0,70}[\u3040-\u30ff\u3400-\u9fff]/],
  ["legacy-copy",/ここまで使えたら|次に行きたい活動|過去のクリニックを記録|無料版を不便にするための有料化/],
  ["legacy-paid-name",/有料HOMECOURT/],
  ["legacy-care-copy",/ケア予定名|ケア予定を保存|ケアの種類|ケアの予定を登録/],
];

const failures=[];
for(const file of files){
  assert.ok(fs.existsSync(file),"Missing audit target: "+file);
  const source=fs.readFileSync(file,"utf8");
  for(const [name,re] of forbidden){
    const match=source.match(re);
    if(match)failures.push({file,rule:name,sample:match[0]});
  }
  if(file!=="components/japan-team-map.tsx"){
    for(const line of source.split(/\r?\n/)){
      if(line.includes("現在地") && /<[^>]+>|title:|label:|strong>|span>/.test(line)){
        failures.push({file,rule:"abstract-current-position-ui",sample:line.trim().slice(0,180)});
      }
    }
  }
}

const map=fs.readFileSync("components/japan-team-map.tsx","utf8");
assert.ok(map.includes('src="/network-japan.svg"'),"Japan map must use /network-japan.svg");
assert.ok(!map.includes('viewBox="0 0 100 105"'),"Legacy hand-drawn schematic Japan SVG must not return");
assert.ok(map.includes("まだ所属チームが登録されていません。"),"Japanese empty-state copy is required");

const premium=fs.readFileSync("components/homecourt-premium.tsx","utf8");
assert.ok(premium.includes("育成を「続く流れ」に変えるためのプランです。"),"Canonical HOMECOURT PLUS Japanese headline is missing");
assert.ok(premium.includes(">PLUS FEATURE<"),"PLUS feature cards must keep label/title visually separate");

if(failures.length){
  console.error(JSON.stringify({status:"failed",failures},null,2));
  process.exit(1);
}
console.log(JSON.stringify({
  status:"passed",
  filesChecked:files.length,
  rulesChecked:forbidden.length+3,
  scope:"HOMECOURT Japanese copy regressions, legacy labels, Japan-map implementation and empty-state guard."
},null,2));
