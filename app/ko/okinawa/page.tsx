import type { Metadata } from "next";
import { OkinawaLocalizedInfo } from "@/components/okinawa-localized-info";

export const metadata: Metadata = {
  title: { absolute: "GREAM OKINAWA | 오키나와 유소년 농구·보호자·코치 안내 | RBA" },
  description: "GREAM OKINAWA 공식 안내. 기존 회원, 향후 참가 희망 가정, 농구 지도자, 체육관과 지역 협력자를 위한 정보. 정기 활동은 조건 확인 후 안내합니다.",
  alternates: { canonical: "https://riotbasketballacademy.com/ko/okinawa", languages: {"ja":"https://riotbasketballacademy.com/ja/okinawa","en":"https://riotbasketballacademy.com/okinawa","zh-Hant-TW":"https://riotbasketballacademy.com/zh-tw/okinawa","ko":"https://riotbasketballacademy.com/ko/okinawa"} },
  robots: { index: true, follow: true },
  openGraph: {
    title: "GREAM OKINAWA | 배움이 이어지는 코트",
    description: "GREAM OKINAWA 공식 안내. 기존 회원, 향후 참가 희망 가정, 농구 지도자, 체육관과 지역 협력자를 위한 정보. 정기 활동은 조건 확인 후 안내합니다.",
    url: "https://riotbasketballacademy.com/ko/okinawa",
    locale: "ko_KR",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
};

export default function OkinawaInformationPage() {
  return <OkinawaLocalizedInfo locale="ko" />;
}
