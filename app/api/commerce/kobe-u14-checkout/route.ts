import Stripe from "stripe";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
const expectedAccount = "acct_1UGdxZRXDnnSs6XN";
const origin = "https://riotbasketballacademy.com";
const offers = {
  individual: { jan6: 8800, jan7: 8800, both: 15400 },
  team: { jan6: 77000, jan7: 77000, both: 143000 },
} as const;
type Category = keyof typeof offers;
type Days = keyof (typeof offers)["individual"];
function safeText(data: FormData, key: string, max: number) {
  const value = data.get(key);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}
function sameOrigin(request: Request) {
  const referer = request.headers.get("origin");
  if (!referer) return true;
  try { return new URL(referer).host === new URL(request.url).host; } catch { return false; }
}
function failure(message: string, status: number) {
  return new NextResponse(message, { status, headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } });
}
export async function GET() { return failure("This payment endpoint requires a submitted, consented form.", 405); }
export async function POST(request: Request) {
  if (!sameOrigin(request)) return failure("Origin rejected.", 403);
  if (process.env.KOBE_U14_CHECKOUT_ENABLED !== "true") return failure("本大会の決済受付はまだ開始していません。", 423);
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) return failure("決済の設定確認中です。RBAへお問い合わせください。", 503);
  const form = await request.formData().catch(() => null);
  if (!form) return failure("Invalid form.", 400);
  const category = safeText(form, "category", 32);
  const days = safeText(form, "days", 32);
  if (category !== "individual" && category !== "team") return failure("参加区分を選択してください。", 400);
  if (days !== "jan6" && days !== "jan7" && days !== "both") return failure("参加日を選択してください。", 400);
  if (safeText(form, "guardian_or_team_consent", 3) !== "yes" || safeText(form, "accepted_terms", 3) !== "yes") return failure("申込代表者・規約への同意が必要です。", 400);
  const email = safeText(form, "email", 200).toLowerCase();
  const responsibleName = safeText(form, "responsible_name", 100);
  const entryName = safeText(form, "entry_name", 100);
  const applicationRef = safeText(form, "application_ref", 64);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || responsibleName.length < 2 || entryName.length < 2) return failure("保護者・代表者情報を確認してください。", 400);
  if (applicationRef && !/^[\w-]{4,64}$/.test(applicationRef)) return failure("受付番号の形式を確認してください。", 400);
  const amount = offers[category as Category][days as Days];
  const priceLabel = category === "team" ? "男子U14チーム（選手10〜15名）" : "男子U14個人";
  const daysLabel = days === "both" ? "2027年1月6日＋7日" : days === "jan6" ? "2027年1月6日" : "2027年1月7日";
  const hashInput = [email, responsibleName, entryName, category, days, applicationRef].join("|").toLowerCase();
  const hashBuffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(hashInput));
  const signature = Array.from(new Uint8Array(hashBuffer)).map(x => x.toString(16).padStart(2, "0")).join("");
  try {
    const stripe = new Stripe(secret);
    // Fail closed if Vercel is accidentally configured with another connected business account.
    const accountReply = await fetch("https://api.stripe.com/v1/account", { headers: { Authorization: `Bearer ${secret}` }, cache: "no-store" });
    const account: { id?: string } = accountReply.ok ? await accountReply.json() : {};
    if (account.id !== expectedAccount) return failure("決済アカウントを確認できません。RBAへお問い合わせください。", 503);
    const ref = applicationRef || "rba-u14-" + signature.slice(0, 24);
    const metadata = { event: "rba_kobe_boys_u14_2027", category, days, registration_ref: ref, responsible_name: responsibleName, participant_or_team: entryName };
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      client_reference_id: ref,
      customer_email: email,
      locale: "ja",
      customer_creation: "always",
      line_items: [{ price_data: {
        currency: "jpy", unit_amount: amount, tax_behavior: "inclusive",
        product_data: { name: "RBA UNITED 神戸国際男子U14交流｜" + priceLabel + "｜" + daysLabel,
          description: "国内参加プラン・1回払い・交通宿泊食事は別。大会条件は申込ページを確認。" },
      }, quantity: 1 }],
      metadata,
      payment_intent_data: { metadata },
      success_url: origin + "/ja/events/kobe-boys-u14-exchange-2027/complete?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: origin + "/ja/events/kobe-boys-u14-exchange-2027/checkout?cancelled=1",
    }, { idempotencyKey: "rba-kobe-u14-" + signature });
    if (!session.url || !session.url.startsWith("https://checkout.stripe.com/")) return failure("決済先を確認できません。", 503);
    const response = NextResponse.redirect(session.url, 303);
    response.headers.set("Cache-Control", "no-store");
    response.headers.set("Referrer-Policy", "no-referrer");
    return response;
  } catch {
    return failure("決済ページへ接続できませんでした。重複請求を避けるため、先にRBAへお問い合わせください。", 503);
  }
}
