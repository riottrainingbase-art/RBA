import type { Metadata } from "next";
import { InternationalCoachInterest } from "@/components/international-coach-interest";
export const metadata: Metadata = {
 title:"International Online Coach Education Interest | Riot Basketball Academy",
 description:"Tell RBA what you would like to learn in a future international basketball coaching session. Speaker, date, fee and format are not confirmed. Free interest form; no payment or reservation.",
 alternates:{canonical:"https://riotbasketballacademy.com/international-coach-education",languages:{"ja":"https://riotbasketballacademy.com/ja/international-coach-education","en":"https://riotbasketballacademy.com/international-coach-education"}},
};
export default function Page(){return <InternationalCoachInterest locale="en"/>}
