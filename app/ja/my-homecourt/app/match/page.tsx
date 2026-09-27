import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { HomecourtMatchWorkspace } from "@/components/homecourt-match-workspace";

export const metadata:Metadata={title:"HOMECOURT MATCH | TEAM DESK",robots:{index:false,follow:false},alternates:{canonical:"/ja/my-homecourt/app/match"}};

export default async function Page(){
  const db=await createClient();
  const {data:{user}}=await db.auth.getUser();
  if(!user)redirect("/ja/my-homecourt/login?next=%2Fja%2Fmy-homecourt%2Fapp%2Fmatch");
  return <HomecourtMatchWorkspace userId={user.id}/>;
}
