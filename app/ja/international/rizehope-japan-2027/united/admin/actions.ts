"use server";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {createClient} from "@/lib/supabase/server";
const back="/ja/international/rizehope-japan-2027/united/admin";
async function requireAdmin(){
 const db=await createClient();
 const {data:{user}}=await db.auth.getUser();
 if(!user)redirect("/ja/my-homecourt/login?next=%2Fja%2Finternational%2Frizehope-japan-2027%2Funited%2Fadmin");
 const {data:profile}=await db.from("profiles").select("role").eq("id",user.id).maybeSingle();
 if(profile?.role!=="admin")redirect("/ja/international/rizehope-japan-2027/united");
 return db;
}
const clean=(f:FormData,key:string,max=250)=>String(f.get(key)??"").trim().slice(0,max);
export async function importUnitedInterest(f:FormData){
 const db=await requireAdmin();
 const submittedAt=new Date(clean(f,"submitted_at",60));
 const submissionId=clean(f,"submission_id",90);
 if(submissionId.length<8||!Number.isFinite(submittedAt.getTime())||
   submittedAt.getTime()>Date.now()+300000)redirect(back+"?error=invalid_original_submission");
 const {error}=await db.rpc("rizehope_2027_united_import_interest",{
  p_form_id:"263221266794057",p_submission_id:submissionId,p_submitted_at:submittedAt.toISOString(),
  p_guardian_name:clean(f,"guardian_name",160),p_guardian_email:clean(f,"guardian_email"),
  p_region:clean(f,"region",120)
 });
 if(error)redirect(back+"?error=import_failed");
 revalidatePath(back);redirect(back+"?saved=imported");
}
export async function selectUnitedPlayer(f:FormData){
 const db=await requireAdmin();
 if(process.env.RIZEHOPE_2027_UNITED_APPROVAL_ENABLED!=="true")redirect(back+"?error=approval_locked");
 const id=clean(f,"player_id",36),teamId=clean(f,"team_id",36),terms=clean(f,"terms_version",120);
 const total=Number(clean(f,"total_jpy",12)),deposit=Number(clean(f,"deposit_jpy",12)),balance=Number(clean(f,"balance_jpy",12));
 if(!/^[0-9a-f-]{36}$/i.test(id)||!/^[0-9a-f-]{36}$/i.test(teamId)||
   terms.length<5||!Number.isSafeInteger(total)||!Number.isSafeInteger(deposit)||
   !Number.isSafeInteger(balance)||deposit<=0||balance<=0||total!==deposit+balance)
   redirect(back+"?error=invalid_selection");
 const {error}=await db.rpc("rizehope_2027_united_select_player",{
  p_player_id:id,p_team_entry_id:teamId,p_terms_version:terms,
  p_total_jpy:total,p_deposit_jpy:deposit,p_balance_jpy:balance
 });
 if(error)redirect(back+"?error=selection_failed");
 revalidatePath(back);redirect(back+"?saved=selected");
}
export async function recordUnitedGuardianTerms(f:FormData){
 const db=await requireAdmin();
 if(process.env.RIZEHOPE_2027_UNITED_APPROVAL_ENABLED!=="true")redirect(back+"?error=terms_locked");
 const id=clean(f,"player_id",36),terms=clean(f,"terms_version",120),evidence=clean(f,"evidence",220);
 if(!/^[0-9a-f-]{36}$/i.test(id)||terms.length<5||evidence.length<10)
  redirect(back+"?error=missing_written_guardian_evidence");
 const {error}=await db.rpc("rizehope_2027_united_record_guardian_terms",{
  p_player_id:id,p_terms_version:terms,p_evidence_reference:evidence
 });
 if(error)redirect(back+"?error=terms_unverified");
 revalidatePath(back);redirect(back+"?saved=terms_recorded");
}
