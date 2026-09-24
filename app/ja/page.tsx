import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "Riot Basketball Academy | Youth Basketball Development Platform",
  description: "Riot Basketball Academyは、選手・保護者・コーチ・チーム・地域・海外をつなぎ、育成機会、安全、成長記録、国際交流を一つの環境に統合するYouth Basketball Development Platformです。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/", languages: { "en": "https://riotbasketballacademy.com/", "ja": "https://riotbasketballacademy.com/ja/", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/", "ko": "https://riotbasketballacademy.com/ko/", "x-default": "https://riotbasketballacademy.com/" } },
  openGraph: {
    title: "Riot Basketball Academy | Youth Basketball Development Platform",
    description: "Riot Basketball Academyは、選手・保護者・コーチ・チーム・地域・海外をつなぎ、育成機会、安全、成長記録、国際交流を一つの環境に統合するYouth Basketball Development Platformです。",
    url: "https://riotbasketballacademy.com/ja/",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "Riot Basketball Academy | Youth Basketball Development Platform", description: "Riot Basketball Academyは、選手・保護者・コーチ・チーム・地域・海外をつなぎ、育成機会、安全、成長記録、国際交流を一つの環境に統合するYouth Basketball Development Platformです。", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="index" locale="ja" />;
}
