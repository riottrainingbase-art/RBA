import fs from "node:fs";
import path from "node:path";

// Build gate for the public navigation contract. If a destination disappears,
// the build fails instead of publishing a broken link on every RBA page.
const languages=["","ja","zh-tw","ko"];
const coreRoutes=["","opportunities","journal","organizer","international","my-homecourt","about","contact","policies"];
const errors=[];
let routesChecked=0;
for(const lang of languages){
 for(const route of coreRoutes){
  const segments=[lang,route].filter(Boolean);
  const folder=path.join("app",...segments);
  const candidates=["page.tsx","page.ts","page.jsx","page.js"].map(file=>path.join(folder,file));
  routesChecked++;
  if(!candidates.some(file=>fs.existsSync(file))){
   errors.push({route:"/"+segments.join("/"),issue:"missing core navigation route"});
  }
 }
}
const logo="public/rba-logo-original.jpg";
if(!fs.existsSync(logo))errors.push({route:logo,issue:"official logo missing"});
const home="components/rba-simple-home.tsx";
const journal="components/public-journal.tsx";
const frame="components/site-frame.tsx";
for(const file of [home,journal,frame]){
 if(!fs.existsSync(file))errors.push({route:file,issue:"required site component missing"});
}
if(fs.existsSync(journal)){
 const source=fs.readFileSync(journal,"utf8");
 if(source.includes("全部読まなくて大丈夫です。"))errors.push({route:journal,issue:"outdated unnatural Japanese reading summary"});
 if(source.includes("HOMECOURT HOMECOURT PLUS"))errors.push({route:journal,issue:"duplicated programme name"});
}
if(fs.existsSync(frame)){
 const source=fs.readFileSync(frame,"utf8");
 for(const route of ["opportunities","journal","organizer","international"]){
  if(!source.includes('localePath(locale,"'+route+'")'))errors.push({route:frame,issue:"primary navigation missing "+route});
 }
}
if(errors.length){console.error(JSON.stringify({status:"failed",routesChecked,errors},null,2));process.exit(1)}
console.log(JSON.stringify({status:"passed",routesChecked,officialLogo:logo,primaryNavigation:"4 routes across 4 languages"}));
