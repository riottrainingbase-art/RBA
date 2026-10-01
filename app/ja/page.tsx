import type { Metadata } from "next";
import { LocalizedHome } from "@/components/localized-home";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: { absolute: "RBA｜育成年代のバスケットボールに、地域を越えた学びと機会を" },
  description: "選手・保護者・指導者が、今いるチームを大切にしながら、所属や地域を越えて学び、育成機会を選べるバスケットボール・プラットフォームです。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/", languages: { "en": "https://riotbasketballacademy.com/", "ja": "https://riotbasketballacademy.com/ja/", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/", "ko": "https://riotbasketballacademy.com/ko/", "x-default": "https://riotbasketballacademy.com/" } },
  openGraph: {
    title: "RBA｜子どもの未来から育成を考える",
    description: "全国の育成活動、指導者の学び、MY HOME COURT、日本とアジアの交流を一つの場所から。",
    url: "https://riotbasketballacademy.com/ja/",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA｜子どもの未来から育成を考える", description: "今いるチームを大切にしながら、所属や地域を越えて次の育成機会へ。", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <LocalizedHome locale="ja" />;
}
