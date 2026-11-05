import type { Metadata } from "next";
import { JapanExperienceLanding } from "@/components/japan-experience-landing";

export const metadata:Metadata={
 title:"Partner with RBA | Japan Travel Suppliers & Youth Basketball Sponsors",
 description:"RBA invites registered travel operators, hotels, sports partners and brands to discuss responsible inbound youth basketball collaboration and sponsorship.",
 alternates:{canonical:"https://riotbasketballacademy.com/international/partner-with-us",languages:{"en":"https://riotbasketballacademy.com/international/partner-with-us","ja":"https://riotbasketballacademy.com/ja/international/partner-with-us","zh-Hant-TW":"https://riotbasketballacademy.com/zh-tw/international/partner-with-us","x-default":"https://riotbasketballacademy.com/international/partner-with-us"}},
 openGraph:{title:"Partner with RBA | Japan Travel Suppliers & Youth Basketball Sponsors",description:"RBA invites registered travel operators, hotels, sports partners and brands to discuss responsible inbound youth basketball collaboration and sponsorship.",url:"https://riotbasketballacademy.com/international/partner-with-us",type:"website",images:[{url:"/rba-court-hero.png"}]},
};
export default function Page(){return <JapanExperienceLanding locale="en" mode="business"/>;}
