"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { createClient as createAdmin } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

const DEST="/ja/essentials/manage/atelier";
const garments=new Set(["white_tee","black_hoodie"]);
const finishes=new Set(["signature_lettering","artist_one_of_one"]);
const stages=new Set(["design","quote_requested","sample_in_progress","sample_received","revisions_needed","approved_for_internal_review","paused"]);
const bool=(fd:FormData,key:string)=>fd.get(key)==="on";
const trim=(fd:FormData,key:string,max:number)=>typeof fd.get(key)==="string"?(fd.get(key) as string).trim().slice(0,max):"";
function numeric(fd:FormData,key:string,min:number,max:number){
  const raw=fd.get(key);
  if(raw===null || raw==="")return null;
  if(typeof raw!=="string" || !/^\d{1,7}$/.test(raw))return undefined;
  const n=Number(raw);
  return Number.isSafeInteger(n)&&n>=min&&n<=max?n:undefined;
}
function exitWith(status:"invalid"|"saved"|"storage_error"):never{redirect(DEST+"?status="+status);}
export async function saveRbaArtisanTrial(fd:FormData){
  const db=await createClient();
  const {data:{user},error}=await db.auth.getUser();
  if(error||!user)notFound();
  const result=await db.from("profiles").select("role").eq("id",user.id).maybeSingle();
  if(result.error||result.data?.role!=="admin")notFound();
  const url=process.env.NEXT_PUBLIC_SUPABASE_URL,service=process.env.SUPABASE_SERVICE_ROLE_KEY;
  if(!url||!service)exitWith("storage_error");
  if(new URL(url!).hostname!=="ctngdzzorhzpdxswahzl.supabase.co")exitWith("storage_error");
  const recordId=trim(fd,"id",42);
  if(recordId&&!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(recordId))exitWith("invalid");
  const label=trim(fd,"label",100);
  const garment=trim(fd,"garment",30);
  const finish=trim(fd,"finish",30);
  const stage=trim(fd,"stage",50);
  const notes=trim(fd,"notes",2000);
  const sampleCount=numeric(fd,"sample_count",0,100);
  const washCycles=numeric(fd,"wash_cycles",0,100);
  const quotedArtistFee=numeric(fd,"quoted_artist_fee_jpy",0,1000000);
  const estimatedMinutes=numeric(fd,"estimated_minutes",1,1000);
  const plannedAddon=numeric(fd,"planned_addon_jpy",100,200000);
  if(label.length<3||!garments.has(garment)||!finishes.has(finish)||!stages.has(stage)||
    sampleCount===null||washCycles===null||
    quotedArtistFee===undefined||estimatedMinutes===undefined||plannedAddon===undefined)exitWith("invalid");
  const row={
    label,garment,finish,stage,notes,
    sample_count:sampleCount,wash_cycles:washCycles,
    quoted_artist_fee_jpy:quotedArtistFee,
    estimated_minutes:estimatedMinutes,
    planned_addon_jpy:plannedAddon,
    paint_method_tested:bool(fd,"paint_method_tested"),
    rights_approved:bool(fd,"rights_approved"),
    creator_compensation_agreed:bool(fd,"creator_compensation_agreed"),
    sample_quality_approved:bool(fd,"sample_quality_approved"),
    label_care_approved:bool(fd,"label_care_approved"),
    fulfillment_confirmed:bool(fd,"fulfillment_confirmed"),
    updated_by:user.id,updated_at:new Date().toISOString(),
  };
  // Check same conditions as DB: approval remains *internal review only*, never a checkout release.
  if(row.stage==="approved_for_internal_review"&&!(
    row.sample_count>=1&&row.wash_cycles>=10&&row.paint_method_tested&&
    row.rights_approved&&row.creator_compensation_agreed&&row.sample_quality_approved&&
    row.label_care_approved&&row.fulfillment_confirmed&&
    row.quoted_artist_fee_jpy!==null&&row.estimated_minutes!==null
  ))exitWith("invalid");
  const admin=createAdmin(url!,service!,{auth:{persistSession:false,autoRefreshToken:false}});
  const response=recordId
    ? await admin.from("rba_essentials_artisan_trials").update(row).eq("id",recordId).select("id").maybeSingle()
    : await admin.from("rba_essentials_artisan_trials").insert({...row,created_by:user.id}).select("id").maybeSingle();
  if(response.error||!response.data?.id)exitWith("storage_error");
  revalidatePath(DEST);
  exitWith("saved");
}
