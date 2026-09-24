import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "RBA POLICIES | Safety, Trust & Transparency",
  description: "RBA public operating principles covering safety, pricing transparency, data, travel scope and performance claims.",
  alternates: { canonical: "https://riotbasketballacademy.com/policies", languages: { "en": "https://riotbasketballacademy.com/policies", "ja": "https://riotbasketballacademy.com/ja/policies", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/policies", "ko": "https://riotbasketballacademy.com/ko/policies", "x-default": "https://riotbasketballacademy.com/policies" } },
  openGraph: {
    title: "RBA POLICIES | Safety, Trust & Transparency",
    description: "RBA public operating principles covering safety, pricing transparency, data, travel scope and performance claims.",
    url: "https://riotbasketballacademy.com/policies",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA POLICIES | Safety, Trust & Transparency", description: "RBA public operating principles covering safety, pricing transparency, data, travel scope and performance claims.", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="policies" locale="en" />;
}
