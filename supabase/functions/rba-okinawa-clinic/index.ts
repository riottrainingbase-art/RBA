import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const SLUG="okinawa-clinic-2026-11-14";
const LINK="https://buy.stripe.com/dRm28t6ab4fi4YBcsD7EQ0W";
const GRADES=["小学4年生","小学5年生","小学6年生","中学1年生","中学2年生","中学3年生"];
function json(value:unknown,status=200){return Response.json(value,{status,headers:{"Cache-Control":"private, no-store"}});}
Deno.serve(async(req:Request)=>{
  if(req.method!=="POST")return json({error:"method_not_allowed"},405);
  const admin=createClient(Deno.env.get("SUPABASE_URL")!,Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,{auth:{persistSession:false,autoRefreshToken:false}});
  const token=(req.headers.get("authorization")||"").replace(/^Bearer\s+/i,"");
  const {data:{user},error:authError}=await admin.auth.getUser(token);
  if(authError||!user?.email)return json({error:"unauthorized"},401);
  let body:Record<string,unknown>;
  try{body=await req.json();}catch{return json({error:"invalid_json"},400);}
  const {data:event,error:eventError}=await admin.from("events").select("id,status,starts_at,capacity").eq("slug",SLUG).single();
  const {data:offer,error:offerError}=await admin.from("service_offers").select("id,metadata,created_by").eq("slug",SLUG).single();
  if(eventError||offerError)return json({error:"temporarily_unavailable"},503);
  if(body.action==="admin"){
    const {data:profile}=await admin.from("profiles").select("role").eq("id",user.id).maybeSingle();
    if(user.id!==offer.created_by&&profile?.role!=="admin")return json({error:"forbidden"},403);
    const {data:registrations,error}=await admin.from("clinic_registrations").select("id,participant_name,school_grade,guardian_name,contact_email,emergency_phone,media_consent,status,paid_at,created_at").eq("event_slug",SLUG).order("created_at");
    return error?json({error:"temporarily_unavailable"},503):json({ok:true,registrations});
  }
  const open=event.status==="open"&&offer.metadata?.venue_confirmed===true&&offer.metadata?.payment_enabled===true&&new Date(event.starts_at)>new Date();
  const closed=["closed","cancelled","completed"].includes(event.status)||new Date(event.starts_at)<=new Date();
  const {data:rows,error:rowsError}=await admin.from("clinic_registrations").select("id,participant_name,school_grade,status,created_at,checkout_session_id").eq("guardian_user_id",user.id).eq("event_slug",SLUG).order("created_at");
  if(rowsError)return json({error:"temporarily_unavailable"},503);
  if(body.action==="prepare"){
    // Do not infer payment success from a return-URL parameter.
    const ids=(rows||[]).map(r=>r.checkout_session_id).filter(Boolean);
    const {data:orders}=ids.length?await admin.from("platform_orders").select("provider_checkout_id,status").eq("user_id",user.id).in("provider_checkout_id",ids):{data:[]};
    return json({ok:true,open,closed,email:user.email,registrations:(rows||[]).map(r=>({...r,checkout_session_id:undefined,payment_status:orders?.find(o=>o.provider_checkout_id===r.checkout_session_id)?.status||null}))});
  }
  if(closed)return json({error:"registration_closed"},409);
  if(body.action==="submit"){
    const clean=(v:unknown)=>typeof v==="string"?v.trim().normalize("NFKC"):"";
    const name=clean(body.participant_name),guardian=clean(body.guardian_name),phone=clean(body.emergency_phone),grade=clean(body.school_grade);
    if(!name||name.length>80||!guardian||guardian.length>80||!GRADES.includes(grade)||!/^\+?[0-9()\-\s]{8,25}$/.test(phone)||body.terms_consent!==true||body.guardian_consent!==true)return json({error:"invalid_registration"},400);
    const {data:r,error}=await admin.rpc("rba_submit_okinawa_clinic",{p_user_id:user.id,p_email:user.email,p_answers:{participant_name:name,participant_key:name.replace(/\s/g,"").toLowerCase(),guardian_name:guardian,emergency_phone:phone,school_grade:grade,media_consent:body.media_consent===true}});
    if(error)return json({error:"registration_failed"},500);
    const {error:noticeError}=await admin.from("platform_notifications").upsert({user_id:user.id,notification_type:"application_received",title:r.status==="waitlisted"?"沖縄クリニック：キャンセル待ち受付":"沖縄クリニック：申込受付",body:r.status==="waitlisted"?"定員に達したため、キャンセル待ちで受け付けました。参加確定ではありません。":open?"申込を受け付けました。公式ページで参加費のお支払いへお進みください。":"先行受付が完了しました。会場の予約確定後、公式ページで決済受付を開始します。参加確定ではありません。",action_url:"/ja/events/okinawa-clinic-2026-11-14#entry",dedupe_key:`okinawa-registration:${r.id}`},{onConflict:"dedupe_key",ignoreDuplicates:true});
    if(noticeError) return json({error:"notification_failed_retry"},503);
    return json({ok:true,id:r.id,status:r.status,open});
  }
  if(body.action==="checkout"){
    if(!open)return json({error:"payment_not_open"},409);
    const r=rows?.find(row=>row.id===body.registration_id);
    if(!r)return json({error:"registration_not_found"},404);
    if(r.checkout_session_id)return json({error:"payment_already_pending"},409);
    if(r.status!=="submitted")return json({error:r.status==="paid"?"already_paid":"registration_not_eligible"},409);
    const u=new URL(LINK);u.searchParams.set("client_reference_id",r.id);u.searchParams.set("prefilled_email",user.email);u.searchParams.set("locale","ja");
    return json({ok:true,url:u.href});
  }
  return json({error:"unsupported_action"},400);
});
