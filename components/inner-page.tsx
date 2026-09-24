import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { SiteFrame } from "@/components/site-frame";

export function InnerPage({ index, kicker, title, intro, children, next, languagePage }: { index: string; kicker: string; title: React.ReactNode; intro: string; children: React.ReactNode; next?: { label: string; href: string }; languagePage?: "schedule"|"social" }) {
  return <SiteFrame languagePage={languagePage}>
    <section className="inner-hero section-pad"><Link href="/" className="back-link"><ArrowLeft size={15} /> Home</Link><p className="section-index">{index} / {kicker}</p><h1>{title}</h1><p>{intro}</p></section>
    {children}
    {next && <section className="next-page section-pad"><p>CONTINUE</p><a href={next.href}>{next.label} <ArrowRight size={22} /></a></section>}
  </SiteFrame>;
}