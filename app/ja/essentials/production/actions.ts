"use server";

import { createClient as serviceClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const PATH="/ja/essentials/production";
const transitions:Record<string,readonly string[]>={
 awaiting_handoff:["accepted_by_production","problem"],
 accepted_by_production:["materials_ready","problem"],
 materials_ready:["making","problem"],
 making:["quality_check","problem"],
 quality_check:["packed","making","problem"],
 packed:["shipped","problem"],
 shipped:["delivered","problem"],
 delivered:[],
 problem:["accepted_by_production","materials_ready","making","quality_check","packed"],
};
const txt=(form:FormData,key:string,max:number)=>{
 const v=form.get(key);
 return typeof v==="string"?v.trim().slice(0,max):"";
};
function done(status:"saved"|"invalid"|"error"):never{redirect(PATH+"?status="+status);}
export async function updateEssentialsProduction(form:FormData){
 const publicClient=await createClient();
 const {data:{user},error}=await publicClient.auth.getUser();
 if(error||!user)notFound();
 const u=process.env.NEXT_PUBLIC_SUPABASE_URL,service=process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!u||!service)done("error");
 try{if(new URL(u!).hostname!=="ctngdzzorhzpdxswahzl.supabase.co")done("error");}catch{done("error");}
 const admin=serviceClient(u!,service!,{auth:{persistSession:false,autoRefreshToken:false}});
 const [profile,agent]=await Promise.all([
   publicClient.from("profiles").select("role").eq("id",user.id).maybeSingle(),
   admin.from("rba_essentials_fulfillment_agents").select("active").eq("user_id",user.id).eq("active",true).maybeSingle(),
 ]);
 if(profile.data?.role!=="admin" && (!agent.data?.active||!!agent.error))notFound();

 const orderId=txt(form,"order_id",50),stage=txt(form,"stage",50);
 if(!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(orderId))done("invalid");
 const [task,paid]=await Promise.all([
  admin.from("rba_essentials_fulfillment_tasks").select("stage,tracking_reference,carrier,dispatch_date").eq("order_id",orderId).maybeSingle(),
  admin.from("rba_essentials_orders").select("payment_status").eq("order_id",orderId).maybeSingle(),
 ]);
 if(task.error||paid.error||!task.data||paid.data?.payment_status!=="paid")done("error");
 const old=task.data.stage as string;
 if(!transitions[old]?.includes(stage))done("invalid");
 const carrier=txt(form,"carrier",80),tracking=txt(form,"tracking_reference",140);
 const date=txt(form,"dispatch_date",10);
 const issue=txt(form,"issue_note",1200);
 const update:Record<string,string|null>={
   stage,updated_at:new Date().toISOString(),updated_by:user.id,
   issue_note:stage==="problem"?issue:"",
 };
 if(stage==="problem" && issue.length<6)done("invalid");
 if(stage==="shipped"){
   if(carrier.length<2||tracking.length<5||!/^20\d{2}-\d{2}-\d{2}$/.test(date)||
   Number.isNaN(Date.parse(date+"T00:00:00+09:00")))done("invalid");
   const nowJST=new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Tokyo",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date());
   if(date>nowJST)done("invalid");
   update.carrier=carrier;update.tracking_reference=tracking;update.dispatch_date=date;
 }
 const {data:saved,error:saveError}=await admin.from("rba_essentials_fulfillment_tasks")
  .update(update).eq("order_id",orderId).eq("stage",old).select("order_id").maybeSingle();
 if(saveError||!saved)done("error");
 revalidatePath(PATH);
 done("saved");
}
