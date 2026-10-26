import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
const page = "/ja/events/kagoshima-clinic-2026-11-29";
const links: Readonly<Record<string, { url: string; closes: number }>> = Object.freeze({
  am: {url: "https://book.stripe.com/4gM8wR2XZ27a9eR0JV7EQ1a", closes: Date.parse("2026-11-29T09:30:00+09:00")},
  pm: {url: "https://book.stripe.com/4gMfZjcyz6nq3Ux64f7EQ1b", closes: Date.parse("2026-11-29T13:00:00+09:00")},
  full: {url: "https://book.stripe.com/00waEZdCDeTW1Mpakv7EQ1c", closes: Date.parse("2026-11-29T09:30:00+09:00")},
});
const headers = {"Cache-Control": "private, no-store", "Referrer-Policy": "no-referrer"};
export async function POST(request: Request) {
  const origin = new URL(request.url).origin;
  if (request.headers.get("origin") !== origin) return NextResponse.json({error:"invalid_origin"},{status:403,headers});
  if (Number(request.headers.get("content-length") || 0) > 2048) return NextResponse.json({error:"payload_too_large"},{status:413,headers});
  const type = request.headers.get("content-type") || "";
  if (!type.startsWith("application/x-www-form-urlencoded")) return NextResponse.json({error:"unsupported_content_type"},{status:415,headers});
  const raw = await request.text();
  if (raw.length > 2048) return NextResponse.json({error:"payload_too_large"},{status:413,headers});
  const form = new URLSearchParams(raw);
  const session = form.get("session") || "";
  if (!Object.hasOwn(links, session) || form.get("guardian") !== "yes" || form.get("terms") !== "yes") {
    return NextResponse.redirect(new URL(page+"#entry",origin),{status:303,headers});
  }
  const offer = links[session];
  if (Date.now() >= offer.closes) return NextResponse.redirect(new URL(page+"?entry=closed#entry",origin),{status:303,headers});
  // This redirect never marks a registration as paid. Stripe's recorded payment status is authoritative.
  const destination = new URL(offer.url);
  destination.searchParams.set("locale","ja");
  return NextResponse.redirect(destination,{status:303,headers});
}
