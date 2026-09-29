import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "RBAについて｜理念・活動・育成方針",
  description: "Riot Basketball Academyの理念、活動、育成方針、選手・指導者・地域・海外をつなぐ取り組みを紹介します。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/about", languages: { "en": "https://riotbasketballacademy.com/about", "ja": "https://riotbasketballacademy.com/ja/about", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/about", "ko": "https://riotbasketballacademy.com/ko/about", "x-default": "https://riotbasketballacademy.com/about" } },
  openGraph: {
    title: "RBAについて｜理念・活動・育成方針",
    description: "Riot Basketball Academyの理念、活動、育成方針、選手・指導者・地域・海外をつなぐ取り組みを紹介します。",
    url: "https://riotbasketballacademy.com/ja/about",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBAについて｜理念・活動・育成方針", description: "Riot Basketball Academyの理念、活動、育成方針、選手・指導者・地域・海外をつなぐ取り組みを紹介します。", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="about" locale="ja" />;
}
