import type {Metadata} from "next";
import {DefinitiveStaticPage} from "@/components/definitive-static-page";

export const metadata:Metadata={
  title:{absolute:"D-HUB PLAYERS | Riot Basketball Academy"},
  description:"AssessmentからRe-assessmentまで継続して選手の成長を見るRBAの選手育成プログラム。",
  alternates:{
    canonical:"https://riotbasketballacademy.com/ja/d-hub/players",
    languages:{
      en:"https://riotbasketballacademy.com/d-hub/players",
      ja:"https://riotbasketballacademy.com/ja/d-hub/players",
      "x-default":"https://riotbasketballacademy.com/d-hub/players"
    }
  }
};

export default function Page(){
  return <DefinitiveStaticPage page="d-hub-players" locale="ja"/>;
}
