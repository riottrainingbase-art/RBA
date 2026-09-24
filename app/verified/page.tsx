import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "RBA VERIFIED | Safety & Development Standard",
  description: "RBA Verified sets standards for safety, organiser identity, pricing transparency, cancellation terms and development quality.",
  alternates: { canonical: "https://riotbasketballacademy.com/verified", languages: { "en": "https://riotbasketballacademy.com/verified", "ja": "https://riotbasketballacademy.com/ja/verified", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/verified", "ko": "https://riotbasketballacademy.com/ko/verified", "x-default": "https://riotbasketballacademy.com/verified" } },
  openGraph: {
    title: "RBA VERIFIED | Safety & Development Standard",
    description: "RBA Verified sets standards for safety, organiser identity, pricing transparency, cancellation terms and development quality.",
    url: "https://riotbasketballacademy.com/verified",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA VERIFIED | Safety & Development Standard", description: "RBA Verified sets standards for safety, organiser identity, pricing transparency, cancellation terms and development quality.", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="verified" locale="en" />;
}
