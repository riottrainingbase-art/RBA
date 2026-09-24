import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "RBA OPPORTUNITIES｜尋找下一個育成機會",
  description: "依目的尋找 RBA 的下一個育成機會，包括 Clinic、Camp、Cup、Team Training、地方與海外交流。",
  alternates: { canonical: "https://riotbasketballacademy.com/zh-tw/opportunities", languages: { "en": "https://riotbasketballacademy.com/opportunities", "ja": "https://riotbasketballacademy.com/ja/opportunities", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/opportunities", "ko": "https://riotbasketballacademy.com/ko/opportunities", "x-default": "https://riotbasketballacademy.com/opportunities" } },
  openGraph: {
    title: "RBA OPPORTUNITIES｜尋找下一個育成機會",
    description: "依目的尋找 RBA 的下一個育成機會，包括 Clinic、Camp、Cup、Team Training、地方與海外交流。",
    url: "https://riotbasketballacademy.com/zh-tw/opportunities",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA OPPORTUNITIES｜尋找下一個育成機會", description: "依目的尋找 RBA 的下一個育成機會，包括 Clinic、Camp、Cup、Team Training、地方與海外交流。", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="opportunities" locale="zh-tw" />;
}
