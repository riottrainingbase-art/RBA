import type { Metadata } from "next";
import { FounderAboutPage } from "@/components/founder-profile";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "西尾優人｜創辦人・使命與願景",
  description: "Riot Basketball Academy 的 Purpose、Mission、Vision、育成原則與 Youth Basketball Development Platform 構想。",
  alternates: { canonical: "https://riotbasketballacademy.com/zh-tw/about", languages: { "en": "https://riotbasketballacademy.com/about", "ja": "https://riotbasketballacademy.com/ja/about", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/about", "ko": "https://riotbasketballacademy.com/ko/about", "x-default": "https://riotbasketballacademy.com/about" } },
  openGraph: {
    title: "西尾優人｜創辦人・使命與願景",
    description: "Riot Basketball Academy 的 Purpose、Mission、Vision、育成原則與 Youth Basketball Development Platform 構想。",
    url: "https://riotbasketballacademy.com/zh-tw/about",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "西尾優人｜創辦人・使命與願景", description: "Riot Basketball Academy 的 Purpose、Mission、Vision、育成原則與 Youth Basketball Development Platform 構想。", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <FounderAboutPage locale="zh-tw" />;
}
