import type { Metadata } from "next";
import { DevelopmentCampPage } from "@/components/development-camp-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "RBA Development Camp | 育成を深めるキャンプ",
  description: "RBA Development Campは、技術・判断・身体づくり・ゲーム・振り返りをつなぐ育成プログラムです。RBA UNITEDとは別のプログラムです。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/camp", languages: { "en": "https://riotbasketballacademy.com/camp", "ja": "https://riotbasketballacademy.com/ja/camp", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/camp", "ko": "https://riotbasketballacademy.com/ko/camp", "x-default": "https://riotbasketballacademy.com/camp" } },
  openGraph: {
    title: "RBA Development Camp | 育成を深めるキャンプ",
    description: "RBA Development Campは、技術・判断・身体づくり・ゲーム・振り返りをつなぐ育成プログラムです。RBA UNITEDとは別のプログラムです。",
    url: "https://riotbasketballacademy.com/ja/camp",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA Development Camp | 育成を深めるキャンプ", description: "RBA Development Campは、技術・判断・身体づくり・ゲーム・振り返りをつなぐ育成プログラムです。RBA UNITEDとは別のプログラムです。", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DevelopmentCampPage locale="ja" />;
}
