import type { Metadata } from "next";
import { DevelopmentCampPage } from "@/components/development-camp-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "RBA CAMP | Development Experience",
  description: "RBA CAMP is an on-court development programme connecting skill, decision making, physical preparation, games and dialogue.",
  alternates: { canonical: "https://riotbasketballacademy.com/camp", languages: { "en": "https://riotbasketballacademy.com/camp", "ja": "https://riotbasketballacademy.com/ja/camp", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/camp", "ko": "https://riotbasketballacademy.com/ko/camp", "x-default": "https://riotbasketballacademy.com/camp" } },
  openGraph: {
    title: "RBA CAMP | Development Experience",
    description: "RBA CAMP is an on-court development programme connecting skill, decision making, physical preparation, games and dialogue.",
    url: "https://riotbasketballacademy.com/camp",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA CAMP | Development Experience", description: "RBA CAMP is an on-court development programme connecting skill, decision making, physical preparation, games and dialogue.", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DevelopmentCampPage locale="en" />;
}
