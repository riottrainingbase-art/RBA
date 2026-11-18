import type { Metadata } from "next";
import { FounderAboutPage } from "@/components/founder-profile";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "니시오 마사토 | NSCA-CPT | RBA 설립자·유소년 농구 지도자",
  description: "Riot Basketball Academy 설립자 니시오 마사토의 지도 철학과 경력을 소개합니다. NSCA-CPT 자격, 도호쿠 선발·국민체육대회 선수 경험, 독일 S&C 지도 경험을 바탕으로 장기적인 선수 성장을 지원합니다.",
  alternates: { canonical: "https://riotbasketballacademy.com/ko/about", languages: { "en": "https://riotbasketballacademy.com/about", "ja": "https://riotbasketballacademy.com/ja/about", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/about", "ko": "https://riotbasketballacademy.com/ko/about", "x-default": "https://riotbasketballacademy.com/about" } },
  openGraph: {
    title: "니시오 마사토 | NSCA-CPT | RBA 설립자·유소년 농구 지도자",
    description: "Riot Basketball Academy 설립자 니시오 마사토의 지도 철학과 경력을 소개합니다. NSCA-CPT 자격, 도호쿠 선발·국민체육대회 선수 경험, 독일 S&C 지도 경험을 바탕으로 장기적인 선수 성장을 지원합니다.",
    url: "https://riotbasketballacademy.com/ko/about",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "니시오 마사토 | NSCA-CPT | RBA 설립자·유소년 농구 지도자", description: "Riot Basketball Academy 설립자 니시오 마사토의 지도 철학과 경력을 소개합니다. NSCA-CPT 자격, 도호쿠 선발·국민체육대회 선수 경험, 독일 S&C 지도 경험을 바탕으로 장기적인 선수 성장을 지원합니다.", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <FounderAboutPage locale="ko" />;
}
