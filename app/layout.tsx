import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://riotbasketballacademy.com"),
  manifest: "/rba-definitive/manifest.json",
  title: { default: "Riot Basketball Academy | Youth Development from Japan to Asia", template: "%s | Riot Basketball Academy" },
  description: "Riot Basketball Academy is a Japan-based youth basketball development organisation connecting modern fundamentals, physical preparation, coach learning and meaningful exchange across Asia.",
  alternates: { canonical:"/", languages:{ en:"/", ja:"/ja", "zh-Hant-TW":"/zh-tw", ko:"/ko", "x-default":"/" } },
  keywords: ["Riot Basketball Academy", "RBA Japan", "youth basketball development", "basketball clinic Japan", "U12 basketball", "coach education", "Asia basketball exchange"],
  authors: [{ name: "Riot Basketball Academy" }],
  openGraph: {
    type: "website", locale: "en_US", siteName: "Riot Basketball Academy",
    title: "Riot Basketball Academy | Built in the gym. Connected across Asia.",
    description: "Youth basketball development, clinics, field notes, coach learning and meaningful exchange from Japan to Asia.",
    images: [{ url: "/rba-court-hero.png", width: 1664, height: 935, alt: "An indoor basketball court after practice" }],
  },
  twitter: { card: "summary_large_image", title: "Riot Basketball Academy Japan", description: "Built in the gym. Connected across Asia.", images: ["/rba-court-hero.png"] },
  icons: {
    icon: "/rba-logo-original.jpg",
    shortcut: "/rba-logo-original.jpg",
    apple: "/rba-logo-original.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{__html:`(()=>{const p=location.pathname;document.documentElement.lang=p==='/ja'||p.startsWith('/ja/')?'ja':p==='/zh-tw'||p.startsWith('/zh-tw/')?'zh-Hant-TW':p==='/ko'||p.startsWith('/ko/')?'ko':'en'})()`}} /></head>
      <body className="antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context":"https://schema.org", "@type":"SportsOrganization", name:"Riot Basketball Academy", alternateName:"RBA",
          url:"https://riotbasketballacademy.com", logo:"https://riotbasketballacademy.com/rba-logo-original.jpg",
          description:"Japan-based youth basketball development organisation connecting modern fundamentals, physical preparation, coach learning and meaningful exchange across Asia.",
          founder:{"@type":"Person",name:"Masato Nishio",alternateName:"西尾優人"}, address:{"@type":"PostalAddress",addressLocality:"Sendai",addressCountry:"JP"},
          email:"riot.training.base@gmail.com", sameAs:["https://www.instagram.com/riot.basketball.academy/","https://www.threads.com/@riot.basketball.academy","https://note.com/rba_official","https://linktr.ee/riotbasketballacademy"]
        }) }} />
        {children}
      </body>
    </html>
  );
}
