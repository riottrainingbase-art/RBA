import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "RBA FOR TEAMS | 팀에도 다음 선택지를",
  description: "RBA for Teams. Team Training, Camp, Cup, 국내외 Exchange를 팀 단위로 이용할 수 있습니다.",
  alternates: { canonical: "https://riotbasketballacademy.com/ko/team", languages: { "en": "https://riotbasketballacademy.com/team", "ja": "https://riotbasketballacademy.com/ja/team", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/team", "ko": "https://riotbasketballacademy.com/ko/team", "x-default": "https://riotbasketballacademy.com/team" } },
  openGraph: {
    title: "RBA FOR TEAMS | 팀에도 다음 선택지를",
    description: "RBA for Teams. Team Training, Camp, Cup, 국내외 Exchange를 팀 단위로 이용할 수 있습니다.",
    url: "https://riotbasketballacademy.com/ko/team",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA FOR TEAMS | 팀에도 다음 선택지를", description: "RBA for Teams. Team Training, Camp, Cup, 국내외 Exchange를 팀 단위로 이용할 수 있습니다.", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="team" locale="ko" />;
}
