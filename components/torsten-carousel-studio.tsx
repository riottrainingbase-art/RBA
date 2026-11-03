"use client";
import {useEffect,useState} from "react";

type Slide={theme:string;headline:string[];body:string[]};
const slides:Slide[]=[
{theme:"QUESTION",headline:["練習では入る。","試合では、","なぜ打てない？"],body:["シュートを「フォーム」だけで","考えていませんか。"]},
{theme:"PERCEPTION",headline:["シュートの前に、","ゲームがある。"],body:["相手がいる。味方が動く。時間がない。","練習と試合では、処理する情報が違う。"]},
{theme:"SEE",headline:["まず、何を","見るかを育てる。"],body:["ディフェンスの位置、距離、空いたスペース。","「打てる状況」を認識できているか。"]},
{theme:"PREPARE",headline:["ボールを受けてから","考えていないか。"],body:["身体の向き、足の準備、視線。","シュートの準備は、キャッチ前から始まる。"]},
{theme:"DECIDE",headline:["良い判断＝","必ずシュート、","ではない。"],body:["打つ。運ぶ。つなぐ。","今、何が有利かを選び取る。"]},
{theme:"SPACING",headline:["立ち位置で、","シュートは変わる。"],body:["味方全員の位置関係が、","次のチャンスをつくる。"]},
{theme:"PRACTICE",headline:["本数を増やす。","それだけで","終わらせない。"],body:["視野・時間・守備の圧力を練習に組み込む。","基礎の反復も、ゲームとの接続も大切。"]},
{theme:"COACHING",headline:["試合で打てない理由を","説明できますか。"],body:["技術の問題か。認知や判断か。","原因を見ずに、ドリルだけ増やさない。"]},
{theme:"RBA APPROACH",headline:["技術と判断を、","切り離さない。"],body:["選手を観察し、練習の条件を変える。","RBAは「試合で使う力」を育てたい。"]},
{theme:"JOIN",headline:["その先の学びを、","11月25日に。"],body:["TORSTEN LOIBL ONLINE CLINIC Vol.2","20:00–21:30｜Zoom・日本語逐次通訳","LIVE 3,300円 / 30日録画 4,400円（税込）"]}
];
const site="https://riotbasketballacademy.com/ja/instagram";
const mainLink="https://riotbasketballacademy.com/ja/events/torsten-loibl-online-clinic";
function fit(c:CanvasRenderingContext2D,lines:string[],size:number,min:number,weight:number){
  for(let n=size;n>=min;n-=2){
    c.font=weight+" "+n+'px "Noto Sans JP","Hiragino Kaku Gothic ProN",sans-serif';
    if(lines.every(s=>c.measureText(s).width<=927))return n;
  }return min;
}
function draw(slide:Slide,index:number,logo:HTMLImageElement|null){
 const cv=document.createElement("canvas");cv.width=1080;cv.height=1080;
 const c=cv.getContext("2d");if(!c)return cv;
 c.fillStyle="#fcfcfc";c.fillRect(0,0,1080,1080);
 c.strokeStyle="#ddd";c.lineWidth=2;c.strokeRect(35,35,1010,1010);
 c.beginPath();c.lineWidth=7;c.strokeStyle="#171717";c.arc(1051,42,281,0,Math.PI*2);c.stroke();
 c.beginPath();c.lineWidth=2;c.strokeStyle="#999";c.arc(1051,42,202,0,Math.PI*2);c.stroke();
 if(logo)c.drawImage(logo,70,61,75,115);else{c.fillStyle="#111";c.font="900 42px sans-serif";c.fillText("RBA",70,117);}
 c.fillStyle="#111";c.font='900 27px "Noto Sans JP",sans-serif';
 c.fillText("RIOT BASKETBALL",170,102);c.fillText("ACADEMY",170,137);
 c.font="900 29px sans-serif";c.fillText(String(index+1).padStart(2,"0")+" / 10",864,104);
 c.fillRect(70,209,936,5);
 c.fillStyle="#555";c.font="800 24px sans-serif";c.fillText(slide.theme+" / "+String(index+1).padStart(2,"0"),71,278);
 const font=fit(c,slide.headline,index===7?74:82,46,900);
 c.fillStyle="#101010";c.font='900 '+font+'px "Noto Sans JP","Hiragino Kaku Gothic ProN",sans-serif';
 let y=slide.headline.length>=3?375:397;
 for(const line of slide.headline){c.fillText(line,68,y);y+=Math.round(font*1.46);}
 if(index===9){
   c.font='800 31px "Noto Sans JP",sans-serif';c.fillText(slide.body[0],74,723);
   c.fillStyle="#e9e9e9";c.fillRect(68,745,935,67);
   c.fillStyle="#111";c.font='700 29px "Noto Sans JP",sans-serif';c.fillText(slide.body[1],77,793);
   c.fillStyle="#111";c.fillRect(68,824,935,70);c.fillStyle="#fff";
   c.font='800 29px "Noto Sans JP",sans-serif';c.fillText(slide.body[2],79,872);
   c.fillStyle="#111";c.font="700 23px sans-serif";c.fillText("PROFILE LINK → "+site,71,938);
 }else{
   const size=fit(c,slide.body,35,25,500);
   c.fillStyle="#555";c.font='500 '+size+'px "Noto Sans JP","Hiragino Kaku Gothic ProN",sans-serif';
   let by=Math.max(y+28,slide.headline.length===3?795:734);
   for(const line of slide.body){c.fillText(line,74,by);by+=size*1.84;}
 }
 c.fillStyle="#111";c.fillRect(35,957,1010,88);
 c.fillStyle="#fff";c.font="800 25px sans-serif";c.fillText("RBA / BETTER PLAYERS. BETTER TOMORROW.",74,1016);
 c.font="800 23px sans-serif";c.fillText(String(index+1).padStart(2,"0")+"—10",898,1015);
 return cv;
}
function crc32(data:Uint8Array){
 let v=0xffffffff;for(const x of data){v^=x;for(let j=0;j<8;j++)v=v&1?(v>>>1)^0xedb88320:v>>>1;}
 return(v^0xffffffff)>>>0;
}
function zip(files:Array<{name:string;data:Uint8Array}>){
 const te=new TextEncoder(),parts:ArrayBuffer[]=[],centers:ArrayBuffer[]=[];let offset=0,centralSize=0;
 const plain=(arr:Uint8Array)=>arr.slice().buffer as ArrayBuffer;
 for(const f of files){
  const name=te.encode(f.name),size=f.data.byteLength,crc=crc32(f.data);
  const local=new Uint8Array(30+name.length),lv=new DataView(local.buffer);
  lv.setUint32(0,0x04034b50,true);lv.setUint16(4,20,true);
  lv.setUint32(14,crc,true);lv.setUint32(18,size,true);lv.setUint32(22,size,true);
  lv.setUint16(26,name.length,true);local.set(name,30);parts.push(plain(local),plain(f.data));
  const cen=new Uint8Array(46+name.length),cv=new DataView(cen.buffer);
  cv.setUint32(0,0x02014b50,true);cv.setUint16(4,20,true);cv.setUint16(6,20,true);
  cv.setUint32(16,crc,true);cv.setUint32(20,size,true);cv.setUint32(24,size,true);
  cv.setUint16(28,name.length,true);cv.setUint32(42,offset,true);cen.set(name,46);
  centers.push(plain(cen));centralSize+=cen.length;offset+=local.length+size;
 }
 const end=new Uint8Array(22),ev=new DataView(end.buffer);
 ev.setUint32(0,0x06054b50,true);ev.setUint16(8,files.length,true);ev.setUint16(10,files.length,true);
 ev.setUint32(12,centralSize,true);ev.setUint32(16,offset,true);
 return new Blob([...parts,...centers,plain(end)],{type:"application/zip"});
}
function download(blob:Blob,name:string){
 const url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download=name;
 document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),5000);
}
function loadLogo():Promise<HTMLImageElement|null>{
 return new Promise(resolve=>{const im=new Image();im.onload=()=>resolve(im);im.onerror=()=>resolve(null);im.src="/rba-logo-original.jpg";});
}
const caption=[
"練習では決まるのに、試合ではシュートを打てない。",
"それはフォームだけの問題でしょうか。",
"相手の位置、味方の動き、ボールを受ける前の準備、そして判断。シュートを試合で生かすには、技術とゲームの状況をつなぐ練習が必要です。",
"RBAでは「何本入ったか」だけでなく、「どうやってそのシュートが生まれたか」を考えます。",
"11月25日（水）20:00から、Torsten Loibl Online Clinic Vol.2を開催します。日本語逐次通訳付き。LIVE 3,300円／30日録画 4,400円（税込）。",
"詳細・お申し込みはプロフィールの公式リンクから。",site,
"#RiotBasketballAcademy #バスケットボール育成 #指導者講習 #シュート練習 #コーチング"
].join("\n\n");
export function TorstenCarouselStudio(){
 const [images,setImages]=useState<string[]>([]),[busy,setBusy]=useState(false),[note,setNote]=useState("画像を準備しています");
 useEffect(()=>{
  let disposed=false;
  (async()=>{await document.fonts.ready;const logo=await loadLogo();const images=slides.map((s,i)=>draw(s,i,logo).toDataURL("image/png"));
    if(!disposed){setImages(images);setNote(logo?"公式ロゴ入り10枚を生成しました":"公式ロゴを読み込めませんでした。ご確認ください。");}
  })().catch(()=>{if(!disposed)setNote("画像生成に失敗しました。再読み込みしてください。");});
  return()=>{disposed=true;};
 },[]);
 const all=async()=>{if(!images.length)return;setBusy(true);try{
  const files=await Promise.all(images.map(async(src,i)=>({name:"RBA_Torsten_Vol2_"+String(i+1).padStart(2,"0")+".png",data:new Uint8Array(await(await fetch(src)).arrayBuffer())})));
  download(zip(files),"RBA_Torsten_Vol2_Instagram_10slides_official_logo.zip");
 }finally{setBusy(false);}};
 const one=async(src:string,i:number)=>download(await(await fetch(src)).blob(),"RBA_Torsten_Vol2_"+String(i+1).padStart(2,"0")+".png");
 return <main className="min-h-screen bg-[#f4f4f2] px-4 py-12 text-[#141414] sm:px-8" lang="ja">
  <div className="mx-auto max-w-[1160px]">
  <a href="/ja/instagram" className="text-sm font-semibold underline underline-offset-4">← Instagram案内ページへ</a>
  <p className="mt-9 text-xs font-black tracking-[.16em] text-neutral-600">RBA / TORSTEN VOL.2 · CREATIVE STUDIO</p>
  <h1 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">Instagram投稿素材<br/>正方形10枚・公式ロゴ入り</h1>
  <p className="mt-5 max-w-3xl text-sm leading-8 text-neutral-700">白黒・1080×1080px・日本語。10枚をZIPで一括保存するか、画像を個別保存できます。画像生成とダウンロード用のページであり、Instagramへの自動投稿は行いません。</p>
  <div className="mt-7 flex flex-wrap gap-3">
  <button onClick={()=>void all()} disabled={!images.length||busy} className="min-h-12 bg-[#141414] px-5 py-3 text-sm font-bold text-white disabled:opacity-50">{busy?"ZIP作成中…":"公式ロゴ入り10枚をZIP保存 ↓"}</button>
  <button onClick={()=>void navigator.clipboard.writeText(caption)} className="min-h-12 border border-neutral-400 bg-white px-5 py-3 text-sm font-bold">投稿文をコピー</button>
  <a href={mainLink} className="min-h-12 border border-neutral-400 bg-white px-5 py-3 text-sm font-bold">申込ページを確認 ↗</a>
  </div>
  <p className="mt-4 text-xs text-neutral-600" role="status">{note}</p>
  <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
    {images.map((src,i)=><div key={i} className="border border-neutral-200 bg-white p-2"><img className="aspect-square w-full" src={src} alt={"RBA投稿画像 "+(i+1)+"枚目"}/><button className="mt-2 w-full border border-neutral-300 px-2 py-3 text-xs font-bold" onClick={()=>void one(src,i)}>#{String(i+1).padStart(2,"0")} PNG保存 ↓</button></div>)}
  </div>
  <section className="mt-12 border-t border-neutral-300 pt-7"><h2 className="text-2xl font-black">プロフィールに設定するリンク</h2><p className="mt-3 break-all text-sm">{site}</p>
  <p className="mt-4 text-sm leading-7 text-neutral-600">2026年11月25日（水）20:00–21:30（JST）。申し込みは公式ページを経由します。フォーム送信のみで申込確定とはなりません。</p></section>
  </div>
 </main>;
}
