"use client";

import { useEffect, useState } from "react";
import { Check, Printer, Share2 } from "lucide-react";

type Locale="en"|"ja"|"zh-tw"|"ko";

export function JournalReaderTools({title,locale}:{title:string;locale:Locale}){
  const [progress,setProgress]=useState(0);
  const [copied,setCopied]=useState(false);

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

  const shareLabel=locale==="ja"?(copied?"リンクをコピーしました":"共有"):locale==="zh-tw"?"分享":locale==="ko"?"공유":"Share";
  const printLabel=locale==="ja"?"印刷 / PDF":locale==="zh-tw"?"列印 / PDF":locale==="ko"?"인쇄 / PDF":"Print / PDF";

  return <>
    <div className="journal-reading-progress" aria-hidden="true"><span style={{transform:`scaleX(${progress})`}}/></div>
    <div className="journal-article-tools">
      <small>{locale==="ja"?"読了位置を上部バーで確認できます。":"Reading progress"}</small>
      <div>
        <button type="button" onClick={share}>{copied?<Check size={15}/>:<Share2 size={15}/>} {shareLabel}</button>
        <button type="button" onClick={()=>window.print()}><Printer size={15}/> {printLabel}</button>
      </div>
    </div>
  </>;
}
