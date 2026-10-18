import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "RBA｜育つ機会を、地域から世界へ。",
  description: "RBAは、バスケットボールを通じて子どもたちの成長と挑戦の機会をつくる育成事業です。選手への指導、試合、身体づくり、指導者教育、国内外の交流をつなぎ、地域や所属先だけでは得られない学びを届けます。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/about", languages: { "en": "https://riotbasketballacademy.com/about", "ja": "https://riotbasketballacademy.com/ja/about", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/about", "ko": "https://riotbasketballacademy.com/ko/about", "x-default": "https://riotbasketballacademy.com/about" } },
  openGraph: {
    title: "RBA｜育つ機会を、地域から世界へ。",
    description: "RBAは、バスケットボールを通じて子どもたちの成長と挑戦の機会をつくる育成事業です。選手への指導、試合、身体づくり、指導者教育、国内外の交流をつなぎ、地域や所属先だけでは得られない学びを届けます。",
    url: "https://riotbasketballacademy.com/ja/about",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA｜育つ機会を、地域から世界へ。", description: "RBAは、バスケットボールを通じて子どもたちの成長と挑戦の機会をつくる育成事業です。選手への指導、試合、身体づくり、指導者教育、国内外の交流をつなぎ、地域や所属先だけでは得られない学びを届けます。", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="about" locale="ja" />;
}
