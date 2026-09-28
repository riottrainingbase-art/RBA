import type { Metadata } from "next";
import { GlobalHomecourtMatch } from "@/components/homecourt-global-network";
import { SiteFrame } from "@/components/site-frame";
export const metadata:Metadata={title:"HOMECOURT MATCH | RBA",description:"以球隊對球隊方式連結跨國青少年籃球友誼賽、共同訓練與培育交流。",alternates:{canonical:"/zh-tw/homecourt/match"}};
export default function Page(){return <SiteFrame locale="zh-tw" languagePage="homecourt/match"><GlobalHomecourtMatch locale="zh-tw"/></SiteFrame>;}
