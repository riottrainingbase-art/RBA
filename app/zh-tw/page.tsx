import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "Riot Basketball Academy | Youth Basketball Development Platform",
  description: "Riot Basketball Academy以青少年籃球發展為核心，連結球員、家長、教練、球隊、地方與國際夥伴，整合發展機會、安全保障、成長紀錄與國際交流。",
  alternates: { canonical: "https://riotbasketballacademy.com/zh-tw/", languages: { "en": "https://riotbasketballacademy.com/", "ja": "https://riotbasketballacademy.com/ja/", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/", "ko": "https://riotbasketballacademy.com/ko/", "x-default": "https://riotbasketballacademy.com/" } },
  openGraph: {
    title: "Riot Basketball Academy | Youth Basketball Development Platform",
    description: "Riot Basketball Academy以青少年籃球發展為核心，連結球員、家長、教練、球隊、地方與國際夥伴，整合發展機會、安全保障、成長紀錄與國際交流。",
    url: "https://riotbasketballacademy.com/zh-tw/",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "Riot Basketball Academy | Youth Basketball Development Platform", description: "Riot Basketball Academy以青少年籃球發展為核心，連結球員、家長、教練、球隊、地方與國際夥伴，整合發展機會、安全保障、成長紀錄與國際交流。", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="index" locale="zh-tw" />;
}
