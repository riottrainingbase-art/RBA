import type { Metadata } from "next";
import { DevelopmentCampPage } from "@/components/development-camp-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "RBA Development Camp | 籃球培育營",
  description: "RBA Development Camp以訓練、比賽、身體準備與反思深化球員成長，與RBA UNITED為不同方案。",
  alternates: { canonical: "https://riotbasketballacademy.com/zh-tw/camp", languages: { "en": "https://riotbasketballacademy.com/camp", "ja": "https://riotbasketballacademy.com/ja/camp", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/camp", "ko": "https://riotbasketballacademy.com/ko/camp", "x-default": "https://riotbasketballacademy.com/camp" } },
  openGraph: {
    title: "RBA Development Camp | 籃球培育營",
    description: "RBA Development Camp以訓練、比賽、身體準備與反思深化球員成長，與RBA UNITED為不同方案。",
    url: "https://riotbasketballacademy.com/zh-tw/camp",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA Development Camp | 籃球培育營", description: "RBA Development Camp以訓練、比賽、身體準備與反思深化球員成長，與RBA UNITED為不同方案。", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DevelopmentCampPage locale="zh-tw" />;
}
