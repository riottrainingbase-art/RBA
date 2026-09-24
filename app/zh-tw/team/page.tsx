import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "RBA FOR TEAMS｜為球隊增加更多選擇",
  description: "RBA for Teams。球隊可使用 Team Training、Camp、Cup 與日本國內外 Exchange。",
  alternates: { canonical: "https://riotbasketballacademy.com/zh-tw/team", languages: { "en": "https://riotbasketballacademy.com/team", "ja": "https://riotbasketballacademy.com/ja/team", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/team", "ko": "https://riotbasketballacademy.com/ko/team", "x-default": "https://riotbasketballacademy.com/team" } },
  openGraph: {
    title: "RBA FOR TEAMS｜為球隊增加更多選擇",
    description: "RBA for Teams。球隊可使用 Team Training、Camp、Cup 與日本國內外 Exchange。",
    url: "https://riotbasketballacademy.com/zh-tw/team",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA FOR TEAMS｜為球隊增加更多選擇", description: "RBA for Teams。球隊可使用 Team Training、Camp、Cup 與日本國內外 Exchange。", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="team" locale="zh-tw" />;
}
