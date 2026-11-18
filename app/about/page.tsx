import type { Metadata } from "next";
import { FounderAboutPage } from "@/components/founder-profile";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "Masato Nishio | NSCA-CPT | Founder of Riot Basketball Academy",
  description: "Meet Masato Nishio, RBA founder and NSCA-CPT with basketball experience in Japan and strength and conditioning coaching experience in Germany. Explore his youth development principles and the work behind RBA.",
  alternates: { canonical: "https://riotbasketballacademy.com/about", languages: { "en": "https://riotbasketballacademy.com/about", "ja": "https://riotbasketballacademy.com/ja/about", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/about", "ko": "https://riotbasketballacademy.com/ko/about", "x-default": "https://riotbasketballacademy.com/about" } },
  openGraph: {
    title: "Masato Nishio | NSCA-CPT | Founder of Riot Basketball Academy",
    description: "Meet Masato Nishio, RBA founder and NSCA-CPT with basketball experience in Japan and strength and conditioning coaching experience in Germany. Explore his youth development principles and the work behind RBA.",
    url: "https://riotbasketballacademy.com/about",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "Masato Nishio | NSCA-CPT | Founder of Riot Basketball Academy", description: "Meet Masato Nishio, RBA founder and NSCA-CPT with basketball experience in Japan and strength and conditioning coaching experience in Germany. Explore his youth development principles and the work behind RBA.", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <FounderAboutPage locale="en" />;
}
