import type { Metadata } from "next";
import { ShenzhenU12ExchangePage } from "@/components/shenzhen-u12-exchange-page";

export const metadata: Metadata = {
  title: "RBA UNITED KANTO × SHENZHEN U12 | February 2027 Japan Youth Exchange",
  description: "Free, non-binding expressions of interest in proposed U12 boys basketball exchange with visiting Shenzhen Ciroo Basketball Academy. Venues, teams, games, eligibility and costs are not confirmed.",
  alternates: { canonical: "/events/shenzhen-u12-exchange-2027", languages: { "ja": "/ja/events/shenzhen-u12-exchange-2027", "en": "/events/shenzhen-u12-exchange-2027", "x-default": "/events/shenzhen-u12-exchange-2027" } },
  openGraph: { title: "New teammates. New ways to learn. | RBA × SHENZHEN U12", description: "February 2027 youth basketball exchange in Japan: planning stage. Parent, club and adult support interest forms are free.", url: "/events/shenzhen-u12-exchange-2027", siteName: "Riot Basketball Academy", type: "website", images: ["/rba-logo-original.jpg"] },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <ShenzhenU12ExchangePage locale="en" />;
}
