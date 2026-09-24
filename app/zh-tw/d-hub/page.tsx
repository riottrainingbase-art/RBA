import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: 'D-HUB | 教練培育 | Riot Basketball Academy',
  description: '每週30–45分鐘，全年48次。結合線上教練課程、場上實踐、觀察與反思。',
  alternates: { canonical: 'https://riotbasketballacademy.com/zh-tw/d-hub', languages: { "en": "https://riotbasketballacademy.com/d-hub", "ja": "https://riotbasketballacademy.com/ja/d-hub", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/d-hub", "ko": "https://riotbasketballacademy.com/ko/d-hub", "x-default": "https://riotbasketballacademy.com/d-hub" } },
  openGraph: { title: 'D-HUB | 教練培育 | Riot Basketball Academy', description: '每週30–45分鐘，全年48次。結合線上教練課程、場上實踐、觀察與反思。', url: 'https://riotbasketballacademy.com/zh-tw/d-hub', siteName: "Riot Basketball Academy", type: "website", images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }] },
};

export default function Page() {
  return <DefinitiveStaticPage page="d-hub" locale="zh-tw" />;
}
