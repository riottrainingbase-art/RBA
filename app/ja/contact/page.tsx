import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: { absolute: "お問い合わせ｜Riot Basketball Academy" },
  description: "RBAへの参加、チーム支援、地域開催、海外交流、パートナー・協賛などのお問い合わせ窓口です。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/contact", languages: { "en": "https://riotbasketballacademy.com/contact", "ja": "https://riotbasketballacademy.com/ja/contact", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/contact", "ko": "https://riotbasketballacademy.com/ko/contact", "x-default": "https://riotbasketballacademy.com/contact" } },
  openGraph: {
    title: "お問い合わせ｜Riot Basketball Academy",
    description: "RBAへの参加、チーム支援、地域開催、海外交流、パートナー・協賛などのお問い合わせ窓口です。",
    url: "https://riotbasketballacademy.com/ja/contact",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "CONTACT RBA | Riot Basketball Academy", description: "RBAへの参加、チーム支援、地域開催、海外交流、パートナー・協賛などのお問い合わせ窓口です。", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="contact" locale="ja" />;
}
