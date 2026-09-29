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
  const isMemberApp=/^\/(?:(?:ja|ko|zh-tw)\/)?my-homecourt\/app(?:\/|$)/.test(request.nextUrl.pathname);
  const pathname=request.nextUrl.pathname;
  const language=pathname==="/ja"||pathname.startsWith("/ja/")?"ja":pathname==="/zh-tw"||pathname.startsWith("/zh-tw/")?"zh-Hant-TW":pathname==="/ko"||pathname.startsWith("/ko/")?"ko":"en";
  const response=isMemberApp?await updateSession(request):NextResponse.next();
  response.headers.set("Content-Language",language);
  return response;
}
export const config={matcher:["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"]};
