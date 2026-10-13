import type { Metadata } from "next";
import { RbaSimpleHome } from "@/components/rba-simple-home";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: { absolute: "Riot Basketball Academy | Clinics, Learning & Exchange" },
  description: "RBA is a youth basketball development organisation based in Sendai, Japan. Explore clinics, camps, coach learning and Japan–Asia exchanges.",
  alternates: { canonical: "https://riotbasketballacademy.com/", languages: { "en": "https://riotbasketballacademy.com/", "ja": "https://riotbasketballacademy.com/ja/", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/", "ko": "https://riotbasketballacademy.com/ko/", "x-default": "https://riotbasketballacademy.com/" } },
  openGraph: {
    title: "Riot Basketball Academy | Clinics, Learning & Exchange",
    description: "RBA is a youth basketball development organisation based in Sendai, Japan. Explore clinics, camps, coach learning and Japan–Asia exchanges.",
    url: "https://riotbasketballacademy.com/",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "Riot Basketball Academy | Clinics, Learning & Exchange", description: "RBA is a youth basketball development organisation based in Sendai, Japan. Explore clinics, camps, coach learning and Japan–Asia exchanges.", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <RbaSimpleHome locale="en" />;
}
