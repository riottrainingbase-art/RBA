import type { Metadata } from "next";
import { BackboneExperience } from "./backbone-experience";

export const metadata: Metadata = {
  title: "BACKBONE 3×3 | 地域から、育成の軸をつくる。",
  description: "THE GAME IS THE CLASSROOM. 勝負の中で、育つ。Riot Basketball AcademyのBACKBONE 3×3。地域チャプター、選手の参加、オーガナイザー申請をご案内します。",
  keywords: ["BACKBONE 3x3", "RBA", "地域チャプター", "3x3育成", "オーガナイザー", "Riot Basketball Academy"],
  alternates: { canonical: "https://riotbasketballacademy.com/backbone" },
  openGraph: {
    title: "BACKBONE 3×3 | Riot Basketball Academy",
    description: "THE GAME IS THE CLASSROOM. 勝負の中で、育つ。3×3で見る・選ぶ・挑戦する経験を重ねるRBAの育成プロジェクト。",
    images: [{ url: "/rba-definitive/assets/field-gym.jpeg", alt: "BACKBONE 3x3 | The game is the classroom" }],
    url: "https://riotbasketballacademy.com/backbone",
    type: "website",
    siteName: "Riot Basketball Academy",
    locale: "ja_JP",
  },
  twitter: { card: "summary_large_image", title: "BACKBONE 3×3 | THE GAME IS THE CLASSROOM.", description: "勝負の中で、育つ。RBAの3×3育成プロジェクト。", images: ["/rba-definitive/assets/field-gym.jpeg"] },
};

export default function BackbonePage() {
  return <BackboneExperience />;
}
