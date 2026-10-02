import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteFrame } from "@/components/site-frame";

export default function NotFound(){
  return <SiteFrame locale="en"><section className="system-state-page section-pad">
    <p className="section-index">404 / PAGE NOT FOUND</p>
    <h1>This page could not be found.</h1>
    <p>The URL may have changed or the page may no longer be public.</p>
    <div className="system-state-actions">
      <Link className="button button-dark" href="/opportunities">Find opportunities <ArrowRight size={16}/></Link>
      <Link className="button button-light" href="/">RBA home</Link>
    </div>
  </section></SiteFrame>;
}
