import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "RBA ORGANIZER | 지역에 성장 기회를 만들다",
  description: "RBA Organizer / Regional Host. 기존 활동을 유지하면서 RBA의 전국 연결, 신청, 결제, 운영 기준과 연결합니다.",
  alternates: { canonical: "https://riotbasketballacademy.com/ko/organizer", languages: { "en": "https://riotbasketballacademy.com/organizer", "ja": "https://riotbasketballacademy.com/ja/organizer", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/organizer", "ko": "https://riotbasketballacademy.com/ko/organizer", "x-default": "https://riotbasketballacademy.com/organizer" } },
  openGraph: {
    title: "RBA ORGANIZER | 지역에 성장 기회를 만들다",
    description: "RBA Organizer / Regional Host. 기존 활동을 유지하면서 RBA의 전국 연결, 신청, 결제, 운영 기준과 연결합니다.",
    url: "https://riotbasketballacademy.com/ko/organizer",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA ORGANIZER | 지역에 성장 기회를 만들다", description: "RBA Organizer / Regional Host. 기존 활동을 유지하면서 RBA의 전국 연결, 신청, 결제, 운영 기준과 연결합니다.", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="organizer" locale="ko" />;
}
