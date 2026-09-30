import type { Metadata } from "next";
import { UnitedPage } from "@/components/platform-business-pages";

export const metadata: Metadata = {
  title: "RBA UNITED｜海外大会・遠征・国際交流への個人参加",
  description: "所属チームを続けながら、期間限定チームで大会・遠征・国際交流へ挑戦するRBA UNITED。Malaysia 2026・Incheon 2027の先行エントリー受付中。",
  alternates: {
    canonical: "https://riotbasketballacademy.com/ja/united",
    languages: {
      en: "https://riotbasketballacademy.com/united",
      ja: "https://riotbasketballacademy.com/ja/united",
      "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/united",
      ko: "https://riotbasketballacademy.com/ko/united",
      "x-default": "https://riotbasketballacademy.com/united"
    }
  },
  openGraph: {
    title: "RBA UNITED｜海外大会・遠征・国際交流",
    description: "所属を変えずに、外の世界へ。Malaysia 2026・Incheon 2027の先行エントリーと募集要項を確認できます。",
    url: "https://riotbasketballacademy.com/ja/united",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "RBA UNITED｜海外大会・遠征・国際交流",
    description: "Malaysia 2026・Incheon 2027の先行エントリー受付中。",
    images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"]
  }
};

export default function Page(){
  return <UnitedPage locale="ja"/>;
}
