import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "RBA INTERNATIONAL | Japan Basketball Exchange",
  description: "Japan × Asia. Connecting Japan and Asia through friendly games, development camps, tournaments and coach exchange.",
  alternates: { canonical: "https://riotbasketballacademy.com/international", languages: { "en": "https://riotbasketballacademy.com/international", "ja": "https://riotbasketballacademy.com/ja/international", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/international", "ko": "https://riotbasketballacademy.com/ko/international", "x-default": "https://riotbasketballacademy.com/international" } },
  openGraph: {
    title: "RBA INTERNATIONAL | Japan Basketball Exchange",
    description: "Japan × Asia. Connecting Japan and Asia through friendly games, development camps, tournaments and coach exchange.",
    url: "https://riotbasketballacademy.com/international",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA INTERNATIONAL | Japan Basketball Exchange", description: "Japan × Asia. Connecting Japan and Asia through friendly games, development camps, tournaments and coach exchange.", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="international" locale="en" />;
}
