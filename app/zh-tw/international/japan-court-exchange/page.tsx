import type { Metadata } from "next";
import { JapanCourtExchange } from "@/components/japan-court-exchange";

export const metadata: Metadata = {
  title: "RBA JAPAN COURT EXCHANGE｜赴日青少年籃球培育交流",
  description: "赴日青少年球隊的籃球指導與交流企劃，提供日圓參考價格與個別書面報價；住宿交通等旅遊服務另行安排。",
  alternates: { canonical: "https://riotbasketballacademy.com/zh-tw/international/japan-court-exchange", languages: {"en":"https://riotbasketballacademy.com/international/japan-court-exchange","ja":"https://riotbasketballacademy.com/ja/international/japan-court-exchange","zh-Hant-TW":"https://riotbasketballacademy.com/zh-tw/international/japan-court-exchange","ko":"https://riotbasketballacademy.com/ko/international/japan-court-exchange","x-default":"https://riotbasketballacademy.com/international/japan-court-exchange"} },
  openGraph: { title: "RBA JAPAN COURT EXCHANGE｜赴日青少年籃球培育交流", description: "赴日青少年球隊的籃球指導與交流企劃，提供日圓參考價格與個別書面報價；住宿交通等旅遊服務另行安排。", url: "https://riotbasketballacademy.com/zh-tw/international/japan-court-exchange", siteName: "Riot Basketball Academy", type: "website", images: [{ url: "/rba-definitive/assets/og-platform.png" }] },
};

export default function Page() {
  return <JapanCourtExchange locale="zh-tw" />;
}
