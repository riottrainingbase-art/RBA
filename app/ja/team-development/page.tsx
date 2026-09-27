import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";
import { TeamDevelopmentLanding } from "@/components/team-development-landing";

export const metadata:Metadata={
  title:"RBA TEAM DEVELOPMENT｜チームクリニックを次の90日へ",
  description:"事前ヒアリング、RBAの現場観察、TEAM DEVELOPMENT REPORT、90日プラン、週次チェックイン、フォローアップまで。単発クリニックをチームの学習サイクルへ変えるRBAのTEAM DEVELOPMENT。",
  alternates:{canonical:"https://riotbasketballacademy.com/ja/team-development"},
  openGraph:{title:"RBA TEAM DEVELOPMENT｜一度のクリニックを、チームの90日に変える。",description:"RBAが見て、伝えて、その後90日間の練習までつなぐ。",url:"https://riotbasketballacademy.com/ja/team-development",siteName:"Riot Basketball Academy",locale:"ja_JP",type:"website",images:["/rba-court-hero.png"]}
};

export default function Page(){return <SiteFrame locale="ja"><TeamDevelopmentLanding/></SiteFrame>;}
