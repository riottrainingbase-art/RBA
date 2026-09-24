import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "RBA POLICIES | Safety, Trust & Transparency",
  description: "RBAが公開するSafety、価格透明性、データ、旅行範囲、実績表現等の運営原則。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/policies", languages: { "en": "https://riotbasketballacademy.com/policies", "ja": "https://riotbasketballacademy.com/ja/policies", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/policies", "ko": "https://riotbasketballacademy.com/ko/policies", "x-default": "https://riotbasketballacademy.com/policies" } },
  openGraph: {
    title: "RBA POLICIES | Safety, Trust & Transparency",
    description: "RBAが公開するSafety、価格透明性、データ、旅行範囲、実績表現等の運営原則。",
    url: "https://riotbasketballacademy.com/ja/policies",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA POLICIES | Safety, Trust & Transparency", description: "RBAが公開するSafety、価格透明性、データ、旅行範囲、実績表現等の運営原則。", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="policies" locale="ja" />;
}
