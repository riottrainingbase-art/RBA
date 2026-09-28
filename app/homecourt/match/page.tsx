import type { Metadata } from "next";
import { GlobalHomecourtMatch } from "@/components/homecourt-global-network";
import { SiteFrame } from "@/components/site-frame";
export const metadata:Metadata={title:"HOMECOURT MATCH | RBA",description:"Cross-border youth basketball friendlies, joint practices and development exchange, managed team-to-team.",alternates:{canonical:"/homecourt/match"}};
export default function Page(){return <SiteFrame locale="en" languagePage="homecourt/match"><GlobalHomecourtMatch locale="en"/></SiteFrame>;}
