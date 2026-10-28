import type { Metadata } from "next";
import { FounderAboutPage } from "@/components/founder-profile";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "니시오 마사토｜설립자·미션·비전",
  description: "Riot Basketball Academy의 Purpose, Mission, Vision, 성장 원칙과 Youth Basketball Development Platform 구상.",
  alternates: { canonical: "https://riotbasketballacademy.com/ko/about", languages: { "en": "https://riotbasketballacademy.com/about", "ja": "https://riotbasketballacademy.com/ja/about", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/about", "ko": "https://riotbasketballacademy.com/ko/about", "x-default": "https://riotbasketballacademy.com/about" } },
  openGraph: {
    title: "니시오 마사토｜설립자·미션·비전",
    description: "Riot Basketball Academy의 Purpose, Mission, Vision, 성장 원칙과 Youth Basketball Development Platform 구상.",
    url: "https://riotbasketballacademy.com/ko/about",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "니시오 마사토｜설립자·미션·비전", description: "Riot Basketball Academy의 Purpose, Mission, Vision, 성장 원칙과 Youth Basketball Development Platform 구상.", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <FounderAboutPage locale="ko" />;
}
