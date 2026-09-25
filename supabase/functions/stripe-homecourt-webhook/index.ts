import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import Stripe from "npm:stripe@22.4.0";
import { createClient } from "npm:@supabase/supabase-js@2";

const stripe = new Stripe("sk_webhook_verification_only", { apiVersion: "2026-08-26.preview" as never });
const HOMECOURT_PRICE_ID = "price_1UHNz5RXDnnSs6XNPrBsJvEq";
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const EVENT_SLUGS: Record<string,string> = {
  yaima_cup_2026:"yaima-cup-2026",
  saga_fukuoka_2days_2026:"saga-fukuoka-2days-2026",
  yamagata_1day_2026:"yamagata-1day-2026",
  shizugawa_camp_2026:"shizugawa-development-camp-2026",
  kobe_camp_2026:"kobe-development-camp-2026",
  rba_3days_development_camp_2026:"kobe-development-camp-2026",
  torsten_loibl_online_clinic_vol2:"torsten-loibl-online-clinic-vol-2",
};

function db() {
  return createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, {
    auth:{ persistSession:false, autoRefreshToken:false },
  });
}
function sid(v:any){ return typeof v==="string" ? v : v?.id || null; }
function currentPeriodEnd(s:any) {
  const xs=(s.items?.data||[]).map((i:any)=>i.current_period_end).filter((v:any)=>Number.isFinite(v));
  return xs.length ? new Date(Math.max(...xs)*1000).toISOString() : null;
}
function subStatus(status:string) {
  if(status==="canceled") return "cancelled";
  return ["active","trialing","past_due","unpaid"].includes(status) ? status : "inactive";
}
async function resolveByClientRef(supabase:any, session:any) {
  const ref=session.client_reference_id;
  if(ref && UUID_RE.test(ref)) {
    const {data}=await supabase.from("profiles").select("id").eq("id",ref).maybeSingle();
    if(data?.id) return data.id;
  }
  return null;
}
async function resolveByEmail(supabase:any, session:any) {
  const email=session.customer_details?.email || session.customer_email;
  if(!email) return null;
  const {data,error}=await supabase.rpc("resolve_rba_user_id_by_email",{input_email:email});
  if(error) throw error;
  return data ? String(data) : null;
}
async function setWebhookState(supabase:any,event:any,token:string,status:string,errorMessage?:string) {
  const {error}=await supabase.from("stripe_webhook_events").update({
    processing_status:status,
    error_message:errorMessage||null,
    processed_at:["processed","ignored"].includes(status)?new Date().toISOString():null,
  }).eq("stripe_event_id",event.id).eq("processing_token",token);
  if(error) throw error;
}
async function beginWebhook(supabase:any,event:any,payloadSha256:string) {
  const token=crypto.randomUUID();
  const {data,error}=await supabase.rpc("claim_stripe_webhook_event",{
    p_event_id:event.id,p_event_type:event.type,p_object_id:event.data.object?.id||null,
    p_livemode:!!event.livemode,p_payload_sha256:payloadSha256,p_token:token,
  });
  if(error) throw error;
  return data?token:null;
}
async function logAction(supabase:any,action_type:string,stripe_object_id:string|null,user_id:string|null,order_id:string|null,detail:any={},dedupeKey?:string) {
  const {error}=await supabase.from("payment_reconciliation_actions").upsert({
    action_type,stripe_object_id,user_id,order_id,detail,dedupe_key:dedupeKey||null
  },{onConflict:"dedupe_key",ignoreDuplicates:true});
  if(error) throw error;
}
async function storeUnmatched(supabase:any,event:any,session:any,reason:string) {
  const metadata=session.metadata||{};
  await supabase.from("unmatched_stripe_payments").upsert({
    checkout_session_id:session.id,
    stripe_event_id:event.id,
    customer_email:session.customer_details?.email || session.customer_email || null,
    customer_id:sid(session.customer),
    payment_intent_id:sid(session.payment_intent),
    subscription_id:sid(session.subscription),
    amount_total:session.amount_total ?? null,
    currency:(session.currency||"jpy").toUpperCase(),
    programme_key:metadata.program||null,
    event_key:metadata.event||null,
    plan_key:metadata.plan||null,
    payment_status:session.payment_status||null,
    reason,status:"unresolved",
  },{onConflict:"checkout_session_id"});
  await logAction(supabase,"payment_unmatched",session.id,null,null,{reason,event:metadata.event||null,program:metadata.program||null},`${event.id}:payment_unmatched`);
}
async function resolveCommerceContext(supabase:any,session:any,subjectId:string|null,payerId:string|null) {
  const paymentLinkId=sid(session.payment_link);
  let route:any=null,offer:any=null,event:any=null,application:any=null;

  if(paymentLinkId){
    const {data:r}=await supabase.from("payment_routes")
      .select("service_offer_id,provider_payment_link_id,checkout_policy")
      .eq("provider","stripe").eq("provider_payment_link_id",paymentLinkId).maybeSingle();
    route=r||null;
  }
  if(route?.service_offer_id){
    const {data:o}=await supabase.from("service_offers")
      .select("id,slug,title,metadata")
      .eq("id",route.service_offer_id).maybeSingle();
    offer=o||null;
  }
  const eventSlug=offer?.metadata?.source_event_slug || EVENT_SLUGS[session.metadata?.event||""] || null;
  if(eventSlug){
    const {data:e}=await supabase.from("events").select("id,slug,title").eq("slug",eventSlug).maybeSingle();
    event=e||null;
  }
  if(subjectId && offer?.id){
    let q=supabase.from("program_applications")
      .select("id,status,applicant_user_id,subject_user_id,event_id,service_offer_id")
      .eq("subject_user_id",subjectId)
      .eq("service_offer_id",offer.id)
      .order("submitted_at",{ascending:false}).limit(1);
    const {data:a}=await q;
    application=a?.[0]||null;
  }
  if(!application && subjectId && event?.id){
    const {data:a}=await supabase.from("program_applications")
      .select("id,status,applicant_user_id,subject_user_id,event_id,service_offer_id")
      .eq("subject_user_id",subjectId)
      .eq("event_id",event.id)
      .order("submitted_at",{ascending:false}).limit(1);
    application=a?.[0]||null;
  }
  if(!application && payerId && offer?.id){
    const {data:a}=await supabase.from("program_applications")
      .select("id,status,applicant_user_id,subject_user_id,event_id,service_offer_id")
      .eq("applicant_user_id",payerId)
      .eq("service_offer_id",offer.id)
      .order("submitted_at",{ascending:false}).limit(1);
    application=a?.[0]||null;
  }
  return {route,offer,event,application};
}
async function processCheckout(supabase:any,event:any,session:any) {
  const subjectFromRef=await resolveByClientRef(supabase,session);
  const emailUser=await resolveByEmail(supabase,session);
  const subjectId=subjectFromRef || emailUser;
  const payerId=emailUser || subjectId;
  const metadata=session.metadata||{};
  const program=metadata.program||"";
  const eventKey=metadata.event||"";
  const isHomecourt=program==="rba_homecourt";
  const isPaid=session.payment_status==="paid" || event.type==="checkout.session.async_payment_succeeded";
  const customerId=sid(session.customer), subscriptionId=sid(session.subscription);

  if(!subjectId || !payerId) {
    await storeUnmatched(supabase,event,session,"rba_user_not_resolved");
    return;
  }

  const commerce=await resolveCommerceContext(supabase,session,subjectId,payerId);
  const resolvedEventSlug=commerce.event?.slug || EVENT_SLUGS[eventKey] || null;
  let rbaEvent=commerce.event;
  if(!rbaEvent && resolvedEventSlug){
    const {data:e}=await supabase.from("events").select("id,slug,title").eq("slug",resolvedEventSlug).maybeSingle();
    rbaEvent=e||null;
  }

  const {data:order,error:orderError}=await supabase.from("platform_orders").upsert({
    user_id:payerId,
    subject_user_id:subjectId,
    application_id:commerce.application?.id||null,
    event_id:rbaEvent?.id||null,
    service_offer_id:commerce.offer?.id||null,
    order_type:isHomecourt?"subscription":"event",
    status:isPaid?"paid":"awaiting_payment",
    amount_subtotal:session.amount_subtotal??null,
    amount_total:session.amount_total??null,
    currency:(session.currency||"jpy").toUpperCase(),
    locale:session.locale||"ja",
    provider:"stripe",
    provider_checkout_id:session.id,
    submitted_at:new Date((session.created||Math.floor(Date.now()/1000))*1000).toISOString(),
    confirmed_at:isPaid?new Date().toISOString():null,
    metadata:{
      ...metadata,
      offer_slug:commerce.offer?.slug||null,
      stripe_payment_link:sid(session.payment_link),
      stripe_customer_id:customerId,
      stripe_subscription_id:subscriptionId,
      client_reference_id:session.client_reference_id||null,
      payment_intent_id:sid(session.payment_intent),
    },
    updated_at:new Date().toISOString(),
  },{onConflict:"provider_checkout_id"}).select("id").single();
  if(orderError) throw orderError;

  if(isPaid && order?.id) {
    const {error}=await supabase.from("transaction_ledger").upsert({
      order_id:order.id,user_id:payerId,transaction_type:"charge",status:"succeeded",
      amount:session.amount_total??0,currency:(session.currency||"jpy").toUpperCase(),
      provider:"stripe",provider_transaction_id:session.id,occurred_at:new Date().toISOString(),
      metadata:{
        checkout_session_id:session.id,payment_intent_id:sid(session.payment_intent),
        event:eventKey||null,program:program||null,plan:metadata.plan||null,
        subject_user_id:subjectId,offer_slug:commerce.offer?.slug||null
      },
    },{onConflict:"provider,provider_transaction_id"});
    if(error) throw error;
  }

  if(isHomecourt && subscriptionId) {
    const {error}=await supabase.from("subscriptions").upsert({
      user_id:subjectId,provider:"stripe",provider_customer_id:customerId,
      provider_subscription_id:subscriptionId,status:isPaid?"active":"inactive",
      plan_key:"homecourt_monthly",updated_at:new Date().toISOString(),
    },{onConflict:"provider_subscription_id"});
    if(error) throw error;
  }

  if(isPaid && commerce.application?.id){
    await supabase.from("program_applications")
      .update({status:"accepted",reviewed_at:new Date().toISOString()})
      .eq("id",commerce.application.id)
      .in("status",["submitted","under_review","accepted"]);
  }

  if(rbaEvent?.id && isPaid) {
    const {data:profile}=await supabase.from("profiles").select("role").eq("id",subjectId).maybeSingle();
    if(profile?.role==="player") {
      const {error}=await supabase.from("participations").upsert({
        event_id:rbaEvent.id,player_user_id:subjectId,attendance_status:"confirmed",payment_status:"paid"
      },{onConflict:"event_id,player_user_id"});
      if(error) throw error;

      await supabase.from("event_checkins").upsert({
        event_id:rbaEvent.id,participant_user_id:subjectId,status:"expected"
      },{onConflict:"event_id,participant_user_id"});
    }
  }

  if(isPaid){
    const noteTitle="お支払いを確認しました";
    const noteBody=commerce.offer?.title
      ? `${commerce.offer.title} のお支払いが完了しました。`
      : "RBAのお支払いが完了しました。";
    const {error:paymentNoticeError}=await supabase.from("platform_notifications").upsert({
      user_id:payerId,notification_type:"payment_confirmed",title:noteTitle,body:noteBody,
      action_url:"/ja/my-homecourt",dedupe_key:`${session.id}:payment_confirmed:${payerId}`
    },{onConflict:"dedupe_key",ignoreDuplicates:true});
    if(paymentNoticeError) throw paymentNoticeError;
    if(subjectId!==payerId){
      const {error:participantNoticeError}=await supabase.from("platform_notifications").upsert({
        user_id:subjectId,notification_type:"participation_confirmed",title:"参加が確定しました",
        body:commerce.offer?.title ? `${commerce.offer.title} の参加が確定しました。` : "RBAプログラムの参加が確定しました。",
        action_url:"/ja/my-homecourt",dedupe_key:`${session.id}:participation_confirmed:${subjectId}`
      },{onConflict:"dedupe_key",ignoreDuplicates:true});
      if(participantNoticeError) throw participantNoticeError;
    }
  }

  await logAction(supabase,"payment_matched",session.id,payerId,order?.id||null,{
    subject_user_id:subjectId,
    event:eventKey||null,program:program||null,plan:metadata.plan||null,
    offer_slug:commerce.offer?.slug||null,paid:isPaid
  },`${event.id}:payment_matched`);
}
async function processSubscription(supabase:any,event:any,s:any) {
  const isHomecourt=s.metadata?.program==="rba_homecourt" || (s.items?.data||[]).some((i:any)=>i.price?.id===HOMECOURT_PRICE_ID);
  if(!isHomecourt) return false;
  const {data,error}=await supabase.from("subscriptions").update({
    status:subStatus(s.status),current_period_end:currentPeriodEnd(s),
    cancel_at_period_end:!!s.cancel_at_period_end,provider_customer_id:sid(s.customer),
    updated_at:new Date().toISOString(),
  }).eq("provider_subscription_id",s.id).select("user_id").maybeSingle();
  if(error) throw error;
  // Stripe can deliver subscription.created before checkout.session.completed.
  // Failing here asks Stripe to retry after checkout has created the owned row,
  // instead of permanently recording a successful no-op.
  if(!data?.user_id) throw new Error("subscription_owner_not_ready");
  if(data?.user_id) await logAction(supabase,"subscription_updated",s.id,data.user_id,null,{
    status:s.status,cancel_at_period_end:!!s.cancel_at_period_end
  },`${event.id}:subscription_updated`);
  return true;
}
async function processInvoice(supabase:any,invoice:any,paid:boolean) {
  const subscriptionId=sid(invoice.subscription) || sid(invoice.parent?.subscription_details?.subscription);
  if(!subscriptionId) return false;
  const {data:owned,error:ownedError}=await supabase.from("subscriptions")
    .select("user_id").eq("provider_subscription_id",subscriptionId).maybeSingle();
  if(ownedError) throw ownedError;
  if(!owned?.user_id) throw new Error("invoice_subscription_owner_not_ready");
  const {error}=await supabase.rpc("set_homecourt_invoice_state",{
    p_subscription_id:subscriptionId,p_paid:paid,p_invoice_id:invoice.id
  });
  if(error) throw error;
  return true;
}
async function processRefund(supabase:any,refund:any) {
  const paymentIntentId=sid(refund.payment_intent);
  if(!paymentIntentId) return false;
  const {error}=await supabase.rpc("record_stripe_refund",{
    p_refund_id:refund.id,p_payment_intent_id:paymentIntentId,
    p_amount:refund.amount||0,p_currency:refund.currency||"jpy",
    p_status:refund.status||"pending",
    p_metadata:{reason:refund.reason||null,charge:sid(refund.charge)}
  });
  if(error) throw error;
  return true;
}

