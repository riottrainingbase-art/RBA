import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "RBA DEVELOPMENT PARTNERS | 企業・地域パートナー",
  description: "RBA Development Partner。広告枠ではなく、子どもたちの参加機会、地域開催、国際交流を企業と一緒につくります。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/sponsor", languages: { "en": "https://riotbasketballacademy.com/sponsor", "ja": "https://riotbasketballacademy.com/ja/sponsor", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/sponsor", "ko": "https://riotbasketballacademy.com/ko/sponsor", "x-default": "https://riotbasketballacademy.com/sponsor" } },
  openGraph: {
    title: "RBA DEVELOPMENT PARTNERS | 企業・地域パートナー",
    description: "RBA Development Partner。広告枠ではなく、子どもたちの参加機会、地域開催、国際交流を企業と一緒につくります。",
    url: "https://riotbasketballacademy.com/ja/sponsor",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA DEVELOPMENT PARTNERS | 企業・地域パートナー", description: "RBA Development Partner。広告枠ではなく、子どもたちの参加機会、地域開催、国際交流を企業と一緒につくります。", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="sponsor" locale="ja" />;
}
