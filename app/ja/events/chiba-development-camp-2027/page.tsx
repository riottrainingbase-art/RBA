import type { Metadata } from "next";
import { ChibaCamp2027 } from "@/components/chiba-camp-2027";
const url = "https://riotbasketballacademy.com/ja/events/chiba-development-camp-2027";
export const metadata: Metadata = {
  title: "千葉・神崎 育成キャンプ 2027｜3月27・28日｜RBA",
  description: "RBA千葉・神崎 育成キャンプ2027。3月27日・28日、U12/U15の男女・海外選手も歓迎。ゲームで生きる判断力を学ぶ2日間。2日間24,200円、1日14,300円（税込）。保護者の申込後、Stripeで前払い。",
  alternates: { canonical: url, languages: { ja:url, en:"https://riotbasketballacademy.com/events/chiba-development-camp-2027" } },
  openGraph: { title:"RBA CHIBA DEVELOPMENT CAMP 2027｜申込・決済受付", description:"2027年3月27〜28日／千葉県神崎町／U12・U15。海外選手歓迎。", url, locale:"ja_JP", type:"website", siteName:"Riot Basketball Academy", images:["/rba-logo-original.jpg"] }
};
export default function Page() { return <ChibaCamp2027 locale="ja" />; }
