import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "RBA ORGANIZER | 地域に育成機会をつくる",
  description: "RBA Organizer / Regional Host。既存の活動を残したまま、RBAの全国導線・申込・決済・運営基準と接続します。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/organizer", languages: { "en": "https://riotbasketballacademy.com/organizer", "ja": "https://riotbasketballacademy.com/ja/organizer", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/organizer", "ko": "https://riotbasketballacademy.com/ko/organizer", "x-default": "https://riotbasketballacademy.com/organizer" } },
  openGraph: {
    title: "RBA ORGANIZER | 地域に育成機会をつくる",
    description: "RBA Organizer / Regional Host。既存の活動を残したまま、RBAの全国導線・申込・決済・運営基準と接続します。",
    url: "https://riotbasketballacademy.com/ja/organizer",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA ORGANIZER | 地域に育成機会をつくる", description: "RBA Organizer / Regional Host。既存の活動を残したまま、RBAの全国導線・申込・決済・運営基準と接続します。", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="organizer" locale="ja" />;
}
