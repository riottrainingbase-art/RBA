import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
// LOCKED: 2027 Kobe U14 has no venue approval or agreed legal/guardian terms.
// Do not unlock this endpoint through environment flags; require separately reviewed release.
function locked() {
  return new NextResponse("神戸U14交流は無料の参加意向登録のみ受付中です。決済は開始していません。", {
    status: 423, headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });
}
export async function POST() { return locked(); }
export async function GET() {
  return new NextResponse("Method not allowed", { status: 405, headers: { "Cache-Control": "no-store" } });
}
