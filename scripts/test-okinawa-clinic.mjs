import fs from "node:fs";
import assert from "node:assert/strict";
import ts from "typescript";

const source=fs.readFileSync("supabase/functions/stripe-homecourt-webhook/index.ts","utf8");
const start=source.indexOf("async function processOkinawaClinicCheckout(");
const end=source.indexOf("async function processOkinawaClinicFailure(",start);
assert(start>0&&end>start);
const js=ts.transpileModule(source.slice(start,end),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.CommonJS}}).outputText;
const uuid="00000000-0000-4000-8000-000000000001";
function setup(overrides={}){
 const registration={id:uuid,guardian_user_id:"guardian",event_slug:"okinawa-clinic-2026-11-14",status:"submitted",checkout_session_id:null,...overrides};
 const writes=[],unmatched=[];
 const db={from(table){let action="select",value;const query={select(){return query},eq(){return query},is(){return query},upsert(v){action="upsert";value=v;return query},update(v){action="update";value=v;return query},async maybeSingle(){return {data:table==="clinic_registrations"?registration:null,error:null}},async single(){if(action!=="select")writes.push({table,action,value});return {data:{id:table==="platform_orders"?"order":"fixture"},error:null}},then(resolve,reject){if(action!=="select"){writes.push({table,action,value});if(table==="clinic_registrations")Object.assign(registration,value);}return Promise.resolve({error:null}).then(resolve,reject)}};return query}};
 const handler=new Function("sid","UUID_RE","storeUnmatched","logAction",js+";return processOkinawaClinicCheckout;")(
  v=>typeof v==="string"?v:v?.id||null,/^[a-f0-9-]{36}$/i,async(_db,_e,_s,reason)=>unmatched.push(reason),async()=>{});
 return {registration,writes,unmatched,run:session=>handler(db,{id:"evt_fixture",type:"checkout.session.completed"},session)};
}
const session={id:"cs_fixture",metadata:{event:"okinawa_clinic_20261114"},payment_link:"plink_1UTNHzRXDnnSs6XNfJQf3ohX",amount_total:3300,amount_subtotal:3300,currency:"jpy",livemode:true,client_reference_id:uuid,payment_status:"paid",payment_intent:"pi_fixture"};
{
 const s=setup();assert.equal(await s.run({...session,metadata:{event:"other"}}),false);assert.equal(s.writes.length,0);
}
for(const [changes,reason] of [[{amount_total:3301},"okinawa_payment_mismatch"],[{currency:"usd"},"okinawa_payment_mismatch"],[{livemode:false},"okinawa_payment_mismatch"],[{payment_link:"another_link"},"okinawa_payment_mismatch"],[{client_reference_id:null},"okinawa_registration_reference_missing"]]){
 const s=setup();await s.run({...session,...changes});assert.equal(s.unmatched[0],reason);assert.equal(s.writes.length,0);
}
{
 const s=setup({status:"waitlisted"});await s.run(session);assert.equal(s.unmatched[0],"okinawa_registration_not_eligible");assert.equal(s.writes.length,0);
}
{
 const s=setup({status:"paid",checkout_session_id:"cs_previous"});await s.run(session);assert.equal(s.unmatched[0],"okinawa_duplicate_payment_requires_refund");assert.equal(s.writes.length,0);
}
{
 const s=setup();await s.run({...session,payment_status:"unpaid"});assert.equal(s.registration.status,"submitted");assert.equal(s.writes.filter(w=>w.table==="transaction_ledger").length,0);assert.equal(s.writes.find(w=>w.table==="platform_orders").value.status,"awaiting_payment");
}
{
 const s=setup();await s.run(session);assert.equal(s.registration.status,"paid");assert.equal(s.registration.checkout_session_id,"cs_fixture");assert.equal(s.writes.find(w=>w.table==="platform_orders").value.user_id,"guardian");assert.equal(s.writes.find(w=>w.table==="transaction_ledger").value.amount,3300);assert.equal(s.writes.find(w=>w.table==="platform_notifications").value.notification_type,"payment_confirmed");await s.run(session);assert.equal(s.unmatched.length,0);
}
console.log("PASS: 10 Okinawa webhook scenarios — unrelated event, wrong amount/currency/mode/link, missing reference, waitlist, duplicate payment, pending payment, paid + retry. No real charge made.");
