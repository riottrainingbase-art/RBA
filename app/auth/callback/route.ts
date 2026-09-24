import { memberAuthDestination } from "@/lib/member-auth-redirect";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";


export async function GET(request:Request){
  const url=new URL(request.url);
  const code=url.searchParams.get("code");
  const requestedNext=url.searchParams.get("next")||"/ja/my-homecourt/app";
  const next=memberAuthDestination(requestedNext);
  const checkoutLocale=next.startsWith("/api/commerce/checkout/")?new URL(next,url.origin).searchParams.get("locale")||"ja":null;
  const locale=checkoutLocale?(checkoutLocale==="en"?"":`/${checkoutLocale}`):next.startsWith("/zh-tw/")?"/zh-tw":next.startsWith("/ko/")?"/ko":next.startsWith("/ja/")?"/ja":"";
  const diagnostic=(reason:string)=>console.warn("rba_auth_callback_failed",{reason,locale:locale||"en"});
  let reason="auth";
  if(url.searchParams.get("error_code")==="otp_expired")reason="expired";
  if(code){
    try {
      const supabase=await createClient();
      const {error}=await supabase.auth.exchangeCodeForSession(code);
      if(!error) return NextResponse.redirect(new URL(next,url.origin));
      if(error.code==="pkce_code_verifier_not_found"||error.code==="bad_code_verifier")reason="browser";
      else if(["otp_expired","flow_state_expired","flow_state_not_found"].includes(error.code||""))reason="expired";
    } catch {
      // A failed exchange must return to login without exposing auth details.
    }
  }
  diagnostic(reason);
  return NextResponse.redirect(new URL(`${locale}/my-homecourt/login?error=${reason}&next=${encodeURIComponent(next)}`,url.origin));
}