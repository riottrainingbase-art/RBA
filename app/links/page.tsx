import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { InnerPage } from "@/components/inner-page";


export const metadata: Metadata = { title:"RBA Links", description:"Official RBA applications, communities, learning and supporter links.", alternates:{canonical:"/links"} };


const groups=[
  {label:"FOLLOW",items:[
    ["Instagram","Clinics, practice and RBA activity in motion","https://www.instagram.com/riot.basketball.academy/"],
    ["Threads","Development ideas and open conversation","https://www.threads.com/@riot.basketball.academy"],
    ["RBA Social Hub","Start with the channel that fits you","/social"],
  ]},
  {label:"JOIN",items:[
    ["Clinic Calendar","Dates and official application routes","/schedule"],
    ["Clinic advance announcements","Official LINE","https://lin.ee/5l1YG8N"],
    ["MY HOME COURT","RBA ID gateway · PLAYER / PARENT / COACH","/my-homecourt"],
    ["D-HUB","Separate selection & performance pathway","/d-hub"],
  ]},
  {label:"LEARN & DISCUSS",items:[
    ["RBA development theory","Articles on note","https://note.com/rba_official"],
    ["For parents who think about development","LINE open community","https://tinyurl.com/2nhmh545"],
    ["RBA coaching room","LINE open community","https://tinyurl.com/5n7a9sjx"],
  ]},
  {label:"SUPPORT RBA",items:[
    ["Supporter","JPY 1,000/month","https://square.link/u/5X67NUGD"],
    ["Development Support","JPY 3,000/month","https://square.link/u/gJM8sU5X"],
    ["Partner","JPY 10,000/month","https://square.link/u/mH8fTpgZ"],
  ]},
] as const;


export default function LinksPage(){return <InnerPage index="07" kicker="OFFICIAL LINKS" title={<>Everything RBA.<br />One clear place.</>} intro="Current social channels, applications, learning spaces, communities and supporter routes—organised from RBA’s official link hub." next={{label:"Contact RBA",href:"/contact"}}><section className="links-directory section-pad">{groups.map(g=><div className="link-group" key={g.label}><p className="section-index">{g.label}</p>{g.items.map(([title,desc,href])=><a href={href} target={href.startsWith("http")?"_blank":undefined} rel={href.startsWith("http")?"noreferrer":undefined} key={title}><div><h2>{title}</h2><p>{desc}</p></div><ArrowUpRight size={22}/></a>)}</div>)}</section><section className="source-note section-pad"><p>This directory was reconciled with RBA’s official Linktree on 18 September 2026. Linked services and application forms remain the source for their own final terms and availability.</p><a href="https://linktr.ee/riotbasketballacademy" target="_blank" rel="noreferrer">Open original Linktree <ArrowUpRight size={16}/></a></section></InnerPage>}
