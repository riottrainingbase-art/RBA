import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

function json(data: unknown, status=200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {"Content-Type":"application/json","Cache-Control":"private, no-store"},
  });
}

const UUID_RE=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

async function getRbaEntity(admin:any){
  const {data,error}=await admin.from("platform_entities")
    .select("id,created_by,name,slug")
    .eq("slug","riot-basketball-academy")
    .maybeSingle();
  if(error||!data)return null;
  return data;
}

async function operatorContext(admin:any,userId:string){
  const entity=await getRbaEntity(admin);
  if(!entity)return {authorized:false,can_manage_operators:false,entity:null,role:null};
  if(entity.created_by===userId)return {authorized:true,can_manage_operators:true,entity,role:"owner"};
  const {data:memberships,error}=await admin.from("entity_memberships")
    .select("member_role,status")
    .eq("entity_id",entity.id)
    .eq("user_id",userId)
    .eq("status","active")
    .in("member_role",["owner","admin","staff"]);
  if(error||!memberships?.length)return {authorized:false,can_manage_operators:false,entity,role:null};
  const rank=["owner","admin","staff"];
  const role=rank.find(item=>memberships.some((m:any)=>m.member_role===item))||"staff";
  return {authorized:true,can_manage_operators:false,entity,role};
}

async function listOperators(admin:any,entity:any){
  const {data:memberships}=await admin.from("entity_memberships")
    .select("user_id,member_role,status,created_at")
    .eq("entity_id",entity.id)
    .eq("status","active")
    .in("member_role",["owner","admin","staff"])
    .order("created_at",{ascending:true});

  const ids=Array.from(new Set([entity.created_by,...(memberships||[]).map((m:any)=>m.user_id)].filter(Boolean)));
  const {data:profiles}=ids.length
    ? await admin.from("profiles").select("id,display_name").in("id",ids)
    : {data:[]};

  const {data:userList}=await admin.auth.admin.listUsers({page:1,perPage:1000});
  const emailById=new Map((userList?.users||[]).map((u:any)=>[u.id,u.email||null]));
  const nameById=new Map((profiles||[]).map((p:any)=>[p.id,p.display_name||null]));
  const rows=new Map<string,any>();

  if(entity.created_by){
    rows.set(entity.created_by,{
      user_id:entity.created_by,
      member_role:"owner",
      status:"active",
      is_entity_creator:true,
      email:emailById.get(entity.created_by)||null,
      display_name:nameById.get(entity.created_by)||null,
    });
  }

  for(const m of memberships||[]){
    if(rows.has(m.user_id))continue;
    rows.set(m.user_id,{
      user_id:m.user_id,
      member_role:m.member_role,
      status:m.status,
      is_entity_creator:false,
      email:emailById.get(m.user_id)||null,
      display_name:nameById.get(m.user_id)||null,
    });
  }
  return Array.from(rows.values());
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

  const context=await operatorContext(admin,user.id);
  if(!context.authorized||!context.entity)return json({error:"forbidden"},403);

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

    if(action==="grant_operator"){
      if(!context.can_manage_operators)return json({error:"owner_required"},403);
      const email=String(body.email||"").trim().toLowerCase();
      if(!email||!email.includes("@"))return json({error:"valid_email_required"},400);
      const {data:userList,error:listError}=await admin.auth.admin.listUsers({page:1,perPage:1000});
      if(listError)return json({error:"user_lookup_failed"},500);
      const target=(userList.users||[]).find((u:any)=>String(u.email||"").trim().toLowerCase()===email);
      if(!target)return json({error:"rba_id_not_found"},404);
      if(target.id===context.entity.created_by)return json({ok:true,authorized:true,operators:await listOperators(admin,context.entity)});
      const {error}=await admin.from("entity_memberships").upsert({
        entity_id:context.entity.id,
        user_id:target.id,
        member_role:"staff",
        status:"active",
      },{onConflict:"entity_id,user_id,member_role"});
      if(error)return json({error:"operator_grant_failed"},500);
      return json({ok:true,authorized:true,operators:await listOperators(admin,context.entity)});
    }

    if(action==="revoke_operator"){
      if(!context.can_manage_operators)return json({error:"owner_required"},403);
      const targetId=String(body.user_id||"");
      if(!UUID_RE.test(targetId))return json({error:"invalid_user_id"},400);
      if(targetId===context.entity.created_by)return json({error:"cannot_revoke_entity_creator"},409);
      const {error}=await admin.from("entity_memberships")
        .update({status:"removed"})
        .eq("entity_id",context.entity.id)
        .eq("user_id",targetId)
        .eq("member_role","staff");
      if(error)return json({error:"operator_revoke_failed"},500);
      return json({ok:true,authorized:true,operators:await listOperators(admin,context.entity)});
    }

    return json({error:"unsupported_action"},400);
  }

  const [
    summaryQ,unmatchedQ,failedQ,exceptionsQ,kpisQ,founderEventsQ,pendingAppsQ,operators
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
    admin.from("program_applications").select("id",{count:"exact",head:true}).in("status",["submitted","under_review"]),
    listOperators(admin,context.entity)
  ]);

  if(summaryQ.error)return json({error:"summary_unavailable"},500);

  const exceptions=exceptionsQ.data||[];
  const founderEvents=founderEventsQ.data||[];
  const now=Date.now();
  const in14d=now+14*24*60*60*1000;
  const founderUpcoming=founderEvents.filter((item:any)=>{
    const t=item.starts_at?Date.parse(item.starts_at):NaN;
    return Number.isFinite(t)&&t>=now&&t<=in14d;
  });
  const highExceptions=exceptions.filter((item:any)=>["critical","high"].includes(String(item.severity)));
  const currentMonth=(kpisQ.data||[])[0]?.month||null;
  const currentKpis=currentMonth?(kpisQ.data||[]).filter((item:any)=>item.month===currentMonth):[];
  const revenue=currentKpis.reduce((sum:number,item:any)=>sum+Number(item.revenue_jpy||0),0);
  const founderRevenue=currentKpis.reduce((sum:number,item:any)=>sum+Number(item.founder_dependent_revenue_jpy||0),0);

  return json({
    ok:true,
    authorized:true,
    operator_role:context.role,
    can_manage_operators:context.can_manage_operators,
    generated_at:new Date().toISOString(),
    summary:summaryQ.data,
    unmatched:unmatchedQ.data||[],
    failed_webhooks:failedQ.data||[],
    exceptions,
    monthly_kpis:kpisQ.data||[],
    founder_required_events:founderEvents,
    operators,
    pending_applications:pendingAppsQ.count||0,
    founder_digest:{
      high_exception_count:highExceptions.length,
      unmatched_payment_count:(unmatchedQ.data||[]).length,
      failed_webhook_count:(failedQ.data||[]).length,
      pending_application_count:pendingAppsQ.count||0,
      founder_required_next_14_days:founderUpcoming,
      founder_dependency_pct:revenue?Math.round(founderRevenue/revenue*1000)/10:0,
      month:currentMonth,
    }
  });
});
