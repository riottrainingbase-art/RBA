import type { Metadata } from "next";
import Image from "next/image";
import { SiteFrame } from "@/components/site-frame";
import { GrowthClickTracking } from "@/components/growth-click-tracking";

export const metadata: Metadata = {
  title: "RBA公式オンラインショップ｜COLLECTION 001",
  description: "白Tシャツと黒セットアップを受注販売。国内送料無料。ご注文から3週間を目安に発送します。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/store" },
};

export default function StorePage() {
  return <SiteFrame locale="ja"><GrowthClickTracking/><main><section aria-labelledby="collection-title" style={{background:"#fff",color:"#111",padding:"clamp(16px,4vw,64px)"}}>
<header style={{borderBottom:"1px solid #aaa",paddingBottom:16,marginBottom:20}}><h1 id="collection-title" style={{fontSize:"clamp(26px,4vw,54px)",fontWeight:700,letterSpacing:"-.04em"}}>RBA COLLECTION 001</h1><p>受注販売 ｜ 国内送料無料 ｜ ご注文から3週間を目安に発送</p></header>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,320px),1fr))",gap:"clamp(20px,3vw,48px)"}}><article><a href="https://cdn.shopify.com/s/files/1/0841/4098/2529/files/rba-white-tee-concept-detail-20261120.jpg?v=1795103081" target="_blank" rel="noreferrer" aria-label="WHITE TEEの商品イメージを拡大"><Image unoptimized src="https://cdn.shopify.com/s/files/1/0841/4098/2529/files/rba-white-tee-concept-detail-20261120.jpg?v=1795103081" alt="白のヘビーウェイトTシャツの全体とロゴ部分のデザインイメージ" width={1300} height={1200} sizes="(max-width: 720px) 100vw, 48vw" style={{width:"100%",height:"auto",aspectRatio:"1.12",objectFit:"contain",background:"#f7f7f7"}} /></a><h2 style={{fontSize:"1.55rem",fontWeight:700,marginTop:12}}>WHITE TEE</h2><p>白のヘビーウェイトTシャツ</p><p style={{fontWeight:700,marginTop:8}}>¥6,600（税込）</p><p style={{margin:"8px 0 14px"}}>S / M / L / XL</p><a href="https://buy.stripe.com/aFa7sN6ab8vy1Mp9gr7EQ1Q" style={{display:"block",background:"#111",color:"#fff",textAlign:"center",padding:"15px",fontWeight:700}}>サイズを選んで購入する</a></article><article><a href="https://cdn.shopify.com/s/files/1/0841/4098/2529/files/rba-black-setup-concept-detail-20261120.jpg?v=1795103099" target="_blank" rel="noreferrer" aria-label="BLACK SETUPの商品イメージを拡大"><Image unoptimized src="https://cdn.shopify.com/s/files/1/0841/4098/2529/files/rba-black-setup-concept-detail-20261120.jpg?v=1795103099" alt="黒のフーディー＋スウェットパンツの全体とロゴ部分のデザインイメージ" width={1300} height={1200} sizes="(max-width: 720px) 100vw, 48vw" style={{width:"100%",height:"auto",aspectRatio:"1.12",objectFit:"contain",background:"#f7f7f7"}} /></a><h2 style={{fontSize:"1.55rem",fontWeight:700,marginTop:12}}>BLACK SETUP</h2><p>黒のフーディー＋スウェットパンツ</p><p style={{fontWeight:700,marginTop:8}}>¥19,800（税込）</p><p style={{margin:"8px 0 14px"}}>上 S〜XXL ／ 下 M〜XL（上下別に選択）</p><a href="https://buy.stripe.com/bJe4gB1TVh241Mp3W77EQ1P" style={{display:"block",background:"#111",color:"#fff",textAlign:"center",padding:"15px",fontWeight:700}}>サイズを選んで購入する</a></article></div>
<details style={{borderTop:"1px solid #bbb",marginTop:28,paddingTop:14}}><summary>商品・配送・返品について</summary><p>掲載画像は仕上がりイメージです。国内送料は無料です。未使用品の返品は到着後8日以内にご連絡ください。お客様都合の返送料はお客様負担、不良・誤配送はRBA負担で交換または返金します。</p><a href="mailto:riot.training.base@gmail.com">お問い合わせ</a></details></section></main></SiteFrame>;
}
