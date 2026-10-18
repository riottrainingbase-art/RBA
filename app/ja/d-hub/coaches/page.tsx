import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  title: { absolute: "D-HUB COACH LAB｜RBA 指導者の継続学習" },
  description: "RBAの指導者向け継続学習プログラム。年間48回のテーマと現場実践をつなぎ、観察・練習設計・判断・S&C・安全を学びます。月額3,300円（税込）。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/d-hub/coaches" },
  openGraph: {
    title: "D-HUB COACH LAB｜指導者の継続学習",
    description: "RBAが届ける、指導者向けの年間48回の継続学習。現場で試し、振り返るためのCOACH LAB。",
    url: "https://riotbasketballacademy.com/ja/d-hub/coaches",
    siteName: "Riot Basketball Academy",
    locale: "ja_JP",
    type: "website",
    images: [{url:"https://riotbasketballacademy.com/rba-court-hero.png"}],
  },
  twitter: {
    card: "summary_large_image",
    title: "D-HUB COACH LAB｜指導者の継続学習",
    description: "練習で試し、振り返り、選手の育成環境を更新するRBAのCOACH LAB。",
    images: ["https://riotbasketballacademy.com/rba-court-hero.png"],
  },
};
export default function Page() { return <DefinitiveStaticPage page="d-hub-coaches" locale="ja" />; }
