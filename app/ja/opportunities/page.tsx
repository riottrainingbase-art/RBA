import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "RBA OPPORTUNITIES | 次の育成機会を探す",
  description: "Clinic、Camp、Cup、Team Training、地域・海外交流など、RBAの次の育成機会を目的別に探す入口です。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/opportunities", languages: { "en": "https://riotbasketballacademy.com/opportunities", "ja": "https://riotbasketballacademy.com/ja/opportunities", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/opportunities", "ko": "https://riotbasketballacademy.com/ko/opportunities", "x-default": "https://riotbasketballacademy.com/opportunities" } },
  openGraph: {
    title: "RBA OPPORTUNITIES | 次の育成機会を探す",
    description: "Clinic、Camp、Cup、Team Training、地域・海外交流など、RBAの次の育成機会を目的別に探す入口です。",
    url: "https://riotbasketballacademy.com/ja/opportunities",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA OPPORTUNITIES | 次の育成機会を探す", description: "Clinic、Camp、Cup、Team Training、地域・海外交流など、RBAの次の育成機会を目的別に探す入口です。", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="opportunities" locale="ja" />;
}
