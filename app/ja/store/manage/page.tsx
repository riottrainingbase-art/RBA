import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TeeEconomicsDesk } from "@/components/tee-economics-desk";

export const dynamic="force-dynamic";
export const metadata:Metadata={
  title:"RBA PERFORMANCE TEE｜運営用採算・発売確認",
  robots:{index:false,follow:false},
};

export default async function PerformanceTeeManagePage(){
  const db=await createClient();
  const {data:{user},error}=await db.auth.getUser();
  if(error||!user)notFound();
  const profile=await db.from("profiles").select("role").eq("id",user.id).maybeSingle();
  if(profile.error||profile.data?.role!=="admin")notFound();
  return <TeeEconomicsDesk/>;
}
