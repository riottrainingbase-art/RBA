import "server-only";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_HOST = "ctngdzzorhzpdxswahzl.supabase.co";
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Verify an actual operational owner for paid apparel fulfillment.
 *
 * RBA_MANAGED: RBA receives payments, owns the order ledger and updates production
 * milestones after confirming a handoff with the external manufacturer. A supplier
 * login is NOT required. This path needs a specifically identified, confirmed
 * Supabase administrator plus independent handoff-test approval.
 *
 * SUPPLIER_LOGIN: Retain the historical optional verified production-user flow.
 * Neither mode may be selected by an unapproved public form or a checkout request.
 * A boolean alone is not proof of manufacturing capacity or a signed contract:
 * other commercial gates are checked independently by essentials-commerce.ts.
 */
export async function essentialsFulfillmentCanAcceptOrders(): Promise<boolean> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !secret) return false;
  try {
    const u = new URL(url);
    if (u.protocol !== "https:" || u.hostname !== SUPABASE_HOST || u.username || u.password) return false;
    const db = createClient(url, secret, {auth:{persistSession:false,autoRefreshToken:false}});
    const mode = process.env.RBA_ESSENTIALS_FULFILLMENT_MODE;

    if (mode === "rba_managed") {
      if (process.env.RBA_ESSENTIALS_RBA_OPERATOR_ACCOUNT_VERIFIED !== "true" ||
          process.env.RBA_ESSENTIALS_RBA_SUPPLIER_HANDOFF_VERIFIED !== "true") return false;
      const operatorId = process.env.RBA_ESSENTIALS_RBA_OPERATOR_USER_ID?.trim() || "";
      if (!UUID.test(operatorId)) return false;
      const [profile, identity] = await Promise.all([
        db.from("profiles").select("role").eq("id",operatorId).maybeSingle(),
        db.auth.admin.getUserById(operatorId),
      ]);
      return !profile.error && profile.data?.role === "admin" &&
        !identity.error && !!identity.data.user?.email_confirmed_at;
    }

    if (mode === "supplier_login") {
      const {count,error} = await db.from("rba_essentials_fulfillment_agents")
        .select("user_id",{head:true,count:"exact"})
        .eq("active",true).eq("access_role","production");
      return !error && (count??0)>0;
    }

    // No mode silently falls back to an open or unverified checkout.
    return false;
  } catch {
    return false;
  }
}
