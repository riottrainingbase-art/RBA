import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: { absolute: 'D-HUB | Coach & Player Development | Riot Basketball Academy' },
  description: 'Ongoing coach and youth player development through learning, on-court application and reflection. Explore free practice examples before applying.',
  alternates: { canonical: 'https://riotbasketballacademy.com/d-hub', languages: { "en": "https://riotbasketballacademy.com/d-hub", "ja": "https://riotbasketballacademy.com/ja/d-hub", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/d-hub", "ko": "https://riotbasketballacademy.com/ko/d-hub", "x-default": "https://riotbasketballacademy.com/d-hub" } },
  openGraph: { title: 'D-HUB | Coach Development | Riot Basketball Academy', description: 'Ongoing coach and youth player development through learning, on-court application and reflection. Explore free practice examples before applying.', url: 'https://riotbasketballacademy.com/d-hub', siteName: "Riot Basketball Academy", type: "website", images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }] },
};

export default function Page() {
  return <DefinitiveStaticPage page="d-hub" locale="en" />;
}
