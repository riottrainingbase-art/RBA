import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "RBA NETWORK｜地域から日本・アジアへ",
  description: "地域のチームや指導者との活動、国内外の交流、これからの計画を分けて紹介します。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/network", languages: { "en": "https://riotbasketballacademy.com/network", "ja": "https://riotbasketballacademy.com/ja/network", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/network", "ko": "https://riotbasketballacademy.com/ko/network", "x-default": "https://riotbasketballacademy.com/network" } },
  openGraph: {
    title: "RBA NETWORK｜地域から日本・アジアへ",
    description: "地域のチームや指導者との活動、国内外の交流、これからの計画を分けて紹介します。",
    url: "https://riotbasketballacademy.com/ja/network",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA NETWORK｜地域から日本・アジアへ", description: "地域のチームや指導者との活動、国内外の交流、これからの計画を分けて紹介します。", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="network" locale="ja" />;
}
