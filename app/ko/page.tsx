import type { Metadata } from "next";
import { RbaSimpleHome } from "@/components/rba-simple-home";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: { absolute: "RBA｜유소년 농구 클리닉·코치 교육·일본 교류" },
  description: "RBA는 일본 센다이를 기반으로 유소년 농구 클리닉, 캠프, 지도자 교육과 일본·아시아 교류를 진행합니다.",
  alternates: { canonical: "https://riotbasketballacademy.com/ko/", languages: { "en": "https://riotbasketballacademy.com/", "ja": "https://riotbasketballacademy.com/ja/", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/", "ko": "https://riotbasketballacademy.com/ko/", "x-default": "https://riotbasketballacademy.com/" } },
  openGraph: {
    title: "RBA｜유소년 농구 클리닉·코치 교육·일본 교류",
    description: "RBA는 일본 센다이를 기반으로 유소년 농구 클리닉, 캠프, 지도자 교육과 일본·아시아 교류를 진행합니다.",
    url: "https://riotbasketballacademy.com/ko/",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA｜유소년 농구 클리닉·코치 교육·일본 교류", description: "RBA는 일본 센다이를 기반으로 유소년 농구 클리닉, 캠프, 지도자 교육과 일본·아시아 교류를 진행합니다.", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <RbaSimpleHome locale="ko" />;
}
