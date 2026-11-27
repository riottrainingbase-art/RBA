import test from "node:test";
import assert from "node:assert/strict";
import {getMiyagiPayment} from "../lib/miyagi-united-payments.ts";

const now=new Date("2026-11-27T12:00:00+09:00");
const approved={
  MIYAGI_UNITED_SHIZUGAWA_PAYMENT_ENABLED:"true",
  MIYAGI_UNITED_SHIZUGAWA_AMOUNT_JPY:"29800",
  MIYAGI_UNITED_SHIZUGAWA_PAID_FORM_URL:"https://pci.jotform.com/form/263300738200041",
};
test("no approved price or link means no payment",()=>{
  assert.equal(getMiyagiPayment("shizugawa",now,{}).payable,false);
  assert.equal(getMiyagiPayment("rizehope",now,approved).payable,false);
  assert.equal(getMiyagiPayment("shizugawa",now,{...approved,MIYAGI_UNITED_SHIZUGAWA_AMOUNT_JPY:""}).payable,false);
  for(const url of ["", "https://example.com/123456789012345", "https://form.jotform.com/263298832487069", "https://form.jotform.com/263223566035050"]) assert.equal(getMiyagiPayment("shizugawa",now,{...approved,MIYAGI_UNITED_SHIZUGAWA_PAID_FORM_URL:url}).payable,false);
});
test("configured programme has an amount only while it is enabled and before the event",()=>{
  assert.equal(getMiyagiPayment("shizugawa",now,approved).amount,29800);
  assert.equal(getMiyagiPayment("shizugawa",now,{...approved,MIYAGI_UNITED_SHIZUGAWA_AMOUNT_JPY:"16500"}).payable,false);
  assert.equal(getMiyagiPayment("shizugawa",new Date("2027-02-06T00:00:00+09:00"),approved).payable,false);
  assert.equal(getMiyagiPayment("invalid",now,approved),null);
});
