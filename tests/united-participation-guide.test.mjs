import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createRequire} from 'node:module';
import vm from 'node:vm';

const require=createRequire(import.meta.url);
const ts=require('typescript');
const React=require('react');
const {renderToStaticMarkup}=require('react-dom/server');

const read = path => readFileSync(new URL(`../${path}`,import.meta.url),'utf8');
const guide=read('components/united-participation-guide.tsx');
function load(source, mocks={}) {
  const compiled=ts.transpileModule(source,{compilerOptions:{jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
  const cjsModule={exports:{}};
  vm.runInNewContext(compiled,{module:cjsModule,exports:cjsModule.exports,require:id=>Object.hasOwn(mocks,id)?mocks[id]:require(id)});
  return cjsModule.exports;
}
const locales=['ja','en','zh-tw','ko'];
const prefix=locale=>locale==='en'?'':`/${locale}`;
const {UnitedParticipationGuide,UnitedMemberEntry}=load(guide,{'./site-frame':{localePath:(locale,page)=>`${prefix(locale)}/${page}`}});
const routeExists=path=>existsSync(new URL(`../app${path}/page.tsx`,import.meta.url));
const render=(Component,props)=>renderToStaticMarkup(React.createElement(Component,props));
test('UNITED guide connects the member home to a public anchor in four locales',()=>{
  assert.match(guide,/id="united-participation"/);
  assert.match(guide,/localePath\(locale,"united"\).*#united-participation/);
  for(const locale of ['ja:', 'en:', '"zh-tw":','ko:']) assert.ok(guide.includes(locale));
  assert.match(read('components/member-app.tsx'),/active==="home"\?<UnitedMemberEntry locale=\{locale\}/);
  assert.match(read('components/platform-business-pages.tsx'),/<UnitedParticipationGuide locale=\{locale\}/);
});
test('pending Kobe programme links to the official details and not payment',()=>{
  assert.match(guide,/2027-01-05T00:00:00\+09:00/);
  assert.match(guide,/href="\/ja\/events\/kobe-boys-u14-exchange-2027"/);
  assert.match(guide,/意向登録だけでは参加確定になりません/);
  assert.match(guide,/月会費と、UNITEDの企画参加費は別/);
  assert.doesNotMatch(guide,/\/api\/commerce|checkout|jotform/);
  assert.ok(existsSync(new URL('../app/ja/events/kobe-boys-u14-exchange-2027/page.tsx',import.meta.url)));
});
test('confirmed programme list uses shared Japan-date activity logic without truncation',()=>{
  const page=read('components/platform-business-pages.tsx');
  assert.match(page,/programme.pathway==="united"&&isProgrammeActive\(programme\)/);
  assert.doesNotMatch(page,/\.slice\(0,3\)/);
});
test('rendered member and public routes resolve for all four languages; expired interest disappears at JST midnight',()=>{
  for(const locale of locales){
    const root=prefix(locale), app=`${root}/my-homecourt/app`;
    const before=render(UnitedParticipationGuide,{locale,now:new Date('2027-01-04T14:59:59Z')});
    const after=render(UnitedParticipationGuide,{locale,now:new Date('2027-01-04T15:00:00Z')});
    const entry=render(UnitedMemberEntry,{locale});
    assert.ok(entry.includes(`href="${root}/united#united-participation"`));
    assert.ok(before.includes('id="united-participation"'));
    assert.ok(before.includes('href="/ja/events/kobe-boys-u14-exchange-2027"'));
    assert.ok(!after.includes('kobe-boys-u14-exchange-2027'));
    assert.ok(before.includes(`href="${app}/calendar"`));
    assert.ok(before.includes(`href="${app}/report"`));
    assert.ok(before.includes(`href="${locale==='ja'?`${app}/start`:`${app}#member-reflection`}"`));
    assert.ok(routeExists(`${app}/[[...section]]`));
    assert.ok(routeExists(`${root}/contact`));
    assert.ok(routeExists(`${root}/united`));
    assert.match(read(`app${root}/united/page.tsx`),/dynamic="force-dynamic"/);
    assert.doesNotMatch(before,/checkout\.stripe|\/api\/commerce|<form/);
  }
  assert.ok(routeExists('/ja/my-homecourt/app/start'));
  assert.match(read('components/member-journey.tsx'),/id="member-reflection"/);
});
test('member entry requires authentication and PLUS checks active entitlement',async()=>{
  const redirects=[];
  const {MemberAppPage}=load(read('components/member-app-page.tsx'),{
    'next/navigation':{redirect:path=>{redirects.push(path);throw new Error('redirect');}},
    '@/lib/supabase/server':{createClient:async()=>({auth:{getUser:async()=>({data:{user:null}})}})},
    './member-app':{MemberApp:()=>null},'@/lib/member-articles':{memberArticles:[]},
  });
  for(const locale of locales)for(const section of ['calendar','report','plus']){
    await assert.rejects(MemberAppPage({locale,section}),/redirect/);
    const base=prefix(locale);
    assert.equal(redirects.at(-1),`${base}/my-homecourt/login?next=${encodeURIComponent(`${base}/my-homecourt/app/${section}`)}`);
  }
  const {hasCurrentHomecourtSubscription:entitled}=load(read('lib/homecourt-billing.ts'));
  const now=Date.parse('2026-11-26T00:00:00Z');
  const active={id:'test',status:'active',plan_key:'homecourt_monthly',current_period_end:'2026-12-01T00:00:00Z',cancel_at_period_end:false};
  assert.equal(entitled([],now),false);
  assert.ok(entitled([active],now));
  assert.equal(entitled([{...active,status:'canceled'}],now),false);
  assert.equal(entitled([{...active,plan_key:'other'}],now),false);
  assert.equal(entitled([{...active,cancel_at_period_end:true,current_period_end:'2026-11-25T00:00:00Z'}],now),false);
  const member=read('components/member-app.tsx');
  assert.match(member,/active==="plus"\?<>{hasPaidMembership\?<HomecourtPlusMemberHub/);
  assert.match(member,/active==="report"\?<>{hasPaidMembership\?<HomecourtDevelopmentReport/);
});
