import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "RBA DEVELOPMENT PARTNERS｜企業與地方夥伴",
  description: "RBA Development Partner。不是購買廣告版位，而是與企業一起創造孩子的參加機會、地方活動與國際交流。",
  alternates: { canonical: "https://riotbasketballacademy.com/zh-tw/sponsor", languages: { "en": "https://riotbasketballacademy.com/sponsor", "ja": "https://riotbasketballacademy.com/ja/sponsor", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/sponsor", "ko": "https://riotbasketballacademy.com/ko/sponsor", "x-default": "https://riotbasketballacademy.com/sponsor" } },
  openGraph: {
    title: "RBA DEVELOPMENT PARTNERS｜企業與地方夥伴",
    description: "RBA Development Partner。不是購買廣告版位，而是與企業一起創造孩子的參加機會、地方活動與國際交流。",
    url: "https://riotbasketballacademy.com/zh-tw/sponsor",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA DEVELOPMENT PARTNERS｜企業與地方夥伴", description: "RBA Development Partner。不是購買廣告版位，而是與企業一起創造孩子的參加機會、地方活動與國際交流。", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="sponsor" locale="zh-tw" />;
}
