import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { SiteFrame } from "@/components/site-frame";

export const metadata: Metadata = {
  title: "RBA Authentics | Official Apparel",
  description: "RBA Authentics by Gleam OKINAWA — the official apparel line of Riot Basketball Academy.",
  alternates: { canonical: "/authentics" },
};

const collection = [
  ["01", "T-SHIRT", "WHITE / BLACK", "Essential court and everyday wear.", "Price on request", "/rba-authentics-tshirt.jpg", "RBA Authentics T-Shirt"],
  ["02", "POLO SHIRT", "WHITE / BLACK", "A clean uniform for coaches and staff.", "Price on request", "/rba-authentics-polo.jpg", "RBA Authentics Polo Shirt"],
  ["03", "TANK TOP", "WHITE / BLACK", "Built for movement in the gym.", "Price on request", "/rba-authentics-tank.jpg", "RBA Authentics Tank Top"],
] as const;

export default function AuthenticsPage() {
  const whatsapp = "https://wa.me/818032483703?text=Hello%20RBA%2C%20I%20would%20like%20to%20ask%20about%20RBA%20Authentics%20apparel%2C%20sizes%20and%20availability.";
  return <SiteFrame>
    <section className="authentics-hero">
      <video autoPlay loop muted playsInline preload="metadata" poster="/rba-authentics-poster.jpg" aria-label="RBA Authentics apparel collection preview">
        <source src="/rba-authentics-collection.mp4" type="video/mp4" />
      </video>
      <div className="authentics-shade" aria-hidden="true" />
      <div className="authentics-hero-copy">
        <Link href="/" className="authentics-back">RBA / OFFICIAL LINE</Link>
        <p>RBA AUTHENTICS · BY GLEAM® OKINAWA</p>
        <h1>Wear the<br/>work.</h1>
        <span>COURT / COMMUNITY / DEVELOPMENT</span>
      </div>
      <div className="authentics-drop">COLLECTION<br/><strong>01</strong></div>
    </section>

    <section className="authentics-intro section-pad">
      <div className="authentics-badge-wrap"><Image src="/rba-authentics-badge.jpeg" alt="RBA Authentics youth basketball development emblem" width={604} height={764} priority /></div>
      <div><p className="section-index">THE OFFICIAL APPAREL LINE</p><h2>Not merchandise.<br/>A mark of belonging.</h2><p>RBA Authentics carries the identity of Riot Basketball Academy beyond the session. Designed in black and white for players, coaches and the community growing around youth basketball development.</p><p className="authentics-jp">コートで積み重ねる姿勢を、日常にも。RBAの育成文化を身に着ける公式アパレルラインです。</p></div>
    </section>

    <section className="authentics-collection section-pad">
      <div className="section-head"><div><p className="section-index inverse">RBA AUTHENTICS / CORE</p><h2>Three forms.<br/>Two tones.</h2></div><p>Choose the item, then send the prepared order request. RBA confirms the current production window and shipping before payment.</p></div>
      <div className="authentics-grid">{collection.map(([number, name, colours, copy, price, image, orderName]) => {
        const orderHref=`https://wa.me/818032483703?text=${encodeURIComponent(`RBA AUTHENTICS ORDER REQUEST\nItem: ${orderName}\nPlease confirm: colour (White / Black), size (S / M / L / XL), quantity and delivery country.`)}`;
        return <article key={number}><div className="authentics-product-image"><Image src={image} alt={`${orderName}, white and black`} width={1600} height={1100}/><span>{number}</span></div><div className="authentics-product-copy"><p>{colours} · S / M / L / XL</p><h3>{name}</h3><strong>{price}</strong><small>{copy}</small><a className="button button-light" href={orderHref} target="_blank" rel="noreferrer">Enquire about this item <MessageCircle size={16}/></a></div></article>;
      })}</div>
    </section>

    <section className="authentics-order section-pad">
      <div><p className="section-index">ORDER / TEAM ENQUIRY</p><h2>Individual.<br/>Clinic.<br/>Team.</h2></div>
      <div><p>Contact RBA about individual or team apparel. We will confirm availability, sizes, price, shipping and delivery timing before you decide whether to order. An enquiry does not place an order.</p><a className="button button-dark" href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={17}/> Ask about Authentics</a><a className="text-link" href="/contact">Contact RBA <ArrowRight size={16}/></a></div>
    </section>
  </SiteFrame>;
}