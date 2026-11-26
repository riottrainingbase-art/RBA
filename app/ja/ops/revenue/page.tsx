import type {Metadata} from "next";
import {notFound,redirect} from "next/navigation";
import {createClient} from "@/lib/supabase/server";
import {SiteFrame} from "@/components/site-frame";
import {RbaProfitCalculator} from "@/components/rba-profit-calculator";

export const dynamic="force-dynamic";
export const metadata:Metadata={
  title:"RBA 運営管理｜収支・販売判断",
  description:"RBA管理者専用。収支・利益率と開催可否を確認する内部試算。",
  robots:{index:false,follow:false},
};

export default async function Page(){
  const supabase=await createClient();
  const {data:{user}}=await supabase.auth.getUser();
  if(!user)redirect("/ja/my-homecourt/login?next=%2Fja%2Fops%2Frevenue");
  const {data:profile}=await supabase.from("profiles").select("role").eq("id",user.id).maybeSingle();
  if(profile?.role!=="admin")notFound();
  return <SiteFrame locale="ja"><RbaProfitCalculator/></SiteFrame>;
}
