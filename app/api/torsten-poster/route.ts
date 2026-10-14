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
'<text x="93" y="114" font-family="DejaVu Sans,Arial,sans-serif" font-size="29" font-weight="900" letter-spacing="3" fill="#fff">RIOT BASKETBALL ACADEMY</text>',
'<text x="93" y="159" font-family="DejaVu Sans,Arial,sans-serif" font-size="20" font-weight="700" letter-spacing="5" fill="#e8a279">COACH EDUCATION / VOL. 02</text>',
'<path d="M92 200H990" stroke="#fff" stroke-opacity=".22" stroke-width="2"/>',
'<text x="90" y="329" font-family="DejaVu Sans,Arial,sans-serif" font-size="87" font-weight="900" letter-spacing="-3" fill="#fff">TORSTEN</text>',
'<text x="78" y="515" font-family="DejaVu Sans,Arial,sans-serif" font-size="195" font-weight="900" letter-spacing="-6" fill="url(#orb)">LOIBL</text>',
'<text x="93" y="599" font-family="DejaVu Sans,Arial,sans-serif" font-size="34" font-weight="800" letter-spacing="1" fill="#fff">THE MODERN BASKETBALL</text>',
'<text x="93" y="645" font-family="DejaVu Sans,Arial,sans-serif" font-size="34" font-weight="800" letter-spacing="1" fill="#fff">GAME OF SHOOTERS</text>',
'<rect x="93" y="688" width="894" height="8" fill="#e76d2f"/>',
'<text x="93" y="796" font-family="DejaVu Sans,Arial,sans-serif" font-size="73" font-weight="900" letter-spacing="-1" fill="#fff">NOV 25</text>',
'<text x="93" y="846" font-family="DejaVu Sans,Arial,sans-serif" font-size="25" font-weight="750" letter-spacing="2" fill="#f0a16f">WED 2026 / 20:00 - 21:30 JST / ZOOM</text>',
'<text x="93" y="912" font-family="DejaVu Sans,Arial,sans-serif" font-size="31" font-weight="800" fill="#fff">LIVE  JPY 3,300</text>',
'<text x="93" y="953" font-family="DejaVu Sans,Arial,sans-serif" font-size="30" font-weight="800" fill="#fff">REPLAY  JPY 4,400</text>',
'<text x="93" y="992" font-family="DejaVu Sans,Arial,sans-serif" font-size="18" font-weight="750" letter-spacing="1.7" fill="#ccc">30 DAYS / JAPANESE INTERPRETATION</text>',
'<rect x="719" y="922" width="307" height="309" rx="13" fill="#fff"/>',
'<g fill="#171717">',squares(),'</g>',
'<text x="746" y="1217" font-family="DejaVu Sans,Arial,sans-serif" font-size="18" font-weight="900" fill="#151515">SCAN TO JOIN</text>',
'<path d="M92 1042H695" stroke="#fff" stroke-opacity=".27" stroke-width="2"/>',
'<text x="93" y="1091" font-family="DejaVu Sans,Arial,sans-serif" font-size="29" font-weight="900" letter-spacing="1" fill="#f4a16b">SHOOTING.</text>',
'<text x="93" y="1132" font-family="DejaVu Sans,Arial,sans-serif" font-size="29" font-weight="900" letter-spacing="1" fill="#fff">DECISION.</text>',
'<text x="93" y="1173" font-family="DejaVu Sans,Arial,sans-serif" font-size="29" font-weight="900" letter-spacing="1" fill="#fff">PRACTICE.</text>',
'<text x="93" y="1241" font-family="DejaVu Sans,Arial,sans-serif" font-size="19" font-weight="800" fill="#a9a9a9">riotbasketballacademy.com</text>',
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
