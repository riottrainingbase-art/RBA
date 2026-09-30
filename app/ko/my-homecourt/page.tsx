import { pageMetadata } from "@/components/page-metadata";
import { MyHomecourt } from "@/components/my-homecourt";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
export const metadata=pageMetadata("ko","my-homecourt");
export default async function Page(){const supabase=await createClient();const {data:{user}}=await supabase.auth.getUser();if(user)redirect("/ko/my-homecourt/app");return <MyHomecourt locale="ko"/>}
