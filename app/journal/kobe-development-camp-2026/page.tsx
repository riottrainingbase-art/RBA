import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";

export const metadata: Metadata = {
  title: "Tatsuno Development Camp 2026 | Event closed",
  description: "The November youth basketball camp in Tatsuno, Hyogo, has ended. Thank you to the players, families and local coaches who took part.",
  alternates: { canonical: "/journal/kobe-development-camp-2026" },
};

export default function TatsunoCampArchive() {
  return (
    <SiteFrame locale="en">
      <section className="section-pad">
        <p className="section-index">HYOGO / TATSUNO · NOVEMBER 2026</p>
        <h1>Tatsuno Development Camp 2026 | Event closed</h1>
        <p>The November youth basketball camp in Tatsuno, Hyogo, has ended. Thank you to the players, families and local coaches who took part.</p>
        <p><a className="button button-dark" href="/schedule">View upcoming programmes</a></p>
        <p><a href="/contact">Contact RBA about your participation</a></p>
      </section>
    </SiteFrame>
  );
}
