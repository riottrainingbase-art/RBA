import type {Metadata} from "next";
import {PlatformOperatingSystem} from "@/components/platform-operating-system";

export const metadata:Metadata={
 manifest:"/rba-definitive/manifest.json",
 title:{absolute:"RBA Development Platform | One ID. One development journey."},
 description:"RBA connects identity, development records, opportunities, teams, coach education, international exchange, payments, safety and impact.",
 alternates:{canonical:`https://riotbasketballacademy.com/platform`,languages:{"en":"https://riotbasketballacademy.com/platform","ja":"https://riotbasketballacademy.com/ja/platform","zh-Hant-TW":"https://riotbasketballacademy.com/zh-tw/platform","ko":"https://riotbasketballacademy.com/ko/platform","x-default":"https://riotbasketballacademy.com/platform"}},
 openGraph:{title:"RBA Development Platform | One ID. One development journey.",description:"RBA connects identity, development records, opportunities, teams, coach education, international exchange, payments, safety and impact.",url:`https://riotbasketballacademy.com/platform`,siteName:"Riot Basketball Academy",type:"website",images:[{url:"https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"}]},
 twitter:{card:"summary_large_image",title:"RBA Development Platform | One ID. One development journey.",description:"RBA connects identity, development records, opportunities, teams, coach education, international exchange, payments, safety and impact.",images:["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"]}
};

export default function Page(){return <PlatformOperatingSystem locale="en"/>;}
