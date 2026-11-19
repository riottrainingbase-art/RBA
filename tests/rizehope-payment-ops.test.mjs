import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const read=path=>readFileSync(new URL("../"+path,import.meta.url),"utf8");

test("ledger uses a single 10-team capacity lock and denies public writes",()=>{
  const s=read("supabase/migrations/20261120120000_rizehope_2027_team_payment_ledger.sql");
  assert.match(s,/max_teams smallint not null default 10 check \(max_teams = 10\)/);
  assert.match(s,/where event_key='rizehope_japan_2027' for update/);
  assert.match(s,/count\(\*\).*into v_held/s);
  assert.match(s,/ten_team_capacity_full/);
  assert.match(s,/enable row level security/g);
  assert.match(s,/revoke all on public.rizehope_2027_team_entries from public, anon, authenticated/);
  assert.match(s,/private\.is_global_admin\(\)/);
  assert.match(s,/source_form_id,source_submission_id/);
});
test("deposit and balance may only be booked with signed paid Stripe events",()=>{
  const ledger=read("supabase/migrations/20261120120000_rizehope_2027_team_payment_ledger.sql");
  const claims=read("supabase/migrations/20261120122000_rizehope_2027_checkout_claim.sql");
  const webhook=read("app/api/rizehope-2027/stripe-webhook/route.ts");
  assert.match(webhook,/constructEvent\(await req\.text\(\),signature,signingSecret\)/);
  assert.match(webhook,/event\.livemode/);
  assert.match(webhook,/payment_status!=="paid"/);
  assert.match(webhook,/session\.amount_total!==33000/);
  assert.match(webhook,/session\.id!==knownSession/);
  assert.match(webhook,/rizehope_2027_record_verified_payment/);
  assert.match(ledger,/p_amount_jpy is distinct from 33000/);
  assert.match(ledger,/stripe_deposit_payment_intent_id text unique/);
  assert.match(ledger,/stripe_balance_payment_intent_id text unique/);
  assert.match(claims,/existing_deposit_checkout_requires_stripe_reconciliation/);
});
test("admin checkout cannot be public or bypass the financial safety switches",()=>{
  const route=read("app/api/rizehope-2027/admin/checkout/route.ts");
  const admin=read("app/ja/international/rizehope-japan-2027/admin/page.tsx");
  const terms=read("supabase/migrations/20261120121000_rizehope_2027_terms_evidence.sql");
  for(const flag of ["RIZEHOPE_2027_CHECKOUT_ENABLED","RIZEHOPE_2027_ORGANIZER_APPROVED",
    "RIZEHOPE_2027_TERMS_PUBLISHED","RIZEHOPE_2027_TAX_REVIEW_APPROVED",
    "RIZEHOPE_2027_STRIPE_WEBHOOK_READY"]) assert.ok(route.includes(flag));
  assert.match(route,/profile\?\.role!=="admin"/);
  assert.match(route,/terms_accepted_at/);
  assert.match(route,/rizehope_2027_record_checkout_session/);
  assert.match(route,/stripe\.checkout\.sessions\.expire\(session\.id\)/);
  assert.match(route,/idempotencyKey/);
  assert.match(route,/payment_method_types:\["card"\]/);
  assert.match(admin,/authorized|AUTHORIZED/);
  assert.match(terms,/p_evidence_reference/);
  assert.doesNotMatch(route,/buy\.stripe\.com|book\.stripe\.com/);
});
