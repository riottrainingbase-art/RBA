"use client";

import type { ReactNode } from "react";

type Props={
 href:string;event:string;placement:string;children:ReactNode;className?:string;
 target?:string;rel?:string;
};
declare global{
 interface Window{va?: (...args:unknown[])=>void}
}
export function BackboneTrackedLink({href,event,placement,children,className,target,rel}:Props){
 function handleClick(){
  // Click-through only; this is NOT a completed registration or payment.
  try{window.va?.("event",{name:event,placement,programme:"BACKBONE",destination:href.split("?")[0]});}catch{}
 }
 return <a href={href} onClick={handleClick} className={className} target={target} rel={rel}>{children}</a>;
}
