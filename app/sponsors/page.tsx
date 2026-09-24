import { LocalizedCorePage } from "@/components/localized-core-page";
import type { Metadata } from "next";
export const metadata:Metadata={title:"Sponsor RBA",description:"Sponsor and partner with Riot Basketball Academy to support youth basketball development in Japan and across Asia.",alternates:{canonical:"/partners"}};
export default function Page(){return <LocalizedCorePage locale="en" kind="partners"/>}