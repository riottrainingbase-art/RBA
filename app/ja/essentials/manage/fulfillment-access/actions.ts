"use server";

import { createClient as createService } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const PATH = "/ja/essentials/manage/fulfillment-access";
const SUPABASE_HOST = "ctngdzzorhzpdxswahzl.supabase.co";
const userIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const next = (state: "saved" | "revoked" | "invalid" | "identity" | "config" | "error"): never =>
  redirect(PATH + "?state=" + state);
function entry(form: FormData, key: string, max = 180): string {
  const raw = form.get(key);
  return typeof raw === "string" ? raw.trim().slice(0, max) : "";
}
async function authorized() {
  const session = await createClient();
  const { data: { user }, error } = await session.auth.getUser();
  if (error || !user) notFound();
  const { data: profile, error: roleError } = await session.from("profiles").select("role").eq("id", user.id).maybeSingle();
  if (roleError || profile?.role !== "admin") notFound();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) next("config");
  try {
    const u = new URL(url!);
    if (u.protocol !== "https:" || u.hostname !== SUPABASE_HOST || u.username || u.password) next("config");
  } catch { next("config"); }
  const service = createService(url!, key!, { auth: { persistSession: false, autoRefreshToken: false } });
  return { service, granterId: user.id };
}

/** Administrator-only enrollment after independent identity AND signed production agreement checks. */
export async function grantEssentialsMakerAccess(form: FormData) {
  const { service, granterId } = await authorized();
  const uid = entry(form, "user_id", 48);
  const email = entry(form, "verified_email", 160).toLowerCase();
  const terms = entry(form, "signed_terms_reference", 160);
  const affirmed = entry(form, "signed_terms_verified", 6) === "yes";
  if (!userIdPattern.test(uid) || !emailPattern.test(email) || terms.length < 12 || !affirmed ||
      /(?:未署名|仮|draft|pending|unsigned|test)/i.test(terms)) next("invalid");
  const { data: identified, error: identityError } = await service.auth.admin.getUserById(uid);
  if (identityError || !identified.user || !identified.user.email_confirmed_at ||
      identified.user.email?.trim().toLowerCase() !== email) next("identity");
  const { error } = await service.from("rba_essentials_fulfillment_agents").upsert({
    user_id: uid, active: true, access_role: "production", terms_reference: terms,
    granted_by: granterId, granted_at: new Date().toISOString(),
  }, { onConflict: "user_id" });
  if (error) next("error");
  revalidatePath(PATH);
  next("saved");
}
export async function revokeEssentialsMakerAccess(form: FormData) {
  const { service } = await authorized();
  const uid = entry(form, "user_id", 48);
  if (!userIdPattern.test(uid) || entry(form, "revoke_confirm", 6) !== "yes") next("invalid");
  const { data, error } = await service.from("rba_essentials_fulfillment_agents")
    .update({ active: false }).eq("user_id", uid).select("user_id").maybeSingle();
  if (error || !data) next("error");
  revalidatePath(PATH);
  next("revoked");
}
