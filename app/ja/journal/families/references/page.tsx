import type {Metadata} from "next";
import {PublicFamilyReferenceLibrary} from "@/components/public-journal";

export const dynamic="force-dynamic";
export const revalidate=0;

export const metadata:Metadata={
  title:"RBA JOURNAL 参考文献ライブラリ｜保護者向け",
  description:"保護者向けRBA JOURNALで使用しているJBA、FIBA/WABC、IOC、AAP、CDC、系統的レビュー、メタ解析などの参考文献をまとめて確認できます。",
  alternates:{canonical:"https://riotbasketballacademy.com/ja/journal/families/references"},
  openGraph:{
    title:"RBA JOURNAL 参考文献ライブラリ｜保護者向け",
    description:"何を根拠に書いているのかを見える場所へ。公式資料、レビュー、コンセンサス、医療・安全資料を整理しています。",
    url:"https://riotbasketballacademy.com/ja/journal/families/references",
    siteName:"Riot Basketball Academy",
    locale:"ja_JP",
    type:"website",
    images:["https://riotbasketballacademy.com/rba-court-hero.png"]
  },
  twitter:{
    card:"summary_large_image",
    title:"RBA JOURNAL 参考文献ライブラリ",
    description:"保護者向けJOURNALの参考文献と出典方針を公開しています。",
    images:["https://riotbasketballacademy.com/rba-court-hero.png"]
  }
};

export default function Page(){
  return <PublicFamilyReferenceLibrary locale="ja"/>;
}
