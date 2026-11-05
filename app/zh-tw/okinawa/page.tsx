import type { Metadata } from "next";
import { OkinawaLocalizedInfo } from "@/components/okinawa-localized-info";

export const metadata: Metadata = {
  title: { absolute: "GREAM OKINAWA 沖繩青少年籃球｜家長、教練與在地合作｜RBA" },
  description: "GREAM OKINAWA 官方資訊：現有家長聯絡、未來參與諮詢、教練及體能協作、場地合作。常態課程仍待場地、教練及安全條件確認。",
  alternates: { canonical: "https://riotbasketballacademy.com/zh-tw/okinawa", languages: {"ja":"https://riotbasketballacademy.com/ja/okinawa","en":"https://riotbasketballacademy.com/okinawa","zh-Hant-TW":"https://riotbasketballacademy.com/zh-tw/okinawa","ko":"https://riotbasketballacademy.com/ko/okinawa"} },
  robots: { index: true, follow: true },
  openGraph: {
    title: "GREAM OKINAWA｜讓沖繩的孩子持續在球場上學習",
    description: "GREAM OKINAWA 官方資訊：現有家長聯絡、未來參與諮詢、教練及體能協作、場地合作。常態課程仍待場地、教練及安全條件確認。",
    url: "https://riotbasketballacademy.com/zh-tw/okinawa",
    locale: "zh_TW",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
};

export default function OkinawaInformationPage() {
  return <OkinawaLocalizedInfo locale="zh-tw" />;
}
