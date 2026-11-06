import type { Metadata } from "next";
import { SimpleJapaneseHome } from "@/components/simple-japanese-home";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: { absolute: "RBA｜仙台・太白区から全国・アジアへ｜バスケットボール育成" },
  description: "仙台市太白区を拠点に、GREAM仙台U15クラブ、全国のクリニック、指導者教育、アジア交流を展開。地域の企業・お店と子どもの成長を支えるRBAです。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/", languages: { "en": "https://riotbasketballacademy.com/", "ja": "https://riotbasketballacademy.com/ja/", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/", "ko": "https://riotbasketballacademy.com/ko/", "x-default": "https://riotbasketballacademy.com/" } },
  openGraph: {
    title: "RBA｜子どもの未来から育成を考える",
    description: "勝つことと育てることを同じにしない。全国の活動、指導者の学び、MY HOME COURT、Japan × Asiaの交流を一つの場所から。",
    url: "https://riotbasketballacademy.com/ja/",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA｜子どもの未来から育成を考える", description: "勝つことと育てることを同じにしない。所属や地域を越えて、次の育成機会へ。", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <SimpleJapaneseHome />;
}
