import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "RBA FOR TEAMS | More Options for Your Team",
  description: "RBA for Teams provides team-level access to Team Training, Camps, Cups and exchange in Japan and abroad.",
  alternates: { canonical: "https://riotbasketballacademy.com/team", languages: { "en": "https://riotbasketballacademy.com/team", "ja": "https://riotbasketballacademy.com/ja/team", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/team", "ko": "https://riotbasketballacademy.com/ko/team", "x-default": "https://riotbasketballacademy.com/team" } },
  openGraph: {
    title: "RBA FOR TEAMS | More Options for Your Team",
    description: "RBA for Teams provides team-level access to Team Training, Camps, Cups and exchange in Japan and abroad.",
    url: "https://riotbasketballacademy.com/team",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA FOR TEAMS | More Options for Your Team", description: "RBA for Teams provides team-level access to Team Training, Camps, Cups and exchange in Japan and abroad.", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="team" locale="en" />;
}
