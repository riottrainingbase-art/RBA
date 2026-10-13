import fs from "node:fs";
import path from "node:path";
import {TextDecoder} from "node:util";

// Build-time source audit. Run before every Next.js production build.
// This is an encoding/known-regression check, not a substitute for human editing.
const roots=["app","components","lib","definitive-content","public/rba-definitive"];
const extensions=new Set([".ts",".tsx",".js",".mjs",".json",".html",".css",".md",".txt"]);
const decoder=new TextDecoder("utf-8",{fatal:true});
const failures=[];
let checked=0, japanese=0;
function visit(folder){
 if(!fs.existsSync(folder))return;
 for(const item of fs.readdirSync(folder,{withFileTypes:true})){
  const p=path.join(folder,item.name);
  if(item.isDirectory()){visit(p);continue}
  if(!extensions.has(path.extname(item.name)))continue;
  if(/\.min\.|\.map$/.test(p))continue;
  let value;
  try{value=decoder.decode(fs.readFileSync(p));}
  catch{failures.push({file:p,rule:"invalid-utf8"});continue}
  checked++;
  const hasJapanese=/[\u3040-\u30ff\u3400-\u9fff]/.test(value);
  if(hasJapanese)japanese++;
  const rules=[
   ["replacement-character",/\uFFFD/],
   ["visible-null",/\u0000/],
   ["duplicate-homecourt",/HOMECOURT HOMECOURT PLUS/],
  ];
  if(hasJapanese)rules.push(["common-mojibake",/(?:縺[ぁ-んｦ-ﾟ]|繧[ぁ-んｦ-ﾟ]|譁[ぁ-んｦ-ﾟ]|ãƒ[\u0080-\u00bf]|â€™|â€œ|â€)/]);
  for(const [rule,re] of rules){const m=re.exec(value);if(m)failures.push({file:p,rule,sample:value.slice(Math.max(0,m.index-20),m.index+40).replace(/\s+/g," ")})}
 }
}
for(const root of roots)visit(root);
if(failures.length){console.error(JSON.stringify({status:"failed",checked,japanese,failures:failures.slice(0,50)},null,2));process.exit(1)}
console.log(JSON.stringify({status:"passed",checked,japanese,scope:"All text source files: UTF-8 decoding, replacement characters, common Japanese mojibake, and known duplicate copy."}));
