import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "チーム・団体の方へ｜育成支援・訪問指導・地域開催・連携",
  description: "チーム育成支援、訪問トレーニング、地域開催、大会・イベント運営、企業・地域連携まで。やりたいことからRBAとの関わり方を選べます。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/organizer", languages: { "en": "https://riotbasketballacademy.com/organizer", "ja": "https://riotbasketballacademy.com/ja/organizer", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/organizer", "ko": "https://riotbasketballacademy.com/ko/organizer", "x-default": "https://riotbasketballacademy.com/organizer" } },
  openGraph: {
    title: "チーム・団体の方へ｜育成支援・訪問指導・地域開催・連携",
    description: "チーム育成支援、訪問トレーニング、地域開催、大会・イベント運営、企業・地域連携まで。やりたいことからRBAとの関わり方を選べます。",
    url: "https://riotbasketballacademy.com/ja/organizer",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA ORGANIZER | 地域に育成機会をつくる", description: "チーム育成支援、訪問トレーニング、地域開催、大会・イベント運営、企業・地域連携まで。やりたいことからRBAとの関わり方を選べます。", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="organizer" locale="ja" />;
}
