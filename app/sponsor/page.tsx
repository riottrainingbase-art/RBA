import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "RBA DEVELOPMENT PARTNERS | Corporate & Community Partners",
  description: "RBA Development Partners create participation opportunities, local programmes and international exchange with companies—not just advertising placements.",
  alternates: { canonical: "https://riotbasketballacademy.com/sponsor", languages: { "en": "https://riotbasketballacademy.com/sponsor", "ja": "https://riotbasketballacademy.com/ja/sponsor", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/sponsor", "ko": "https://riotbasketballacademy.com/ko/sponsor", "x-default": "https://riotbasketballacademy.com/sponsor" } },
  openGraph: {
    title: "RBA DEVELOPMENT PARTNERS | Corporate & Community Partners",
    description: "RBA Development Partners create participation opportunities, local programmes and international exchange with companies—not just advertising placements.",
    url: "https://riotbasketballacademy.com/sponsor",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA DEVELOPMENT PARTNERS | Corporate & Community Partners", description: "RBA Development Partners create participation opportunities, local programmes and international exchange with companies—not just advertising placements.", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="sponsor" locale="en" />;
}
