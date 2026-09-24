import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "RBA VERIFIED | Safety & Development Standard",
  description: "RBA Verified 以 Safety、主辦方確認、價格透明、取消條件與育成品質為標準，幫助家庭安心選擇優質機會。",
  alternates: { canonical: "https://riotbasketballacademy.com/zh-tw/verified", languages: { "en": "https://riotbasketballacademy.com/verified", "ja": "https://riotbasketballacademy.com/ja/verified", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/verified", "ko": "https://riotbasketballacademy.com/ko/verified", "x-default": "https://riotbasketballacademy.com/verified" } },
  openGraph: {
    title: "RBA VERIFIED | Safety & Development Standard",
    description: "RBA Verified 以 Safety、主辦方確認、價格透明、取消條件與育成品質為標準，幫助家庭安心選擇優質機會。",
    url: "https://riotbasketballacademy.com/zh-tw/verified",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA VERIFIED | Safety & Development Standard", description: "RBA Verified 以 Safety、主辦方確認、價格透明、取消條件與育成品質為標準，幫助家庭安心選擇優質機會。", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="verified" locale="zh-tw" />;
}
