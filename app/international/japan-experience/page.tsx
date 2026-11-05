import type { Metadata } from "next";
import { JapanExperienceLanding } from "@/components/japan-experience-landing";

export const metadata:Metadata={
 title:"Japan Basketball & Cultural Exchange | RBA JAPAN EXPERIENCE",
 description:"Explore Japan youth basketball camps, clinics, team exchanges and cultural learning with RBA. Group enquiry, no obligation.",
 alternates:{canonical:"https://riotbasketballacademy.com/international/japan-experience",languages:{"en":"https://riotbasketballacademy.com/international/japan-experience","ja":"https://riotbasketballacademy.com/ja/international/japan-experience","zh-Hant-TW":"https://riotbasketballacademy.com/zh-tw/international/japan-experience","x-default":"https://riotbasketballacademy.com/international/japan-experience"}},
 openGraph:{title:"Japan Basketball & Cultural Exchange | RBA JAPAN EXPERIENCE",description:"Explore Japan youth basketball camps, clinics, team exchanges and cultural learning with RBA. Group enquiry, no obligation.",url:"https://riotbasketballacademy.com/international/japan-experience",type:"website",images:[{url:"/rba-court-hero.png"}]},
};
export default function Page(){return <JapanExperienceLanding locale="en" mode="visit"/>;}
