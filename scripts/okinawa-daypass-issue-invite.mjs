#!/usr/bin/env node
/**
 * Internal RBA-only utility. Run in a trusted operator environment after the
 * venue's exact gym block, safe capacity, published JPY fee, guardian consent,
 * and dated cancellation terms are verified. NEVER run on unreviewed input.
 * Produces a one-use-per-application private payment invitation; NO charge here.
 *
 * Usage (with sensitive env preloaded from a secret store):
 * node scripts/okinawa-daypass-issue-invite.mjs /secure/path/approved-application.json
 *
 * JSON keys: application_ref, guardian_email, guardian_name, plan_code,
 * amount_jpy, guardian_verified_at, venue_verified_at, terms_version,
 * operator_reviewed, first_session_confirmed, venue_schedule_confirmed,
 * capacity_confirmed, staffing_confirmed, handoff_confirmed,
 * guardian_identity_confirmed, existing_payments_reconciled,
 * refund_terms_agreed (all booleans, true).
 */
import { readFile } from "node:fs/promises";
import { randomBytes, createHash } from "node:crypto";
import { createClient } from "@supabase/supabase-js";

const TABLE = "okinawa_2026_day_pass_payments";
const PROGRAM = "rba_okinawa_2026_day_pass";
const PLANS = new Set([
  "dec22_day", "dec22_after", "dec23_day", "dec23_after", "dec24_day",
  "dec22_23_day", "dec23_24_day", "dec22_24_day",
]);
const EXPECTED_SITE = "https://riotbasketballacademy.com";
const HOST = "ctngdzzorhzpdxswahzl.supabase.co";
const VALID_FROM = Date.parse("2026-11-23T00:00:00+09:00");
// The venue-approved NEW day-pass seats, net of pre-existing three-day participants,
// supervising staff, carers and any other commitments, must be explicitly configured.
// After-school attendees count against the date's total as a conservative safeguard.
const PLAN_DAYS = Object.freeze({
  dec22_day: ["2026-12-22"], dec22_after: ["2026-12-22"],
  dec23_day: ["2026-12-23"], dec23_after: ["2026-12-23"],
  dec24_day: ["2026-12-24"],
  dec22_23_day: ["2026-12-22","2026-12-23"],
  dec23_24_day: ["2026-12-23","2026-12-24"],
  dec22_24_day: ["2026-12-22","2026-12-24"],
});
const TOKEN_HOURS = 48;
function must(v, msg) { if (!v) throw new Error(msg); }
function normalizeEmail(input) {
  const x=String(input || "").trim().toLowerCase();
  must(/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(x),"Invalid guardian email");
  return x;
}
async function main() {
  must(process.argv.length===3, "Pass one reviewed JSON file path; do not place applicant details in command line args.");
  must(process.env.OKINAWA_DAYPASS_OPERATOR_APPROVAL==="REVIEWED_BY_RBA",
    "Missing explicit operator review confirmation.");
  const input=JSON.parse(await readFile(process.argv[2],"utf8"));
  const checks = [
    "operator_reviewed", "first_session_confirmed", "venue_schedule_confirmed",
    "capacity_confirmed", "staffing_confirmed", "handoff_confirmed",
    "guardian_identity_confirmed", "existing_payments_reconciled", "refund_terms_agreed",
  ];
  for (const check of checks) {
    must(input[check] === true, `RBA review incomplete: ${check}`);
  }
  must(Date.now() >= VALID_FROM, "No paid invitation before the venue's November 22 booking cutoff.");
  const ref=String(input.application_ref||"").trim();
  must(ref.length>=5 && ref.length<=80,"Invalid application_ref");
  must(PLANS.has(input.plan_code),"Invalid plan");
  const email=normalizeEmail(input.guardian_email);
  must(typeof input.guardian_name==="string" && input.guardian_name.trim().length>=2, "Missing guardian name");
  const venueTime=Date.parse(input.venue_verified_at), parentTime=Date.parse(input.guardian_verified_at);
  must(Number.isFinite(venueTime) && venueTime>=VALID_FROM,
    "Venue time must be formally rechecked after 22 November; a provisional offer is not enough.");
  must(Number.isFinite(parentTime),"Guardian identity and consent not verified");
  const terms=process.env.OKINAWA_2026_DAY_PASS_TERMS_VERSION;
  must(Boolean(terms) && input.terms_version===terms, "Published terms version mismatch");
  const approved=JSON.parse(process.env.OKINAWA_2026_DAY_PASS_APPROVED_AMOUNTS_JPY||"{}");
  must(Number.isInteger(input.amount_jpy) && input.amount_jpy===approved[input.plan_code],
    "Amount is not an explicitly approved server-side plan price");
  must(input.amount_jpy>=2000 && input.amount_jpy<=40000,"Out of safe price range");
  const url=process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key=process.env.SUPABASE_SERVICE_ROLE_KEY;
  must(url && new URL(url).hostname===HOST && key,"Wrong database or missing privileged credentials");
  const db=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
  const capacity = JSON.parse(process.env.OKINAWA_2026_DAY_PASS_APPROVED_NEW_SLOTS_BY_DATE || "{}");
  const days=PLAN_DAYS[input.plan_code];
  // Fail closed until every occupied date has a facility-approved maximum.
  for (const day of days) {
    must(Number.isInteger(capacity[day]) && capacity[day] >= 1 && capacity[day] <= 200,
      "No confirmed safe new-slot capacity for "+day);
  }
  const {data:active,error:capacityError}=await db.from(TABLE).select("plan_code,status")
    .in("status",["approved","checkout_creating","checkout_open","paid"]).limit(1000);
  if (capacityError) throw capacityError;
  must((active||[]).length < 1000, "Capacity ledger too large for manual review; stop and audit.");
  for (const day of days) {
    const reserved=(active||[]).filter(row => PLAN_DAYS[row.plan_code]?.includes(day)).length;
    must(reserved < capacity[day], `No confirmed unreserved day-pass seat remains for ${day}`);
  }
  // Operational safeguard: invitations must be issued serially by one approved
  // operator. A transaction-backed capacity reservation is required before
  // permitting concurrent issuance or bulk invitations.
  const {data:existing,error:lookupError}=await db.from(TABLE).select("id,status,checkout_session_id,paid_at,guardian_email,plan_code").eq("application_ref",ref).maybeSingle();
  if(lookupError)throw lookupError;
  must(!existing, "Application already registered: do not issue a second link or duplicate payment. Review existing record manually.");
  const token=randomBytes(32).toString("hex");
  const digest=createHash("sha256").update(token).digest("hex");
  const expires=new Date(Date.now()+TOKEN_HOURS*60*60*1000).toISOString();
  const {data,error}=await db.from(TABLE).insert({
    program_code:PROGRAM,application_ref:ref,guardian_email:email,
    guardian_name:input.guardian_name.trim(),plan_code:input.plan_code,
    amount_jpy:input.amount_jpy,status:"approved",
    guardian_verified_at:new Date(parentTime).toISOString(),
    venue_verified_at:new Date(venueTime).toISOString(),
    terms_version:terms,invite_token_sha256:digest,invite_expires_at:expires,
  }).select("id,application_ref,plan_code,status,amount_jpy,invite_expires_at").single();
  if(error)throw error;
  const paymentUrl=EXPECTED_SITE+"/ja/events/okinawa-international-camp-2026/day-pass/payment?token="+token;
  // This private operator output must be delivered to the verified guardian only.
  // Do not put this URL in public logs, analytics, GitHub, Jotform or shared documents.
  process.stdout.write(JSON.stringify({approved:data,private_payment_url:paymentUrl})+"\n");
}
main().catch(e=>{console.error("Invitation not issued:",e.message);process.exitCode=1});
