import type {Metadata} from "next";
import {PublicCoachJournalHub} from "@/components/public-journal";

export const metadata:Metadata={
  title:{absolute:"Coach Journal | Evidence to Practice | RBA"},
  description:"A coach-focused Journal connecting evidence, FIBA/WABC guidance, practice design, observation and review.",
  alternates:{
    canonical:"https://riotbasketballacademy.com/journal/coaches",
    languages:{
      en:"https://riotbasketballacademy.com/journal/coaches",
      ja:"https://riotbasketballacademy.com/ja/journal/coaches",
      "zh-Hant-TW":"https://riotbasketballacademy.com/zh-tw/journal/coaches",
      ko:"https://riotbasketballacademy.com/ko/journal/coaches",
      "x-default":"https://riotbasketballacademy.com/journal/coaches"
    }
  },
  openGraph:{
    title:"Coach Journal | Evidence to Practice | RBA",
    description:"A coach-focused Journal connecting evidence, FIBA/WABC guidance, practice design, observation and review.",
    url:"https://riotbasketballacademy.com/journal/coaches",
    siteName:"Riot Basketball Academy",
    type:"website",
    images:["https://riotbasketballacademy.com/rba-court-hero.png"]
  },
  twitter:{card:"summary_large_image",title:"Coach Journal | Evidence to Practice | RBA",description:"A coach-focused Journal connecting evidence, FIBA/WABC guidance, practice design, observation and review.",images:["https://riotbasketballacademy.com/rba-court-hero.png"]}
};

export default function Page(){return <PublicCoachJournalHub locale="en"/>;}
