import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

function json(data:unknown,status=200){
  return new Response(JSON.stringify(data),{status,headers:{"Content-Type":"application/json","Cache-Control":"private, no-store"}});
}

const UUID_RE=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

Deno.serve(async(req:Request)=>{
  if(req.method!=="POST")return json({error:"method_not_allowed"},405);

  const auth=req.headers.get("authorization")||"";
  const token=auth.replace(/^Bearer\s+/i,"");
  if(!token)return json({error:"unauthorized"},401);

  const admin=createClient(Deno.env.get("SUPABASE_URL")!,Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,{
    auth:{persistSession:false,autoRefreshToken:false}
  });
  const {data:{user},error:userError}=await admin.auth.getUser(token);
  if(userError||!user)return json({error:"unauthorized"},401);

  let body:any={};
  try{body=await req.json();}catch{return json({error:"invalid_json"},400);}
  const action=String(body.action||"prepare");
  const offerSlug=String(body.offer_slug||"").trim();
  if(!offerSlug)return json({error:"offer_slug_required"},400);

  const {data:offer,error:offerError}=await admin.from("service_offers")
    .select("id,slug,title,summary,offer_type,publication_status,availability_status,unit_amount,currency,capacity,metadata")
    .eq("slug",offerSlug).maybeSingle();
  if(offerError||!offer||offer.publication_status!=="published")return json({error:"offer_not_found"},404);

  const {data:route}=await admin.from("payment_routes")
    .select("checkout_policy,active")
    .eq("service_offer_id",offer.id).eq("active",true).maybeSingle();
  const checkoutPolicy=route?.checkout_policy||String(offer.metadata?.checkout_policy||"inquiry_only");
  const applicationKind=String(offer.metadata?.application_kind||"general");
  const eventSlug=String(offer.metadata?.source_event_slug||"");
  const {data:event}=eventSlug
    ? await admin.from("events").select("id,slug,title,status,starts_at,ends_at,capacity").eq("slug",eventSlug).maybeSingle()
    : {data:null};

  if(event && ["completed","cancelled"].includes(String(event.status)))return json({error:"event_closed"},409);

  const {data:me}=await admin.from("profiles").select("id,role,display_name,birth_year,region").eq("id",user.id).maybeSingle();
  const subjects:any[]=[];
  if(applicationKind!=="youth"){
    subjects.push({id:user.id,display_name:me?.display_name||user.email||"RBA ID",role:me?.role||null,birth_year:me?.birth_year||null});
  }else{
    if(me?.role==="player"){
      subjects.push({id:user.id,display_name:me.display_name||"PLAYER",role:"player",birth_year:me.birth_year||null});
    }
    const {data:links}=await admin.from("guardian_links")
      .select("child_user_id")
      .eq("parent_user_id",user.id)
      .not("verified_at","is",null);
    const childIds=(links||[]).map((x:any)=>x.child_user_id);
    if(childIds.length){
      const {data:children}=await admin.from("profiles")
        .select("id,role,display_name,birth_year,region")
        .in("id",childIds);
      for(const child of children||[]){
        subjects.push({id:child.id,display_name:child.display_name||"PLAYER",role:child.role,birth_year:child.birth_year||null});
      }
    }
  }

  const allowedGrades=Array.isArray(offer.metadata?.allowed_school_grades)?offer.metadata.allowed_school_grades:[];
  const allowedAgeGroups=Array.isArray(offer.metadata?.allowed_age_groups)?offer.metadata.allowed_age_groups:[];

  if(action==="prepare"){
    return json({
      ok:true,
      offer:{
        slug:offer.slug,title:offer.title,summary:offer.summary,unit_amount:offer.unit_amount,currency:offer.currency,
        checkout_policy:checkoutPolicy,application_kind:applicationKind,
        allowed_school_grades:allowedGrades,allowed_age_groups:allowedAgeGroups,
        includes_accommodation_or_transport:Boolean(offer.metadata?.includes_accommodation_or_transport)
      },
      event,
      subjects
    });
  }

  if(action!=="submit")return json({error:"unsupported_action"},400);

  const subjectId=String(body.subject_user_id||"");
  if(!UUID_RE.test(subjectId))return json({error:"valid_subject_required"},400);
  if(!subjects.some(subject=>subject.id===subjectId))return json({error:"subject_not_authorized"},403);

  const schoolGrade=String(body.school_grade||"").trim();
  const ageGroup=String(body.age_group||"").trim().toUpperCase();
  if(allowedGrades.length&&!allowedGrades.includes(schoolGrade))return json({error:"school_grade_required"},400);
  if(!allowedGrades.length&&allowedAgeGroups.length&&!allowedAgeGroups.includes(ageGroup))return json({error:"age_group_required"},400);

  const answers={
    source:"rba_id_first_party",
    offer_slug:offer.slug,
    application_kind:applicationKind,
    school_grade:schoolGrade||null,
    age_group:ageGroup||null,
    note:String(body.note||"").trim().slice(0,2000)||null,
    eligibility_confirmed:Boolean(body.eligibility_confirmed),
    participant_name:subjects.find(subject=>subject.id===subjectId)?.display_name||null
  };
  if(!answers.eligibility_confirmed)return json({error:"eligibility_confirmation_required"},400);

  const applicationType=applicationKind==="team"?"team":"standard";
  const eventId=event?.id||null;

  let existingQuery=admin.from("program_applications")
    .select("id,status")
    .eq("applicant_user_id",user.id)
    .eq("subject_user_id",subjectId)
    .eq("service_offer_id",offer.id)
    .eq("application_type",applicationType);
  existingQuery=eventId?existingQuery.eq("event_id",eventId):existingQuery.is("event_id",null);
  const {data:existing}=await existingQuery.order("submitted_at",{ascending:false}).limit(1);
  let application:any=existing?.[0]||null;

  if(application){
    if(["rejected","withdrawn"].includes(application.status)){
      const {data,error}=await admin.from("program_applications")
        .update({status:"submitted",answers,review_note:null,reviewed_by:null,reviewed_at:null,submitted_at:new Date().toISOString()})
        .eq("id",application.id).select("id,status").single();
      if(error)return json({error:"application_update_failed"},500);
      application=data;
    }else{
      const {data,error}=await admin.from("program_applications")
        .update({answers}).eq("id",application.id).select("id,status").single();
      if(error)return json({error:"application_update_failed"},500);
      application=data;
    }
  }else{
    const {data,error}=await admin.from("program_applications").insert({
      applicant_user_id:user.id,
      subject_user_id:subjectId,
      event_id:eventId,
      service_offer_id:offer.id,
      application_type:applicationType,
      status:"submitted",
      answers
    }).select("id,status").single();
    if(error)return json({error:"application_create_failed"},500);
    application=data;
  }

  const needsManual=checkoutPolicy==="manual_after_application"||checkoutPolicy==="inquiry_only";
  await admin.from("platform_notifications").upsert({
    user_id:user.id,
    notification_type:"application_received",
    title:"申込を受け付けました",
    body:needsManual
      ? offer.title+" の申込を受け付けました。RBAで内容を確認します。"
      : offer.title+" の申込を受け付けました。続けて参加費のお支払いへ進めます。",
    action_url:needsManual?"/ja/my-homecourt/app/notifications":null,
    dedupe_key:"application-received:"+application.id+":"+application.status
  },{onConflict:"dedupe_key",ignoreDuplicates:true});

  return json({
    ok:true,
    application_id:application.id,
    status:application.status,
    next:needsManual?"review":"checkout",
    checkout_policy:checkoutPolicy,
    subject_user_id:subjectId
  });
});
