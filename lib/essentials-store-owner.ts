import "server-only";
import { createClient } from "@supabase/supabase-js";

const HOST = "ctngdzzorhzpdxswahzl.supabase.co";
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Restricted RBA STORE owner access, independent from public member role.
 * No change to global HOMECOURT roles, and never use user_metadata as
 * authorization. Operator ID/email must be set by an authorized deployer.
 */
export async function isRbaStoreOwner(userId: string): Promise<boolean> {
  const expectedId = process.env.RBA_ESSENTIALS_RBA_OPERATOR_USER_ID?.trim();
  const expectedEmail = process.env.RBA_ESSENTIALS_RBA_OPERATOR_EMAIL?.trim().toLowerCase();
  if (!UUID.test(userId) || !expectedId || userId !== expectedId ||
      !expectedEmail || !EMAIL.test(expectedEmail)) return false;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return false;
  try {
    const u = new URL(url);
    if (u.protocol !== "https:" || u.hostname !== HOST || u.username || u.password) return false;
    const db = createClient(url, serviceKey, {auth:{persistSession:false,autoRefreshToken:false}});
    const {data,error} = await db.auth.admin.getUserById(userId);
    const owner = data.user;
    return !error && !!owner && owner.id === userId &&
      !!owner.email_confirmed_at && owner.email?.trim().toLowerCase() === expectedEmail;
  } catch {
    return false;
  }
}
