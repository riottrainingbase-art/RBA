import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

export async function proxy(request:NextRequest){
  const host=request.headers.get("host")?.split(":")[0].toLowerCase();
  if(host==="www.riotbasketballacademy.com"){
    const url=request.nextUrl.clone();
    url.hostname="riotbasketballacademy.com";
    url.port="";
    return NextResponse.redirect(url,308);
  }
  const pathname=request.nextUrl.pathname;
  const locale=pathname==="/ja"||pathname.startsWith("/ja/")?"ja":pathname==="/zh-tw"||pathname.startsWith("/zh-tw/")?"zh-Hant-TW":pathname==="/ko"||pathname.startsWith("/ko/")?"ko":"en";
  const requestHeaders=new Headers(request.headers);
  requestHeaders.set("x-rba-locale",locale);
  const isMemberApp=/^\/(?:(?:ja|ko|zh-tw)\/)?my-homecourt\/app(?:\/|$)/.test(pathname);
  return isMemberApp?updateSession(request,requestHeaders):NextResponse.next({request:{headers:requestHeaders}});
}
export const config={matcher:["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"]};