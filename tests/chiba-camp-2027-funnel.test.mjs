import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = path => readFileSync(path, "utf8");
const camp = read("components/chiba-camp-2027.tsx");
const timetable = read("components/chiba-camp-2027-timetable.tsx");
const schedule = read("components/localized-schedule.tsx");
const jp = read("app/ja/events/chiba-development-camp-2027/page.tsx");
const en = read("app/events/chiba-development-camp-2027/page.tsx");

test("Domestic registration and JPY checkout stay separate from overseas USD checkout", () => {
 assert.match(camp, /registrationJa = "https:\/\/form\.jotform\.com\/263252863924059"/);
 assert.match(camp, /registrationEn = "https:\/\/form\.jotform\.com\/263253268053052"/);
 assert.match(camp, /priceJa: "24,200", priceUsd: "219"/);
 assert.match(camp, /priceJa: "14,300", priceUsd: "129"/);
 assert.match(camp, /hrefJa: "https:\/\/book\.stripe\.com\/8x27sN0PRdPSbmZ78j7EQ21"/);
 for(const token of ["14AdRb5676nqfDfakv7EQ27","14A8wR1TVcLO62F50b7EQ28","9B6eVf7ef3be0Il8cn7EQ29"]) assert.ok(camp.includes(token), token);
 for(const deprecated of ["8x2aEZeGH3be2Qt3W77EQ24","9B628t2XZeTW8aN78j7EQ25","14A14pgOP9zC3Ux9gr7EQ26"]) assert.ok(!camp.includes(deprecated), "obsolete USD link in website: "+deprecated);
 assert.match(camp, /ja \? registrationJa : registrationEn/);
 assert.match(camp, /ja \? p\.hrefJa : p\.hrefUsd/);
});
test("Both day schedules retain exact PDF times, recovery and WABC disclaimers", () => {
 assert.match(timetable, /09:15–09:40/);
 assert.match(timetable, /09:40–10:00/);
 assert.match(timetable, /12:00–13:00/);
 assert.match(timetable, /15:55–16:15/);
 assert.match(timetable, /休息/);
 assert.match(timetable, /U12/);
 assert.match(timetable, /U15/);
 assert.match(timetable, /WABC Mini-Basketball Coaches Manual/);
 assert.match(timetable, /not organised or endorsed by WABC\/FIBA/);
 assert.match(timetable, /【予定】/);
 assert.match(camp, /<ChibaCamp2027Timetable locale=\{locale\} \/>/);
});
test("School address stays private and on-site event listings link to both languages",()=>{
 for(const data of [camp,timetable,schedule,jp,en]){
   assert.doesNotMatch(data,/神崎中学校|神崎本宿260|Kanzaki Junior High/i);
 }
 assert.match(schedule, /\/ja\/events\/chiba-development-camp-2027/);
 assert.match(schedule, /\/events\/chiba-development-camp-2027/);
 assert.match(en, /USD \$219/);
 assert.match(jp, /24,200円/);
});
