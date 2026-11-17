import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.116.0";

const PAYMENT_OPEN = false; // Change only after the matching checkout and webhook are verified.
const ORIGIN = "https://riotbasketballacademy.com";
const PLANS = {
  individual_jan6: { total: 8800, deposit: 4400, link: "plink_1UcPwIRXDnnSs6XNAUOHoZJy", balance: "plink_1UcPy5RXDnnSs6XN6EFKyxBC", url: "https://buy.stripe.com/9B6bJ3fKLbHKgHj1NZ7EQ1E" },
  individual_jan7: { total: 8800, deposit: 4400, link: "plink_1UcPwIRXDnnSs6XNAUOHoZJy", balance: "plink_1UcPy5RXDnnSs6XN6EFKyxBC", url: "https://buy.stripe.com/9B6bJ3fKLbHKgHj1NZ7EQ1E" },
  individual_both: { total: 15400, deposit: 7700, link: "plink_1UcPwxRXDnnSs6XNE6AIg8iA", balance: "plink_1UcPyIRXDnnSs6XNgh5I9gDm", url: "https://buy.stripe.com/28E7sNaqraDG3Ux3W77EQ1F" },
  team_jan6: { total: 77000, deposit: 38500, link: "plink_1UcPx7RXDnnSs6XNrLgIh6ix", balance: "plink_1UcPyVRXDnnSs6XNEaP6WDny", url: "https://buy.stripe.com/6oU8wRaqr27acr3csD7EQ1G" },
  team_jan7: { total: 77000, deposit: 38500, link: "plink_1UcPx7RXDnnSs6XNrLgIh6ix", balance: "plink_1UcPyVRXDnnSs6XNEaP6WDny", url: "https://buy.stripe.com/6oU8wRaqr27acr3csD7EQ1G" },
  team_both: { total: 143000, deposit: 71500, link: "plink_1UcPxERXDnnSs6XNemtg7jMC", balance: "plink_1UcPydRXDnnSs6XNX8eE1KuW", url: "https://buy.stripe.com/aFa3cx2XZ27aezbfEP7EQ1H" },
  selected: { total: 100000, deposit: 50000, link: "plink_1UcQ26RXDnnSs6XNKwkYgjeJ", balance: "plink_1UcQ2ORXDnnSs6XN7tE5U2Xs", url: "https://buy.stripe.com/7sYcN7fKLcLOaiV1NZ7EQ1M" },
} as const;
type Plan = keyof typeof PLANS;
const exposed = new Set([ORIGIN, "https://www.riotbasketballacademy.com"]);
function respond(data: unknown, status = 200, origin?: string) {
  const headers = new Headers({ "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" });
  if (origin && exposed.has(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Access-Control-Allow-Headers", "Content-Type");
    headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    headers.set("Vary", "Origin");
  }
  return new Response(JSON.stringify(data), { status, headers });
}
function clean(input: unknown, max: number) { return typeof input === "string" ? input.trim().slice(0, max) : ""; }
function checkoutUrl(plan: typeof PLANS[Plan], id: string, email: string) {
  const url = new URL(plan.url);
  url.searchParams.set("client_reference_id", id);
  url.searchParams.set("locked_prefilled_email", email);
  url.searchParams.set("locale", "ja");
  return url.toString();
}
async function ipHash(ip: string, secret: string) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const bytes = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode("rba-kobe-u14:" + ip));
  return Array.from(new Uint8Array(bytes)).map(x => x.toString(16).padStart(2, "0")).join("");
}
Deno.serve(async (req: Request) => {
  const origin = req.headers.get("origin") || undefined;
  if (origin && !exposed.has(origin)) return respond({ error: "invalid_origin" }, 403);
  if (req.method === "OPTIONS") return respond({ ok: true }, 200, origin);
  if (req.method === "GET") return respond({ ok: true, programme: "rba-kobe-u14-2027", payment_open: PAYMENT_OPEN }, 200, origin);
  if (req.method !== "POST") return respond({ error: "method_not_allowed" }, 405, origin);
  if (!PAYMENT_OPEN) return respond({ error: "checkout_not_open", message: "前金受付の最終確認中です。決済はまだ開始していません。" }, 423, origin);
  const size = Number(req.headers.get("content-length") || "0");
  if (size > 8500) return respond({ error: "payload_too_large" }, 413, origin);
  let payload: Record<string, unknown>;
  try {
    const raw = await req.text();
    if (raw.length > 8500) return respond({ error: "payload_too_large" }, 413, origin);
    payload = JSON.parse(raw);
  } catch { return respond({ error: "invalid_json" }, 400, origin); }
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return respond({ error: "invalid_payload" }, 400, origin);
  if (clean(payload.website, 80)) return respond({ error: "rejected" }, 400, origin); // Honeypot.
  const planKey = clean(payload.plan_key, 48) as Plan;
  if (!Object.prototype.hasOwnProperty.call(PLANS, planKey)) return respond({ error: "invalid_plan" }, 400, origin);
  const plan = PLANS[planKey];
  const name = clean(payload.contact_name, 100), email = clean(payload.contact_email, 200).toLowerCase();
  const phone = clean(payload.contact_phone, 18).replace(/[\s－ー()\-]/g, "");
  const participant = clean(payload.participant_or_team, 120);
  const affiliation = clean(payload.affiliation, 120) || null;
  const age = payload.age_jan2027 === "" || payload.age_jan2027 == null ? null : Number(payload.age_jan2027);
  const players = payload.expected_player_count == null || payload.expected_player_count === "" ? null : Number(payload.expected_player_count);
  const supervisors = payload.adult_supervisor_count == null || payload.adult_supervisor_count === "" ? null : Number(payload.adult_supervisor_count);
  const guardian = payload.guardian_authorized === true;
  const accepted = payload.provisional_terms_accepted === true, privacy = payload.privacy_accepted === true;
  if (name.length < 2 || participant.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      !/^0\d{9,10}$/.test(phone) || !guardian || !accepted || !privacy) {
    return respond({ error: "invalid_application", message: "氏名・メール・電話番号と必須同意事項を確認してください。" }, 400, origin);
  }
  if (age !== null && (!Number.isInteger(age) || age < 7 || age > 19)) return respond({ error: "invalid_age" }, 400, origin);
  if (planKey.startsWith("team_") && (!Number.isInteger(players) || players === null || players < 1 || players > 50 || !Number.isInteger(supervisors) || supervisors === null || supervisors < 1 || supervisors > 30)) {
    return respond({ error: "invalid_team_count" }, 400, origin);
  }
  if (!planKey.startsWith("team_") && age === null) return respond({ error: "age_required" }, 400, origin);
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const dbUrl = Deno.env.get("SUPABASE_URL");
  if (!serviceKey || !dbUrl || new URL(dbUrl).hostname !== "ctngdzzorhzpdxswahzl.supabase.co") return respond({ error: "service_unavailable" }, 503, origin);
  const db = createClient(dbUrl, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const ip = (req.headers.get("x-forwarded-for") || req.headers.get("cf-connecting-ip") || "").split(",")[0].trim().slice(0, 64);
  const hash = ip ? await ipHash(ip, serviceKey) : null;
  const oneHour = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  if (hash) {
    const { count, error } = await db.from("kobe_u14_deposit_applications").select("id", { count: "exact", head: true }).eq("ip_hash", hash).gte("created_at", oneHour);
    if (error) return respond({ error: "database_unavailable" }, 503, origin);
    if ((count ?? 0) >= 8) return respond({ error: "rate_limited", message: "受付回数の上限に達しました。RBAへご連絡ください。" }, 429, origin);
  }
  const { data: existing, error: existsError } = await db.from("kobe_u14_deposit_applications")
    .select("id,plan_key,participant_or_team,status").eq("contact_email", email)
    .ilike("participant_or_team", participant)
    .in("status", ["awaiting_deposit","deposit_paid","balance_approved","fully_paid","refund_pending","needs_review"])
    .order("created_at", { ascending: false }).limit(50);
  if (existsError) return respond({ error: "database_unavailable" }, 503, origin);
  const paid = (existing || []).find(x => ["deposit_paid","balance_approved","fully_paid","refund_pending","needs_review"].includes(x.status));
  if (paid) return respond({ error: "payment_already_recorded", message: "既にお支払いまたは確認中の申込があります。重複請求を避けるためRBAへご連絡ください。" }, 409, origin);
  const pending = (existing || []).find(x => x.status === "awaiting_deposit");
  if (pending && pending.plan_key !== planKey) return respond({ error: "plan_changed", message: "同じ選手・チームで別プランの仮申込があります。二重払いを防ぐためプラン変更はRBAへご相談ください。" }, 409, origin);
  if (pending) return respond({ ok: true, application_id: pending.id, deposit_jpy: plan.deposit, checkout_url: checkoutUrl(plan, pending.id, email), reused: true }, 200, origin);
  const insert = {
    contact_name: name, contact_email: email, contact_phone: phone,
    participant_or_team: participant, affiliation, plan_key: planKey,
    age_jan2027: age, expected_player_count: players, adult_supervisor_count: supervisors,
    note: clean(payload.note, 800) || null,
    total_jpy: plan.total, deposit_jpy: plan.deposit, balance_jpy: plan.total - plan.deposit,
    stripe_deposit_link_id: plan.link, stripe_balance_link_id: plan.balance,
    guardian_authorized: true, provisional_terms_accepted: true, privacy_accepted: true,
    photo_marketing_consent: payload.photo_marketing_consent === true,
    ip_hash: hash, source: "rba_official_site",
  };
  const { data: registered, error } = await db.from("kobe_u14_deposit_applications")
    .insert(insert).select("id").single();
  if (error || !registered?.id) return respond({ error: "registration_failed", message: "保存できませんでした。再度の決済はせず、RBAへご連絡ください。" }, 503, origin);
  return respond({ ok: true, application_id: registered.id, deposit_jpy: plan.deposit, checkout_url: checkoutUrl(plan, registered.id, email) }, 201, origin);
});