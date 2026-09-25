import type { Metadata } from "next";
import { PublicCoachJournalHub } from "@/components/public-journal";

export const metadata:Metadata={
  title:"指導者向けRBA JOURNAL | 根拠と実践をつなぐコーチング",
  description:"研究・FIBA/WABC・RBAの現場解釈を分けて読み、COACH APPLICATIONで練習設計までつなぐ指導者向けJOURNAL。",
  alternates:{canonical:"https://riotbasketballacademy.com/ja/journal/coaches"},
  openGraph:{
    title:"指導者向けRBA JOURNAL | 根拠と実践をつなぐ",
    description:"READ → PLAN → COACH → REVIEW。根拠を確認し、練習で試し、次の修正までつなぐ指導者向けJOURNAL。",
    url:"https://riotbasketballacademy.com/ja/journal/coaches",
    siteName:"Riot Basketball Academy",
    locale:"ja_JP",
    type:"website",
    images:["https://riotbasketballacademy.com/rba-court-hero.png"]
  }
};

export default function Page(){return <PublicCoachJournalHub locale="ja"/>}
