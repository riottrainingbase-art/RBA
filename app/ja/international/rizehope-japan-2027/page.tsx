import type { Metadata } from "next";
import { RizehopeFestivalEntry } from "@/components/rizehope-festival-entry";

export const metadata: Metadata = {
  title: "RIZEHOPE JAPAN 2027｜国際U12バスケットボール育成フェスティバル",
  description: "2027年2月27・28日、宮城県柴田町で計画するU12国際育成交流。国内チーム、海外チーム、RBA UNITEDの申込経路と未確定条件を分けてご案内します。",
  alternates: {
    canonical: "https://riotbasketballacademy.com/ja/international/rizehope-japan-2027",
    languages: {
      ja: "https://riotbasketballacademy.com/ja/international/rizehope-japan-2027",
      en: "https://riotbasketballacademy.com/international/rizehope-japan-2027",
    },
  },
  openGraph: {
    title: "RIZEHOPE JAPAN 2027 | International U12 Basketball Festival",
    description: "PLAY. LEARN. CONNECT. | U12 exchange in Miyagi, Japan, 27–28 February 2027.",
    images: ["/rba-logo-original.jpg"],
    type: "website",
  },
};

export default function Page() {
  return <RizehopeFestivalEntry locale="ja" />;
}
