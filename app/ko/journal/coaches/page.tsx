import type {Metadata} from "next";
import {PublicCoachJournalHub} from "@/components/public-journal";

export const metadata:Metadata={
  title:{absolute:"코치 JOURNAL｜근거에서 훈련 설계까지 | RBA"},
  description:"연구, FIBA/WABC 자료와 RBA 현장 해석을 구분하고 훈련 설계·관찰·리뷰까지 연결하는 코치 전용 JOURNAL.",
  alternates:{
    canonical:"https://riotbasketballacademy.com/ko/journal/coaches",
    languages:{
      en:"https://riotbasketballacademy.com/journal/coaches",
      ja:"https://riotbasketballacademy.com/ja/journal/coaches",
      "zh-Hant-TW":"https://riotbasketballacademy.com/zh-tw/journal/coaches",
      ko:"https://riotbasketballacademy.com/ko/journal/coaches",
      "x-default":"https://riotbasketballacademy.com/journal/coaches"
    }
  },
  openGraph:{
    title:"코치 JOURNAL｜근거에서 훈련 설계까지 | RBA",
    description:"연구, FIBA/WABC 자료와 RBA 현장 해석을 구분하고 훈련 설계·관찰·리뷰까지 연결하는 코치 전용 JOURNAL.",
    url:"https://riotbasketballacademy.com/ko/journal/coaches",
    siteName:"Riot Basketball Academy",
    type:"website",
    images:["https://riotbasketballacademy.com/rba-court-hero.png"]
  },
  twitter:{card:"summary_large_image",title:"코치 JOURNAL｜근거에서 훈련 설계까지 | RBA",description:"연구, FIBA/WABC 자료와 RBA 현장 해석을 구분하고 훈련 설계·관찰·리뷰까지 연결하는 코치 전용 JOURNAL.",images:["https://riotbasketballacademy.com/rba-court-hero.png"]}
};

export default function Page(){return <PublicCoachJournalHub locale="ko"/>;}
