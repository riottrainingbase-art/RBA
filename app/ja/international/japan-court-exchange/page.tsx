import type { Metadata } from "next";
import { JapanCourtExchange } from "@/components/japan-court-exchange";

export const metadata: Metadata = {
  title: "RBA JAPAN COURT EXCHANGE｜海外クラブ向け日本育成交流",
  description: "海外U12等のクラブ向け、RBAの日本でのバスケットボール指導・育成交流サービス。1日・2日・3日プランを個別見積。旅行代金は別契約。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/international/japan-court-exchange", languages: {"en":"https://riotbasketballacademy.com/international/japan-court-exchange","ja":"https://riotbasketballacademy.com/ja/international/japan-court-exchange","zh-Hant-TW":"https://riotbasketballacademy.com/zh-tw/international/japan-court-exchange","ko":"https://riotbasketballacademy.com/ko/international/japan-court-exchange","x-default":"https://riotbasketballacademy.com/international/japan-court-exchange"} },
  openGraph: { title: "RBA JAPAN COURT EXCHANGE｜海外クラブ向け日本育成交流", description: "海外U12等のクラブ向け、RBAの日本でのバスケットボール指導・育成交流サービス。1日・2日・3日プランを個別見積。旅行代金は別契約。", url: "https://riotbasketballacademy.com/ja/international/japan-court-exchange", siteName: "Riot Basketball Academy", type: "website", images: [{ url: "/rba-definitive/assets/og-platform.png" }] },
};

export default function Page() {
  return <JapanCourtExchange locale="ja" />;
}
