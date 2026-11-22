import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
// LOCKED even if Stripe or feature flag environment variables are mistakenly enabled.
// Approval requires venue, age eligibility, written selection/guardian consent,
// cancellation and refund terms, insurance and adult supervision.
export async function POST() {
  return new NextResponse("RBA UNITED神戸U14選抜の前金・残金は受付停止中です。", {
    status: 423, headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });
}
export async function GET() {
  return new NextResponse("Method not allowed", { status: 405, headers: { "Cache-Control": "no-store" } });
}
