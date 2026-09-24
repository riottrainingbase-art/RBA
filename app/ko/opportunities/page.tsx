import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "RBA OPPORTUNITIES | 다음 성장 기회 찾기",
  description: "Clinic, Camp, Cup, Team Training, 지역·해외 교류 등 RBA의 다음 성장 기회를 목적별로 찾는 입구입니다.",
  alternates: { canonical: "https://riotbasketballacademy.com/ko/opportunities", languages: { "en": "https://riotbasketballacademy.com/opportunities", "ja": "https://riotbasketballacademy.com/ja/opportunities", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/opportunities", "ko": "https://riotbasketballacademy.com/ko/opportunities", "x-default": "https://riotbasketballacademy.com/opportunities" } },
  openGraph: {
    title: "RBA OPPORTUNITIES | 다음 성장 기회 찾기",
    description: "Clinic, Camp, Cup, Team Training, 지역·해외 교류 등 RBA의 다음 성장 기회를 목적별로 찾는 입구입니다.",
    url: "https://riotbasketballacademy.com/ko/opportunities",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA OPPORTUNITIES | 다음 성장 기회 찾기", description: "Clinic, Camp, Cup, Team Training, 지역·해외 교류 등 RBA의 다음 성장 기회를 목적별로 찾는 입구입니다.", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="opportunities" locale="ko" />;
}
