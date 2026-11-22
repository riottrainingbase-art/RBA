import type { Metadata } from "next";
import { ChibaCamp2027 } from "@/components/chiba-camp-2027";
const url = "https://riotbasketballacademy.com/events/chiba-development-camp-2027";
export const metadata: Metadata = {
  title: "RBA Chiba Development Camp 2027 | March 27–28 | Register & Pay",
  description: "Youth basketball development camp in Kanzaki, Chiba, Japan, March 27–28, 2027. U12/U15 boys and girls welcome from Japan and overseas. International camp-only fees: USD $219 for both days or USD $129 for one day, tax included. No accommodation, flights, food, airport transfers or other travel included. Guardian application, then secure USD Stripe payment.",
  alternates: { canonical:url, languages: { en:url, ja:"https://riotbasketballacademy.com/ja/events/chiba-development-camp-2027" } },
  openGraph: { title:"RBA CHIBA DEVELOPMENT CAMP 2027", description:"Read. Decide. Play. March 27–28, 2027, Kanzaki, Chiba, Japan. Overseas players welcome. 2 days $219 / 1 day $129 USD; camp instruction only.",url,locale:"en_US",type:"website",siteName:"Riot Basketball Academy",images:["/rba-logo-original.jpg"] }
};
export default function Page() { return <ChibaCamp2027 locale="en" />; }
