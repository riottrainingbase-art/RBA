import type { Metadata } from "next";
import { RbaSimpleHome } from "@/components/rba-simple-home";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: { absolute: "RBA｜育つ機会を、地域から世界へ。" },
  description: "RBAは、バスケットボールを通じて子どもたちの成長と挑戦の機会をつくる育成事業です。選手への指導、試合、身体づくり、指導者教育、国内外の交流をつなぎ、地域や所属先だけでは得られない学びを届けます。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/", languages: { "en": "https://riotbasketballacademy.com/", "ja": "https://riotbasketballacademy.com/ja/", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/", "ko": "https://riotbasketballacademy.com/ko/", "x-default": "https://riotbasketballacademy.com/" } },
  openGraph: {
    title: "RBA｜育つ機会を、地域から世界へ。",
    description: "RBAは、バスケットボールを通じて子どもたちの成長と挑戦の機会をつくる育成事業です。選手への指導、試合、身体づくり、指導者教育、国内外の交流をつなぎ、地域や所属先だけでは得られない学びを届けます。",
    url: "https://riotbasketballacademy.com/ja/",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA｜育つ機会を、地域から世界へ。", description: "RBAは、バスケットボールを通じて子どもたちの成長と挑戦の機会をつくる育成事業です。選手への指導、試合、身体づくり、指導者教育、国内外の交流をつなぎ、地域や所属先だけでは得られない学びを届けます。", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() { return <RbaSimpleHome locale="ja" />; }
