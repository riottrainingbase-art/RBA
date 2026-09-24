import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

function json(data: unknown, status=200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {"Content-Type":"application/json","Cache-Control":"private, no-store"},
  });
}

function appendParam(urlString:string,key:string,value:string){
  const u=new URL(urlString);
  u.searchParams.set(key,value);
  return u.toString();
}

Deno.serve(async (req:Request)=>{
  if(req.method!=="POST") return json({error:"method_not_allowed"},405);

  const auth=req.headers.get("authorization")||"";
  const token=auth.replace(/^Bearer\s+/i,"");
  if(!token) return json({error:"unauthorized"},401);

  const supabaseUrl=Deno.env.get("SUPABASE_URL")!;
  const serviceKey=Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const admin=createClient(supabaseUrl,serviceKey,{auth:{persistSession:false,autoRefreshToken:false}});

  const {data:{user},error:userError}=await admin.auth.getUser(token);
  if(userError||!user) return json({error:"unauthorized"},401);

  let body:any={};
  try { body=await req.json(); } catch { return json({error:"invalid_json"},400); }

  const offerSlug=String(body.offer_slug||"").trim();
  if(!offerSlug) return json({error:"offer_slug_required"},400);

  const {data:offer,error:offerError}=await admin
    .from("service_offers")
    .select("id,slug,title,publication_status,availability_status,capacity,external_application_url,metadata")
    .eq("slug",offerSlug).maybeSingle();
  if(offerError||!offer||offer.publication_status!=="published") return json({error:"offer_not_found"},404);

  const {data:route,error:routeError}=await admin
    .from("payment_routes")
    .select("id,payment_url,provider_payment_link_id,checkout_policy,active,requires_authenticated_user,requires_guardian_for_minor")
    .eq("service_offer_id",offer.id).eq("active",true).maybeSingle();
  if(routeError||!route) return json({error:"payment_route_unavailable",application_url:offer.external_application_url||null},409);

  const subjectId=String(body.subject_user_id||user.id);
  let isAdmin=false;
  const {data:me}=await admin.from("profiles").select("role").eq("id",user.id).maybeSingle();
  isAdmin=me?.role==="admin";

  if(subjectId!==user.id&&!isAdmin){
    const {data:link}=await admin.from("guardian_links").select("id")
      .eq("parent_user_id",user.id).eq("child_user_id",subjectId).not("verified_at","is",null).maybeSingle();
    if(!link) return json({error:"guardian_link_required"},403);
  }

  const {data:subject}=await admin.from("profiles").select("id,role,birth_year").eq("id",subjectId).maybeSingle();
  if(!subject) return json({error:"subject_not_found"},404);

  if(route.requires_guardian_for_minor && subject.birth_year){
    const age=(new Date()).getUTCFullYear()-Number(subject.birth_year);
    if(age<18 && subjectId===user.id && !isAdmin){
      const {data:guardian}=await admin.from("guardian_links").select("parent_user_id")
        .eq("child_user_id",subjectId).not("verified_at","is",null).limit(1);
      if(!guardian?.length) return json({error:"guardian_required_for_minor"},403);
    }
  }

  let event:any=null;
  const sourceEventSlug=offer.metadata?.source_event_slug||null;
  if(sourceEventSlug){
    const {data:e}=await admin.from("events").select("id,capacity,status").eq("slug",sourceEventSlug).maybeSingle();
    event=e||null;
  }

  const {data:apps}=await admin.from("program_applications")
    .select("id,status,submitted_at")
    .eq("applicant_user_id",user.id)
    .eq("subject_user_id",subjectId)
    .or(`service_offer_id.eq.${offer.id}${event?.id?`,event_id.eq.${event.id}`:""}`)
    .order("submitted_at",{ascending:false}).limit(1);
  const application=apps?.[0]||null;

  let decision="blocked";
  let reason="application_required";

  if(route.checkout_policy==="inquiry_only"){
    decision="inquiry_only"; reason="inquiry_required";
  } else if(application?.status==="waitlisted"){
    decision="waitlisted"; reason="waitlisted";
  } else if(["rejected","withdrawn"].includes(application?.status||"")){
    decision="blocked"; reason="application_not_eligible";
  } else if(route.checkout_policy==="instant"){
    decision="allowed"; reason="instant_checkout";
  } else if(route.checkout_policy==="instant_after_application" && application && ["submitted","under_review","accepted"].includes(application.status)){
    decision="allowed"; reason="application_present";
  } else if(route.checkout_policy==="manual_after_application" && application?.status==="accepted"){
    decision="allowed"; reason="application_accepted";
  }

  const capacityControlled=Boolean(offer.metadata?.capacity_controlled);
  const cap=Number(offer.capacity||event?.capacity||0);

  if(decision==="allowed" && capacityControlled){
    if(!event?.id){
      decision="blocked"; reason="capacity_event_missing";
    } else if(!Number.isFinite(cap) || cap<=0){
      decision="blocked"; reason="capacity_not_configured";
    } else {
      const {data:seat,error:seatError}=await admin.rpc("rba_reserve_checkout_capacity",{
        p_event_id:event.id,
        p_subject_user_id:subjectId,
        p_application_id:application?.id||null,
        p_capacity:cap
      });
      if(seatError){
        console.error("capacity reservation failed",seatError);
        decision="blocked"; reason="capacity_check_failed";
      } else if(!seat?.allowed){
        decision=seat?.reason==="capacity_reached"?"waitlisted":"blocked";
        reason=seat?.reason||"capacity_unavailable";
      }
    }
  }

  await admin.from("checkout_access_logs").insert({
    user_id:user.id,
    subject_user_id:subjectId,
    service_offer_id:offer.id,
    application_id:application?.id||null,
    decision,
    reason,
    provider_payment_link_id:route.provider_payment_link_id||null
  });

  if(decision!=="allowed"){
    return json({
      ok:false,decision,reason,
      application_url:offer.external_application_url||null
    }, decision==="waitlisted"?409:403);
  }

  let checkoutUrl=route.payment_url;
  checkoutUrl=appendParam(checkoutUrl,"client_reference_id",subjectId);
  if(user.email) checkoutUrl=appendParam(checkoutUrl,"prefilled_email",user.email);

  return json({
    ok:true,
    decision:"allowed",
    provider:"stripe",
    checkout_url:checkoutUrl,
    offer:{slug:offer.slug,title:offer.title},
    application_id:application?.id||null,
    subject_user_id:subjectId
  });
});
