import type { Metadata } from "next";
import Image from "next/image";
import { SiteFrame } from "@/components/site-frame";
import { GrowthClickTracking } from "@/components/growth-click-tracking";
import { collectionCheckout } from "@/lib/store-collection-release";

export const metadata: Metadata = {
  title: "RBA公式オンラインショップ｜COLLECTION 001",
  description: "白Tシャツと黒セットアップを受注販売。国内送料無料。ご注文から3週間を目安に発送します。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/store" },
};

export default function StorePage() {
  const teeCheckout=collectionCheckout("tee"),setupCheckout=collectionCheckout("setup");
  return <SiteFrame locale="ja"><GrowthClickTracking/><main><section aria-labelledby="collection-title" className="rba-atelier">
<header><h1 id="collection-title">RBA <span>Collection 001</span></h1><p>受注販売 ｜ 国内送料無料 ｜ ご注文から3週間を目安に発送</p></header>
<div className="atelier-grid"><article><a href="https://cdn.shopify.com/s/files/1/0841/4098/2529/files/rba-white-tee-concept-detail-20261120.jpg?v=1795103081" target="_blank" rel="noopener noreferrer" aria-label="WHITE TEEの商品イメージを拡大"><Image unoptimized src="https://cdn.shopify.com/s/files/1/0841/4098/2529/files/rba-white-tee-concept-detail-20261120.jpg?v=1795103081" alt="白のヘビーウェイトTシャツの全体とロゴ部分のデザインイメージ" width={1300} height={1200} sizes="(max-width: 720px) 100vw, 48vw" /></a><h2>WHITE TEE</h2><p>綿100％の厚手の生地を使いました。ほどよいハリがあり、肌触りはさらっとしています。</p><p>¥6,600（税込）</p><p>S / M / L / XL</p>{teeCheckout?<a href={teeCheckout} data-growth-id="store-collection-tee-buy">サイズを選んで購入する <span aria-hidden="true">→</span></a>:<p>購入受付準備中</p>}</article><article><a href="https://cdn.shopify.com/s/files/1/0841/4098/2529/files/rba-black-setup-concept-detail-20261120.jpg?v=1795103099" target="_blank" rel="noopener noreferrer" aria-label="BLACK SETUPの商品イメージを拡大"><Image unoptimized src="https://cdn.shopify.com/s/files/1/0841/4098/2529/files/rba-black-setup-concept-detail-20261120.jpg?v=1795103099" alt="黒のフーディー＋スウェットパンツの全体とロゴ部分のデザインイメージ" width={1300} height={1200} sizes="(max-width: 720px) 100vw, 48vw" /></a><h2>BLACK SETUP</h2><p>パーカーもパンツも、裏起毛でやわらかな着心地です。厚手の黒い生地に、小さなRBAワッペンを合わせました。</p><p>¥19,800（税込）</p><p>上 S〜XXL ／ 下 M〜XL（上下別に選択）</p>{setupCheckout?<a href={setupCheckout} data-growth-id="store-collection-setup-buy">サイズを選んで購入する <span aria-hidden="true">→</span></a>:<p>購入受付準備中</p>}</article></div>
<style>{`
.rba-atelier{background:#faf9f6;color:#24231f;padding:clamp(28px,5vw,80px) max(5vw,calc((100vw - 1280px)/2));font-family:inherit}
.rba-atelier header{border-bottom:1px solid #bdb9af;margin-bottom:clamp(20px,3vw,44px);padding-bottom:20px}
.rba-atelier h1,.rba-atelier h2{font-family:Georgia,"Times New Roman",serif;font-weight:400;line-height:1.12;letter-spacing:-.035em}
.rba-atelier h1{font-size:clamp(34px,6vw,82px);margin:0 0 12px}.rba-atelier h1 span{font-style:italic}
.rba-atelier header p,.rba-atelier article p{font-size:14px;line-height:1.85}
.atelier-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(24px,4vw,64px)}
.atelier-grid article{display:flex;flex-direction:column}.atelier-grid article>a:first-child{display:block;background:#f0eee9}.atelier-grid img{display:block;width:100%;height:auto;aspect-ratio:1.06;object-fit:contain}
.atelier-grid h2{font-size:clamp(27px,3vw,46px);margin:22px 0 10px}.atelier-grid article p{margin:0 0 8px}.atelier-grid article p:nth-of-type(2){font-size:18px;margin-top:auto;padding-top:10px;font-variant-numeric:tabular-nums}.atelier-grid article p:nth-of-type(3){color:#514e46}
.atelier-grid article>a:last-child{display:flex;align-items:center;justify-content:space-between;background:#24231f;color:white;padding:16px 20px;margin-top:8px;text-decoration:none;font-size:14px;letter-spacing:.04em}.atelier-grid article>a:last-child:hover{background:#413f38}.rba-atelier a:focus-visible,.rba-atelier summary:focus-visible{outline:3px solid #826143;outline-offset:3px}
.rba-atelier details{border-block:1px solid #c8c4bc;margin-top:40px;padding:18px 0;font-size:14px}.rba-atelier summary{cursor:pointer}.rba-atelier details p{max-width:65ch;line-height:1.9;margin:14px 0}.rba-atelier details a{text-decoration:underline}
@media(max-width:680px){.atelier-grid{grid-template-columns:1fr;gap:40px}.rba-atelier{padding-inline:18px}.rba-atelier header p{font-size:12px}.atelier-grid h2{margin-top:16px}}
`}</style><details><summary>商品・配送・返品について</summary><p>販売者：Riot Basketball Academy（西尾優人）。掲載画像は仕上がりイメージです。日本国内送料は無料、全額前払いです。注文から3週間を目安に発送します。未使用品の返品は到着後8日以内にご連絡ください。お客様都合の返送料はお客様負担、不良・誤配送はRBA負担で交換または返金します。納期を守れない場合は事前にご連絡し、継続または全額返金のご希望を伺います。</p><p>所在地は購入前のご請求に応じて電子メールで開示します。</p><a href="mailto:riot.training.base@gmail.com">お問い合わせ</a></details></section></main></SiteFrame>;
}
