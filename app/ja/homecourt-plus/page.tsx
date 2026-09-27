import type {Metadata} from "next";
import {HomecourtPlusPage} from "@/components/homecourt-plus-page";

export const metadata:Metadata={
  title:{absolute:"HOMECOURT PLUS｜学びを、その週のバスケで使う | RBA"},
  description:"月額3,300円。会員向け実践ガイド、週次テーマ、コンディション、SMART PREP、月次レビュー、成長レポートを使い、学ぶ・試す・振り返るを続けるMY HOME COURTの有料プラン。",
  alternates:{canonical:"https://riotbasketballacademy.com/ja/homecourt-plus"},
  openGraph:{title:"HOMECOURT PLUS｜RBA",description:"学んだことを、その週のバスケで使う。",url:"https://riotbasketballacademy.com/ja/homecourt-plus",siteName:"Riot Basketball Academy",locale:"ja_JP",type:"website",images:["https://riotbasketballacademy.com/rba-court-hero.png"]}
};
export default function Page(){return <HomecourtPlusPage/>;}
