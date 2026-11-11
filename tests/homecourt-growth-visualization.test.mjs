import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import ts from "typescript";

const root=path=>readFileSync(new URL("../"+path,import.meta.url),"utf8");
const source=root("lib/homecourt-growth.ts");
const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const growth=await import("data:text/javascript;base64,"+Buffer.from(compiled).toString("base64"));

test("12 week chart counts distinct recorded days, not training sessions or future dates",()=>{
  const checkins=[{checked_on:"2026-11-09"},{checked_on:"2026-11-09"},{checked_on:"2026-11-20"}];
  const history=[
    {occurred_on:"2026-11-09",date_precision:"day"},
    {occurred_on:"2026-11-01",date_precision:"month"},
  ];
  const observations=[{id:"one",area:"scan",stage:2,observed_on:"2026-11-10"}];
  const weeks=growth.growthActivityWeeks(checkins,history,observations,"2026-11-11",12);
  assert.equal(weeks.length,12);
  assert.equal(weeks.at(-1).start,"2026-11-09");
  assert.equal(weeks.at(-1).days,2);
  assert.equal(weeks.reduce((sum,w)=>sum+w.days,0),2);
});
test("a stage trend uses only that person's dated, explicitly recorded observations",()=>{
  const values=[
    {id:"a",area:"scan",stage:3,observed_on:"2026-11-10"},
    {id:"b",area:"scan",stage:1,observed_on:"2026-10-02"},
    {id:"c",area:"connect",stage:4,observed_on:"2026-10-09"},
  ];
  const a=growth.growthAreaTrends(values).find(x=>x.area==="scan");
  assert.equal(a.items.length,2);
  assert.equal(a.first.stage,1);
  assert.equal(a.latest.stage,3);
  assert.equal(a.delta,2);
  assert.equal(growth.growthAreaTrends(values).find(x=>x.area==="move").delta,null);
});
test("empty history means no measured change, never a fabricated 0-ability rating",()=>{
  const sum=growth.growthSummary([],[],[],[],"2026-11-11");
  assert.equal(sum.recordedDays,0);
  assert.equal(sum.areasObserved,0);
  assert.ok(sum.areas.every(a=>a.first===null && a.delta===null));
});
test("only an authenticated owner's per-person data can be exposed through the client",()=>{
  const sql=root("supabase/migrations/20261111035644_homecourt_private_growth_observations_20261111.sql");
  const hardening=root("supabase/migrations/20261111035813_homecourt_growth_restrict_authenticated_privileges_20261111.sql");
  const ui=root("components/homecourt-growth-dashboard.tsx");
  const passport=root("components/basketball-passport.tsx");
  assert.match(sql,/foreign key \(person_id,user_id\) references public\.homecourt_people\(id,user_id\)/);
  assert.match(sql,/enable row level security/);
  assert.match(sql,/to authenticated using \(user_id=\(select auth\.uid\(\)\)\)/);
  assert.match(sql,/to authenticated with check \(user_id=\(select auth\.uid\(\)\)\)/);
  assert.match(sql,/revoke all on public\.homecourt_growth_observations from public,anon/);
  assert.match(hardening,/revoke truncate, references, trigger/);
  assert.match(ui,/\.eq\("user_id",userId\)\.eq\("person_id",personId\)/);
  assert.match(ui,/他の子との比較/);
  assert.match(ui,/指導者への自動共有はありません/);
  assert.match(passport,/key=\{personId\}/);
  assert.match(passport,/\["growth","成長グラフ"\]/);
});
