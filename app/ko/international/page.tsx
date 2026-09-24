import type { Metadata } from "next";
import { InternationalPlatform } from "@/components/international-platform";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "RBA INTERNATIONAL | Japan Basketball Exchange",
  description: "Japan × Asia. Friendly Game, Development Camp, Tournament, Coach Exchange를 통해 일본과 아시아를 연결합니다.",
  alternates: { canonical: "https://riotbasketballacademy.com/ko/international", languages: { "en": "https://riotbasketballacademy.com/international", "ja": "https://riotbasketballacademy.com/ja/international", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/international", "ko": "https://riotbasketballacademy.com/ko/international", "x-default": "https://riotbasketballacademy.com/international" } },
  openGraph: {
    title: "RBA INTERNATIONAL | Japan Basketball Exchange",
    description: "Japan × Asia. Friendly Game, Development Camp, Tournament, Coach Exchange를 통해 일본과 아시아를 연결합니다.",
    url: "https://riotbasketballacademy.com/ko/international",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA INTERNATIONAL | Japan Basketball Exchange", description: "Japan × Asia. Friendly Game, Development Camp, Tournament, Coach Exchange를 통해 일본과 아시아를 연결합니다.", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <InternationalPlatform locale="ko" />;
}
