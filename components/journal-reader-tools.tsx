"use client";

import { useEffect, useState } from "react";
import { Bookmark, Check, LoaderCircle, Printer, Share2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Locale="en"|"ja"|"zh-tw"|"ko";

export function JournalReaderTools({title,locale,slug}:{title:string;locale:Locale;slug:string}){
  const [progress,setProgress]=useState(0);
  const [copied,setCopied]=useState(false);
  const [saved,setSaved]=useState(false);
  const [saveBusy,setSaveBusy]=useState(false);
  const [userId,setUserId]=useState<string|null>(null);

  useEffect(()=>{
    let active=true;
    const supabase=createClient();
    void (async()=>{
      const {data:{user}}=await supabase.auth.getUser();
      if(!active||!user)return;
      setUserId(user.id);
      const {data}=await supabase.from("homecourt_saves").select("id").eq("user_id",user.id).eq("item_type","content").eq("item_key",slug).maybeSingle();
      if(active)setSaved(Boolean(data));
    })();
    return()=>{active=false;};
  },[slug]);

  useEffect(()=>{
    const update=()=>{
      const max=document.documentElement.scrollHeight-window.innerHeight;
      setProgress(max>0?Math.min(1,window.scrollY/max):0);
    };
    update();
    window.addEventListener("scroll",update,{passive:true});
    window.addEventListener("resize",update);
    return ()=>{
      window.removeEventListener("scroll",update);
      window.removeEventListener("resize",update);
    };
  },[]);

  const share=async()=>{
    try{
      if(navigator.share){
        await navigator.share({title,url:window.location.href});
        return;
      }
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(()=>setCopied(false),1800);
    }catch{}
  };

  const toggleSave=async()=>{
    if(saveBusy)return;
    const prefix=locale==="en"?"":`/${locale}`;
    if(!userId){
      const next=window.location.pathname+window.location.search;
      window.location.href=`${prefix}/my-homecourt/login?next=${encodeURIComponent(next)}&source=journal-save`;
      return;
    }
    setSaveBusy(true);
    const supabase=createClient();
    if(saved){
      const {error}=await supabase.from("homecourt_saves").delete().eq("user_id",userId).eq("item_type","content").eq("item_key",slug);
      if(!error)setSaved(false);
    }else{
      const {error}=await supabase.from("homecourt_saves").insert({user_id:userId,item_type:"content",item_key:slug,title,href:window.location.pathname,metadata:{source:"journal"}});
      if(!error)setSaved(true);
    }
    setSaveBusy(false);
  };

  const shareLabel=locale==="ja"?(copied?"リンクをコピーしました":"共有"):locale==="zh-tw"?"分享":locale==="ko"?"공유":"Share";
  const printLabel=locale==="ja"?"印刷 / PDF":locale==="zh-tw"?"列印 / PDF":locale==="ko"?"인쇄 / PDF":"Print / PDF";
  const saveLabel=locale==="ja"?(saved?"保存済み":"保存"):locale==="zh-tw"?(saved?"已儲存":"儲存"):locale==="ko"?(saved?"저장됨":"저장"):(saved?"Saved":"Save");

  return <>
    <div className="journal-reading-progress" aria-hidden="true"><span style={{transform:`scaleX(${progress})`}}/></div>
    <div className="journal-article-tools">
      <small>{locale==="ja"?"読了位置を上部バーで確認できます。":"Reading progress"}</small>
      <div>
        <button type="button" onClick={toggleSave} disabled={saveBusy} aria-pressed={saved}>{saveBusy?<LoaderCircle className="spin" size={15}/>:saved?<Check size={15}/>:<Bookmark size={15}/>} {saveLabel}</button>
        <button type="button" onClick={share}>{copied?<Check size={15}/>:<Share2 size={15}/>} {shareLabel}</button>
        <button type="button" onClick={()=>window.print()}><Printer size={15}/> {printLabel}</button>
      </div>
    </div>
  </>;
}
