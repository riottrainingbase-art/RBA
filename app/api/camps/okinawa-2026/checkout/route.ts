import { NextResponse } from "next/server";
import { campQuote, parseCampChoice } from "@/lib/okinawa-camp-pricing";

export const dynamic = "force-dynamic";
const headers = { "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff" };
export async function GET(request: Request) {
  const q = new URL(request.url).searchParams;
  const choice = parseCampChoice({ housing: q.get("housing") === "true" ? true : q.get("housing") === "false" ? false : null, players: Number(q.get("players")), residence: q.get("residence") });
  if (!choice) return NextResponse.json({ error: "invalid_choice" }, { status: 400, headers });
  const quote = campQuote(choice);
  // Checkout links are returned only after the user's explicit confirmations in POST.
  return NextResponse.json({ ...quote, checkoutUrl: undefined }, { headers });
}

export async function POST(request: Request) {
  if (request.headers.get("origin") !== new URL(request.url).origin) return NextResponse.json({ error: "invalid_origin" }, { status: 403, headers });
  if (!request.headers.get("content-type")?.startsWith("application/json")) return NextResponse.json({ error: "invalid_content_type" }, { status: 415, headers });
  if (Number(request.headers.get("content-length") || 0) > 2048) return NextResponse.json({ error: "payload_too_large" }, { status: 413, headers });
  try {
    const raw = await request.text();
    if (raw.length > 2048) return NextResponse.json({ error: "payload_too_large" }, { status: 413, headers });
    const body = JSON.parse(raw);
    const choice = parseCampChoice(body);
    if (!choice || body.registrationCompleted !== true || body.conditionsAccepted !== true) return NextResponse.json({ error: "confirmation_required" }, { status: 400, headers });
    const quote = campQuote(choice);
    if (quote.state !== "payable") return NextResponse.json({ error: quote.state }, { status: 409, headers });
    if (body.expectedTotal !== quote.total || body.expectedRateKey !== quote.rateKey) return NextResponse.json({ error: "price_changed", quote: { ...quote, checkoutUrl: undefined } }, { status: 409, headers });
    // This opens a hosted checkout; it does not submit registration or confirm payment.
    return NextResponse.json({ checkoutUrl: quote.checkoutUrl, total: quote.total, currency: "USD" }, { headers });
  } catch {
    return NextResponse.json({ error: "invalid_request" }, { status: 400, headers });
  }
}
