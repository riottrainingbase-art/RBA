import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "RBA NETWORK | Local to Asia",
  description: "RBA의 지역·국내·아시아를 연결하는 Network 구상. 현재 활동 기반과 향후 구상을 구분해 공개합니다.",
  alternates: { canonical: "https://riotbasketballacademy.com/ko/network", languages: { "en": "https://riotbasketballacademy.com/network", "ja": "https://riotbasketballacademy.com/ja/network", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/network", "ko": "https://riotbasketballacademy.com/ko/network", "x-default": "https://riotbasketballacademy.com/network" } },
  openGraph: {
    title: "RBA NETWORK | Local to Asia",
    description: "RBA의 지역·국내·아시아를 연결하는 Network 구상. 현재 활동 기반과 향후 구상을 구분해 공개합니다.",
    url: "https://riotbasketballacademy.com/ko/network",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA NETWORK | Local to Asia", description: "RBA의 지역·국내·아시아를 연결하는 Network 구상. 현재 활동 기반과 향후 구상을 구분해 공개합니다.", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="network" locale="ko" />;
}
