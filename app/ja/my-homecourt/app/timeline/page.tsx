import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DevelopmentTimeline } from "@/components/development-timeline";

export const metadata:Metadata={title:"DEVELOPMENT TIMELINE | MY HOME COURT",robots:{index:false,follow:false},alternates:{canonical:"/ja/my-homecourt/app/timeline"}};

export default async function Page(){
  const db=await createClient();
  const {data:{user}}=await db.auth.getUser();
  if(!user)redirect("/ja/my-homecourt/login?next=%2Fja%2Fmy-homecourt%2Fapp%2Ftimeline");
  return <DevelopmentTimeline userId={user.id}/>;
}
