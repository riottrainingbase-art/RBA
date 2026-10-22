import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export const dynamic="force-dynamic";
export async function POST(request:Request){
  const headers={"Cache-Control":"private, no-store"};
  if(request.headers.get("origin")!==new URL(request.url).origin)return NextResponse.json({error:"invalid_origin"},{status:403,headers});
  if(Number(request.headers.get("content-length")||0)>4096)return NextResponse.json({error:"payload_too_large"},{status:413,headers});
  try{
    const raw=await request.text();
    if(raw.length>4096)return NextResponse.json({error:"payload_too_large"},{status:413,headers});
    let body:Record<string,unknown>;
    try{body=JSON.parse(raw);}catch{return NextResponse.json({error:"invalid_json"},{status:400,headers});}
    if(!body||!['prepare','submit','checkout','admin'].includes(String(body.action)))return NextResponse.json({error:"invalid_action"},{status:400,headers});
    const supabase=await createClient();
    const {data:{user},error}=await supabase.auth.getUser();
    if(error||!user)return NextResponse.json({error:"unauthorized"},{status:401,headers});
    const {data,error:invokeError}=await supabase.functions.invoke("rba-okinawa-clinic",{body});
    if(invokeError)return NextResponse.json({error:"request_failed"},{status:409,headers});
    return NextResponse.json(data,{headers});
  }catch{return NextResponse.json({error:"temporarily_unavailable"},{status:503,headers});}
}
