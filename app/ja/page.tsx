import type { Metadata } from "next";
import { LocalizedHome } from "@/components/localized-home";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: { absolute: "RBA｜育成年代バスケットボールの育成プラットフォーム" },
  description: "RBAは、選手・保護者・指導者・チーム・地域・海外を、RBA ID、MY HOME COURT、育成機会、学び、安全、国際交流でつなぐ育成年代バスケットボールのプラットフォームです。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/", languages: { "en": "https://riotbasketballacademy.com/", "ja": "https://riotbasketballacademy.com/ja/", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/", "ko": "https://riotbasketballacademy.com/ko/", "x-default": "https://riotbasketballacademy.com/" } },
  openGraph: {
    title: "RBA｜育成を、ひとつの流れに。",
    description: "RBA IDとMY HOME COURTを中心に、活動機会、育成記事、指導者学習、参加履歴、Japan × Asiaの交流を一つにつなぎます。",
    url: "https://riotbasketballacademy.com/ja/",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA｜育成を、ひとつの流れに。", description: "選手・保護者・指導者・チーム・地域・海外を、一つの育成プラットフォームでつなぐ。", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <LocalizedHome locale="ja" />;
}
