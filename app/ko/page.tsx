import type { Metadata } from "next";
import { RbaSimpleHome } from "@/components/rba-simple-home";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: { absolute: "RBA｜성장의 기회를, 지역에서 세계로." },
  description: "RBA는 농구를 통해 아이들의 성장과 도전 기회를 만드는 육성 기관입니다. 선수 지도, 경기, 몸 준비, 지도자 교육과 국제 교류를 연결하여 소속 팀과 지역을 넘어 배울 기회를 제공합니다.",
  alternates: { canonical: "https://riotbasketballacademy.com/ko/", languages: { "en": "https://riotbasketballacademy.com/", "ja": "https://riotbasketballacademy.com/ja/", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/", "ko": "https://riotbasketballacademy.com/ko/", "x-default": "https://riotbasketballacademy.com/" } },
  openGraph: {
    title: "RBA｜성장의 기회를, 지역에서 세계로.",
    description: "RBA는 농구를 통해 아이들의 성장과 도전 기회를 만드는 육성 기관입니다. 선수 지도, 경기, 몸 준비, 지도자 교육과 국제 교류를 연결하여 소속 팀과 지역을 넘어 배울 기회를 제공합니다.",
    url: "https://riotbasketballacademy.com/ko/",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA｜성장의 기회를, 지역에서 세계로.", description: "RBA는 농구를 통해 아이들의 성장과 도전 기회를 만드는 육성 기관입니다. 선수 지도, 경기, 몸 준비, 지도자 교육과 국제 교류를 연결하여 소속 팀과 지역을 넘어 배울 기회를 제공합니다.", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <RbaSimpleHome locale="ko" />;
}


// Refresh time-sensitive programme highlights without waiting for another release.
export const revalidate = 3600;
