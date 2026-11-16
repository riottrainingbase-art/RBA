import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient as createAdmin } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { SiteFrame } from "@/components/site-frame";
import { EssentialsAtelierLab } from "@/components/essentials-atelier-lab";
import { ArtisanTrialsBoard, type ArtisanTrial } from "@/components/essentials-artisan-trials-board";

export const dynamic="force-dynamic";
export const metadata:Metadata={
  title:"RBA ESSENTIALS｜手書き加工の商品開発・価格ラボ（非公開）",
  robots:{index:false,follow:false},
};
export default async function EssentialsAtelierPrivatePage({searchParams}:{searchParams:Promise<{status?:string}>}){
  const db=await createClient();
  const {data:{user},error}=await db.auth.getUser();
  if(error||!user)notFound();
  const p=await db.from("profiles").select("role").eq("id",user.id).maybeSingle();
  if(p.error||p.data?.role!=="admin")notFound();
  const url=process.env.NEXT_PUBLIC_SUPABASE_URL,service=process.env.SUPABASE_SERVICE_ROLE_KEY;
  if(!url||!service)notFound();
  try{if(new URL(url).hostname!=="ctngdzzorhzpdxswahzl.supabase.co")notFound();}
  catch{notFound();}
  const admin=createAdmin(url,service,{auth:{persistSession:false,autoRefreshToken:false}});
  const [items,audit,q]=await Promise.all([
    admin.from("rba_essentials_artisan_trials").select("id,label,garment,finish,stage,notes,sample_count,wash_cycles,paint_method_tested,rights_approved,creator_compensation_agreed,sample_quality_approved,label_care_approved,fulfillment_confirmed,quoted_artist_fee_jpy,estimated_minutes,planned_addon_jpy,updated_at").order("updated_at",{ascending:false}).limit(60),
    admin.from("rba_essentials_artisan_audit").select("id",{count:"exact",head:true}),
    searchParams,
  ]);
  if(items.error||audit.error) return <SiteFrame locale="ja"><main style={{padding:70,background:"#f2f0eb",minHeight:"60vh",color:"#222"}}><h1>記録を取得できませんでした。</h1><p>管理者用データベースの設定を確認してください。商品の販売はこの画面から開始できません。</p></main></SiteFrame>;
  return <SiteFrame locale="ja">
    <ArtisanTrialsBoard trials={(items.data??[]) as ArtisanTrial[]} auditCount={audit.count??0} status={q.status}/>
    <EssentialsAtelierLab/>
  </SiteFrame>;
}
