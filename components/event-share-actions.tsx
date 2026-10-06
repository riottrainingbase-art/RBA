"use client";

import { Check, Copy, MessageCircle, Share2 } from "lucide-react";
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
  const line=()=>{
    const url=`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(window.location.href)}`;
    window.open(url,"_blank","noopener,noreferrer");
  };
  const x=()=>{
    const url=`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url,"_blank","noopener,noreferrer");
  };
  return <div className="event-share-buttons">
    <button type="button" className="button button-orange" onClick={share}><Share2 size={17}/>{shareLabel}</button>
    <button type="button" className="button button-dark" onClick={line}><MessageCircle size={17}/>LINE</button>
    <button type="button" className="button button-dark" onClick={x}><Share2 size={17}/>X</button>
    <button type="button" className="button button-dark" onClick={copy}>{copied?<Check size={17}/>:<Copy size={17}/>} {copied?copiedLabel:copyLabel}</button>
  </div>;
}