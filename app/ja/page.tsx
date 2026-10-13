import type { Metadata } from "next";
import { RbaSimpleHome } from "@/components/rba-simple-home";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: { absolute: "RBA｜子どもたちに、もっとバスケットボールの経験を。" },
  description: "RBAは仙台を拠点に、全国のクリニック、キャンプ、指導者講習、国際交流を行うバスケットボール育成組織です。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/", languages: { "en": "https://riotbasketballacademy.com/", "ja": "https://riotbasketballacademy.com/ja/", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/", "ko": "https://riotbasketballacademy.com/ko/", "x-default": "https://riotbasketballacademy.com/" } },
  openGraph: {
    title: "RBA｜子どもたちに、もっとバスケットボールの経験を。",
    description: "クリニック、キャンプ、育成記事、チーム向け指導、国際交流。RBAの活動を目的別に探せます。",
    url: "https://riotbasketballacademy.com/ja/",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA｜子どもたちに、もっとバスケットボールの経験を。", description: "子どもたちのバスケットボールの経験と学びを広げるRBA。", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() { return <RbaSimpleHome locale="ja" />; }
