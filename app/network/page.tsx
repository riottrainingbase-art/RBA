import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "RBA NETWORK | Local to Asia",
  description: "RBA’s network concept connecting local communities, Japan and Asia, with current activity clearly separated from future plans.",
  alternates: { canonical: "https://riotbasketballacademy.com/network", languages: { "en": "https://riotbasketballacademy.com/network", "ja": "https://riotbasketballacademy.com/ja/network", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/network", "ko": "https://riotbasketballacademy.com/ko/network", "x-default": "https://riotbasketballacademy.com/network" } },
  openGraph: {
    title: "RBA NETWORK | Local to Asia",
    description: "RBA’s network concept connecting local communities, Japan and Asia, with current activity clearly separated from future plans.",
    url: "https://riotbasketballacademy.com/network",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA NETWORK | Local to Asia", description: "RBA’s network concept connecting local communities, Japan and Asia, with current activity clearly separated from future plans.", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="network" locale="en" />;
}
