import type {Metadata} from "next";
import {PlatformOperatingSystem} from "@/components/platform-operating-system";

export const metadata:Metadata={
 manifest:"/rba-definitive/manifest.json",
 title:{absolute:"RBA育成プラットフォーム | 育成を、単発で終わらせない。"},
 description:"選手・保護者・指導者・チーム・主催者・海外アカデミーを、RBA ID、MY HOME COURT、育成機会、安全、決済でつなぐプラットフォーム。",
 alternates:{canonical:`https://riotbasketballacademy.com/ja/platform`,languages:{"en":"https://riotbasketballacademy.com/platform","ja":"https://riotbasketballacademy.com/ja/platform","zh-Hant-TW":"https://riotbasketballacademy.com/zh-tw/platform","ko":"https://riotbasketballacademy.com/ko/platform","x-default":"https://riotbasketballacademy.com/platform"}},
 openGraph:{title:"RBA育成プラットフォーム | 育成を、一つの流れに。",description:"選手・保護者・指導者・チーム・主催者・海外アカデミーを、RBA ID、MY HOME COURT、育成機会、安全、決済でつなぐプラットフォーム。",url:`https://riotbasketballacademy.com/ja/platform`,siteName:"Riot Basketball Academy",type:"website",images:[{url:"https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"}]},
 twitter:{card:"summary_large_image",title:"RBA育成プラットフォーム | 育成を、一つの流れに。",description:"選手・保護者・指導者・チーム・主催者・海外アカデミーを、RBA ID、MY HOME COURT、育成機会、安全、決済でつなぐプラットフォーム。",images:["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"]}
};

export default function Page(){return <PlatformOperatingSystem locale="ja"/>;}
