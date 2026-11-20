import type { Metadata } from "next";
import { SimpleJapaneseHome } from "@/components/simple-japanese-home";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: { absolute: "RBA｜仙台・太白区のバスケットボール育成｜代表 西尾優人" },
  description: "Riot Basketball Academyは、仙台を拠点とする西尾優人（NSCA-CPT）が創設したバスケットボール育成活動。選手・保護者・指導者の学びを支え、スクール・クリニック・国際交流の機会を全国・アジアにつなぎます。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/", languages: { "en": "https://riotbasketballacademy.com/", "ja": "https://riotbasketballacademy.com/ja/", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/", "ko": "https://riotbasketballacademy.com/ko/", "x-default": "https://riotbasketballacademy.com/" } },
  openGraph: {
    title: "RBA｜西尾優人と考える育成年代のバスケットボール",
    description: "代表・西尾優人の経歴と育成理念、全国のクリニック、スクール、指導者教育、国際交流の公式案内です。",
    url: "https://riotbasketballacademy.com/ja/",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA｜西尾優人と考える育成年代のバスケットボール", description: "代表の経歴・育成理念、スクール、クリニック、指導者教育、国際交流をご案内します。", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <SimpleJapaneseHome />;
}
