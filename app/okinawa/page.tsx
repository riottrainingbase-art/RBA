import type { Metadata } from "next";
import { OkinawaLocalizedInfo } from "@/components/okinawa-localized-info";

export const metadata: Metadata = {
  title: { absolute: "GREAM OKINAWA | Youth Basketball, Families & Local Coaches | RBA" },
  description: "Official GREAM OKINAWA information for current families, future participants, youth basketball coaches and local venue partners. New regular programme details are subject to confirmation.",
  alternates: { canonical: "https://riotbasketballacademy.com/okinawa", languages: {"ja":"https://riotbasketballacademy.com/ja/okinawa","en":"https://riotbasketballacademy.com/okinawa","zh-Hant-TW":"https://riotbasketballacademy.com/zh-tw/okinawa","ko":"https://riotbasketballacademy.com/ko/okinawa"} },
  robots: { index: true, follow: true },
  openGraph: {
    title: "GREAM OKINAWA | A place to keep learning.",
    description: "Official GREAM OKINAWA information for current families, future participants, youth basketball coaches and local venue partners. New regular programme details are subject to confirmation.",
    url: "https://riotbasketballacademy.com/okinawa",
    locale: "en_US",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
};

export default function OkinawaInformationPage() {
  return <OkinawaLocalizedInfo locale="en" />;
}
