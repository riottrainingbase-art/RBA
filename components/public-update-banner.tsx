"use client";
import {useEffect,useState} from "react";
import {ArrowRight,Bell} from "lucide-react";
import type {Locale} from "./site-frame";
type Update={kind:string;title:string;href:string};
export function PublicUpdateBanner({locale}:{locale:Locale}){
 const [result,setResult]=useState<{locale:Locale;update:Update}|null>(null);
 useEffect(()=>{const controller=new AbortController();let active=true;fetch(`/api/public-updates?locale=${encodeURIComponent(locale)}`,{signal:controller.signal}).then(r=>r.ok?r.json():null).then((data:unknown)=>{const u=(data as {update?:Partial<Update>}|null)?.update;if(active&&u&&typeof u.title==="string"&&typeof u.kind==="string"&&typeof u.href==="string"&&u.href.startsWith("/")&&!u.href.startsWith("//")&&!/[\\\r\n]/.test(u.href))setResult({locale,update:{title:u.title,kind:u.kind,href:u.href}});}).catch(()=>{});return()=>{active=false;controller.abort();};},[locale]);
 const latest=result?.locale===locale?result.update:null;
 return latest?<a className="site-update-strip" href={latest.href}><Bell size={15}/><span>{({en:"NEW",ja:"更新","zh-tw":"最新",ko:"NEW"})[locale]} / {latest.kind.toUpperCase()}</span><strong>{latest.title}</strong><span className="site-update-cta">{({en:"Read",ja:"読む","zh-tw":"閱讀",ko:"읽기"})[locale]} <ArrowRight size={14}/></span></a>:null;
}
