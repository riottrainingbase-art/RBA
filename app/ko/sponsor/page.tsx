import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "RBA DEVELOPMENT PARTNERS | 기업·지역 파트너",
  description: "RBA Development Partner. 광고 지면이 아니라 아이들의 참가 기회, 지역 개최, 국제 교류를 기업과 함께 만듭니다.",
  alternates: { canonical: "https://riotbasketballacademy.com/ko/sponsor", languages: { "en": "https://riotbasketballacademy.com/sponsor", "ja": "https://riotbasketballacademy.com/ja/sponsor", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/sponsor", "ko": "https://riotbasketballacademy.com/ko/sponsor", "x-default": "https://riotbasketballacademy.com/sponsor" } },
  openGraph: {
    title: "RBA DEVELOPMENT PARTNERS | 기업·지역 파트너",
    description: "RBA Development Partner. 광고 지면이 아니라 아이들의 참가 기회, 지역 개최, 국제 교류를 기업과 함께 만듭니다.",
    url: "https://riotbasketballacademy.com/ko/sponsor",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA DEVELOPMENT PARTNERS | 기업·지역 파트너", description: "RBA Development Partner. 광고 지면이 아니라 아이들의 참가 기회, 지역 개최, 국제 교류를 기업과 함께 만듭니다.", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="sponsor" locale="ko" />;
}
