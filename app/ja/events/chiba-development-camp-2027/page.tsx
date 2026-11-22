import type { Metadata } from "next";
import { ChibaCamp2027 } from "@/components/chiba-camp-2027";
const url = "https://chiba.riotbasketballacademy.com/ja/events/chiba-development-camp-2027";
export const metadata: Metadata = {
  title: "千葉・神崎（こうざき）育成キャンプ2027｜日程・参加費・申込｜RBA",
  description: "2027年3月27・28日、発酵の里・神崎町（こうざきまち）で行うRBA育成キャンプ。U12・U15の男女、他チームの選手も参加可能。2日間の時間割、参加費、保護者申込、Stripe決済をまとめて案内。",
  alternates: { canonical: url, languages: { ja:url, en:"https://chiba.riotbasketballacademy.com/events/chiba-development-camp-2027" } },
  openGraph: { title:"RBA千葉・神崎（こうざき）育成キャンプ2027｜申込・決済受付", description:"2027年3月27〜28日／千葉県神崎町／U12・U15。海外選手歓迎。", url, locale:"ja_JP", type:"website", siteName:"Riot Basketball Academy", images:["/rba-logo-original.jpg"] }
};
export default function Page() { return <ChibaCamp2027 locale="ja" />; }
