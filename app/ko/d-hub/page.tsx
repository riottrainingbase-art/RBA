import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: 'D-HUB | 코치 육성 | Riot Basketball Academy',
  description: '매주 30–45분, 연간 48회. 온라인 코칭 레슨과 현장 적용, 관찰, 성찰을 연결합니다.',
  alternates: { canonical: 'https://riotbasketballacademy.com/ko/d-hub', languages: { "en": "https://riotbasketballacademy.com/d-hub", "ja": "https://riotbasketballacademy.com/ja/d-hub", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/d-hub", "ko": "https://riotbasketballacademy.com/ko/d-hub", "x-default": "https://riotbasketballacademy.com/d-hub" } },
  openGraph: { title: 'D-HUB | 코치 육성 | Riot Basketball Academy', description: '매주 30–45분, 연간 48회. 온라인 코칭 레슨과 현장 적용, 관찰, 성찰을 연결합니다.', url: 'https://riotbasketballacademy.com/ko/d-hub', siteName: "Riot Basketball Academy", type: "website", images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }] },
};

export default function Page() {
  return <DefinitiveStaticPage page="d-hub" locale="ko" />;
}
