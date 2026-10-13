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

    const offerSlug=offers[option];
    const requestUrl=new URL(request.url);
    const subject=requestUrl.searchParams.get("subject");
    const {data:offer}=await supabase.from("service_offers")
      .select("id,metadata").eq("slug",offerSlug).maybeSingle();
    const policy=String(offer?.metadata?.checkout_policy||"instant");

    if(policy!=="instant"){
      if(!subject)return redirect(request,`${prefix}/apply/${encodeURIComponent(offerSlug)}`);
      const {data:applications}=await supabase.from("program_applications")
        .select("id,status").eq("applicant_user_id",user.id).eq("subject_user_id",subject)
        .eq("service_offer_id",offer?.id||"00000000-0000-0000-0000-000000000000")
        .order("submitted_at",{ascending:false}).limit(1);
      const application=applications?.[0]||null;
      const allowed=policy==="instant_after_application"
        ? Boolean(application&&["submitted","under_review","accepted"].includes(application.status))
        : policy==="manual_after_application"
          ? application?.status==="accepted"
          : false;
      if(!allowed)return redirect(request,`${prefix}/apply/${encodeURIComponent(offerSlug)}`);
    }

    const { data, error } = await supabase.functions.invoke("rba-checkout-gateway", { body: { offer_slug: offerSlug, subject_user_id: subject||user.id } });
    // Never bypass a rejected governed checkout with a raw payment link.
    if (error || !data?.ok || data.decision !== "allowed") {
      if(policy!=="instant") return redirect(request,`${prefix}/apply/${encodeURIComponent(offerSlug)}`);
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
