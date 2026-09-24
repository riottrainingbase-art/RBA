import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "RBA VERIFIED | Safety & Development Standard",
  description: "RBA Verified. 좋은 성장 기회를 안심하고 선택할 수 있도록 Safety, 주최자 확인, 가격 투명성, 취소 조건, 성장 품질을 기준화합니다.",
  alternates: { canonical: "https://riotbasketballacademy.com/ko/verified", languages: { "en": "https://riotbasketballacademy.com/verified", "ja": "https://riotbasketballacademy.com/ja/verified", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/verified", "ko": "https://riotbasketballacademy.com/ko/verified", "x-default": "https://riotbasketballacademy.com/verified" } },
  openGraph: {
    title: "RBA VERIFIED | Safety & Development Standard",
    description: "RBA Verified. 좋은 성장 기회를 안심하고 선택할 수 있도록 Safety, 주최자 확인, 가격 투명성, 취소 조건, 성장 품질을 기준화합니다.",
    url: "https://riotbasketballacademy.com/ko/verified",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA VERIFIED | Safety & Development Standard", description: "RBA Verified. 좋은 성장 기회를 안심하고 선택할 수 있도록 Safety, 주최자 확인, 가격 투명성, 취소 조건, 성장 품질을 기준화합니다.", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="verified" locale="ko" />;
}
