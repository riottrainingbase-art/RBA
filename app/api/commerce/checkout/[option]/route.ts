import { paymentLinks } from "@/lib/commerce/payment-links";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  context: { params: Promise<{ option: string }> },
) {
  const { option } = await context.params;
  const destination = paymentLinks[option];

  // Unknown, removed or capacity-closed offers never fall through to Stripe.
  if (!destination) {
    return NextResponse.json(
      { error: "offer_unavailable" },
      { status: 404, headers: { "Cache-Control": "no-store" } },
    );
  }

  const response = NextResponse.redirect(destination, 303);
  response.headers.set("Cache-Control", "no-store");
  response.headers.set("Referrer-Policy", "no-referrer");
  return response;
}
