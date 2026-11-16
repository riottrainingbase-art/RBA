import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SiteFrame } from "@/components/site-frame";
import { EssentialsAtelierLab } from "@/components/essentials-atelier-lab";

export const dynamic="force-dynamic";
export const metadata:Metadata={
  title:"RBA ESSENTIALS｜手書き加工の商品開発・価格ラボ（非公開）",
  robots:{index:false,follow:false},
};
export default async function EssentialsAtelierPrivatePage(){
  const db=await createClient();
  const {data:{user},error}=await db.auth.getUser();
  if(error||!user)notFound();
  const p=await db.from("profiles").select("role").eq("id",user.id).maybeSingle();
  if(p.error||p.data?.role!=="admin")notFound();
  return <SiteFrame locale="ja"><EssentialsAtelierLab/></SiteFrame>;
}
