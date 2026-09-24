import type { HomecourtSubscription } from "./homecourt-billing";

// Article access fails closed when paid-through information is absent or stale.
export function canReadMemberArticles(subscriptions: HomecourtSubscription[], now = Date.now()) {
  return subscriptions.some(item => item.plan_key === "homecourt_monthly"
    && ["active", "trialing"].includes(item.status)
    && item.current_period_end !== null
    && Number.isFinite(Date.parse(item.current_period_end))
    && Date.parse(item.current_period_end) > now);
}
