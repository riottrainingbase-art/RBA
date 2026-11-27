import type { Metadata } from "next";
import { TaipeiClinic2026 } from "@/components/taipei-development-clinic-2026";
const url="https://taipei.riotbasketballacademy.com/events/taipei-development-clinic-2026";
export const metadata: Metadata = {
 title: "RBA × SPARTANS Taipei Development Clinics | December 11–13, 2026",
 description: "Venue-booked clinics in Tianmu (Fri 18:30), Neihu (Sat 16:00), and Linkou (Sun 14:00). SPARTANS handles all registration enquiries and event payment instructions.",
 alternates: {canonical:url,languages:{ja:"https://taipei.riotbasketballacademy.com/ja/events/taipei-development-clinic-2026","zh-Hant-TW":"https://taipei.riotbasketballacademy.com/zh-tw/events/taipei-development-clinic-2026",en:"https://taipei.riotbasketballacademy.com/events/taipei-development-clinic-2026"}},
 openGraph:{title:"RBA × SPARTANS Taipei Development Clinics | December 11–13, 2026",description:"Venue-booked clinics in Tianmu (Fri 18:30), Neihu (Sat 16:00), and Linkou (Sun 14:00). SPARTANS handles all registration enquiries and event payment instructions.",url,siteName:"Riot Basketball Academy × SPARTANS",type:"website"}
};
export default function Page(){return <TaipeiClinic2026 locale="en"/>;}
