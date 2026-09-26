import type { HomecourtSubscription } from "./homecourt-billing";

/**
 * Match the member_article_bodies RLS policy. Unlike other HOMECOURT account
 * features, private article bodies require a known billing period in the future.
 */
export function canReadMemberArticles(subscriptions: HomecourtSubscription[], now = Date.now()) {
  return subscriptions.some(subscription => {
    if (subscription.plan_key !== "homecourt_monthly" || !["active", "trialing"].includes(subscription.status)) return false;
    const end = subscription.current_period_end ? Date.parse(subscription.current_period_end) : NaN;
    return Number.isFinite(end) && end > now;
  });
}
