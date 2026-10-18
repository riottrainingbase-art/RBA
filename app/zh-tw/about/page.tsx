import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "RBA｜讓成長的機會，從地方走向世界。",
  description: "RBA透過籃球，為孩子創造成長與挑戰的機會。我們連結球員訓練、比賽、體能準備、教練教育及國際交流，提供超越原有球隊與所在地的學習經驗。",
  alternates: { canonical: "https://riotbasketballacademy.com/zh-tw/about", languages: { "en": "https://riotbasketballacademy.com/about", "ja": "https://riotbasketballacademy.com/ja/about", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/about", "ko": "https://riotbasketballacademy.com/ko/about", "x-default": "https://riotbasketballacademy.com/about" } },
  openGraph: {
    title: "RBA｜讓成長的機會，從地方走向世界。",
    description: "RBA透過籃球，為孩子創造成長與挑戰的機會。我們連結球員訓練、比賽、體能準備、教練教育及國際交流，提供超越原有球隊與所在地的學習經驗。",
    url: "https://riotbasketballacademy.com/zh-tw/about",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA｜讓成長的機會，從地方走向世界。", description: "RBA透過籃球，為孩子創造成長與挑戰的機會。我們連結球員訓練、比賽、體能準備、教練教育及國際交流，提供超越原有球隊與所在地的學習經驗。", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="about" locale="zh-tw" />;
}
