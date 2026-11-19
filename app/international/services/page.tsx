import type { Metadata } from "next";
import { GlobalServicesLanding } from "@/components/global-services-landing";

export const metadata: Metadata = {
  title: "RBA Global Services | Japan Basketball Exchange, Academy Advisory & Coach Education",
  description: "Work with Riot Basketball Academy for Japan youth basketball development, international clinics, academy advisory and private online coach education. Free initial enquiry; written quote before any payment.",
  alternates: { canonical: "https://riotbasketballacademy.com/international/services" },
  openGraph: {
    title: "RBA GLOBAL | Basketball development and international exchange",
    description: "Japan youth team development, overseas academy technical advice, online coach education. Request a written proposal from RBA.",
    url: "https://riotbasketballacademy.com/international/services",
    type: "website"
  }
};

export default function Page() { return <GlobalServicesLanding/>; }
