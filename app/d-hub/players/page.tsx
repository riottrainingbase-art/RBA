import type {Metadata} from "next";
import {DefinitiveStaticPage} from "@/components/definitive-static-page";

export const metadata:Metadata={
  title:{absolute:"D-HUB PLAYERS | Riot Basketball Academy"},
  description:"Ongoing player development for U10, U12 and U15: perception, decision-making, execution, game experience, recovery and reflection.",
  alternates:{
    canonical:"https://riotbasketballacademy.com/d-hub/players",
    languages:{
      en:"https://riotbasketballacademy.com/d-hub/players",
      ja:"https://riotbasketballacademy.com/ja/d-hub/players",
      "x-default":"https://riotbasketballacademy.com/d-hub/players"
    }
  }
};

export default function Page(){
  return <DefinitiveStaticPage page="d-hub-players" locale="en"/>;
}
