import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "RBA FAQ | 자주 묻는 질문",
  description: "RBA, MY HOME COURT, Team, Organizer, International Exchange에 대한 자주 묻는 질문.",
  alternates: { canonical: "https://riotbasketballacademy.com/ko/faq", languages: { "en": "https://riotbasketballacademy.com/faq", "ja": "https://riotbasketballacademy.com/ja/faq", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/faq", "ko": "https://riotbasketballacademy.com/ko/faq", "x-default": "https://riotbasketballacademy.com/faq" } },
  openGraph: {
    title: "RBA FAQ | 자주 묻는 질문",
    description: "RBA, MY HOME COURT, Team, Organizer, International Exchange에 대한 자주 묻는 질문.",
    url: "https://riotbasketballacademy.com/ko/faq",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA FAQ | 자주 묻는 질문", description: "RBA, MY HOME COURT, Team, Organizer, International Exchange에 대한 자주 묻는 질문.", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="faq" locale="ko" />;
}
