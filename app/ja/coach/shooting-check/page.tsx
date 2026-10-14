import type { Metadata } from "next";
import {SiteFrame} from "@/components/site-frame";
import {TorstenShootingCheckJa} from "@/components/torsten-shooting-check-ja";
import "./shooting-check.css";
export const metadata:Metadata={
  title:"シュート練習は試合につながっているか？｜指導者向け無料5問チェック｜RBA",
  description:"指導者のための無料2分チェック。技術・判断・練習設計・フィードバックを5問で振り返り、次の練習を見直すヒントを発見。個人情報入力不要。",
  alternates:{canonical:"/ja/coach/shooting-check"},
  openGraph:{title:"あなたのシュート練習は試合につながっているか？",description:"無料2分・5問の指導者向け練習振り返り。RBA COACH EDUCATION",url:"/ja/coach/shooting-check",type:"website",siteName:"Riot Basketball Academy"},
};
export default function Page(){return <SiteFrame locale="ja"><TorstenShootingCheckJa/></SiteFrame>;}
