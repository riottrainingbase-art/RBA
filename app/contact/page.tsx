import type { Metadata } from "next";
import { DefinitiveStaticPage } from "@/components/definitive-static-page";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: { absolute: "CONTACT RBA | Riot Basketball Academy" },
  description: "Contact RBA about participation, Team Training, organisers, international programmes, sponsorship and more.",
  alternates: { canonical: "https://riotbasketballacademy.com/contact", languages: { "en": "https://riotbasketballacademy.com/contact", "ja": "https://riotbasketballacademy.com/ja/contact", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/contact", "ko": "https://riotbasketballacademy.com/ko/contact", "x-default": "https://riotbasketballacademy.com/contact" } },
  openGraph: {
    title: "CONTACT RBA | Riot Basketball Academy",
    description: "Contact RBA about participation, Team Training, organisers, international programmes, sponsorship and more.",
    url: "https://riotbasketballacademy.com/contact",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
  twitter: { card: "summary_large_image", title: "CONTACT RBA | Riot Basketball Academy", description: "Contact RBA about participation, Team Training, organisers, international programmes, sponsorship and more.", images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
};

export default function Page() {
  return <DefinitiveStaticPage page="contact" locale="en" />;
}
