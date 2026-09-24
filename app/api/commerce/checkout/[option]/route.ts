import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
// Aliases verified against the existing payment_routes table. No new prices or links.
const offers: Readonly<Record<string, string>> = Object.freeze({
  "torsten-live": "torsten-live-vol2",
  "torsten-ondemand": "torsten-ondemand-vol2",
  "saga-fukuoka-2day": "saga-fukuoka-2026",
  "yamagata-1day": "yamagata-1day-2026",
  "shizugawa-2day": "shizugawa-2026",
  "kobe-half-friday": "kobe-half-friday-2026",
  "kobe-1day-friday": "kobe-one-friday-2026",
  "kobe-2day-friday": "kobe-two-friday-2026",
  "kobe-3day-friday": "kobe-three-friday-2026",
  "kobe-2day-stay-friday": "kobe-2d1n-friday-2026",
  "kobe-3day-stay-friday": "kobe-full-friday-2026",
});
const legacy = new Set(["yaima-rba", "kobe-friday", "kobe-half", "kobe-1day", "kobe-2day", "kobe-3day", "kobe-2day-stay", "kobe-3day-stay"]);
function redirect(request: Request, path: string) {
  const response = NextResponse.redirect(new URL(path, request.url), 303);
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("Referrer-Policy", "no-referrer");
  return response;
}
export async function GET(request: Request, context: { params: Promise<{ option: string }> }) {
  const { option } = await context.params;
  if (legacy.has(option)) return redirect(request, "/ja/contact");
  if (!Object.hasOwn(offers, option)) return NextResponse.json({ error: "offer_unavailable" }, { status: 404, headers: { "Cache-Control": "no-store" } });
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return redirect(request, "/ja/my-homecourt/login");
    const { data, error } = await supabase.functions.invoke("rba-checkout-gateway", { body: { offer_slug: offers[option] } });
    // No fallback to a payment link when the existing gateway rejects the request.
    if (error || !data?.ok || data.decision !== "allowed") return redirect(request, "/ja/contact");
    const destination = new URL(data.checkout_url);
    if (destination.protocol !== "https:" || !["book.stripe.com", "buy.stripe.com", "checkout.stripe.com"].includes(destination.hostname) || destination.username || destination.password) {
      return NextResponse.json({ error: "checkout_unavailable" }, { status: 503 });
    }
    return redirect(request, destination.href);
  } catch {
    return NextResponse.json({ error: "checkout_unavailable" }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
