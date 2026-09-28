import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

function routeLanguage(pathname:string){
  if(pathname==="/ja"||pathname.startsWith("/ja/"))return "ja";
  if(pathname==="/zh-tw"||pathname.startsWith("/zh-tw/"))return "zh-Hant-TW";
  if(pathname==="/ko"||pathname.startsWith("/ko/"))return "ko";
  return "en";
}

export async function proxy(request:NextRequest){
  const host=request.headers.get("host")?.split(":")[0].toLowerCase();
  const language=routeLanguage(request.nextUrl.pathname);
  const requestHeaders=new Headers(request.headers);
  requestHeaders.set("x-rba-language",language);

  if(host==="www.riotbasketballacademy.com"){
    const url=request.nextUrl.clone();
    url.hostname="riotbasketballacademy.com";
    url.port="";
    const redirect=NextResponse.redirect(url,308);
    redirect.headers.set("Content-Language",language);
    return redirect;
  }

  const isMemberApp=/^\/(?:(?:ja|ko|zh-tw)\/)?my-homecourt\/app(?:\/|$)/.test(request.nextUrl.pathname);
  const response=isMemberApp
    ? await updateSession(request,requestHeaders)
    : NextResponse.next({request:{headers:requestHeaders}});
  response.headers.set("Content-Language",language);
  return response;
}

export const config={matcher:["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"]};
