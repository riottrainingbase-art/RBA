import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';

const read = path => readFileSync(new URL(`../${path}`,import.meta.url),'utf8');
const guide=read('components/united-participation-guide.tsx');
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
