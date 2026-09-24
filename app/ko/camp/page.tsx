import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "RBA CAMP | Development Experience",
  description: "RBA CAMP는 기술, 판단, 신체, 경기, 대화를 연결하는 현장 성장 프로그램입니다.",
  alternates: { canonical: "https://riotbasketballacademy.com/ko/camp", languages: { "en": "https://riotbasketballacademy.com/camp", "ja": "https://riotbasketballacademy.com/ja/camp", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/camp", "ko": "https://riotbasketballacademy.com/ko/camp", "x-default": "https://riotbasketballacademy.com/camp" } },
  openGraph: {
    title: "RBA CAMP | Development Experience",
    description: "RBA CAMP는 기술, 판단, 신체, 경기, 대화를 연결하는 현장 성장 프로그램입니다.",
    url: "https://riotbasketballacademy.com/ko/camp",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA CAMP | Development Experience", description: "RBA CAMP는 기술, 판단, 신체, 경기, 대화를 연결하는 현장 성장 프로그램입니다.", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="camp" locale="ko" />;
}
