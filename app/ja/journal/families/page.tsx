import type {Metadata} from "next";
import {PublicFamilyJournalHub} from "@/components/public-journal";

export const dynamic="force-dynamic";
export const revalidate=0;

export const metadata:Metadata={
  title:"保護者向けRBA JOURNAL｜チーム選び・出場時間・移籍・練習量",
  description:"育成年代の保護者向けJOURNAL。チーム選び、出場時間、役割、自信、移籍、U15進路、練習量、怪我、試合後の関わり方を、研究・公式資料とRBAの現場解釈を分けて整理します。",
  alternates:{canonical:"https://riotbasketballacademy.com/ja/journal/families"},
  openGraph:{
    title:"保護者向けRBA JOURNAL｜子どものチームや活動を一緒に考える",
    description:"正解を押しつけず、本人の経験・環境・負荷・相談できる余地を分けて考える保護者向けJOURNAL。",
    url:"https://riotbasketballacademy.com/ja/journal/families",
    siteName:"Riot Basketball Academy",
    locale:"ja_JP",
    type:"website",
    images:["https://riotbasketballacademy.com/rba-court-hero.png"]
  },
  twitter:{
    card:"summary_large_image",
    title:"保護者向けRBA JOURNAL｜子どものチームや活動を一緒に考える",
    description:"チーム選び、出場時間、役割、移籍、練習量、U15進路。感情だけで決めずに整理するための記事をまとめています。",
    images:["https://riotbasketballacademy.com/rba-court-hero.png"]
  }
};

export default function Page(){
  return <PublicFamilyJournalHub locale="ja"/>;
}
