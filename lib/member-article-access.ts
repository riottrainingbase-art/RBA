import { hasCurrentHomecourtSubscription, type HomecourtSubscription } from "./homecourt-billing";

/**
 * Member article access follows the same active HOMECOURT entitlement used by
 * the member app so a paid member never sees contradictory access states.
 */
export function canReadMemberArticles(subscriptions: HomecourtSubscription[], now = Date.now()) {
  return hasCurrentHomecourtSubscription(subscriptions, now);
}
