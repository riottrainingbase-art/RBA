import sharp from "sharp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const QR_MODULES = 49;
const QR_DATA = "/pbaazy/wUEBgx3Qbq1DLTFrt0td73ul269jfiHC7BGycehRB/qqqqqq/gAQDFrNAJ+Q/+gbS74bzj+3+RaE4BNZVK4Dh8BWGeDk4tiq1MuDYc2+mStZ8w2zJlaJ4pTop40eoQCxrosYlqqjtt+X72KSIUf+BZcNagygfunY87cI5dvZ/725P+EvtPfice1sQSsciod2vq+sJF3dG21Hv+M4+jW+bR7hmM6p9D+6uHrfqsJKzltguZvKw7ZwqrGKz7YrC57iWDhJ2JSEn9Fz7yK9JbxoeS6NOtTcqN/j7BSO8hJsVl32HX0cooYFWdbiOPyATj/iKaPi//oAeksROse/rtSpESqwW+pFoLGrrNI+5Y+V1Hhh8zK+6GLyS+D1BM9CL2tP/pRSHomcgA==";

function squares():string {
  const bits=Buffer.from(QR_DATA,"base64");
  const step=5.25, ox=741, oy=937;
  let cells="";
  for(let row=0;row<QR_MODULES;row++){
    for(let col=0;col<QR_MODULES;col++){
      const i=row*QR_MODULES+col;
      const on=(bits[Math.floor(i/8)]>>(7-(i%8)))&1;
      if(on)cells+="<rect x='"+(ox+col*step).toFixed(2)+"' y='"+(oy+row*step).toFixed(2)+"' width='"+(step+.16)+"' height='"+(step+.16)+"'/>";
    }
  }
  return cells;
}

const FONT:Record<string,string[]>={
 A:["01110","10001","10001","11111","10001","10001","10001"],
 B:["11110","10001","10001","11110","10001","10001","11110"],
 C:["01111","10000","10000","10000","10000","10000","01111"],
 D:["11110","10001","10001","10001","10001","10001","11110"],
 E:["11111","10000","10000","11110","10000","10000","11111"],
 F:["11111","10000","10000","11110","10000","10000","10000"],
 G:["01111","10000","10000","10111","10001","10001","01111"],
 H:["10001","10001","10001","11111","10001","10001","10001"],
 I:["11111","00100","00100","00100","00100","00100","11111"],
 J:["00111","00010","00010","00010","10010","10010","01100"],
 K:["10001","10010","10100","11000","10100","10010","10001"],
 L:["10000","10000","10000","10000","10000","10000","11111"],
 M:["10001","11011","10101","10101","10001","10001","10001"],
 N:["10001","11001","10101","10011","10001","10001","10001"],
 O:["01110","10001","10001","10001","10001","10001","01110"],
 P:["11110","10001","10001","11110","10000","10000","10000"],
 Q:["01110","10001","10001","10001","10101","10010","01101"],
 R:["11110","10001","10001","11110","10100","10010","10001"],
 S:["01111","10000","10000","01110","00001","00001","11110"],
 T:["11111","00100","00100","00100","00100","00100","00100"],
 U:["10001","10001","10001","10001","10001","10001","01110"],
 V:["10001","10001","10001","10001","10001","01010","00100"],
 W:["10001","10001","10001","10101","10101","10101","01010"],
 X:["10001","10001","01010","00100","01010","10001","10001"],
 Y:["10001","10001","01010","00100","00100","00100","00100"],
 Z:["11111","00001","00010","00100","01000","10000","11111"],
 "0":["01110","10001","10011","10101","11001","10001","01110"],
 "1":["00100","01100","00100","00100","00100","00100","01110"],
 "2":["01110","10001","00001","00010","00100","01000","11111"],
 "3":["11110","00001","00001","01110","00001","00001","11110"],
 "4":["00010","00110","01010","10010","11111","00010","00010"],
 "5":["11111","10000","10000","11110","00001","00001","11110"],
 "6":["01111","10000","10000","11110","10001","10001","01110"],
 "7":["11111","00001","00010","00100","01000","01000","01000"],
 "8":["01110","10001","10001","01110","10001","10001","01110"],
 "9":["01110","10001","10001","01111","00001","00001","11110"],
 " ":["00000","00000","00000","00000","00000","00000","00000"],
 ".":["00000","00000","00000","00000","00000","00100","00100"],
 "-":["00000","00000","00000","11111","00000","00000","00000"],
 "/":["00001","00001","00010","00100","01000","10000","10000"],
 ":":["00000","00100","00100","00000","00100","00100","00000"],
 "&":["01100","10010","10100","01000","10101","10010","01101"]
};
function letters(text:string,x:number,y:number,scale:number,color:string):string {
 let rects="";
 const upper=text.toUpperCase();
 for(let i=0;i<upper.length;i++){
   const char=FONT[upper[i]]||FONT[" "];
   for(let row=0;row<7;row++){
     for(let col=0;col<5;col++){
       if(char[row][col]!=="1")continue;
       const px=x+i*6*scale+col*scale,py=y+row*scale;
       rects+="<rect x='"+px.toFixed(2)+"' y='"+py.toFixed(2)+"' width='"+(scale+.1)+"' height='"+(scale+.1)+"'/>";
     }
   }
 }
 return "<g fill='"+color+"'>"+rects+"</g>";
}

