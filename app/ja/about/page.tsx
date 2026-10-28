import type { Metadata } from "next";
import { FounderAboutPage } from "@/components/founder-profile";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "西尾優人｜創設者・ミッション・ビジョン",
  description: "Riot Basketball AcademyのPurpose、Mission、育成方針と、日本・アジアで取り組む活動を紹介します。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/about", languages: { "en": "https://riotbasketballacademy.com/about", "ja": "https://riotbasketballacademy.com/ja/about", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/about", "ko": "https://riotbasketballacademy.com/ko/about", "x-default": "https://riotbasketballacademy.com/about" } },
  openGraph: {
    title: "西尾優人｜創設者・ミッション・ビジョン",
    description: "Riot Basketball AcademyのPurpose、Mission、育成方針と、日本・アジアで取り組む活動を紹介します。",
    url: "https://riotbasketballacademy.com/ja/about",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "西尾優人｜創設者・ミッション・ビジョン", description: "Riot Basketball AcademyのPurpose、Mission、育成方針と、日本・アジアで取り組む活動を紹介します。", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <FounderAboutPage locale="ja" />;
}
