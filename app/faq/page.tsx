import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "RBA FAQ | Frequently Asked Questions",
  description: "Frequently asked questions about RBA, MY HOME COURT, teams, organisers and international exchange.",
  alternates: { canonical: "https://riotbasketballacademy.com/faq", languages: { "en": "https://riotbasketballacademy.com/faq", "ja": "https://riotbasketballacademy.com/ja/faq", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/faq", "ko": "https://riotbasketballacademy.com/ko/faq", "x-default": "https://riotbasketballacademy.com/faq" } },
  openGraph: {
    title: "RBA FAQ | Frequently Asked Questions",
    description: "Frequently asked questions about RBA, MY HOME COURT, teams, organisers and international exchange.",
    url: "https://riotbasketballacademy.com/faq",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA FAQ | Frequently Asked Questions", description: "Frequently asked questions about RBA, MY HOME COURT, teams, organisers and international exchange.", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="faq" locale="en" />;
}
