import type { Metadata } from "next";
import { InternationalPlatform } from "@/components/international-platform";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "RBA INTERNATIONAL｜日本とアジアをつなぐ育成交流",
  description: "交流試合、Development Camp、大会、指導者交流を通じて、日本とアジアの育成環境をつなぎます。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/international", languages: { "en": "https://riotbasketballacademy.com/international", "ja": "https://riotbasketballacademy.com/ja/international", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/international", "ko": "https://riotbasketballacademy.com/ko/international", "x-default": "https://riotbasketballacademy.com/international" } },
  openGraph: {
    title: "RBA INTERNATIONAL｜日本とアジアをつなぐ育成交流",
    description: "交流試合、Development Camp、大会、指導者交流を通じて、日本とアジアの育成環境をつなぎます。",
    url: "https://riotbasketballacademy.com/ja/international",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA INTERNATIONAL｜日本とアジアをつなぐ育成交流", description: "交流試合、Development Camp、大会、指導者交流を通じて、日本とアジアの育成環境をつなぎます。", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <InternationalPlatform locale="ja" />;
}
