import type { Metadata } from "next";
import { SimpleJapaneseHome } from "@/components/simple-japanese-home";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: { absolute: "RBA｜子どもの可能性を、所属先で決めない。" },
  description: "勝敗だけでなく、選手が見る・判断する・試す経験を育む。仙台を拠点に、全国のクリニック、指導者教育、アジア交流へ。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/", languages: { "en": "https://riotbasketballacademy.com/", "ja": "https://riotbasketballacademy.com/ja/", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/", "ko": "https://riotbasketballacademy.com/ko/", "x-default": "https://riotbasketballacademy.com/" } },
  openGraph: {
    title: "RBA｜子どもの可能性を、所属先で決めない。",
    description: "選手を中心に、学びの場を広げる。クリニック、指導者教育、スクール、アジア交流をつなぐRBAの公式サイト。",
    url: "https://riotbasketballacademy.com/ja/",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA｜子どもの可能性を、所属先で決めない。", description: "勝敗だけでは測れない、選手の経験と成長を。仙台から全国、そしてアジアへ。", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <SimpleJapaneseHome />;
}
