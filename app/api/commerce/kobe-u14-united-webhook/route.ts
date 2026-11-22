import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
// No Kobe U14 payments are authorized. Fail closed; do not acknowledge
// unexpected payment notifications as processed without an approved ledger workflow.
export async function POST() {
  return NextResponse.json({ error: "kobe_u14_payments_not_authorized" }, {
    status: 503, headers: { "Cache-Control": "no-store" },
  });
}
export async function GET() {
  return NextResponse.json({ error: "method_not_allowed" }, { status: 405 });
}
