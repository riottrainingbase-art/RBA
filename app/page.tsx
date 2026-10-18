import type { Metadata } from "next";
import { RbaSimpleHome } from "@/components/rba-simple-home";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: { absolute: "RBA｜Growing opportunities, from local courts to the world." },
  description: "RBA is a basketball development organisation creating opportunities for young people to grow and take on new challenges. We connect player coaching, games, physical preparation, coach education and international exchange, opening learning opportunities beyond a player’s home team or region.",
  alternates: { canonical: "https://riotbasketballacademy.com/", languages: { "en": "https://riotbasketballacademy.com/", "ja": "https://riotbasketballacademy.com/ja/", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/", "ko": "https://riotbasketballacademy.com/ko/", "x-default": "https://riotbasketballacademy.com/" } },
  openGraph: {
    title: "RBA｜Growing opportunities, from local courts to the world.",
    description: "RBA is a basketball development organisation creating opportunities for young people to grow and take on new challenges. We connect player coaching, games, physical preparation, coach education and international exchange, opening learning opportunities beyond a player’s home team or region.",
    url: "https://riotbasketballacademy.com/",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA｜Growing opportunities, from local courts to the world.", description: "RBA is a basketball development organisation creating opportunities for young people to grow and take on new challenges. We connect player coaching, games, physical preparation, coach education and international exchange, opening learning opportunities beyond a player’s home team or region.", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <RbaSimpleHome locale="en" />;
}
