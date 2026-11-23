import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
const coach=fs.readFileSync(new URL("../app/ja/d-hub/coaches/member/toolkit/page.tsx",import.meta.url),"utf8");
const player=fs.readFileSync(new URL("../app/ja/d-hub/players/member/toolkit/page.tsx",import.meta.url),"utf8");
const memberCoach=fs.readFileSync(new URL("../app/ja/d-hub/coaches/member/page.tsx",import.meta.url),"utf8");
const memberPlayer=fs.readFileSync(new URL("../app/ja/d-hub/players/member/page.tsx",import.meta.url),"utf8");
for(const [name,source,rpc] of [["coaches",coach,"has_dhub_coach_access"],["players",player,"has_dhub_player_access"]]){
  test(name+" toolkit is user-authenticated and access-gated",()=>{
    assert.ok(source.includes("auth.getUser()"));
    assert.ok(source.includes('s.rpc("'+rpc+'")'));
    assert.ok(source.includes("if(!access)return"));
    assert.ok(source.includes("index:false"));
    assert.ok(source.includes("follow:false"));
    assert.ok(!source.includes("service_role"));
    assert.ok(!source.includes("buy.stripe.com"));
    assert.ok(!source.includes("stripe.checkout"));
    assert.ok(!source.includes("<form"));
  });
}
test("all worksheets are original and accessible from existing paid member pages",()=>{
 assert.ok(coach.includes("練習前の観察シート"));
 assert.ok(coach.includes("Small-Sided Game"));
 assert.ok(player.includes("試合の1場面を振り返る"));
 assert.ok(player.includes("自分の言葉で残す"));
 assert.ok(memberCoach.includes('href="/ja/d-hub/coaches/member/toolkit"'));
 assert.ok(memberPlayer.includes('href="/ja/d-hub/players/member/toolkit"'));
});
test("new toolkits avoid collecting sensitive data in the browser",()=>{
 for(const s of [coach,player]){
  assert.ok(s.includes("氏名"));
  assert.ok(!s.includes("upload"));
  assert.ok(!s.includes("setState"));
 }
});
