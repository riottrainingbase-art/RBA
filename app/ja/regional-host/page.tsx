import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "RBA REGIONAL HOST | 地域に育成機会をつくる",
  description: "RBA Regional Host。地域のCoach・Team・会場と一緒に、RBA Standardの育成機会を全国へ広げます。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/regional-host", languages: { "en": "https://riotbasketballacademy.com/regional-host", "ja": "https://riotbasketballacademy.com/ja/regional-host", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/regional-host", "ko": "https://riotbasketballacademy.com/ko/regional-host", "x-default": "https://riotbasketballacademy.com/regional-host" } },
  openGraph: {
    title: "RBA REGIONAL HOST | 地域に育成機会をつくる",
    description: "RBA Regional Host。地域のCoach・Team・会場と一緒に、RBA Standardの育成機会を全国へ広げます。",
    url: "https://riotbasketballacademy.com/ja/regional-host",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA REGIONAL HOST | 地域に育成機会をつくる", description: "RBA Regional Host。地域のCoach・Team・会場と一緒に、RBA Standardの育成機会を全国へ広げます。", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="regional-host" locale="ja" />;
}
