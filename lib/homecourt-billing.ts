/** Verified against the RBA live Stripe portal configuration on 2026-09-24. */
export const HOMECOURT_BILLING_PORTAL = "https://billing.stripe.com/p/login/8x2dRb2XZ4fi1MpeAL7EQ00";
export type HomecourtSubscription = {
 id:string; status:string; plan_key:string;
 current_period_end:string|null; cancel_at_period_end:boolean;
};
/** A historical payment does not prove an ongoing subscription. */
export function hasCurrentHomecourtSubscription(subscriptions:HomecourtSubscription[], now=Date.now()) {
 return subscriptions.some(subscription=>{
  if(subscription.plan_key!=="homecourt_monthly" || !["active","trialing"].includes(subscription.status))return false;
  if(!subscription.cancel_at_period_end)return true;
  const end=subscription.current_period_end?Date.parse(subscription.current_period_end):NaN;
  return Number.isFinite(end)&&end>now;
 });
}
