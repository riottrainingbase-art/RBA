import type { Metadata } from "next";
import { SimpleJapaneseHome } from "@/components/simple-japanese-home";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: { absolute: "RBA｜仙台・太白区から全国・アジアへ｜バスケットボール育成" },
  description: "仙台市太白区から全国・アジアへ。保護者・選手、指導者、地域・企業それぞれの入口から、スクール、クリニック、育成記事、協賛の案内へ進めます。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/", languages: { "en": "https://riotbasketballacademy.com/", "ja": "https://riotbasketballacademy.com/ja/", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/", "ko": "https://riotbasketballacademy.com/ko/", "x-default": "https://riotbasketballacademy.com/" } },
  openGraph: {
    title: "RBA｜子どもの未来から育成を考える",
    description: "保護者・指導者・地域の方へ。育成の記事からスクール・クリニック・連携まで、目的別の入口をご案内します。",
    url: "https://riotbasketballacademy.com/ja/",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA｜子どもの未来から育成を考える", description: "保護者・指導者・地域へ。必要な学びと活動へつながる公式案内。", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <SimpleJapaneseHome />;
}
