import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "ABOUT RBA | Mission & Vision",
  description: "Riot Basketball Academy’s purpose, mission, vision, development principles and Youth Basketball Development Platform concept.",
  alternates: { canonical: "https://riotbasketballacademy.com/about", languages: { "en": "https://riotbasketballacademy.com/about", "ja": "https://riotbasketballacademy.com/ja/about", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/about", "ko": "https://riotbasketballacademy.com/ko/about", "x-default": "https://riotbasketballacademy.com/about" } },
  openGraph: {
    title: "ABOUT RBA | Mission & Vision",
    description: "Riot Basketball Academy’s purpose, mission, vision, development principles and Youth Basketball Development Platform concept.",
    url: "https://riotbasketballacademy.com/about",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "ABOUT RBA | Mission & Vision", description: "Riot Basketball Academy’s purpose, mission, vision, development principles and Youth Basketball Development Platform concept.", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="about" locale="en" />;
}
