import type { Metadata } from "next";
import { LocalizedHome } from "@/components/localized-home";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: { absolute: "RBA｜今いるチームを大切に。学びは、地域の外へ。" },
  description: "所属を変えなくても、全国・アジアの学びと挑戦へ。RBAは、クリニック、キャンプ、指導者の学び、地域開催、国際交流をつなぐ育成年代バスケットボール・プラットフォームです。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/", languages: { "en": "https://riotbasketballacademy.com/", "ja": "https://riotbasketballacademy.com/ja/", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/", "ko": "https://riotbasketballacademy.com/ko/", "x-default": "https://riotbasketballacademy.com/" } },
  openGraph: {
    title: "RBA｜今いるチームを大切に。学びは、地域の外へ。",
    description: "所属を変えなくても、全国・アジアの学びと挑戦へ。現在募集中の活動、RBA ID、指導者の学び、Japan × Asiaの連携を一つのサイトから確認できます。",
    url: "https://riotbasketballacademy.com/ja/",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA｜今いるチームを大切に。学びは、地域の外へ。", description: "所属を変えなくても、全国・アジアの活動や学びに参加できる育成プラットフォーム。", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <LocalizedHome locale="ja" />;
}
