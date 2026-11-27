import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
const read = file => readFileSync(file,"utf8");
test("shared project directory uses valid Japanese routes and distinguishes three programme types",()=>{
  const src=read("components/rba-project-directory.tsx");
  for(const path of ["/ja/backbone","/ja/business","/ja/gream","/ja/store"]){
    assert.ok(src.includes(path),path);
    assert.ok(existsSync("app"+path+"/page.tsx"),path);
  }
  for(const name of ["MY HOME COURT","HOMECOURT PLUS","D-HUB","RBA UNITED","BACKBONE / 3x3"]) assert.ok(src.includes(name),name);
});
test("regional fixtures have source links, date ranges and no duplicate keys",()=>{
  const rows=JSON.parse(read("data/regional-tournaments.json"));
  const keys=new Set();
  for(const e of rows){
    assert.ok(e.region && e.title && e.category && e.status && e.level);
    assert.ok(/^\d{4}-\d{2}-\d{2}$/.test(e.start) && /^\d{4}-\d{2}-\d{2}$/.test(e.end) && e.start<=e.end);
    assert.equal(new URL(e.source).protocol,"https:");
    const key=[e.region,e.start,e.title].join("|");assert.ok(!keys.has(key),key);keys.add(key);
  }
  assert.ok(new Set(rows.map(e=>e.region)).size>=14);
  const ui=read("components/regional-tournaments.tsx");
  assert.match(ui,/japanbasketball\.jp\/47ba/);
  assert.match(ui,/JapanAcademicCalendar/);
  assert.match(ui,/学校日程と照合/);
});
test("founder contact routes offer WhatsApp and official Instagram together",()=>{
  const page=read("components/founder-profile.tsx");
  assert.match(page,/wa\.me/);
  assert.match(page,/instagram\.com\/riot\.basketball\.academy/);
  assert.match(page,/Instagram/);
});
