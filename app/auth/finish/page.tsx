"use client";

import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { memberAuthDestination } from "@/lib/member-auth-redirect";
import { createEmailLinkClient } from "@/lib/supabase/client";

export default function EmailLinkFinishPage(){
  const [message,setMessage]=useState("ログインを確認しています…");

  useEffect(()=>{
    let active=true;
    async function finish(){
      const params=new URLSearchParams(location.search);
      const destination=memberAuthDestination(params.get("next"));
      const supabase=createEmailLinkClient();
      const {data,error}=await supabase.auth.getSession();
      if(!active)return;
      if(!error&&data.session){
        location.replace(destination);
        return;
      }
      setMessage("ログインリンクを確認できませんでした。新しいリンクを送信してください。");
      const locale=destination.startsWith("/zh-tw/")?"/zh-tw":destination.startsWith("/ko/")?"/ko":destination.startsWith("/ja/")?"/ja":"";
      location.replace(`${locale}/my-homecourt/login?error=expired&next=${encodeURIComponent(destination)}`);
    }
    void finish();
    return()=>{active=false;};
  },[]);

  return <main className="member-login-shell"><section className="member-login-card"><div className="member-login-sent" role="status"><LoaderCircle className="spin"/><h1>MY HOME COURT</h1><p>{message}</p></div></section></main>;
}
