import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "Riot Basketball Academy | Youth Basketball Development Platform",
  description: "Riot Basketball Academy는 선수, 보호자, 코치, 팀, 지역과 해외 파트너를 연결하고 성장 기회, 세이프가딩, 성장 기록, 국제 교류를 하나로 잇는 유소년 농구 육성 플랫폼입니다.",
  alternates: { canonical: "https://riotbasketballacademy.com/ko/", languages: { "en": "https://riotbasketballacademy.com/", "ja": "https://riotbasketballacademy.com/ja/", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/", "ko": "https://riotbasketballacademy.com/ko/", "x-default": "https://riotbasketballacademy.com/" } },
  openGraph: {
    title: "Riot Basketball Academy | Youth Basketball Development Platform",
    description: "Riot Basketball Academy는 선수, 보호자, 코치, 팀, 지역과 해외 파트너를 연결하고 성장 기회, 세이프가딩, 성장 기록, 국제 교류를 하나로 잇는 유소년 농구 육성 플랫폼입니다.",
    url: "https://riotbasketballacademy.com/ko/",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "Riot Basketball Academy | Youth Basketball Development Platform", description: "Riot Basketball Academy는 선수, 보호자, 코치, 팀, 지역과 해외 파트너를 연결하고 성장 기회, 세이프가딩, 성장 기록, 국제 교류를 하나로 잇는 유소년 농구 육성 플랫폼입니다.", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="index" locale="ko" />;
}
