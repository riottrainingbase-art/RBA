"use client";
import { useEffect, useRef, useState } from "react";
import { Music2, VolumeX } from "lucide-react";
import type { Locale } from "./site-frame";

const copy={
 en:{label:"RBA / GLOBAL MINDSET",title:"Rooted in Japan. Open to the world.",body:"A quiet visual interlude from RBA's work. Optional original ambient sound is always off until you choose to play it.",on:"Play ambient sound",off:"Stop ambient sound"},
 ja:{label:"RBA / 世界へつながる視点",title:"日本の現場から、世界を見据える。",body:"RBAの活動風景を短い映像で紹介します。音声は初期状態では再生されません。ご覧になる場合は、下のボタンを押してください。",on:"音声を再生",off:"音声を停止"},
 "zh-tw":{label:"RBA / 全球視野",title:"扎根日本，放眼世界。",body:"以短片呈現RBA的活動現場。原創環境音預設關閉，僅在您選擇後播放。",on:"播放環境音",off:"停止環境音"},
 ko:{label:"RBA / 글로벌 관점",title:"일본 현장에서 세계를 바라봅니다.",body:"RBA의 활동을 짧은 영상으로 소개합니다. 오리지널 앰비언트 사운드는 사용자가 선택할 때만 재생됩니다.",on:"환경음 재생",off:"환경음 정지"}
} as const;

export function GlobalMedia({locale}:{locale:Locale}){
 const [playing,setPlaying]=useState(false); const audio=useRef<{context:AudioContext;osc:OscillatorNode[]}|null>(null); const c=copy[locale];
 const stop=()=>{audio.current?.osc.forEach(o=>{try{o.stop()}catch{}}); void audio.current?.context.close(); audio.current=null; setPlaying(false)};
 useEffect(()=>stop,[]);
 const toggle=()=>{if(audio.current){stop();return;} const W=window as typeof window&{webkitAudioContext?:typeof AudioContext}; const AudioCtor=window.AudioContext||W.webkitAudioContext;if(!AudioCtor)return;const context=new AudioCtor();const gain=context.createGain();gain.gain.value=.018;gain.connect(context.destination);const osc=[110,164.81,220].map((frequency,i)=>{const o=context.createOscillator();o.type=i===1?"sine":"triangle";o.frequency.value=frequency;const g=context.createGain();g.gain.value=i===1?.7:.35;o.connect(g).connect(gain);o.start();return o});audio.current={context,osc};setPlaying(true)};
 return <section className="global-media" aria-labelledby="global-media-title"><video autoPlay muted loop playsInline preload="metadata" aria-hidden="true"><source src="/rba-authentics-collection.mp4" type="video/mp4"/></video><div className="global-media-shade"/><div className="global-media-copy"><p className="section-index inverse">{c.label}</p><h2 id="global-media-title">{c.title}</h2><p>{c.body}</p><button type="button" className="button button-light" onClick={toggle} aria-pressed={playing}>{playing?<VolumeX size={17}/>:<Music2 size={17}/>} {playing?c.off:c.on}</button></div></section>;
}