function svg():string{
 return [
'<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">',
'<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#141618"/><stop offset="0.65" stop-color="#191a1d"/><stop offset="1" stop-color="#060707"/></linearGradient>',
'<linearGradient id="orb" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f6a46f"/><stop offset="1" stop-color="#d95116"/></linearGradient>',
'<clipPath id="page"><rect width="1080" height="1350"/></clipPath></defs>',
'<g clip-path="url(#page)">',
'<rect width="1080" height="1350" fill="url(#bg)"/>',
'<circle cx="1050" cy="125" r="400" fill="#ef783c" opacity=".09"/>',
'<circle cx="-70" cy="650" r="520" fill="#ef783c" opacity=".055"/>',
'<path d="M0 755 L1080 475 M0 870 L1080 590 M0 975 L1080 695" stroke="#fff" stroke-opacity=".09" stroke-width="2"/>',
'<circle cx="895" cy="485" r="260" fill="none" stroke="#f27d3f" stroke-width="2" opacity=".18"/>',
'<circle cx="895" cy="485" r="175" fill="none" stroke="#fff" stroke-width="2" opacity=".09"/>',
'<path d="M640 485H1080M895 225V745" stroke="#fff" stroke-opacity=".06" stroke-width="2"/>',
'<rect x="55" y="55" width="970" height="1240" fill="none" stroke="#fff" stroke-opacity=".18" stroke-width="2"/>',
'<rect x="55" y="55" width="10" height="147" fill="#e76d2f"/>',
'<path d="M92 200H990" stroke="#fff" stroke-opacity=".22" stroke-width="2"/>',
'<rect x="93" y="688" width="894" height="8" fill="#e76d2f"/>',
'<rect x="719" y="922" width="307" height="309" rx="13" fill="#fff"/>',
'<g fill="#171717">',squares(),'</g>',
'<path d="M92 1042H695" stroke="#fff" stroke-opacity=".27" stroke-width="2"/>',
letters('RIOT BASKETBALL ACADEMY',93,76,3.2,'#ffffff'),
letters('COACH EDUCATION / VOL. 02',93,137,3,'#e8a279'),
letters('TORSTEN',90,235,16,'#ffffff'),
letters('LOIBL',90,358,25,'#e76d2f'),
letters('THE MODERN BASKETBALL',93,553,5,'#ffffff'),
letters('GAME OF SHOOTERS',93,618,5,'#ffffff'),
letters('NOV 25',93,722,13,'#ffffff'),
letters('WED 2026 / 20:00-21:30 JST / ZOOM',93,824,3.7,'#efa16f'),
letters('LIVE JPY 3300',93,890,5,'#ffffff'),
letters('REPLAY JPY 4400',93,933,5,'#ffffff'),
letters('30 DAYS / JAPANESE INTERPRETATION',93,983,2.9,'#cccccc'),
letters('SCAN TO JOIN',746,1194,3,'#151515'),
letters('SHOOTING.',93,1066,5,'#efa16f'),
letters('DECISION.',93,1108,5,'#ffffff'),
letters('PRACTICE.',93,1150,5,'#ffffff'),
letters('RIOTBASKETBALLACADEMY.COM',93,1235,2.7,'#a9a9a9'),
'</g></svg>'].join("");
}

export async function GET(){
 try{
   const body=await sharp(Buffer.from(svg())).jpeg({quality:90,mozjpeg:true}).toBuffer();
   return new Response(new Uint8Array(body),{status:200,headers:{"Content-Type":"image/jpeg","Cache-Control":"public, max-age=3600, s-maxage=86400","X-Content-Type-Options":"nosniff"}});
 }catch{
   return new Response("Poster rendering unavailable",{status:503,headers:{"Content-Type":"text/plain; charset=utf-8"}});
 }
}
