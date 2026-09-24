import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const ts=require('typescript');
const React=require('react');
const {renderToStaticMarkup}=require('react-dom/server');
const source=fs.readFileSync('components/member-journey.tsx','utf8');
const compiled=ts.transpileModule(source,{compilerOptions:{jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
const cjsModule={exports:{}};
vm.runInNewContext(compiled,{module:cjsModule,exports:cjsModule.exports,require:id=>id.endsWith('.css')?{default:new Proxy({},{get:(_,key)=>String(key)})}:require(id)});
let links=0;
for(const locale of ['en','ja','zh-tw','ko'])for(const initialAudience of ['player','parent','coach']){
  const html=renderToStaticMarkup(React.createElement(cjsModule.exports.MemberJourney,{locale,initialAudience}));
  assert.equal((html.match(/aria-pressed="true"/g)||[]).length,1);
  assert.equal((html.match(/<textarea/g)||[]).length,3);
  assert(!/buy\.stripe|checkout\.stripe|service_role/.test(html));
  const prefix=locale==='en'?'':`/${locale}`;
  for(const [,href] of html.matchAll(/href="([^"]+)"/g)){
    assert(href.startsWith(prefix+'/'));
    assert(fs.existsSync(`app${href}/page.tsx`),`Missing route: ${href}`);links++;
  }
  assert(html.includes(`${prefix}/schedule`));
  assert(html.includes(`${prefix}/${{player:'players',parent:'families',coach:'d-hub'}[initialAudience]}`));
}
for(const locale of ['','ja/','zh-tw/','ko/']){
  const page=fs.readFileSync(`app/${locale}my-homecourt/app/[[...section]]/page.tsx`,'utf8');
  assert(page.includes('MemberAppPage'));
  assert(page.includes('index:false'));
}
const result={status:'passed',renderedCases:12,existingLocalizedLinks:links,memberEntries:4,scope:'Server-rendered component and local route existence only; not browser interaction, authentication, database authorization or deployment verification.'};
fs.writeFileSync('audit/member-experience/render-checks.json',JSON.stringify(result,null,2)+'\n');
console.log(result);
