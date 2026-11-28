import { NextResponse } from "next/server";
import { OKINAWA_RESIDENT_CHECKOUT_URLS, OKINAWA_DOMESTIC_CHECKOUT_URLS } from "@/lib/okinawa-camp-registration";
import { ONLINE_PAYMENT_END } from "@/lib/okinawa-camp-pricing";
export const dynamic = "force-dynamic";
const headers = {"Cache-Control":"private, no-store","Referrer-Policy":"no-referrer"};
export async function GET(request: Request) {
  const url = new URL(request.url);
  const residence = url.searchParams.get("residence"), plan = url.searchParams.get("plan");
  if ((residence !== "okinawa" && residence !== "japan") || (plan !== "day" && plan !== "housing")) return NextResponse.json({error:"invalid_choice"},{status:400,headers});
  if (Date.now() >= Date.parse(ONLINE_PAYMENT_END)) return NextResponse.redirect(new URL("/ja/events/okinawa-international-camp-2026/apply#okinawa-resident-discount",url.origin),{status:303,headers});
  const dest = new URL((residence === "okinawa" ? OKINAWA_RESIDENT_CHECKOUT_URLS : OKINAWA_DOMESTIC_CHECKOUT_URLS)[plan]);
  // Hosted checkout language is a hint, not a currency lock. No charge is created here.
  dest.searchParams.set("locale","ja");
  return NextResponse.redirect(dest,{status:303,headers});
}
