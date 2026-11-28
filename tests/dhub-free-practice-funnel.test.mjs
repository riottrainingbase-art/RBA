import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync,existsSync} from "node:fs";
const files=["ja/d-hub","en/d-hub","ja/d-hub-coaches","ja/d-hub-players","en/d-hub-players"];
const read=(p)=>readFileSync(p,"utf8");
for(const file of files){
  test(file+" has one free practice with no direct checkout",()=>{
    const html=read("definitive-content/"+file+".html");
    assert.equal(html.split('id="free-sample"').length,2);
    const section=html.match(/<section class="section" id="free-sample">[\s\S]*?<\/section>/)?.[0];
    assert.ok(section);
    assert.match(section,/FREE/);
    assert.doesNotMatch(section,/square\.link|checkout\.stripe|buy\.stripe/);
    assert.doesNotMatch(section,/<form\b|<iframe\b|<script\b/i);
    assert.match(html,/3,300/);
    if(file.endsWith("players")){
      assert.match(section,/262501513246044/);
      assert.match(section,/access-request\?program=players/);
      assert.doesNotMatch(section,/262498803883068/);
    }
    if(file.endsWith("coaches")){
      assert.match(section,/262498803883068/);
      assert.match(section,/access-request\?program=coach_lab/);
      assert.doesNotMatch(section,/262501513246044/);
    }
    for(const [,link] of section.matchAll(/href="([^"]+)"/g)){
      if(!link.startsWith("/")) continue;
      const [route,fragment]=link.split("#");
      assert.ok(existsSync("app/"+route.slice(1).split("?")[0]+"/page.tsx"),"missing route "+route);
      if(fragment==="free-sample"){
        const target=route.startsWith("/ja/")?"ja/"+route.slice(4):"en/"+route.slice(1);
        assert.match(read("definitive-content/"+target+".html"),/id="free-sample"/);
      }
    }
  });
}
test("JP existing member hub offers access verification before duplicate payment",()=>{
  const s=read("app/ja/d-hub/member/page.tsx");
  assert.match(s,/has_dhub_coach_access/);
  assert.match(s,/has_dhub_player_access/);
  assert.match(s,/access-request\?program=coach_lab/);
  assert.match(s,/access-request\?program=players/);
});
test("EN verified coach access goes to the actual member route",()=>{
  const s=read("app/d-hub/access-request/page.tsx");
  assert.ok(s.includes('const memberPath=program==="players"?"/d-hub/players/member":"/ja/d-hub/coaches/member"'));
  assert.match(s,/if\(ok\)redirect\(memberPath\)/);
});
