import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "RBA REGIONAL HOST｜在地方創造育成機會",
  description: "RBA Regional Host 與地方 Coach、Team、場地合作，把符合 RBA Standard 的育成機會擴展到日本各地。",
  alternates: { canonical: "https://riotbasketballacademy.com/zh-tw/regional-host", languages: { "en": "https://riotbasketballacademy.com/regional-host", "ja": "https://riotbasketballacademy.com/ja/regional-host", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/regional-host", "ko": "https://riotbasketballacademy.com/ko/regional-host", "x-default": "https://riotbasketballacademy.com/regional-host" } },
  openGraph: {
    title: "RBA REGIONAL HOST｜在地方創造育成機會",
    description: "RBA Regional Host 與地方 Coach、Team、場地合作，把符合 RBA Standard 的育成機會擴展到日本各地。",
    url: "https://riotbasketballacademy.com/zh-tw/regional-host",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA REGIONAL HOST｜在地方創造育成機會", description: "RBA Regional Host 與地方 Coach、Team、場地合作，把符合 RBA Standard 的育成機會擴展到日本各地。", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="regional-host" locale="zh-tw" />;
}
