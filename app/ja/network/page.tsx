import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "RBA NETWORK | Local to Asia",
  description: "RBAの地域・国内・アジアをつなぐNetwork構想。現在の活動基盤と将来構想を分けて公開します。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/network", languages: { "en": "https://riotbasketballacademy.com/network", "ja": "https://riotbasketballacademy.com/ja/network", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/network", "ko": "https://riotbasketballacademy.com/ko/network", "x-default": "https://riotbasketballacademy.com/network" } },
  openGraph: {
    title: "RBA NETWORK | Local to Asia",
    description: "RBAの地域・国内・アジアをつなぐNetwork構想。現在の活動基盤と将来構想を分けて公開します。",
    url: "https://riotbasketballacademy.com/ja/network",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "RBA NETWORK | Local to Asia", description: "RBAの地域・国内・アジアをつなぐNetwork構想。現在の活動基盤と将来構想を分けて公開します。", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="network" locale="ja" />;
}
