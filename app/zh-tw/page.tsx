import type { Metadata } from "next";
import { RbaSimpleHome } from "@/components/rba-simple-home";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: { absolute: "RBA｜青少年籃球訓練、教練學習與日本交流" },
  description: "RBA以日本仙台為據點，舉辦青少年籃球訓練營、教練研習及日本與亞洲的球隊交流。",
  alternates: { canonical: "https://riotbasketballacademy.com/zh-tw/", languages: { "en": "https://riotbasketballacademy.com/", "ja": "https://riotbasketballacademy.com/ja/", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/", "ko": "https://riotbasketballacademy.com/ko/", "x-default": "https://riotbasketballacademy.com/" } },
  openGraph: {
    title: "RBA｜青少年籃球訓練、教練學習與日本交流",
    description: "RBA以日本仙台為據點，舉辦青少年籃球訓練營、教練研習及日本與亞洲的球隊交流。",
    url: "https://riotbasketballacademy.com/zh-tw/",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA｜青少年籃球訓練、教練學習與日本交流", description: "RBA以日本仙台為據點，舉辦青少年籃球訓練營、教練研習及日本與亞洲的球隊交流。", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <RbaSimpleHome locale="zh-tw" />;
}
