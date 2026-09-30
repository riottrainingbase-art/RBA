"use client";

import { useEffect, useState } from "react";
import { Check, Share, Smartphone, X } from "lucide-react";

type Props={compact?:boolean};

export function IPhoneHomeScreenCard({compact=false}:Props){
  const [visible,setVisible]=useState(false);
  const [standalone,setStandalone]=useState(false);

  useEffect(()=>{
    const nav=navigator as Navigator & {standalone?:boolean};
    const isStandalone=Boolean(nav.standalone)||window.matchMedia("(display-mode: standalone)").matches;
    setStandalone(isStandalone);
    if(isStandalone)return;
    const ua=navigator.userAgent;
    const isiPhone=/iPhone|iPod/.test(ua);
    const dismissed=localStorage.getItem("rba-home-screen-dismissed")==="1";
    if(isiPhone&&!dismissed)setVisible(true);
  },[]);

  if(standalone||!visible)return null;

  function dismiss(){
    localStorage.setItem("rba-home-screen-dismissed","1");
    setVisible(false);
  }

  return <aside className={`iphone-home-screen-card${compact?" is-compact":""}`} aria-label="iPhoneのホーム画面にRBAを追加">
    <button className="iphone-home-screen-close" type="button" onClick={dismiss} aria-label="閉じる"><X/></button>
    <div className="iphone-home-screen-icon"><Smartphone/></div>
    <div className="iphone-home-screen-copy">
      <span>iPhone / 1 TAP ACCESS</span>
      <strong>RBAをホーム画面に置く</strong>
      <p>次回から検索不要。RBAアイコンを1回タップしてMY HOME COURTへ。</p>
      <ol>
        <li><Share/><span>Safariの<strong>共有</strong>をタップ</span></li>
        <li><span>「<strong>ホーム画面に追加</strong>」を選ぶ</span></li>
        <li><Check/><span>「<strong>Webアプリとして開く</strong>」をオン → 追加</span></li>
      </ol>
      <a href="/ja/journal/iphone-home-screen-rba-homecourt">画像なしで分かる3分ガイド →</a>
    </div>
  </aside>;
}
