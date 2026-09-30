import { pageMetadata } from "@/components/page-metadata";
import { MyHomecourt } from "@/components/my-homecourt";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
export const metadata=pageMetadata("zh-tw","my-homecourt");
export default async function Page(){const supabase=await createClient();const {data:{user}}=await supabase.auth.getUser();if(user)redirect("/zh-tw/my-homecourt/app");return <MyHomecourt locale="zh-tw"/>}
