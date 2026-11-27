import test from "node:test";
import assert from "node:assert/strict";
import {getMiyagiPayment,validMiyagiGrade} from "../lib/miyagi-united-payments.ts";

const now=new Date("2026-11-27T12:00:00+09:00");
const approved={
  MIYAGI_UNITED_SHIZUGAWA_PAYMENT_ENABLED:"true",
  MIYAGI_UNITED_SHIZUGAWA_EARLY_UNTIL:"2026-12-07T00:00:00+09:00",
  MIYAGI_UNITED_SHIZUGAWA_CAPACITY:"25",
  MIYAGI_UNITED_TERMS_VERSION:"miyagi-2027-v1",
  MIYAGI_UNITED_WEBHOOK_SECRET:"test-placeholder",
  STRIPE_SECRET_KEY:"test-placeholder",
  SUPABASE_SERVICE_ROLE_KEY:"test-placeholder",
};
test("no approved price or link means no payment",()=>{
  assert.equal(getMiyagiPayment("shizugawa",now,{}).payable,false);
  assert.equal(getMiyagiPayment("rizehope",now,approved).payable,false);
  for(const key of ["MIYAGI_UNITED_SHIZUGAWA_EARLY_UNTIL","MIYAGI_UNITED_SHIZUGAWA_CAPACITY","MIYAGI_UNITED_WEBHOOK_SECRET","STRIPE_SECRET_KEY","SUPABASE_SERVICE_ROLE_KEY","MIYAGI_UNITED_TERMS_VERSION"]) assert.equal(getMiyagiPayment("shizugawa",now,{...approved,[key]:""}).payable,false);
});
test("configured programme has an amount only while it is enabled and before the event",()=>{
  assert.equal(getMiyagiPayment("shizugawa",now,approved).amount,29800);
  assert.equal(getMiyagiPayment("shizugawa",new Date("2026-12-07T00:00:00+09:00"),approved).amount,33000);
  assert.equal(getMiyagiPayment("shizugawa",new Date("2027-02-06T00:00:00+09:00"),approved).payable,false);
  assert.equal(getMiyagiPayment("invalid",now,approved),null);
});
test("RIZEHOPE accepts only northeastern grade six while camp accepts grades four through nine",()=>{
 assert.equal(validMiyagiGrade("rizehope","小6","宮城"),true);
 assert.equal(validMiyagiGrade("rizehope","小5","宮城"),false);
 assert.equal(validMiyagiGrade("rizehope","小6","東京"),false);
 assert.equal(validMiyagiGrade("shizugawa","中3","東京"),true);
 assert.equal(validMiyagiGrade("shizugawa","小3","東京"),false);
});
