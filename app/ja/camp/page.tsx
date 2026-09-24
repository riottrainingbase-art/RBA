import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "RBA CAMP | Development Experience",
  description: "RBA CAMPは、技術・判断・身体・試合・対話をつなぐ実地育成プログラムです。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/camp", languages: { "en": "https://riotbasketballacademy.com/camp", "ja": "https://riotbasketballacademy.com/ja/camp", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/camp", "ko": "https://riotbasketballacademy.com/ko/camp", "x-default": "https://riotbasketballacademy.com/camp" } },
  openGraph: {
    title: "RBA CAMP | Development Experience",
    description: "RBA CAMPは、技術・判断・身体・試合・対話をつなぐ実地育成プログラムです。",
    url: "https://riotbasketballacademy.com/ja/camp",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA CAMP | Development Experience", description: "RBA CAMPは、技術・判断・身体・試合・対話をつなぐ実地育成プログラムです。", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="camp" locale="ja" />;
}
