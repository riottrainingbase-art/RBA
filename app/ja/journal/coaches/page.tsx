import type {Metadata} from "next";
import {PublicCoachJournalHub} from "@/components/public-journal";

export const metadata:Metadata={
  title:{absolute:"指導者JOURNAL｜根拠から練習設計へ | RBA"},
  description:"研究・FIBA/WABC資料・RBAの現場解釈を分けて読み、COACH APPLICATIONで練習設計・観察・振り返りまでつなぐ指導者専用JOURNAL。",
  alternates:{
    canonical:"https://riotbasketballacademy.com/ja/journal/coaches",
    languages:{
      en:"https://riotbasketballacademy.com/journal/coaches",
      ja:"https://riotbasketballacademy.com/ja/journal/coaches",
      "zh-Hant-TW":"https://riotbasketballacademy.com/zh-tw/journal/coaches",
      ko:"https://riotbasketballacademy.com/ko/journal/coaches",
      "x-default":"https://riotbasketballacademy.com/journal/coaches"
    }
  },
  openGraph:{title:"指導者JOURNAL｜根拠から練習設計へ | RBA",description:"研究・FIBA/WABC資料・RBAの現場解釈を分けて読み、COACH APPLICATIONで練習設計・観察・振り返りまでつなぐ指導者専用JOURNAL。",url:"https://riotbasketballacademy.com/ja/journal/coaches",siteName:"Riot Basketball Academy",locale:"ja_JP",type:"website",images:["https://riotbasketballacademy.com/rba-court-hero.png"]},
  twitter:{card:"summary_large_image",title:"指導者JOURNAL｜根拠から練習設計へ | RBA",description:"READ → PLAN → COACH → REVIEW。根拠を確認し、練習で試し、次の修正までつなぐ指導者向けJOURNAL。",images:["https://riotbasketballacademy.com/rba-court-hero.png"]}
};

export default function Page(){return <PublicCoachJournalHub locale="ja"/>;}
