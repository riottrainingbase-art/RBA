import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "参加規約・キャンセル・返金方針｜RBA",
  description: "RBAの参加規約、安全方針、キャンセル・返金条件、宿泊・遠征・オンライン講習・HOMECOURT PLUSの取消しルールをご案内します。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/policies", languages: { "en": "https://riotbasketballacademy.com/policies", "ja": "https://riotbasketballacademy.com/ja/policies", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/policies", "ko": "https://riotbasketballacademy.com/ko/policies", "x-default": "https://riotbasketballacademy.com/policies" } },
  openGraph: {
    title: "参加規約・キャンセル・返金方針｜RBA",
    description: "RBAの参加規約、安全方針、キャンセル・返金条件、宿泊・遠征・オンライン講習・HOMECOURT PLUSの取消しルールをご案内します。",
    url: "https://riotbasketballacademy.com/ja/policies",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "参加規約・キャンセル・返金方針｜RBA", description: "RBAの参加規約、安全方針、キャンセル・返金条件をご案内します。", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="policies" locale="ja" />;
}
