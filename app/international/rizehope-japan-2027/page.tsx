import type { Metadata } from "next";
import { RizehopeEventLanding } from "@/components/rizehope-event-landing";
export const metadata: Metadata = {
  title:"RIZEHOPE JAPAN 2027 | U12 International Basketball Exchange & Airport Transfer Options",
  description:"27–28 February 2027 in Shibata, Miyagi. Free international U12 team interest, safe Narita/Sendai airport transfer planning and responsible sponsorship enquiries. Travel not yet bookable.",
  alternates:{canonical:"https://riotbasketballacademy.com/international/rizehope-japan-2027",languages:{en:"https://riotbasketballacademy.com/international/rizehope-japan-2027",ja:"https://riotbasketballacademy.com/ja/international/rizehope-japan-2027","x-default":"https://riotbasketballacademy.com/international/rizehope-japan-2027"}},
  openGraph:{title:"RIZEHOPE JAPAN 2027 | U12 Exchange",description:"Free team interest. Shibata, Miyagi 27–28 February 2027. Narita and Sendai arrival options under planning.",images:[{url:"/rba-logo-original.jpg"}]}
};
export default function Page(){return <RizehopeEventLanding locale="en"/>;}
