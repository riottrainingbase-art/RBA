import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "RBA VERIFIED | Safety & Development Standard",
  description: "RBA Verifiedでは、主催者、参加費、追加費用、キャンセル条件、安全面、対象年代など、参加前に確認したい項目を整理しています。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/verified", languages: { "en": "https://riotbasketballacademy.com/verified", "ja": "https://riotbasketballacademy.com/ja/verified", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/verified", "ko": "https://riotbasketballacademy.com/ko/verified", "x-default": "https://riotbasketballacademy.com/verified" } },
  openGraph: {
    title: "RBA VERIFIED | Safety & Development Standard",
    description: "RBA Verifiedでは、主催者、参加費、追加費用、キャンセル条件、安全面、対象年代など、参加前に確認したい項目を整理しています。",
    url: "https://riotbasketballacademy.com/ja/verified",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA VERIFIED | Safety & Development Standard", description: "RBA Verifiedでは、主催者、参加費、追加費用、キャンセル条件、安全面、対象年代など、参加前に確認したい項目を整理しています。", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="verified" locale="ja" />;
}
