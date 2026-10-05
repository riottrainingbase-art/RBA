import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

function json(data: unknown, status=200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {"Content-Type":"application/json","Cache-Control":"private, no-store"},
  });
}

const UUID_RE=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

async function authorizeOperator(admin:any,userId:string){
  const {data:entity,error}=await admin.from("platform_entities")
    .select("id,created_by")
    .eq("slug","riot-basketball-academy")
    .maybeSingle();
  if(error||!entity)return false;
  if(entity.created_by===userId)return true;
  const {data:membership,error:membershipError}=await admin.from("entity_memberships")
    .select("id")
    .eq("entity_id",entity.id)
    .eq("user_id",userId)
    .eq("status","active")
    .in("member_role",["owner","admin"])
    .limit(1);
  return !membershipError&&Boolean(membership?.length);
}

Deno.serve(async(req:Request)=>{
  if(!["GET","POST"].includes(req.method))return json({error:"method_not_allowed"},405);

  const auth=req.headers.get("authorization")||"";
  const token=auth.replace(/^Bearer\s+/i,"");
  if(!token)return json({error:"unauthorized"},401);

  const url=Deno.env.get("SUPABASE_URL")!;
  const serviceKey=Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const admin=createClient(url,serviceKey,{auth:{persistSession:false,autoRefreshToken:false}});

  const {data:{user},error:userError}=await admin.auth.getUser(token);
  if(userError||!user)return json({error:"unauthorized"},401);
  if(!(await authorizeOperator(admin,user.id)))return json({error:"forbidden"},403);

  if(req.method==="POST"){
    let body:any={};
    try{body=await req.json();}catch{return json({error:"invalid_json"},400);}
    const action=String(body.action||"");

    if(action==="refresh_exceptions"){
      const {data,error}=await admin.rpc("rba_refresh_operations_exceptions");
      if(error)return json({error:"refresh_failed"},500);
      return json({ok:true,authorized:true,result:data});
    }

    if(action==="acknowledge_exception"||action==="resolve_exception"){
      const id=String(body.exception_id||"");
      if(!UUID_RE.test(id))return json({error:"invalid_exception_id"},400);
      const now=new Date().toISOString();
      const patch=action==="acknowledge_exception"
        ? {status:"acknowledged",acknowledged_at:now,updated_at:now}
        : {status:"resolved",resolved_at:now,updated_at:now};
      const {data,error}=await admin.from("operations_exceptions")
        .update(patch)
        .eq("id",id)
        .select("id,status,acknowledged_at,resolved_at")
        .maybeSingle();
      if(error||!data)return json({error:"exception_update_failed"},500);
      return json({ok:true,authorized:true,exception:data});
    }

    return json({error:"unsupported_action"},400);
  }

  const [
    summaryQ,unmatchedQ,failedQ,exceptionsQ,kpisQ,founderEventsQ,pendingAppsQ
  ]=await Promise.all([
    admin.schema("private").from("payment_ops_summary").select("*").single(),
    admin.from("unmatched_stripe_payments")
      .select("id,checkout_session_id,customer_email,amount_total,currency,programme_key,event_key,plan_key,payment_status,reason,created_at")
      .eq("status","unresolved").order("created_at",{ascending:false}).limit(50),
    admin.from("stripe_webhook_events")
      .select("stripe_event_id,event_type,object_id,error_message,received_at")
      .eq("processing_status","failed").order("received_at",{ascending:false}).limit(50),
    admin.from("operations_exceptions")
      .select("id,exception_type,severity,status,title,description,due_at,detected_at,event_id,service_offer_id,partner_id,metadata")
      .in("status",["open","acknowledged"])
      .order("severity",{ascending:false})
      .order("detected_at",{ascending:false})
      .limit(100),
    admin.from("management_monthly_kpis")
      .select("month,business_unit_code,business_unit_name,revenue_jpy,gross_profit_jpy,operating_profit_jpy,participants,refunds_jpy,founder_dependent_revenue_jpy,founder_dependency_pct")
      .order("month",{ascending:false}).limit(24),
    admin.from("management_event_pnl")
      .select("event_id,event_code,title,starts_at,city,region,business_unit_code,actual_revenue_jpy,actual_profit_jpy,founder_required,close_status")
      .eq("founder_required",true)
      .order("starts_at",{ascending:false}).limit(30),
    admin.from("program_applications").select("id",{count:"exact",head:true}).in("status",["submitted","under_review"])
  ]);

  if(summaryQ.error)return json({error:"summary_unavailable"},500);

  return json({
    ok:true,
    authorized:true,
    generated_at:new Date().toISOString(),
    summary:summaryQ.data,
    unmatched:unmatchedQ.data||[],
    failed_webhooks:failedQ.data||[],
    exceptions:exceptionsQ.data||[],
    monthly_kpis:kpisQ.data||[],
    founder_required_events:founderEventsQ.data||[],
    pending_applications:pendingAppsQ.count||0,
  });
});
