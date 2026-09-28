import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isRbaOperator } from "@/lib/rba-operator";
import { TeamDevelopmentWorkspace } from "@/components/team-development-workspace";

export const metadata:Metadata={title:"TEAM DEVELOPMENT | MY HOME COURT",robots:{index:false,follow:false},alternates:{canonical:"/ja/my-homecourt/app/team-development"}};

export default async function Page(){
  const db=await createClient();
  const {data:{user}}=await db.auth.getUser();
  if(!user)redirect("/ja/my-homecourt/login?next=%2Fja%2Fmy-homecourt%2Fapp%2Fteam-development");
  const [{data:profile},rbaOperator]=await Promise.all([db.from("profiles").select("role").eq("id",user.id).maybeSingle(),isRbaOperator(user.id)]);
  return <TeamDevelopmentWorkspace userId={user.id} isAdmin={profile?.role==="admin"||rbaOperator}/>;
}
