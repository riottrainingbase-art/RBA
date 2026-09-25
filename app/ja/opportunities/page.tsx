import type { Metadata } from "next";
import { OpportunityExplorer } from "@/components/opportunity-explorer";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "RBA OPPORTUNITIES | 次の育成機会を探す",
  description: "クリニック、キャンプ、大会、チーム向けプログラム、国内外の交流など、RBAの育成機会を目的別に探せます。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/opportunities", languages: { "en": "https://riotbasketballacademy.com/opportunities", "ja": "https://riotbasketballacademy.com/ja/opportunities", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/opportunities", "ko": "https://riotbasketballacademy.com/ko/opportunities", "x-default": "https://riotbasketballacademy.com/opportunities" } },
  openGraph: {
    title: "RBA OPPORTUNITIES | 次の育成機会を探す",
    description: "クリニック、キャンプ、大会、チーム向けプログラム、国内外の交流など、RBAの育成機会を目的別に探せます。",
    url: "https://riotbasketballacademy.com/ja/opportunities",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA OPPORTUNITIES | 次の育成機会を探す", description: "クリニック、キャンプ、大会、チーム向けプログラム、国内外の交流など、RBAの育成機会を目的別に探せます。", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <OpportunityExplorer locale="ja" />;
}
