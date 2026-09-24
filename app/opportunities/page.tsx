import type { Metadata } from "next";
import { OpportunityExplorer } from "@/components/opportunity-explorer";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "RBA OPPORTUNITIES | Find Your Next Development Opportunity",
  description: "Browse RBA opportunities by purpose, including Clinics, Camps, Cups, Team Training and regional or international exchange.",
  alternates: { canonical: "https://riotbasketballacademy.com/opportunities", languages: { "en": "https://riotbasketballacademy.com/opportunities", "ja": "https://riotbasketballacademy.com/ja/opportunities", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/opportunities", "ko": "https://riotbasketballacademy.com/ko/opportunities", "x-default": "https://riotbasketballacademy.com/opportunities" } },
  openGraph: {
    title: "RBA OPPORTUNITIES | Find Your Next Development Opportunity",
    description: "Browse RBA opportunities by purpose, including Clinics, Camps, Cups, Team Training and regional or international exchange.",
    url: "https://riotbasketballacademy.com/opportunities",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA OPPORTUNITIES | Find Your Next Development Opportunity", description: "Browse RBA opportunities by purpose, including Clinics, Camps, Cups, Team Training and regional or international exchange.", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <OpportunityExplorer locale="en" />;
}
