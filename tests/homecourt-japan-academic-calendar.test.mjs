import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const source = readFileSync(new URL("../lib/japan-academic-calendar.ts", import.meta.url), "utf8");
const transpiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }, reportDiagnostics: true });
assert.equal(transpiled.diagnostics?.length || 0, 0);
const exports = {};
vm.runInNewContext(transpiled.outputText, { exports });
const { validDate, relation, gradeMatches, buffer, prefectures } = exports;
const rows = JSON.parse(readFileSync(new URL("../data/japan-academic-calendar.json", import.meta.url), "utf8"));

test("calendar dates are valid, ordered, unique and sourced", () => {
  assert.equal(prefectures.length, 47);
  assert.equal(new Set(prefectures).size, 47);
  assert.equal(new Set(rows.map(r => r.id)).size, rows.length);
  for (const r of rows) {
    assert.ok(prefectures.includes(r.region), r.id);
    assert.ok(validDate(r.start) && validDate(r.end) && r.start <= r.end && validDate(r.checked), r.id);
    assert.ok(r.title && r.school && r.grade && r.source.startsWith("https://"), r.id);
    assert.ok(["試験","入試","学校行事","休業"].includes(r.kind), r.id);
  }
});
test("invalid dates and leap years", () => {
  assert.equal(validDate("2027-02-29"), false);
  assert.equal(validDate("2028-02-29"), true);
  assert.equal(validDate("2027-02-30"), false);
  assert.equal(validDate("2027-2-09"), false);
});
test("same day, inclusive range, preparation, outside and after", () => {
  assert.equal(relation("2027-02-09","2027-02-09","2027-02-09","2027-02-12",14), "overlap");
  assert.equal(relation("2027-02-06","2027-02-09","2027-02-09","2027-02-12",14), "overlap");
  assert.equal(relation("2027-02-06","2027-02-07","2027-02-09","2027-02-12",14), "prepare");
  assert.equal(relation("2027-01-26","2027-01-26","2027-02-09","2027-02-12",14), "prepare");
  assert.equal(relation("2027-01-25","2027-01-25","2027-02-09","2027-02-12",14), "none");
  assert.equal(relation("2027-02-13","2027-02-14","2027-02-09","2027-02-12",14), "none");
});
test("preparation window is adjustable, non-exams have no preparation window", () => {
  assert.equal(relation("2027-02-06","2027-02-07","2027-02-09","2027-02-12",0), "none");
  assert.equal(buffer({kind:"学校行事",grade:"中学生"},14),0);
  assert.equal(buffer({kind:"休業",grade:"中学生"},14),0);
  assert.equal(buffer({kind:"試験",grade:"中学生"},21),21);
});
test("grade filters and conditional examinations", () => {
  const e = grade => ({grade,kind:"入試"});
  assert.equal(gradeMatches(e("中1・2"),"中1",true),true);
  assert.equal(gradeMatches(e("中1・2"),"中3",true),false);
  assert.equal(gradeMatches(e("高校受験者"),"中3",true),true);
  assert.equal(gradeMatches(e("高校受験者"),"高校生",true),false);
  assert.equal(gradeMatches(e("該当受験者"),"中3",false),false);
  assert.equal(gradeMatches(e("高1・2"),"高校生",true),true);
  assert.equal(gradeMatches(e("中学生"),"小学生",true),false);
});
test("Shizugawa February 6–7 catches both published junior-high examples", () => {
  const matches = rows.filter(r => r.region==="宮城県" && r.kind==="試験" && gradeMatches(r,"中3",false) && relation("2027-02-06","2027-02-07",r.start,r.end,14)==="prepare");
  assert.ok(matches.some(r=>r.id==="watari-jhs-3-finals"));
  assert.ok(matches.some(r=>r.id==="nika-jhs-finals"));
  assert.ok(!matches.some(r=>r.id==="watari-jhs-12-finals"));
});
