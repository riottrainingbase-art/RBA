import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "RBA｜성장의 기회를, 지역에서 세계로.",
  description: "RBA는 농구를 통해 아이들의 성장과 도전 기회를 만드는 육성 기관입니다. 선수 지도, 경기, 몸 준비, 지도자 교육과 국제 교류를 연결하여 소속 팀과 지역을 넘어 배울 기회를 제공합니다.",
  alternates: { canonical: "https://riotbasketballacademy.com/ko/about", languages: { "en": "https://riotbasketballacademy.com/about", "ja": "https://riotbasketballacademy.com/ja/about", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/about", "ko": "https://riotbasketballacademy.com/ko/about", "x-default": "https://riotbasketballacademy.com/about" } },
  openGraph: {
    title: "RBA｜성장의 기회를, 지역에서 세계로.",
    description: "RBA는 농구를 통해 아이들의 성장과 도전 기회를 만드는 육성 기관입니다. 선수 지도, 경기, 몸 준비, 지도자 교육과 국제 교류를 연결하여 소속 팀과 지역을 넘어 배울 기회를 제공합니다.",
    url: "https://riotbasketballacademy.com/ko/about",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA｜성장의 기회를, 지역에서 세계로.", description: "RBA는 농구를 통해 아이들의 성장과 도전 기회를 만드는 육성 기관입니다. 선수 지도, 경기, 몸 준비, 지도자 교육과 국제 교류를 연결하여 소속 팀과 지역을 넘어 배울 기회를 제공합니다.", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="about" locale="ko" />;
}
