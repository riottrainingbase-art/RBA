import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const read=p=>readFileSync(new URL("../"+p,import.meta.url),"utf8");
const ledger=read("supabase/migrations/20261120140500_rizehope_2027_united_individual_ledger.sql");
const checkout=read("app/api/rizehope-2027/united/admin/checkout/route.ts");
const webhook=read("app/api/rizehope-2027/united/stripe-webhook/route.ts");
const admin=read("app/ja/international/rizehope-japan-2027/united/admin/page.tsx");
const actions=read("app/ja/international/rizehope-japan-2027/united/admin/actions.ts");
const control=read("app/ja/international/rizehope-japan-2027/united/admin/checkout-control.tsx");
test("United individual payments use an independent RLS-protected player ledger, not team capacity per child",()=>{
 assert.match(ledger,/create table if not exists public.rizehope_2027_united_players/);
 assert.match(ledger,/team_entry_id uuid references public.rizehope_2027_team_entries\(id\)/);
 assert.match(ledger,/v_team.category<>'united'/);
 assert.match(ledger,/source_form_id text not null check \(source_form_id='263221266794057'\)/);
 assert.match(ledger,/enable row level security/g);
 assert.match(ledger,/revoke all on public.rizehope_2027_united_players from public,anon,authenticated/);
 assert.match(ledger,/private.is_global_admin\(\)/);
 assert.match(ledger,/unique\(source_form_id,source_submission_id\)/);
 assert.doesNotMatch(ledger,/player_name|child_name|medical_history|passport_number/);
});
test("Only admin can create per-guardian checkouts and payout is gated by exact approved fee",()=>{
 assert.match(checkout,/profile\?\.role!=="admin"/);
 assert.match(checkout,/isRizehopeUnitedIndividualPaymentReady/);
 for(const name of ["RIZEHOPE_2027_UNITED_CHECKOUT_ENABLED","RIZEHOPE_2027_UNITED_TAX_REVIEW_APPROVED","RIZEHOPE_2027_UNITED_STRIPE_WEBHOOK_READY"]){
   assert.ok(checkout.includes(name));
 }
 assert.match(checkout,/entry.total_jpy!==entry.deposit_jpy\+entry.balance_jpy/);
 assert.match(checkout,/price.unit_amount!==amount/);
 assert.match(checkout,/price.tax_behavior!=="inclusive"/);
 assert.match(checkout,/customer_email:entry.guardian_email/);
 assert.match(checkout,/idempotencyKey/);
 assert.match(checkout,/rizehope_2027_united_claim_checkout/);
 assert.match(checkout,/stripe.checkout.sessions.expire\(session.id\)/);
 assert.doesNotMatch(checkout,/rizehopeProject.intake.stripeDepositPriceId/);
 assert.doesNotMatch(checkout,/plink_1UdX3XRXDnnSs6XNHPAh1IGh/);
});
test("Signed separate webhook verifies payment by guardian, terms, stage, amount and session",()=>{
 assert.match(webhook,/constructEvent\(await req.text\(\),signature,signingSecret\)/);
 assert.match(webhook,/event.livemode/);
 assert.match(webhook,/session.payment_status!=="paid"/);
 assert.match(webhook,/rizehope_japan_2027_united_individual/);
 assert.match(webhook,/session.amount_total!==expectedAmount/);
 assert.match(webhook,/session.id!==expectedSession/);
 assert.match(webhook,/rizehope_2027_united_record_verified_payment/);
 assert.match(ledger,/stripe_event_id text unique/);
 assert.match(ledger,/deposit_jpy\+balance_jpy=total_jpy/);
 assert.match(ledger,/v_player.stripe_deposit_checkout_session_id is distinct from p_session_id/);
 assert.match(ledger,/v_player.stripe_balance_checkout_session_id is distinct from p_session_id/);
});
test("Admin review and written guardian approval precede a checkout, defaults closed",()=>{
 assert.match(admin,/profile\?\.role!=="admin"/);
 assert.match(admin,/isRizehopeUnitedIndividualPaymentReady/);
 assert.match(actions,/RIZEHOPE_2027_UNITED_APPROVAL_ENABLED/);
 assert.match(actions,/rizehope_2027_united_record_guardian_terms/);
 assert.match(actions,/rizehope_2027_united_import_interest/);
 assert.match(control,/disabled=\{!enabled\|\|busy\}/);
 assert.match(ledger,/guardian_written_terms_accepted/);
});
