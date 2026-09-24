import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: { absolute: "Riot Basketball Academy | Youth Basketball Development Platform" },
  description: "Riot Basketball Academy connects players, families, coaches, teams, communities and international partners through a youth basketball development platform built around opportunity, safeguarding, measurable development and meaningful exchange.",
  alternates: { canonical: "https://riotbasketballacademy.com/", languages: { "en": "https://riotbasketballacademy.com/", "ja": "https://riotbasketballacademy.com/ja/", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/", "ko": "https://riotbasketballacademy.com/ko/", "x-default": "https://riotbasketballacademy.com/" } },
  openGraph: {
    title: "Riot Basketball Academy | Youth Basketball Development Platform",
    description: "Riot Basketball Academy connects players, families, coaches, teams, communities and international partners through a youth basketball development platform built around opportunity, safeguarding, measurable development and meaningful exchange.",
    url: "https://riotbasketballacademy.com/",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "Riot Basketball Academy | Youth Basketball Development Platform", description: "Riot Basketball Academy connects players, families, coaches, teams, communities and international partners through a youth basketball development platform built around opportunity, safeguarding, measurable development and meaningful exchange.", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="index" locale="en" />;
}
