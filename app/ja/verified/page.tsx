import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "RBA VERIFIED｜安全と育成の確認基準",
  description: "参加前に確認できる安全管理、主催者、料金、キャンセル条件、プログラム内容の基準を紹介します。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/verified", languages: { "en": "https://riotbasketballacademy.com/verified", "ja": "https://riotbasketballacademy.com/ja/verified", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/verified", "ko": "https://riotbasketballacademy.com/ko/verified", "x-default": "https://riotbasketballacademy.com/verified" } },
  openGraph: {
    title: "RBA VERIFIED｜安全と育成の確認基準",
    description: "参加前に確認できる安全管理、主催者、料金、キャンセル条件、プログラム内容の基準を紹介します。",
    url: "https://riotbasketballacademy.com/ja/verified",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA VERIFIED｜安全と育成の確認基準", description: "参加前に確認できる安全管理、主催者、料金、キャンセル条件、プログラム内容の基準を紹介します。", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="verified" locale="ja" />;
}
