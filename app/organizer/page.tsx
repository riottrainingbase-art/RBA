import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "RBA ORGANIZER | Create Local Development Opportunities",
  description: "RBA Organizer / Regional Host connects existing local activity with RBA’s national reach, registration, payments and operating standards.",
  alternates: { canonical: "https://riotbasketballacademy.com/organizer", languages: { "en": "https://riotbasketballacademy.com/organizer", "ja": "https://riotbasketballacademy.com/ja/organizer", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/organizer", "ko": "https://riotbasketballacademy.com/ko/organizer", "x-default": "https://riotbasketballacademy.com/organizer" } },
  openGraph: {
    title: "RBA ORGANIZER | Create Local Development Opportunities",
    description: "RBA Organizer / Regional Host connects existing local activity with RBA’s national reach, registration, payments and operating standards.",
    url: "https://riotbasketballacademy.com/organizer",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA ORGANIZER | Create Local Development Opportunities", description: "RBA Organizer / Regional Host connects existing local activity with RBA’s national reach, registration, payments and operating standards.", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="organizer" locale="en" />;
}
