import type { Metadata } from "next";
import { BackboneOfficial } from "@/components/backbone-official";

export const metadata: Metadata = {
  title: "BACKBONE｜クリニックと3x3で学ぶ｜RBA",
  description: "RBAの育成プログラムBACKBONE。クリニックで学び、3x3で試す。千葉などの開催情報と地域開催の相談窓口をご案内します。",
  keywords: ["BACKBONE 3x3", "RBA", "地域チャプター", "3x3育成", "オーガナイザー", "Riot Basketball Academy"],
  alternates: { canonical: "https://riotbasketballacademy.com/backbone" },
  openGraph: {
    title: "BACKBONE 3×3 | Riot Basketball Academy",
    description: "クリニックで学び、3x3で試す。RBAの育成プログラムBACKBONE。",
    url: "https://riotbasketballacademy.com/backbone",
    type: "website",
    siteName: "Riot Basketball Academy",
  },
};

export default function BackbonePage() {
  return <BackboneOfficial />;
}
