"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const back = "/ja/international/rizehope-japan-2027/admin";
async function requireAdmin() {
  const db = await createClient();
  const { data: { user } } = await db.auth.getUser();
  if (!user) redirect("/ja/my-homecourt/login?next=%2Fja%2Finternational%2Frizehope-japan-2027%2Fadmin");
  const {data} = await db.from("profiles").select("role").eq("id",user.id).maybeSingle();
  if (data?.role !== "admin") redirect("/ja/international/rizehope-japan-2027");
  return db;
}
const clean = (f:FormData,key:string,max=200) => String(f.get(key)??"").trim().slice(0,max);

export async function importRizehopeTeam(f:FormData) {
  const db=await requireAdmin();
  const formId=clean(f,"form_id",30);
  if(!["263223566035050","263220855042046","263221234159047"].includes(formId)) {
    redirect(back+"?error=invalid_form");
  }
  const when=clean(f,"submitted_at",45);
  const date=new Date(when);
  if(!Number.isFinite(date.getTime())||date.getTime()>Date.now()+300000)redirect(back+"?error=invalid_time");
  const category=clean(f,"category",15);
  if(!["japan","overseas"].includes(category))redirect(back+"?error=invalid_category");
  const {error}=await db.rpc("rizehope_2027_import_entry",{
    p_category:category,p_team_name:clean(f,"team",160),p_region:clean(f,"region",120),
    p_adult_representative:clean(f,"adult",160),
    p_representative_email:clean(f,"email",250),
    p_source_form_id:formId,p_source_submission_id:clean(f,"submission_id",60),
    p_source_submitted_at:date.toISOString()
  });
  if(error)redirect(back+"?error=import_failed");
  revalidatePath(back);
  redirect(back+"?saved=imported");
}
export async function acceptRizehopeTeam(f:FormData) {
  const db=await requireAdmin();
  // Financially binding approval remains off until operator confirms the official
  // event rules, collection entity, refund terms, consent and Stripe Tax treatment.
  if(process.env.RIZEHOPE_2027_APPROVAL_ENABLED!=="true")redirect(back+"?error=approval_locked");
  const entryId=clean(f,"team_id",45);
  const termsVersion=clean(f,"terms_version",100);
  if(!/^[0-9a-f]{8}-[0-9a-f-]{27,36}$/i.test(entryId)||termsVersion.length<5)redirect(back+"?error=invalid_request");
  const {error}=await db.rpc("rizehope_2027_accept_team",{
    p_entry_id:entryId,p_terms_version:termsVersion
  });
  if(error)redirect(back+"?error=capacity_or_terms");
  revalidatePath(back);
  redirect(back+"?saved=accepted");
}
export async function recordRizehopeTermsEvidence(f:FormData) {
  const db=await requireAdmin();
  if(process.env.RIZEHOPE_2027_APPROVAL_ENABLED!=="true")redirect(back+"?error=terms_recording_locked");
  const entryId=clean(f,"team_id",45);
  const termsVersion=clean(f,"terms_version",100);
  const evidence=clean(f,"evidence_ref",220);
  if(!/^[0-9a-f-]{36}$/i.test(entryId)||termsVersion.length<5||evidence.length<10) {
    redirect(back+"?error=missing_documentary_evidence");
  }
  const {error}=await db.rpc("rizehope_2027_record_terms_acceptance",{
    p_entry_id:entryId,p_terms_version:termsVersion,p_evidence_reference:evidence
  });
  if(error)redirect(back+"?error=terms_evidence_not_accepted");
  revalidatePath(back);
  redirect(back+"?saved=terms_confirmed");
}
