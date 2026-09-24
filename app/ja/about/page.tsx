import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "ABOUT RBA | Mission & Vision",
  description: "Riot Basketball AcademyのPurpose、Mission、Vision、育成原則とYouth Basketball Development Platform構想。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/about", languages: { "en": "https://riotbasketballacademy.com/about", "ja": "https://riotbasketballacademy.com/ja/about", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/about", "ko": "https://riotbasketballacademy.com/ko/about", "x-default": "https://riotbasketballacademy.com/about" } },
  openGraph: {
    title: "ABOUT RBA | Mission & Vision",
    description: "Riot Basketball AcademyのPurpose、Mission、Vision、育成原則とYouth Basketball Development Platform構想。",
    url: "https://riotbasketballacademy.com/ja/about",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "ABOUT RBA | Mission & Vision", description: "Riot Basketball AcademyのPurpose、Mission、Vision、育成原則とYouth Basketball Development Platform構想。", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="about" locale="ja" />;
}
