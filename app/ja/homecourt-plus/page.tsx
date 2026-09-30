import type {Metadata} from "next";
import {HomecourtPlusPage} from "@/components/homecourt-plus-page";

export const metadata:Metadata={
  title:{absolute:"HOMECOURT PLUS｜RBA DEVELOPMENT LIBRARYと育成ツール"},
  description:"月額3,300円。RBA DEVELOPMENT LIBRARYの教科書・DEEP DIVE・実践ガイドと、週次テーマ、コンディション、SMART PREP、月次レビュー、成長レポートを使えるMY HOME COURTの有料プラン。",
  alternates:{canonical:"https://riotbasketballacademy.com/ja/homecourt-plus"},
  openGraph:{title:"HOMECOURT PLUS｜RBA",description:"育成年代バスケットボールの教科書・研究整理と、毎週使う育成ツールを一つに。",url:"https://riotbasketballacademy.com/ja/homecourt-plus",siteName:"Riot Basketball Academy",locale:"ja_JP",type:"website",images:["https://riotbasketballacademy.com/rba-court-hero.png"]}
};
export default function Page(){return <HomecourtPlusPage/>;}
