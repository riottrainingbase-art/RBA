import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteFrame } from "@/components/site-frame";


export const metadata:Metadata={title:"RBA Journal | Basketball Development in Japan",description:"Practical guides, field notes and programme information for players, families, coaches and academies connecting with basketball in Japan.",alternates:{canonical:"/journal"}};


const articles=[
  {no:"04",tag:"OPEN PROGRAMME · NOV 20–23, 2026",title:"Kobe Development Camp 2026: the complete guide for international players",copy:"Dates, training themes, participation options, language support, accommodation packages and registration in one place.",href:"/journal/kobe-development-camp-2026"},
  {no:"03",tag:"ASIA PARTNERSHIP",title:"How to build a Japan–Asia relationship that lasts beyond one event",copy:"A practical model for collaboration built through useful work, honest reflection and one credible next step.",href:"/journal/building-a-real-asia-basketball-relationship"},
  {no:"02",tag:"ROLES & RESPONSIBILITIES",title:"What RBA can coordinate—and what must stay with your organisation",copy:"Clear responsibilities for overseas academies, teams and coaches planning a basketball programme in Japan.",href:"/journal/what-rba-coordinates-in-japan"},
  {no:"01",tag:"JAPAN EXCHANGE",title:"Plan a Japan basketball exchange without turning it into sports tourism",copy:"Begin with the development purpose, choose depth over volume and build a second step before the visit ends.",href:"/journal/plan-a-japan-basketball-exchange"},
] as const;


export default function JournalPage(){return <SiteFrame><div className="journal-hub"><section className="inner-hero section-pad"><Link className="back-link" href="/">← RBA</Link><p className="section-index">RBA JOURNAL</p><h1>Useful ideas.<br/>Real programmes.</h1><p>Guides and field notes for players, families, coaches and academies who want to understand RBA—and connect with basketball in Japan.</p></section><section className="journal-index section-pad">{articles.map(a=><Link href={a.href} key={a.no}><span>{a.no}</span><div><p className="note-tag">{a.tag}</p><h3>{a.title}</h3><p>{a.copy}</p></div><ArrowRight size={24}/></Link>)}</section></div></SiteFrame>}
