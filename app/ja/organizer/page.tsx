import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "RBA ORGANIZER｜地域でクリニック・キャンプを開催する",
  description: "地域の活動を生かしながら、RBAの募集ページ、申込・決済、参加管理などを組み合わせて開催するための案内です。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/organizer", languages: { "en": "https://riotbasketballacademy.com/organizer", "ja": "https://riotbasketballacademy.com/ja/organizer", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/organizer", "ko": "https://riotbasketballacademy.com/ko/organizer", "x-default": "https://riotbasketballacademy.com/organizer" } },
  openGraph: {
    title: "RBA ORGANIZER｜地域でクリニック・キャンプを開催する",
    description: "地域の活動を生かしながら、RBAの募集ページ、申込・決済、参加管理などを組み合わせて開催するための案内です。",
    url: "https://riotbasketballacademy.com/ja/organizer",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA ORGANIZER｜地域でクリニック・キャンプを開催する", description: "地域の活動を生かしながら、RBAの募集ページ、申込・決済、参加管理などを組み合わせて開催するための案内です。", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="organizer" locale="ja" />;
}
