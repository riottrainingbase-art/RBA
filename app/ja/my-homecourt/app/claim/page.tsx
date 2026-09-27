import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { HomecourtClaimWorkspace } from "@/components/homecourt-claim-workspace";

export const metadata:Metadata={title:"運営者確認 | MY HOME COURT",robots:{index:false,follow:false},alternates:{canonical:"/ja/my-homecourt/app/claim"}};

export default async function Page(){
  const db=await createClient();
  const {data:{user}}=await db.auth.getUser();
  if(!user)redirect("/ja/my-homecourt/login?next=%2Fja%2Fmy-homecourt%2Fapp%2Fclaim");
  const {data:profile}=await db.from("profiles").select("role").eq("id",user.id).maybeSingle();
  return <HomecourtClaimWorkspace userId={user.id} isAdmin={profile?.role==="admin"}/>;
}
