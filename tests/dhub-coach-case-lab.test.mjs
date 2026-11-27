import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const read = path => readFileSync(new URL("../"+path, import.meta.url),"utf8");
const source=read("lib/dhub-coach-cases.ts");
const cases=JSON.parse(source.split("export const dhubCoachCases = ")[1].split(" as const;")[0]);
test("twelve distinct and complete field cases",()=>{
  assert.equal(cases.length,12);
  assert.equal(new Set(cases.map(c=>c.id)).size,12);
  for(const c of cases){
    for(const key of ["title","age","duration","question","setup","observe","adjust","cue","review","player","parent"])assert.ok(c[key]?.trim(),c.id+":"+key);
    assert.equal(c.steps.length,3);
  }
});
test("case lab is rendered only after the existing member entitlement guard",()=>{
  const page=read("app/ja/d-hub/coaches/member/page.tsx");
  const auth=page.indexOf("supabase.auth.getUser()");
  const rpc=page.indexOf('supabase.rpc("has_dhub_coach_access")');
  const guard=page.indexOf("if (!hasAccess)");
  const render=page.indexOf("<DhubCoachCaseLab />");
  assert.ok(auth>=0&&auth<rpc&&rpc<guard&&guard<render);
  assert.equal(page.match(/<DhubCoachCaseLab \/>/g)?.length,1);
});
test("content has no recording, checkout, data collection or claimed accreditation",()=>{
  const component=read("components/dhub-coach-case-lab.tsx");
  assert.doesNotMatch(component+source,/buy\.stripe\.com|us06web\.zoom\.us\/rec\/|localStorage|<form|<input|use client/);
  assert.match(component,/RBA独自の練習設計案/);
  assert.match(component,/自動加算されません/);
  assert.match(component,/氏名や健康情報を外部共有しない/);
});
