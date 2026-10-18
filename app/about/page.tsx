import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "RBA｜Growing opportunities, from local courts to the world.",
  description: "RBA is a basketball development organisation creating opportunities for young people to grow and take on new challenges. We connect player coaching, games, physical preparation, coach education and international exchange, opening learning opportunities beyond a player’s home team or region.",
  alternates: { canonical: "https://riotbasketballacademy.com/about", languages: { "en": "https://riotbasketballacademy.com/about", "ja": "https://riotbasketballacademy.com/ja/about", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/about", "ko": "https://riotbasketballacademy.com/ko/about", "x-default": "https://riotbasketballacademy.com/about" } },
  openGraph: {
    title: "RBA｜Growing opportunities, from local courts to the world.",
    description: "RBA is a basketball development organisation creating opportunities for young people to grow and take on new challenges. We connect player coaching, games, physical preparation, coach education and international exchange, opening learning opportunities beyond a player’s home team or region.",
    url: "https://riotbasketballacademy.com/about",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA｜Growing opportunities, from local courts to the world.", description: "RBA is a basketball development organisation creating opportunities for young people to grow and take on new challenges. We connect player coaching, games, physical preparation, coach education and international exchange, opening learning opportunities beyond a player’s home team or region.", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="about" locale="en" />;
}
