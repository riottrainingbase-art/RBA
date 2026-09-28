import type { Metadata } from "next";
import { GlobalHomecourtExplore } from "@/components/homecourt-global-network";
import { SiteFrame } from "@/components/site-frame";
export const metadata:Metadata={title:"HOMECOURT EXPLORE | RBA",description:"Find youth basketball development environments through verified facts, not paid rankings.",alternates:{canonical:"/homecourt/explore"}};
export default function Page(){return <SiteFrame locale="en" languagePage="homecourt/explore"><GlobalHomecourtExplore locale="en"/></SiteFrame>;}
