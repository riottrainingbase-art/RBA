import type { Metadata } from "next";
import { DevelopmentCampPage } from "@/components/development-camp-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "RBA Development Camp | Train, Play, Reflect, Grow",
  description: "RBA Development Camp is a learning-focused basketball development programme connecting training, games, physical preparation and reflection. It is separate from RBA UNITED.",
  alternates: { canonical: "https://riotbasketballacademy.com/camp", languages: { "en": "https://riotbasketballacademy.com/camp", "ja": "https://riotbasketballacademy.com/ja/camp", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/camp", "ko": "https://riotbasketballacademy.com/ko/camp", "x-default": "https://riotbasketballacademy.com/camp" } },
  openGraph: {
    title: "RBA Development Camp | Train, Play, Reflect, Grow",
    description: "RBA Development Camp is a learning-focused basketball development programme connecting training, games, physical preparation and reflection. It is separate from RBA UNITED.",
    url: "https://riotbasketballacademy.com/camp",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA Development Camp | Train, Play, Reflect, Grow", description: "RBA Development Camp is a learning-focused basketball development programme connecting training, games, physical preparation and reflection. It is separate from RBA UNITED.", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DevelopmentCampPage locale="en" />;
}
