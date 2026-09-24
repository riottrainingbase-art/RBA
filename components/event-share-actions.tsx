"use client";

import { Check, Copy, Share2 } from "lucide-react";
import { useState } from "react";

export function EventShareActions({title,text,copyLabel,shareLabel,copiedLabel}:{title:string;text:string;copyLabel:string;shareLabel:string;copiedLabel:string}){
  const [copied,setCopied]=useState(false);
  const share=async()=>{
    if(navigator.share){
      try { await navigator.share({title,text,url:window.location.href}); return; } catch { /* user cancelled */ }
    }
    await navigator.clipboard.writeText(`${text}\n${window.location.href}`);
    setCopied(true);
    window.setTimeout(()=>setCopied(false),2200);
  };
  const copy=async()=>{
    await navigator.clipboard.writeText(`${text}\n${window.location.href}`);
    setCopied(true);
    window.setTimeout(()=>setCopied(false),2200);
  };
  return <div className="event-share-buttons">
    <button type="button" className="button button-orange" onClick={share}><Share2 size={17}/>{shareLabel}</button>
    <button type="button" className="button button-dark" onClick={copy}>{copied?<Check size={17}/>:<Copy size={17}/>} {copied?copiedLabel:copyLabel}</button>
  </div>;
}