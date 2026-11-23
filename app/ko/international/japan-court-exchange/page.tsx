import type { Metadata } from "next";
import { JapanCourtExchange } from "@/components/japan-court-exchange";

export const metadata: Metadata = {
  title: "RBA JAPAN COURT EXCHANGE｜일본 유소년 농구 교류 서비스",
  description: "해외 클럽을 위한 일본 현장 농구 육성·교류 프로그램. 1~3일 스포츠 서비스 참고 가격, 여행 비용 별도.",
  alternates: { canonical: "https://riotbasketballacademy.com/ko/international/japan-court-exchange", languages: {"en":"https://riotbasketballacademy.com/international/japan-court-exchange","ja":"https://riotbasketballacademy.com/ja/international/japan-court-exchange","zh-Hant-TW":"https://riotbasketballacademy.com/zh-tw/international/japan-court-exchange","ko":"https://riotbasketballacademy.com/ko/international/japan-court-exchange","x-default":"https://riotbasketballacademy.com/international/japan-court-exchange"} },
  openGraph: { title: "RBA JAPAN COURT EXCHANGE｜일본 유소년 농구 교류 서비스", description: "해외 클럽을 위한 일본 현장 농구 육성·교류 프로그램. 1~3일 스포츠 서비스 참고 가격, 여행 비용 별도.", url: "https://riotbasketballacademy.com/ko/international/japan-court-exchange", siteName: "Riot Basketball Academy", type: "website", images: [{ url: "/rba-definitive/assets/og-platform.png" }] },
};

export default function Page() {
  return <JapanCourtExchange locale="ko" />;
}
