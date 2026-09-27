import type { Metadata } from "next";
import { GlobalHomecourtExplore } from "@/components/homecourt-global-network";
import { SiteFrame } from "@/components/site-frame";
export const metadata:Metadata={title:"HOMECOURT EXPLORE | RBA",description:"以可確認的資訊尋找青少年籃球培育環境，不使用付費排名。",alternates:{canonical:"/zh-tw/homecourt/explore"}};
export default function Page(){return <SiteFrame locale="zh-tw" languagePage="homecourt/explore"><GlobalHomecourtExplore locale="zh-tw"/></SiteFrame>;}
