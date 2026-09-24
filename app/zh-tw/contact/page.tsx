import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: { absolute: "CONTACT RBA | Riot Basketball Academy" },
  description: "RBA 的參加、Team Training、Organizer、International、Sponsor 等諮詢窗口。",
  alternates: { canonical: "https://riotbasketballacademy.com/zh-tw/contact", languages: { "en": "https://riotbasketballacademy.com/contact", "ja": "https://riotbasketballacademy.com/ja/contact", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/contact", "ko": "https://riotbasketballacademy.com/ko/contact", "x-default": "https://riotbasketballacademy.com/contact" } },
  openGraph: {
    title: "CONTACT RBA | Riot Basketball Academy",
    description: "RBA 的參加、Team Training、Organizer、International、Sponsor 等諮詢窗口。",
    url: "https://riotbasketballacademy.com/zh-tw/contact",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "CONTACT RBA | Riot Basketball Academy", description: "RBA 的參加、Team Training、Organizer、International、Sponsor 等諮詢窗口。", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="contact" locale="zh-tw" />;
}
