import type { Metadata } from "next";
import { LocalizedHome } from "@/components/localized-home";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: { absolute: "RBA｜子どもの未来から育成を考えるバスケットボール・プラットフォーム" },
  description: "勝つことと育てることを同じにしない。クリニック、キャンプ、育成記事、指導者の学び、国内外の交流を通じて、子どもの長期的な成長を支える育成年代バスケットボール・プラットフォームです。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/", languages: { "en": "https://riotbasketballacademy.com/", "ja": "https://riotbasketballacademy.com/ja/", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/", "ko": "https://riotbasketballacademy.com/ko/", "x-default": "https://riotbasketballacademy.com/" } },
  openGraph: {
    title: "RBA｜子どもの未来から育成を考える",
    description: "勝つことと育てることを同じにしない。全国のクリニック・キャンプ、指導者の学び、MY HOME COURT、Japan × Asiaの交流を一つのサイトから確認できます。",
    url: "https://riotbasketballacademy.com/ja/",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA｜子どもの未来から育成を考える", description: "勝つことと育てることを同じにしない。所属チームを続けながら、全国・アジアの活動や学びに参加できます。", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <LocalizedHome locale="ja" />;
}
