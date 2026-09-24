import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "RBA REGIONAL HOST | Create Local Development Opportunities",
  description: "RBA Regional Host expands RBA-standard development opportunities with local coaches, teams and venues across Japan.",
  alternates: { canonical: "https://riotbasketballacademy.com/regional-host", languages: { "en": "https://riotbasketballacademy.com/regional-host", "ja": "https://riotbasketballacademy.com/ja/regional-host", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/regional-host", "ko": "https://riotbasketballacademy.com/ko/regional-host", "x-default": "https://riotbasketballacademy.com/regional-host" } },
  openGraph: {
    title: "RBA REGIONAL HOST | Create Local Development Opportunities",
    description: "RBA Regional Host expands RBA-standard development opportunities with local coaches, teams and venues across Japan.",
    url: "https://riotbasketballacademy.com/regional-host",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA REGIONAL HOST | Create Local Development Opportunities", description: "RBA Regional Host expands RBA-standard development opportunities with local coaches, teams and venues across Japan.", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="regional-host" locale="en" />;
}
