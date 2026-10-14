"use client";

import type {MouseEvent,ReactNode} from "react";

type Placement = "hero"|"live"|"ondemand"|"footer"|"sticky"|"quiz"|"worksheet"|"newsletter"|"freecheck";
type Kind = "form_click"|"free_resource_click"|"newsletter_click";

function campaignSource(){
  if(typeof window==="undefined")return "direct";
  const raw=new URLSearchParams(window.location.search).get("utm_source")||"direct";
  return /^[a-z0-9_-]{1,32}$/i.test(raw)?raw.toLowerCase():"other";
}
function record(kind:Kind,placement:Placement){
  if(typeof window==="undefined")return;
  const event={name:"torsten_"+kind,data:{placement,source:campaignSource(),campaign:"vol2_20261125"}};
  try{
    const tracker=(window as Window & {va?:(command:string,payload:unknown)=>void}).va;
    if(typeof tracker==="function")tracker("event",event);
  }catch{/* No tracking must never block the user's link. */}
}
export function TorstenTrackedLink({href,placement,kind,children,className,external=false}:{href:string;placement:Placement;kind:Kind;children:ReactNode;className:string;external?:boolean}){
  const onClick=(_e:MouseEvent<HTMLAnchorElement>)=>record(kind,placement);
  return <a href={href} className={className} onClick={onClick} target={external?"_blank":undefined} rel={external?"noopener noreferrer":undefined}>{children}</a>;
}
