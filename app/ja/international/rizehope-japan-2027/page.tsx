import type { Metadata } from "next";
import { RizehopeInternationalPage } from "@/components/rizehope-international";

export const metadata:Metadata = {
  title: "RIZEHOPE JAPAN 2027｜U12国際交流試合・海外チーム招聘｜RBA",
  description: "2027年2月27・28日、柴田町総合体育館。予約済み会場で開催準備中のU12国際交流。国内U12チーム申込・前金33,000円決済受付中。海外チーム・RBA UNITEDの無料意向受付と地域協賛相談をご案内。",
  alternates: {
    canonical: "https://riotbasketballacademy.com/ja/international/rizehope-japan-2027",
    languages: {
      ja: "https://riotbasketballacademy.com/ja/international/rizehope-japan-2027",
      en: "https://riotbasketballacademy.com/international/rizehope-japan-2027",
      "x-default": "https://riotbasketballacademy.com/international/rizehope-japan-2027",
    },
  },
  openGraph: {
    title: "RIZEHOPE JAPAN 2027｜U12国際交流｜宮城",
    description: "2027.2.27–28 / 柴田町総合体育館 / 国内チーム前金受付／海外チーム・RBA UNITED意向受付",
    url: "https://riotbasketballacademy.com/ja/international/rizehope-japan-2027",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
};
export default function Page(){ return <RizehopeInternationalPage lang="ja"/>; }
