import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "RBA FOR TEAMS | チームにも次の選択肢を",
  description: "RBA for Teams。Team Training、Camp、Cup、国内外のExchangeをチーム単位で利用できます。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/team", languages: { "en": "https://riotbasketballacademy.com/team", "ja": "https://riotbasketballacademy.com/ja/team", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/team", "ko": "https://riotbasketballacademy.com/ko/team", "x-default": "https://riotbasketballacademy.com/team" } },
  openGraph: {
    title: "RBA FOR TEAMS | チームにも次の選択肢を",
    description: "RBA for Teams。Team Training、Camp、Cup、国内外のExchangeをチーム単位で利用できます。",
    url: "https://riotbasketballacademy.com/ja/team",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA FOR TEAMS | チームにも次の選択肢を", description: "RBA for Teams。Team Training、Camp、Cup、国内外のExchangeをチーム単位で利用できます。", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="team" locale="ja" />;
}
