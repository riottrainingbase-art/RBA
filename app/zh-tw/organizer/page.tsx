import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "RBA ORGANIZER｜在地方創造育成機會",
  description: "RBA Organizer / Regional Host 在保留既有活動的同時，連接 RBA 的全國導線、報名、付款與營運標準。",
  alternates: { canonical: "https://riotbasketballacademy.com/zh-tw/organizer", languages: { "en": "https://riotbasketballacademy.com/organizer", "ja": "https://riotbasketballacademy.com/ja/organizer", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/organizer", "ko": "https://riotbasketballacademy.com/ko/organizer", "x-default": "https://riotbasketballacademy.com/organizer" } },
  openGraph: {
    title: "RBA ORGANIZER｜在地方創造育成機會",
    description: "RBA Organizer / Regional Host 在保留既有活動的同時，連接 RBA 的全國導線、報名、付款與營運標準。",
    url: "https://riotbasketballacademy.com/zh-tw/organizer",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA ORGANIZER｜在地方創造育成機會", description: "RBA Organizer / Regional Host 在保留既有活動的同時，連接 RBA 的全國導線、報名、付款與營運標準。", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="organizer" locale="zh-tw" />;
}
