import type { Metadata } from "next";
import { BackboneExperience } from "./backbone-experience";

export const metadata: Metadata = {
  title: "BACKBONE 3×3 | 地域から、育成の軸をつくる。",
  description: "Riot Basketball Academyが展開するBACKBONE 3×3。育成理念、地域チャプター、基本参加費、開催要件、オーガナイザー申請をご案内します。",
  keywords: ["BACKBONE 3x3", "RBA", "地域チャプター", "3x3育成", "オーガナイザー", "Riot Basketball Academy"],
  alternates: { canonical: "https://riotbasketballacademy.com/backbone" },
  openGraph: {
    title: "BACKBONE 3×3 | Riot Basketball Academy",
    description: "地域から、育成の軸をつくる。子どもたちの経験機会を広げる3x3育成プロジェクト。",
    url: "https://riotbasketballacademy.com/backbone",
    type: "website",
    siteName: "Riot Basketball Academy",
  },
};

export default function BackbonePage() {
  return <BackboneExperience />;
}
