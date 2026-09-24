import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
import { checkoutOffers as offers, legacyCheckoutOptions as legacy } from "@/lib/checkout-options";
import { paymentEnquiryUrl } from "@/lib/payment-enquiry";
import type { Locale } from "@/components/site-frame";
function redirect(request: Request, path: string) {
  const response = NextResponse.redirect(new URL(path, request.url), 303);
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("Referrer-Policy", "no-referrer");
  return response;
}
export async function GET(request: Request, context: { params: Promise<{ option: string }> }) {
  const { option } = await context.params;
  const requestedLocale=new URL(request.url).searchParams.get("locale");
  const locale:Locale=requestedLocale==="en"||requestedLocale==="ko"||requestedLocale==="zh-tw"?requestedLocale:"ja";
  const prefix=locale==="en"?"":`/${locale}`;
  if (legacy.has(option)) return redirect(request, paymentEnquiryUrl(option,locale));
  if (!Object.hasOwn(offers, option)) return NextResponse.json({ error: "offer_unavailable" }, { status: 404, headers: { "Cache-Control": "no-store" } });
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return redirect(request, `${prefix}/my-homecourt/login?next=${encodeURIComponent(`/api/commerce/checkout/${option}?locale=${locale}`)}`);
    const { data, error } = await supabase.functions.invoke("rba-checkout-gateway", { body: { offer_slug: offers[option] } });
    // No fallback to a payment link when the existing gateway rejects the request.
    if (error || !data?.ok || data.decision !== "allowed") {
      const reason=encodeURIComponent(String(data?.reason||data?.error||"checkout_unavailable"));
      if(option==="homecourt-monthly"&&locale==="ja") return redirect(request, `/ja/my-homecourt/subscribe?status=${reason}`);
      return redirect(request, paymentEnquiryUrl(option,locale));
    }
    const destination = new URL(data.checkout_url);
    if (destination.protocol !== "https:" || !["book.stripe.com", "buy.stripe.com", "checkout.stripe.com"].includes(destination.hostname) || destination.username || destination.password) {
      return redirect(request, paymentEnquiryUrl(option,locale));
    }
    return redirect(request, destination.href);
  } catch {
    return redirect(request, paymentEnquiryUrl(option,locale));
  }
}
