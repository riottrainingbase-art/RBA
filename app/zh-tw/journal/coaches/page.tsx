import type {Metadata} from "next";
import {PublicCoachJournalHub} from "@/components/public-journal";

export const metadata:Metadata={
  title:{absolute:"教練 JOURNAL｜從證據到訓練設計 | RBA"},
  description:"把研究、FIBA/WABC指南與RBA現場解讀分開閱讀，並連結到訓練設計、觀察與回顧。",
  alternates:{
    canonical:"https://riotbasketballacademy.com/zh-tw/journal/coaches",
    languages:{
      en:"https://riotbasketballacademy.com/journal/coaches",
      ja:"https://riotbasketballacademy.com/ja/journal/coaches",
      "zh-Hant-TW":"https://riotbasketballacademy.com/zh-tw/journal/coaches",
      ko:"https://riotbasketballacademy.com/ko/journal/coaches",
      "x-default":"https://riotbasketballacademy.com/journal/coaches"
    }
  },
  openGraph:{
    title:"教練 JOURNAL｜從證據到訓練設計 | RBA",
    description:"把研究、FIBA/WABC指南與RBA現場解讀分開閱讀，並連結到訓練設計、觀察與回顧。",
    url:"https://riotbasketballacademy.com/zh-tw/journal/coaches",
    siteName:"Riot Basketball Academy",
    type:"website",
    images:["https://riotbasketballacademy.com/rba-court-hero.png"]
  },
  twitter:{card:"summary_large_image",title:"教練 JOURNAL｜從證據到訓練設計 | RBA",description:"把研究、FIBA/WABC指南與RBA現場解讀分開閱讀，並連結到訓練設計、觀察與回顧。",images:["https://riotbasketballacademy.com/rba-court-hero.png"]}
};

export default function Page(){return <PublicCoachJournalHub locale="zh-tw"/>;}
