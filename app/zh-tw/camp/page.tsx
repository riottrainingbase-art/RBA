import type { Metadata } from "next";
import { DevelopmentCampPage } from "@/components/development-camp-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "RBA CAMP | Development Experience",
  description: "RBA CAMP 是把技術、判斷、身體、比賽與對話串在一起的實地育成方案。",
  alternates: { canonical: "https://riotbasketballacademy.com/zh-tw/camp", languages: { "en": "https://riotbasketballacademy.com/camp", "ja": "https://riotbasketballacademy.com/ja/camp", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/camp", "ko": "https://riotbasketballacademy.com/ko/camp", "x-default": "https://riotbasketballacademy.com/camp" } },
  openGraph: {
    title: "RBA CAMP | Development Experience",
    description: "RBA CAMP 是把技術、判斷、身體、比賽與對話串在一起的實地育成方案。",
    url: "https://riotbasketballacademy.com/zh-tw/camp",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA CAMP | Development Experience", description: "RBA CAMP 是把技術、判斷、身體、比賽與對話串在一起的實地育成方案。", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DevelopmentCampPage locale="zh-tw" />;
}