Deno.serve(async (request:Request)=>{
  if(request.method!=="POST") return new Response("Method not allowed",{status:405});
  const signature=request.headers.get("stripe-signature");
  if(!signature) return new Response("Missing Stripe signature",{status:400});

  const supabase=db();
  const {data:secret,error:secretError}=await supabase.rpc("get_integration_secret",{secret_name:"stripe_homecourt_webhook"});
  if(secretError||!secret) return new Response("Webhook secret is not configured",{status:503});

  let event:any;
  const body=await request.text();
  try {
    event=await stripe.webhooks.constructEventAsync(body,signature,String(secret),undefined,Stripe.createSubtleCryptoProvider());
  } catch {
    return new Response("Invalid signature",{status:400});
  }

  const digest=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(body));
  const payloadSha256=Array.from(new Uint8Array(digest)).map(byte=>byte.toString(16).padStart(2,"0")).join("");
  let claimToken:string|null=null;
  try {
    claimToken=await beginWebhook(supabase,event,payloadSha256);
    if(!claimToken) return Response.json({received:true,duplicate:true});
    let handled=false;

    if(["checkout.session.completed","checkout.session.async_payment_succeeded"].includes(event.type)) {
      await processCheckout(supabase,event,event.data.object); handled=true;
    } else if(event.type==="checkout.session.async_payment_failed") {
      const session=event.data.object;
      const subjectId=await resolveByClientRef(supabase,session);
      const payerId=(await resolveByEmail(supabase,session))||subjectId;
      if(payerId) {
        await supabase.from("platform_orders").update({status:"failed",updated_at:new Date().toISOString()})
          .eq("provider_checkout_id",session.id).eq("user_id",payerId);
        await logAction(supabase,"payment_failed",session.id,payerId,null,{subject_user_id:subjectId},`${event.id}:payment_failed`);
      } else await storeUnmatched(supabase,event,session,"async_payment_failed_unresolved");
      handled=true;
    } else if(event.type.startsWith("customer.subscription.")) {
      handled=await processSubscription(supabase,event,event.data.object);
    } else if(event.type==="invoice.paid") {
      handled=await processInvoice(supabase,event.data.object,true);
    } else if(event.type==="invoice.payment_failed") {
      handled=await processInvoice(supabase,event.data.object,false);
    } else if(["refund.created","refund.updated","refund.failed"].includes(event.type)) {
      handled=await processRefund(supabase,event.data.object);
    }

    await setWebhookState(supabase,event,claimToken,handled?"processed":"ignored");
    return Response.json({received:true,handled});
  } catch(error) {
    const message=error instanceof Error?error.message.slice(0,500):"unknown";
    if(claimToken) await setWebhookState(supabase,event,claimToken,"failed",message);
    return new Response("Webhook processing failed",{status:500});
  }
});
