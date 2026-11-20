import type { Metadata } from "next";
import { FounderAboutPage } from "@/components/founder-profile";

export const metadata: Metadata = {
  manifest: "/rba-definitive/manifest.json",
  title: "西尾優人｜RBA代表・NSCA-CPT｜経歴と育成方針",
  description: "Riot Basketball Academy創設者・西尾優人。東北選抜・国体の選手経験、ドイツでのS&C指導、NSCA-CPT資格を背景に、仙台から全国・アジアへ育成の機会をつくる理由と指導理念をご紹介します。",
  authors: [{ name: "西尾優人（Masato Nishio）" }],
  keywords: ["西尾優人", "Masato Nishio", "Riot Basketball Academy", "RBA", "NSCA-CPT", "バスケットボール育成", "仙台", "指導者教育"],
  alternates: { canonical: "https://riotbasketballacademy.com/ja/about", languages: { "en": "https://riotbasketballacademy.com/about", "ja": "https://riotbasketballacademy.com/ja/about", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/about", "ko": "https://riotbasketballacademy.com/ko/about", "x-default": "https://riotbasketballacademy.com/about" } },
  openGraph: {
    title: "西尾優人｜RBA代表・NSCA-CPT｜経歴と育成方針",
    description: "バスケットボール指導者・西尾優人の経歴、NSCA-CPT資格、ドイツでのS&C経験と育成理念。",
 
    url: "https://riotbasketballacademy.com/ja/about",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/media/founder/masato-nishio-on-court.webp", alt: "RBA代表・西尾優人が指導する様子" }],
  },
  twitter: { card: "summary_large_image", title: "西尾優人｜RBA代表・NSCA-CPT｜経歴と育成方針", description: "RBA代表の経歴・育成理念を紹介します。", images: ["https://riotbasketballacademy.com/media/founder/masato-nishio-on-court.webp"] },
};

const founderStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "西尾優人",
  alternateName: "Masato Nishio",
  jobTitle: "Riot Basketball Academy 創設者・代表",
  url: "https://riotbasketballacademy.com/ja/about",
  image: "https://riotbasketballacademy.com/media/founder/masato-nishio-on-court.webp",
  description: "仙台を拠点とし、ドイツでのS&C指導経験とNSCA-CPT資格を生かして育成年代のバスケットボール指導・指導者教育に取り組む。",
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    name: "NSCA-CPT",
  },
  worksFor: {
    "@type": "Organization",
    name: "Riot Basketball Academy",
    url: "https://riotbasketballacademy.com/",
  },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(founderStructuredData) }} />
      <FounderAboutPage locale="ja" />
    </>
  );
}
