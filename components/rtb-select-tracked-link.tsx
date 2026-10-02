"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";

declare global {
  interface Window {
    va?: (...args: unknown[]) => void;
  }
}

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  eventName: string;
  eventLocation: string;
  children: ReactNode;
};

export function RtbSelectTrackedLink({eventName,eventLocation,children,onClick,...props}:Props){
  return <a
    {...props}
    onClick={(event)=>{
      window.va?.("event",{
        name:eventName,
        data:{location:eventLocation},
      });
      onClick?.(event);
    }}
  >{children}</a>;
}
