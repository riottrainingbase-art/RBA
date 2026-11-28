import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import ts from "typescript";

const root=path=>readFileSync(new URL("../"+path,import.meta.url),"utf8");
const source=root("lib/homecourt-growth.ts");
const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const growth=await import("data:text/javascript;base64,"+Buffer.from(compiled).toString("base64"));
const focusSource=root("lib/homecourt-weekly-focus.ts");
const focusCompiled=ts.transpileModule(focusSource,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const {weeklyFocus}=await import("data:text/javascript;base64,"+Buffer.from(focusCompiled).toString("base64"));

test("all twelve role-specific weekly prompts are localized, retain valid protected guide links and rotate",()=>{
  const catalog=root("lib/member-articles.ts");
  const roles=["player","parent","coach"];
  const locales=["ja","en","zh-tw","ko"];
  for(const role of roles){
    const slugs=new Set();
    for(let week=0;week<4;week++){
      const monday=new Date(Date.UTC(2026,10,23+7*week)).toISOString().slice(0,10);
      const original=weeklyFocus(role,monday,"ja");
      slugs.add(original.slug);
      assert.ok(catalog.includes(`"${original.slug}"`),original.slug);
      for(const locale of locales){
        const prompt=weeklyFocus(role,monday,locale);
        assert.equal(prompt.slug,original.slug);
        assert.ok(prompt.theme&&prompt.action&&prompt.evidence);
        if(locale!=="ja")assert.notEqual(prompt.theme,original.theme);
      }
    }
    assert.equal(slugs.size,4);
  }
  assert.equal(weeklyFocus("coach","invalid","en").slug,weeklyFocus("coach","2026-11-23","en").slug);
});

test("weekly first start uses an explicit save and preserves existing plans",()=>{
  const ui=root("components/homecourt-weekly-loop.tsx");
  const hub=root("components/member-app.tsx");
  for(const field of ["theme","action","evidence"]){
    assert.ok(ui.includes(`defaultValue={entry?entry.${field}:focus.${field}}`));
  }
  assert.match(ui,/!entry\?<button type="submit" disabled=\{busy\}/);
  assert.match(ui,/entry\?records\.upsert\(payload,\{onConflict:"user_id,week_start,role"\}\):records\.insert\(payload\)/);
  assert.match(ui,/result\.error\?\.code==="23505"&&!entry/);
  assert.match(ui,/if\(loadFailed\)return/);
  assert.match(hub,/hasPaidMembership\?<HomecourtPlusMemberHub/);
});

test("participant help is linked without making a new payment or exposing recordings",()=>{
  const before=root("app/ja/after-application/page.tsx");
  const after=root("app/ja/after-clinic/page.tsx");
  const hub=root("components/homecourt-plus-member-hub.tsx");
  assert.match(before,/id="online-checklist"/);
  assert.match(before,/再決済、カード番号、パスワードの送信は不要/);
  assert.match(after,/href="\/ja\/after-application#online-checklist"/);
  assert.match(hub,/href=\{ja\?"\/ja\/after-application#online-checklist":`\$\{prefix\}\/contact`\}/);
  for(const text of [before,after,hub])assert.doesNotMatch(text,/zoom\.us\/rec\/share\//);
});

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
