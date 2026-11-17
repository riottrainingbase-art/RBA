import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.116.0";
const origins = new Set(["https://riotbasketballacademy.com","https://www.riotbasketballacademy.com"]);
function json(data:unknown,status=200,origin?:string){
 const h=new Headers({"Content-Type":"application/json; charset=utf-8","Cache-Control":"private,no-store"});
 if(origin&&origins.has(origin)){h.set("Access-Control-Allow-Origin",origin);h.set("Access-Control-Allow-Methods","GET,OPTIONS");h.set("Access-Control-Allow-Headers","authorization,apikey,x-client-info");h.set("Vary","Origin");}
 return new Response(JSON.stringify(data),{status,headers:h});
}
Deno.serve(async(req:Request)=>{
 const origin=req.headers.get("origin")||undefined;
 if(origin&&!origins.has(origin))return json({error:"invalid_origin"},403);
 if(req.method==="OPTIONS")return json({ok:true},200,origin);
 if(req.method!=="GET")return json({error:"method_not_allowed"},405,origin);
 const token=(req.headers.get("authorization")||"").replace(/^Bearer\s+/i,"");
 if(!token)return json({error:"sign_in_required"},401,origin);
 const url=Deno.env.get("SUPABASE_URL");
 const key=Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
 if(!url||!key||new URL(url).hostname!=="ctngdzzorhzpdxswahzl.supabase.co")return json({error:"service_unavailable"},503,origin);
 const admin=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
 const {data:{user},error:authError}=await admin.auth.getUser(token);
 if(authError||!user||!user.email)return json({error:"sign_in_required"},401,origin);
 const email=user.email.trim().toLowerCase();
 const {data,error}=await admin.from("kobe_u14_deposit_applications")
 .select("id,plan_key,status,total_jpy,deposit_jpy,balance_jpy,created_at,deposit_paid_at,balance_paid_at,refund_completed_at")
 .eq("contact_email",email).order("created_at",{ascending:false}).limit(25);
 if(error)return json({error:"unavailable"},503,origin);
 return json({ok:true,applications:data||[]},200,origin);
});