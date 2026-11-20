import type { Metadata } from "next";
import { FounderAboutPage } from "@/components/founder-profile";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "西尾優人｜NSCA-CPT｜RBA創辦人與青少年籃球培育",
  description: "認識Riot Basketball Academy創辦人西尾優人。擁有NSCA-CPT資格、東北選拔與日本國民體育大會參賽經驗，曾在德國參與體能訓練指導，致力於青少年長期發展、教練教育及國際交流。",
  alternates: { canonical: "https://riotbasketballacademy.com/zh-tw/about", languages: { "en": "https://riotbasketballacademy.com/about", "ja": "https://riotbasketballacademy.com/ja/about", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/about", "ko": "https://riotbasketballacademy.com/ko/about", "x-default": "https://riotbasketballacademy.com/about" } },
  openGraph: {
    title: "西尾優人｜NSCA-CPT｜RBA創辦人與青少年籃球培育",
    description: "認識Riot Basketball Academy創辦人西尾優人。擁有NSCA-CPT資格、東北選拔與日本國民體育大會參賽經驗，曾在德國參與體能訓練指導，致力於青少年長期發展、教練教育及國際交流。",
    url: "https://riotbasketballacademy.com/zh-tw/about",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "西尾優人｜NSCA-CPT｜RBA創辦人與青少年籃球培育", description: "認識Riot Basketball Academy創辦人西尾優人。擁有NSCA-CPT資格、東北選拔與日本國民體育大會參賽經驗，曾在德國參與體能訓練指導，致力於青少年長期發展、教練教育及國際交流。", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <FounderAboutPage locale="zh-tw" />;
}
