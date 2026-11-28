import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";


export async function updateSession(request:NextRequest,requestHeaders?:Headers){
  const forwardRequest=()=>{
    const headers=new Headers(request.headers);
    // Preserve locale while forwarding the latest authentication cookies.
    const language=requestHeaders?.get("x-rba-lang");
    if(language)headers.set("x-rba-lang",language);
    return NextResponse.next({request:{headers}});
  };
  let response=forwardRequest();
  const url=process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if(!url||!publishableKey) return response;
  const supabase=createServerClient(
    url,
    publishableKey,
    {cookies:{
      getAll:()=>request.cookies.getAll(),
      setAll(values){
        values.forEach(({name,value})=>request.cookies.set(name,value));
        response=forwardRequest();
        values.forEach(({name,value,options})=>response.cookies.set(name,value,options));
      }
    }}
  );
  await supabase.auth.getClaims();
  return response;
}