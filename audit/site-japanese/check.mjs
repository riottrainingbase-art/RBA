import fs from "node:fs";
import path from "node:path";

const roots=["app","components","lib","definitive-content","public/rba-definitive"];
const exts=new Set([".ts",".tsx",".js",".mjs",".html",".css",".json"]);
const mojibake=[
  ["replacement-char",/�/],
  ["utf8-double-encoded",/(?:縺|譁|繧|螟|蜿|驟|髯|蛹)/],
  ["latin-mojibake",/(?:â€|â€™|â€œ|â€|Ã.|Â[^s])/],
];
const stale=[
  ["saga-old-date-ja",/2026\.10\.04[–-]05|10月4日[・〜～-]5日/],
  ["saga-old-date-en",/04[–-]05 OCT 2026/],
];
const awkward=[
  ["players-meta",/Riot Basketball Academyの選手の方へに関する情報をご案内します。/],
  ["families-meta",/Riot Basketball Academyの保護者の方へに関する情報をご案内します。/],
  ["coaches-meta",/Riot Basketball Academyのコーチ・指導者の方へに関する情報をご案内します。/],
];

function walk(dir,out=[]){
  if(!fs.existsSync(dir))return out;
  for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
    const p=path.join(dir,entry.name);
    if(entry.isDirectory())walk(p,out);
    else if(exts.has(path.extname(entry.name)))out.push(p);
  }
  return out;
}

const files=roots.flatMap(root=>walk(root));
const failures=[];
for(const file of files){
  let source;
  try{source=fs.readFileSync(file,"utf8");}catch{continue}
  for(const [rule,re] of [...mojibake,...stale,...awkward]){
    const m=source.match(re);
    if(m)failures.push({file,rule,sample:m[0]});
  }
}

if(failures.length){
  console.error(JSON.stringify({status:"failed",filesChecked:files.length,failures},null,2));
  process.exit(1);
}
console.log(JSON.stringify({
  status:"passed",
  filesChecked:files.length,
  scope:"Japanese mojibake, stale Saga dates and known unnatural metadata regressions."
},null,2));
