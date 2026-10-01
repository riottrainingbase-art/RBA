import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "RBA REGIONAL HOST｜地域で継続して活動を開催する",
  description: "地域の指導者、チーム、会場と協力し、その土地に合う形でRBAのクリニックやキャンプを継続開催するための案内です。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/regional-host", languages: { "en": "https://riotbasketballacademy.com/regional-host", "ja": "https://riotbasketballacademy.com/ja/regional-host", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/regional-host", "ko": "https://riotbasketballacademy.com/ko/regional-host", "x-default": "https://riotbasketballacademy.com/regional-host" } },
  openGraph: {
    title: "RBA REGIONAL HOST｜地域で継続して活動を開催する",
    description: "地域の指導者、チーム、会場と協力し、その土地に合う形でRBAのクリニックやキャンプを継続開催するための案内です。",
    url: "https://riotbasketballacademy.com/ja/regional-host",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA REGIONAL HOST｜地域で継続して活動を開催する", description: "地域の指導者、チーム、会場と協力し、その土地に合う形でRBAのクリニックやキャンプを継続開催するための案内です。", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="regional-host" locale="ja" />;
}
