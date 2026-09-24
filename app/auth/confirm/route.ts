import { memberAuthDestination } from "@/lib/member-auth-redirect";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

function requestedDestination(value: string | null, origin: string): string {
  if (!value) return memberAuthDestination(null);
  try {
    const candidate = new URL(value, origin);
    if (candidate.origin !== origin) return memberAuthDestination(null);
    if (candidate.pathname === "/auth/finish") {
      return memberAuthDestination(candidate.searchParams.get("next"));
    }
    return memberAuthDestination(`${candidate.pathname}${candidate.search}`);
  } catch {
    return memberAuthDestination(null);
  }
}

function loginPath(destination: string): string {
  const locale = destination.startsWith("/zh-tw/")
    ? "/zh-tw"
    : destination.startsWith("/ko/")
      ? "/ko"
      : destination.startsWith("/ja/")
        ? "/ja"
        : "";
  return `${locale}/my-homecourt/login`;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const destination = requestedDestination(url.searchParams.get("next"), url.origin);
  const tokenHash = url.searchParams.get("token_hash");

  if (tokenHash) {
    try {
      const supabase = await createClient();
      const { error } = await supabase.auth.verifyOtp({
        token_hash: tokenHash,
        type: "email",
      });
      if (!error) return NextResponse.redirect(new URL(destination, url.origin));
      console.warn("rba_auth_confirm_failed", {
        reason: error.code || "verify_failed",
      });
    } catch {
      console.warn("rba_auth_confirm_failed", { reason: "request_failed" });
    }
  }

  const login = loginPath(destination);
  return NextResponse.redirect(
    new URL(`${login}?error=expired&next=${encodeURIComponent(destination)}`, url.origin),
  );
}
