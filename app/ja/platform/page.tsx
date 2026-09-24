import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "RBA PLATFORM VISION | Riot Basketball Academy",
  description: "RBAが目指すYouth Basketball Development Platformの構造。RBA Owned、Regional Host、Marketplace、Japan × Asiaへ。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/platform", languages: { "en": "https://riotbasketballacademy.com/platform", "ja": "https://riotbasketballacademy.com/ja/platform", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/platform", "ko": "https://riotbasketballacademy.com/ko/platform", "x-default": "https://riotbasketballacademy.com/platform" } },
  openGraph: {
    title: "RBA PLATFORM VISION | Riot Basketball Academy",
    description: "RBAが目指すYouth Basketball Development Platformの構造。RBA Owned、Regional Host、Marketplace、Japan × Asiaへ。",
    url: "https://riotbasketballacademy.com/ja/platform",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA PLATFORM VISION | Riot Basketball Academy", description: "RBAが目指すYouth Basketball Development Platformの構造。RBA Owned、Regional Host、Marketplace、Japan × Asiaへ。", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="platform" locale="ja" />;
}
