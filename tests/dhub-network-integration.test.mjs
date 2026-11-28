import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
const read=(p)=>readFileSync(p,"utf8");
for(const locale of ["ja","en"]){
  test(locale+" D-HUB network joins existing RBA routes",()=>{
    const body=read("definitive-content/"+locale+"/d-hub.html");
    const prefix=locale==="ja"?"/ja":"";
    assert.match(body,/id="coach-network"/);
    assert.match(body,/id="global-seminar"/);
    assert.ok(body.includes('href="'+prefix+'/connect#practice-game"'));
    assert.ok(body.includes('href="'+prefix+'/opportunities"'));
    assert.ok(body.includes('href="'+prefix+'/contact"'));
    assert.ok(body.includes("https://about.fiba.basketball/en/wabc-documents"));
    for(const route of ["/connect","/opportunities","/contact"]) assert.ok(existsSync("app"+prefix+route+"/page.tsx"));
  });
}
test("enquiry stays local, no automatic submissions or storage",()=>{
  const source=read("components/dhub-game-enquiry.tsx");
  assert.match(source,/id="practice-game"/);
  assert.match(source,/disabled=\{!complete\}/);
  assert.match(source,/navigator\.clipboard\.writeText\(preview\)/);
  assert.doesNotMatch(source,/\bfetch\s*\(|localStorage|sessionStorage|\.submit\s*\(|supabase/);
  assert.match(source,/Nothing is stored, sent or matched automatically/);
  assert.match(source,/選手の氏名・連絡先・学校名・映像は入力しない/);
});
test("existing CONNECT only renders the enquiry for JP and EN",()=>{
  assert.ok(read("components/platform-business-pages.tsx").includes('kind==="connect"&&(locale==="ja"||locale==="en")?<DhubGameEnquiry locale={locale}/>'));
});
