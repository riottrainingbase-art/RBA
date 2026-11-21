import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "RBA DEVELOPMENT PARTNERS | 企業・地域パートナー",
  description: "RBAの企業協賛・広告掲載のご案内。仙台の地域クラブ、全国企業広告、育成ツアー、国際交流の支援方法と無料の相談窓口をご紹介します。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/sponsor", languages: { "en": "https://riotbasketballacademy.com/sponsor", "ja": "https://riotbasketballacademy.com/ja/sponsor", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/sponsor", "ko": "https://riotbasketballacademy.com/ko/sponsor", "x-default": "https://riotbasketballacademy.com/sponsor" } },
  openGraph: {
    title: "RBA DEVELOPMENT PARTNERS | 企業・地域パートナー",
    description: "RBAの企業協賛・広告掲載のご案内。仙台の地域クラブ、全国企業広告、育成ツアー、国際交流の支援方法と無料の相談窓口をご紹介します。",
    url: "https://riotbasketballacademy.com/ja/sponsor",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA DEVELOPMENT PARTNERS | 企業・地域パートナー", description: "RBAの企業協賛・広告掲載のご案内。仙台の地域クラブ、全国企業広告、育成ツアー、国際交流の支援方法と無料の相談窓口をご紹介します。", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="sponsor" locale="ja" />;
}
