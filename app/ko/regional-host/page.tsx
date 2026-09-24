import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "RBA REGIONAL HOST | 지역에 성장 기회를 만들다",
  description: "RBA Regional Host. 지역 Coach·Team·장소와 함께 RBA Standard의 성장 기회를 전국으로 넓힙니다.",
  alternates: { canonical: "https://riotbasketballacademy.com/ko/regional-host", languages: { "en": "https://riotbasketballacademy.com/regional-host", "ja": "https://riotbasketballacademy.com/ja/regional-host", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/regional-host", "ko": "https://riotbasketballacademy.com/ko/regional-host", "x-default": "https://riotbasketballacademy.com/regional-host" } },
  openGraph: {
    title: "RBA REGIONAL HOST | 지역에 성장 기회를 만들다",
    description: "RBA Regional Host. 지역 Coach·Team·장소와 함께 RBA Standard의 성장 기회를 전국으로 넓힙니다.",
    url: "https://riotbasketballacademy.com/ko/regional-host",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA REGIONAL HOST | 지역에 성장 기회를 만들다", description: "RBA Regional Host. 지역 Coach·Team·장소와 함께 RBA Standard의 성장 기회를 전국으로 넓힙니다.", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="regional-host" locale="ko" />;
}
