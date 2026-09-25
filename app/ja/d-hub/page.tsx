import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: { absolute: 'D-HUB | 指導者育成 | Riot Basketball Academy' },
  description: '毎週30〜45分・年間48回。COACH JOURNALで根拠を読み、D-HUBで学び、現場で試し、MY HOME COURTで振り返るRBAの継続型指導者育成環境。',
  alternates: { canonical: 'https://riotbasketballacademy.com/ja/d-hub', languages: { "en": "https://riotbasketballacademy.com/d-hub", "ja": "https://riotbasketballacademy.com/ja/d-hub", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/d-hub", "ko": "https://riotbasketballacademy.com/ko/d-hub", "x-default": "https://riotbasketballacademy.com/d-hub" } },
  openGraph: { title: 'D-HUB | 指導者育成 | Riot Basketball Academy', description: '毎週30〜45分・年間48回。COACH JOURNALで根拠を読み、D-HUBで学び、現場で試し、MY HOME COURTで振り返るRBAの継続型指導者育成環境。', url: 'https://riotbasketballacademy.com/ja/d-hub', siteName: "Riot Basketball Academy", type: "website", images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }] },
};

export default function Page() {
  return <DefinitiveStaticPage page="d-hub" locale="ja" />;
}
