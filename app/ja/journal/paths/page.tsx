import type {Metadata} from "next";
import {PublicJournalLearningPathsHub} from "@/components/journal-learning-paths";

export const dynamic="force-dynamic";
export const revalidate=0;

export const metadata:Metadata={
  title:{absolute:"RBA JOURNAL｜テーマ別の読む順番"},
  description:"250本を超えるRBA JOURNALを、選手・保護者・指導者・U12・U15・3x3・S&C・女子選手・海外・チーム選びの10テーマに分けて順番に読めます。",
  alternates:{canonical:"https://riotbasketballacademy.com/ja/journal/paths"},
  openGraph:{
    title:"RBA JOURNAL｜何から読めばいいか迷ったら",
    description:"全部読む必要はありません。いま必要なテーマから6本ずつ。",
    url:"https://riotbasketballacademy.com/ja/journal/paths",
    siteName:"Riot Basketball Academy",locale:"ja_JP",type:"website",
    images:["https://riotbasketballacademy.com/rba-court-hero.png"]
  }
};

export default function Page(){return <PublicJournalLearningPathsHub/>;}
