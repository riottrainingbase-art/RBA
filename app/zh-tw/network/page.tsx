import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "RBA NETWORK｜Local to Asia",
  description: "RBA 連結地方、日本國內與亞洲的 Network 構想，並清楚區分目前活動基礎與未來規劃。",
  alternates: { canonical: "https://riotbasketballacademy.com/zh-tw/network", languages: { "en": "https://riotbasketballacademy.com/network", "ja": "https://riotbasketballacademy.com/ja/network", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/network", "ko": "https://riotbasketballacademy.com/ko/network", "x-default": "https://riotbasketballacademy.com/network" } },
  openGraph: {
    title: "RBA NETWORK｜Local to Asia",
    description: "RBA 連結地方、日本國內與亞洲的 Network 構想，並清楚區分目前活動基礎與未來規劃。",
    url: "https://riotbasketballacademy.com/zh-tw/network",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA NETWORK｜Local to Asia", description: "RBA 連結地方、日本國內與亞洲的 Network 構想，並清楚區分目前活動基礎與未來規劃。", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="network" locale="zh-tw" />;
}
