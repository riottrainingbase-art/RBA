import type { Metadata } from "next";
import { OpportunityExplorer } from "@/components/opportunity-explorer";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "募集中のバスケットボール活動を探す｜RBA",
  description: "年代・地域・目的から、現在募集中のRBAクリニック、キャンプ、スクール、大会・遠征、指導者向けプログラムを探せます。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/opportunities", languages: { "en": "https://riotbasketballacademy.com/opportunities", "ja": "https://riotbasketballacademy.com/ja/opportunities", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/opportunities", "ko": "https://riotbasketballacademy.com/ko/opportunities", "x-default": "https://riotbasketballacademy.com/opportunities" } },
  openGraph: {
    title: "募集中のバスケットボール活動を探す｜RBA",
    description: "年代・地域・目的から、現在募集中のRBAクリニック、キャンプ、スクール、大会・遠征、指導者向けプログラムを探せます。",
    url: "https://riotbasketballacademy.com/ja/opportunities",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA OPPORTUNITIES | 次の育成機会を探す", description: "年代・地域・目的から、現在募集中のRBAクリニック、キャンプ、スクール、大会・遠征、指導者向けプログラムを探せます。", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <OpportunityExplorer locale="ja" authReady={process.env.RBA_AUTH_EMAIL_READY==="true"} />;
}
