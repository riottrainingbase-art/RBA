import type { Metadata } from "next";
import { JapanCourtExchange } from "@/components/japan-court-exchange";

export const metadata: Metadata = {
  title: "Japan Court Exchange | RBA Basketball Club Development in Japan",
  description: "RBA on-court coaching and youth basketball exchange in Japan. Indicative club fees JPY 165,000, 330,000 and 440,000. Travel services are separate.",
  alternates: { canonical: "https://riotbasketballacademy.com/international/japan-court-exchange", languages: {"en":"https://riotbasketballacademy.com/international/japan-court-exchange","ja":"https://riotbasketballacademy.com/ja/international/japan-court-exchange","zh-Hant-TW":"https://riotbasketballacademy.com/zh-tw/international/japan-court-exchange","ko":"https://riotbasketballacademy.com/ko/international/japan-court-exchange","x-default":"https://riotbasketballacademy.com/international/japan-court-exchange"} },
  openGraph: { title: "Japan Court Exchange | RBA Basketball Club Development in Japan", description: "RBA on-court coaching and youth basketball exchange in Japan. Indicative club fees JPY 165,000, 330,000 and 440,000. Travel services are separate.", url: "https://riotbasketballacademy.com/international/japan-court-exchange", siteName: "Riot Basketball Academy", type: "website", images: [{ url: "/rba-definitive/assets/og-platform.png" }] },
};

export default function Page() {
  return <JapanCourtExchange locale="en" />;
}
