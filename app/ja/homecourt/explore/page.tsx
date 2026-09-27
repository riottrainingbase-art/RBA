import type { Metadata } from "next";
import { HomecourtExplore } from "@/components/homecourt-explore";
import { SiteFrame } from "@/components/site-frame";

export const metadata:Metadata={
  title:"HOMECOURT EXPLORE | 育成環境を探す | RBA",
  description:"勝率や口コミ順位ではなく、確認できた活動条件から育成年代のバスケットボール環境を探し、次の経験につなげるHOMECOURT。",
  alternates:{canonical:"/ja/homecourt/explore"}
};

export default function Page(){
  return <SiteFrame locale="ja" languagePage="homecourt/explore"><HomecourtExplore/></SiteFrame>;
}
