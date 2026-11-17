import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
const DESTINATION = "https://ctngdzzorhzpdxswahzl.supabase.co/functions/v1/rba-kobe-u14-deposit-intake";
const headers = { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" };
export async function GET() { return NextResponse.json({ error: "method_not_allowed" }, { status: 405, headers }); }
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin) return NextResponse.json({ error: "invalid_origin" }, { status: 403, headers });
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return NextResponse.json({ error: "invalid_content_type" }, { status: 415, headers });
  if (Number(request.headers.get("content-length") || 0) > 8500) return NextResponse.json({ error: "payload_too_large" }, { status: 413, headers });
  try {
    const text = await request.text();
    if (text.length > 8500) return NextResponse.json({ error: "payload_too_large" }, { status: 413, headers });
    JSON.parse(text);
    const forwardedIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "";
    const upstream = await fetch(DESTINATION, { method: "POST", cache: "no-store", headers: { "content-type": "application/json", "origin": "https://riotbasketballacademy.com", ...(forwardedIp ? { "x-forwarded-for": forwardedIp } : {}) }, body: text, signal: AbortSignal.timeout(12000) });
    const data = await upstream.json().catch(() => ({ error: "invalid_upstream" }));
    const url = data.checkout_url;
    if (url && (typeof url !== "string" || !url.startsWith("https://buy.stripe.com/"))) {
      return NextResponse.json({ error: "unsafe_destination" }, { status: 503, headers });
    }
    return NextResponse.json(data, { status: upstream.status, headers });
  } catch {
    return NextResponse.json({ error: "request_failed", message: "受付または決済の準備を確認できません。二重申込を避け、RBAにお問い合わせください。" }, { status: 503, headers });
  }
}
