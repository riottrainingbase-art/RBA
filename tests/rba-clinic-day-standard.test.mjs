import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const read=p=>readFileSync(new URL("../"+p,import.meta.url),"utf8");
test("clinic day standard has protected player rest and a separate optional parent session",()=>{
 const s=read("lib/clinic-day-standard.ts");
 assert.ok(s.includes('time:"12:00–13:30"'));assert.ok(s.includes('time:"12:15–12:40"'));assert.ok(s.includes("選手の休憩を妨げない"));assert.ok(s.includes("短時間のクリニックは選手の休憩を削らず"));
 assert.ok(s.includes('time:"14:35–14:55"'));assert.ok(s.includes('time:"14:40–14:55"'));
});
test("Aichi and Nikaho both render schedules; hosting page communicates standard",()=>{
 assert.ok(read("app/ja/events/aichi-clinic-2027/page.tsx").includes("blocks={aichiDaySchedule}"));
 assert.ok(read("app/ja/events/nikaho-clinic-2027/page.tsx").includes("blocks={nikahoDaySchedule}"));
 assert.ok(read("components/clinic-request.tsx").includes("<ClinicParentStandard/>"));
});
test("Aichi capacity and audience are fixed approved values",()=>{
 const s=read("lib/aichi-clinic-2027.ts");assert.ok(s.includes('audience: "U12・U15"'));assert.ok(s.includes("capacity: 50"));
 assert.ok(read("lib/aichi-clinic-payments.ts").includes("capacity===aichiClinic.capacity"));
});
