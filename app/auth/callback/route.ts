import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";


export async function GET(request:Request){
  const url=new URL(request.url);
  const code=url.searchParams.get("code");
  const requestedNext=url.searchParams.get("next")||"/ja/my-homecourt/app";
  const next=requestedNext.startsWith("/")&&!requestedNext.startsWith("//")?requestedNext:"/ja/my-homecourt/app";
  const locale=next.startsWith("/zh-tw/")?"/zh-tw":next.startsWith("/ko/")?"/ko":next.startsWith("/ja/")?"/ja":"";
  if(code){
    const supabase=await createClient();
    const {error}=await supabase.auth.exchangeCodeForSession(code);
    if(!error) return NextResponse.redirect(new URL(next,url.origin));
  }
  return NextResponse.redirect(new URL(`${locale}/my-homecourt/login?error=auth`,url.origin));
}