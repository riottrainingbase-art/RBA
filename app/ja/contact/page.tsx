import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: { absolute: "RBAお問い合わせ｜参加・チーム・地域開催・海外交流" },
  description: "参加したい活動、チーム・団体支援、地域開催、海外交流、協賛・連携など、内容に合うRBAの窓口をご案内します。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/contact", languages: { "en": "https://riotbasketballacademy.com/contact", "ja": "https://riotbasketballacademy.com/ja/contact", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/contact", "ko": "https://riotbasketballacademy.com/ko/contact", "x-default": "https://riotbasketballacademy.com/contact" } },
  openGraph: {
    title: "RBAお問い合わせ｜参加・チーム・地域開催・海外交流",
    description: "参加したい活動、チーム・団体支援、地域開催、海外交流、協賛・連携など、内容に合うRBAの窓口をご案内します。",
    url: "https://riotbasketballacademy.com/ja/contact",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "CONTACT RBA | Riot Basketball Academy", description: "参加したい活動、チーム・団体支援、地域開催、海外交流、協賛・連携など、内容に合うRBAの窓口をご案内します。", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="contact" locale="ja" />;
}
