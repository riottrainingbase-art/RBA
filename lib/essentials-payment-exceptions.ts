import "server-only";
import { createClient } from "@supabase/supabase-js";
import type Stripe from "stripe";

export type EssentialsPaidExceptionReason =
  | "unsupported_payment_link"
  | "unapproved_contract_terms"
  | "incorrect_line_items_or_amount"
  | "invalid_garment_sizes"
  | "unexpected_product_metadata";

const HOST="ctngdzzorhzpdxswahzl.supabase.co";
const SESSION=/^cs_live_[A-Za-z0-9]{20,220}$/;

/**
 * Record verified *paid* Stripe Checkouts for private RBA manual resolution.
 * This is deliberately NOT a completed order, refund, production ticket, or
 * authorization to collect funds. Stripe remains the payment source of truth.
 * Duplicate signed events never create multiple cases for one Checkout Session.
 */
export async function quarantinePaidEssentialsSession(
  event: Stripe.Event,
  session: Stripe.Checkout.Session,
  reason: EssentialsPaidExceptionReason
): Promise<boolean> {
  const url=process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key=process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url||!key||!SESSION.test(session.id||"")||
      !event.livemode||!session.livemode||
      session.mode!=="payment"||session.payment_status!=="paid"||
      session.metadata?.program!=="rba_essentials_first_drop"||
      session.currency!=="jpy"||
      !Number.isInteger(session.amount_total)||session.amount_total===null||
      session.amount_total<0) return false;

  try {
    const host=new URL(url);
    if(host.protocol!=="https:"||host.hostname!==HOST||host.username||host.password)
      return false;
    const db=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
    const {error}=await db.from("rba_essentials_payment_exceptions").upsert({
      stripe_checkout_session_id:session.id,
      stripe_event_id:event.id,
      stripe_payment_intent_id:typeof session.payment_intent==="string"?session.payment_intent:null,
      stripe_payment_link_id:typeof session.payment_link==="string"?session.payment_link:null,
      amount_total_jpy:session.amount_total,
      reason,
      review_state:"needs_review",
    },{onConflict:"stripe_checkout_session_id",ignoreDuplicates:true});
    return !error;
  } catch {
    return false;
  }
}
