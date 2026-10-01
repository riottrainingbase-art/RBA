import fs from "node:fs";
import path from "node:path";

const failures=[];
const read=p=>fs.readFileSync(p,"utf8");
const requireText=(file,text,label)=>{if(!read(file).includes(text))failures.push({file,label});};
const roots=["app","components","definitive-content"];
const exts=new Set([".ts",".tsx",".js",".mjs",".html",".json"]);
function walk(dir,out=[]){
  if(!fs.existsSync(dir))return out;
  for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
    const p=path.join(dir,entry.name);
    if(entry.isDirectory())walk(p,out);
    else if(exts.has(path.extname(entry.name)))out.push(p);
  }
  return out;
}

requireText("components/localized-home.tsx","RBA PLATFORM / ONE CONNECTED SYSTEM","homepage platform architecture");
requireText("components/localized-home.tsx","TRUST / GOVERNANCE","homepage trust and governance section");
requireText("components/site-frame.tsx","安全・運営・透明性","trust footer");
requireText("components/platform-operating-system.tsx","HOW RBA SCALES","platform scale model");
requireText("app/layout.tsx",'name:"Masato Nishio",alternateName:"西尾優人"',"representative structured-data identity");

for(const file of roots.flatMap(root=>walk(root))){
  const source=read(file);
  if(/日本最大級|国内最大級|業界最大級/.test(source))failures.push({file,label:"unsupported scale superlative"});
  if(/name:"Yuto Nishio"|Representative:\s*Yuto Nishio/.test(source))failures.push({file,label:"representative romanization mismatch"});
  if(/の方へに関する情報/.test(source))failures.push({file,label:"awkward Japanese metadata"});
}

if(failures.length){
  console.error(JSON.stringify({status:"failed",failures},null,2));
  process.exit(1);
}
console.log(JSON.stringify({
  status:"passed",
  checks:[
    "platform architecture visible from homepage",
    "trust/governance visible from homepage and footer",
    "scale model visible from platform page",
    "representative identity consistency",
    "no unsupported largest-scale claims",
    "no known awkward Japanese metadata pattern"
  ]
},null,2));
