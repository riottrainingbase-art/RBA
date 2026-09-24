import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { MemberApp } from "./member-app";
import type { Locale } from "./site-frame";

export async function MemberAppPage({locale,section}:{locale:Locale;section?:string}){
  const supabase=await createClient();
  const {data:{user}}=await supabase.auth.getUser();
  const prefix=locale==="en"?"":`/${locale}`;
  if(!user) redirect(`${prefix}/my-homecourt/login`);
  return <MemberApp locale={locale} section={section||"home"} userId={user.id} email={user.email||""}/>;
}