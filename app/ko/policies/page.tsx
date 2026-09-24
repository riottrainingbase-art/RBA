import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "RBA POLICIES | Safety, Trust & Transparency",
  description: "RBA가 공개하는 Safety, 가격 투명성, 데이터, 여행 범위, 실적 표현 등의 운영 원칙.",
  alternates: { canonical: "https://riotbasketballacademy.com/ko/policies", languages: { "en": "https://riotbasketballacademy.com/policies", "ja": "https://riotbasketballacademy.com/ja/policies", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/policies", "ko": "https://riotbasketballacademy.com/ko/policies", "x-default": "https://riotbasketballacademy.com/policies" } },
  openGraph: {
    title: "RBA POLICIES | Safety, Trust & Transparency",
    description: "RBA가 공개하는 Safety, 가격 투명성, 데이터, 여행 범위, 실적 표현 등의 운영 원칙.",
    url: "https://riotbasketballacademy.com/ko/policies",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA POLICIES | Safety, Trust & Transparency", description: "RBA가 공개하는 Safety, 가격 투명성, 데이터, 여행 범위, 실적 표현 등의 운영 원칙.", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="policies" locale="ko" />;
}
