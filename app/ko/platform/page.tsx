import type {Metadata} from "next";
import {PlatformOperatingSystem} from "@/components/platform-operating-system";

export const metadata:Metadata={
 manifest:"/rba-definitive/manifest.json",
 title:{absolute:"RBA 육성 플랫폼 | 하나의 성장 여정"},
 description:"RBA ID를 중심으로 선수, 보호자, 코치, 팀, 주최자와 국제 파트너를 연결하는 육성 플랫폼.",
 alternates:{canonical:`https://riotbasketballacademy.com/ko/platform`,languages:{"en":"https://riotbasketballacademy.com/platform","ja":"https://riotbasketballacademy.com/ja/platform","zh-Hant-TW":"https://riotbasketballacademy.com/zh-tw/platform","ko":"https://riotbasketballacademy.com/ko/platform","x-default":"https://riotbasketballacademy.com/platform"}},
 openGraph:{title:"RBA 육성 플랫폼 | 하나의 성장 여정",description:"RBA ID를 중심으로 선수, 보호자, 코치, 팀, 주최자와 국제 파트너를 연결하는 육성 플랫폼.",url:`https://riotbasketballacademy.com/ko/platform`,siteName:"Riot Basketball Academy",type:"website",images:[{url:"https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"}]},
 twitter:{card:"summary_large_image",title:"RBA 육성 플랫폼 | 하나의 성장 여정",description:"RBA ID를 중심으로 선수, 보호자, 코치, 팀, 주최자와 국제 파트너를 연결하는 육성 플랫폼.",images:["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"]}
};

export default function Page(){return <PlatformOperatingSystem locale="ko"/>;}
