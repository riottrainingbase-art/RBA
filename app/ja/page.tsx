import type { Metadata } from "next";
import { SimpleJapaneseHome } from "@/components/simple-japanese-home";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: { absolute: "RBA｜今のチームのまま、世界へ。｜青少年バスケットボール育成" },
  description: "RBA UNITEDをはじめ、所属を越えた国内外の育成・交流機会を届けるRiot Basketball Academy。スクール、クリニック、指導者教育、MY HOME COURTを通じて子どもたちの次の一歩を支えます。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/", languages: { "en": "https://riotbasketballacademy.com/", "ja": "https://riotbasketballacademy.com/ja/", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/", "ko": "https://riotbasketballacademy.com/ko/", "x-default": "https://riotbasketballacademy.com/" } },
  openGraph: {
    title: "RBA｜今のチームのまま、世界へ。",
    description: "全国で出会い、世界へ挑戦する。所属を変えずに挑戦できるRBA UNITEDと、日常の育成をつなぐRBA公式サイト。",
    url: "https://riotbasketballacademy.com/ja/",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA｜今のチームのまま、世界へ。", description: "所属チームを大切にしながら、国内外の新しい育成機会へ。RBA UNITEDとMY HOME COURT。", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <SimpleJapaneseHome />;
}
