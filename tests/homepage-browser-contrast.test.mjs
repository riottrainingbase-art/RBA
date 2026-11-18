import assert from 'node:assert/strict';
import { readFileSync, mkdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { PNG } = require(process.env.RBA_PNGJS_PATH || 'pngjs');

const modulePath = process.env.RBA_PLAYWRIGHT_PATH;
const { chromium, webkit } = modulePath
  ? await import(pathToFileURL(modulePath).href)
  : await import('playwright');

const heroCss = readFileSync('components/simple-japanese-home.module.css', 'utf8');
const themeCss = readFileSync('components/site-brand.module.css', 'utf8')
  .replace(/:global\(([^()]*)\)/g, '$1');

function ratio(foreground, background) {
  function luminance(rgb) {
    const colors = (rgb.match(/[\d.]+/g) || []).slice(0, 3).map(Number);
    assert.equal(colors.length, 3, 'Unrecognised CSS color: ' + rgb);
    const linear = colors.map(n => {
      const c = n / 255;
      return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    });
    return linear[0] * .2126 + linear[1] * .7152 + linear[2] * .0722;
  }
  const a = luminance(foreground), b = luminance(background);
  return (Math.max(a,b) + .05) / (Math.min(a,b) + .05);
}

const fixture = '<!doctype html><html lang="ja"><head>' +
 '<meta name="viewport" content="width=device-width,initial-scale=1">' +
 '<style>*{box-sizing:border-box} html,body{margin:0;width:100%} body{font-family:Arial,sans-serif}' +
 heroCss + '\n' + themeCss + '</style></head><body>' +
 '<div class="theme">' +
 '<main class="page"><div class="container">' +
 '<section class="hero"><div class="heroTopline"><p class="label">RIOT BASKETBALL ACADEMY / SENDAI · JAPAN · ASIA</p></div>' +
 '<div class="heroBody"><p class="heroEyebrow">育成は、今いる場所だけで決まらない。</p>' +
 '<h1><span>今のチームの外にも、</span><span>育つチャンスを。</span></h1>' +
 '<p class="intro">選手が挑戦し、指導者が学び、地域がつながる。</p>' +
 '<nav class="actions"><a class="primary" href="#home-programmes"><span>開催予定を見る</span><span>↗</span></a>' +
 '<a class="secondary" href="#rba-for-you"><span>自分に合う入口</span><span>↗</span></a></nav></div></section></div></main>' +
 '<a class="site-update-strip" href="/ja/journal"><svg aria-hidden="true" width="18" height="18"></svg>' +
 '<span>更新 / JOURNAL</span><strong>今のチームのまま、学びの場を広げる｜MY HOME COURTのこれから</strong>' +
 '<span class="site-update-cta">見る →</span></a></div></body></html>';

// Founder section fixture: exercise its CSS at the same viewport widths as the
// hero. This is a visual-layout regression guard, NOT a real Next.js route test.
const founderFixture = `
<section class="founderIntroduction" id="home-founder" aria-labelledby="home-founder-title">
  <div class="founderIntroductionText">
    <p class="founderIntroductionKicker">WHO LEADS RBA / FOUNDER PROFILE</p>
    <h2 id="home-founder-title">誰が、どんな考えで、子どもの育成に向き合っているのか。</h2>
    <p class="founderIntroductionName">西尾 優人 <span>MASATO NISHIO</span></p>
    <p class="founderIntroductionPosition">Riot Basketball Academy 創設者・代表 / Riot Training Base 代表</p>
    <p class="founderIntroductionBody">NSCA-CPT。選手として東北選抜・国体を経験し、ドイツでS&amp;Cの指導に携わった後、仙台から育成年代の活動を広げています。</p>
    <p class="founderIntroductionBody">試合の結果だけで子どもの可能性を決めない。判断力、身体の発達、休息、そして指導者の学びまでを含めて成長できる環境をつくります。</p>
    <div class="founderIntroductionFacts"><span>NSCA-CPT</span><span>ドイツでのS&amp;C指導</span></div>
    <a class="founderIntroductionLink" href="/ja/about">代表の経歴・理念・活動を詳しく読む <span>↗</span></a>
  </div>
  <figure class="founderIntroductionPortrait">
    <img width="874" height="860" alt="RBA代表がバスケットボールの指導を行う様子" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==" />
    <figcaption>MASATO NISHIO / THE COACH BEHIND RBA</figcaption>
  </figure>
</section>`;
assert.ok(fixture.includes('</div></main>'),'Home fixture closing marker missing');
const completeFixture=fixture.replace('</div></main>',founderFixture+'</div></main>');

mkdirSync('screenshots/home-mobile', { recursive:true });

/** A computed CSS contrast can be green while a browser actually paints blank
 * letters. Inspect real rendered PNG pixels of each CTA in BOTH engines. */
function assertButtonPixels(buffer, description) {
  const png = PNG.sync.read(buffer);
  let bright = 0, dark = 0, count = 0;
  const left = Math.floor(png.width * 0.04);
  const right = Math.ceil(png.width * 0.96);
  const top = Math.floor(png.height * 0.16);
  const bottom = Math.ceil(png.height * 0.84);
  for (let y=top;y<bottom;y+=2) {
    for (let x=left;x<right;x+=2) {
      const i=(png.width*y+x)*4;
      const red=png.data[i], green=png.data[i+1], blue=png.data[i+2], a=png.data[i+3];
      if(a<250)continue;
      count++;
      if(red>=205&&green>=205&&blue>=205)bright++;
      if(red<=100&&green<=100&&blue<=100)dark++;
    }
  }
  assert.ok(count>100, description+' PNG pixel scan has samples');
  const brightPercent=bright/count;
  const darkPercent=dark/count;
  assert.ok(brightPercent>0.58, description+' needs an opaque LIGHT background in actual screenshot, got '+(brightPercent*100).toFixed(1)+'% bright');
  assert.ok(darkPercent>0.003, description+' needs painted DARK glyphs in actual screenshot, got '+(darkPercent*100).toFixed(2)+'% dark');
}


async function cssValues(locator) {
  return locator.evaluate(el => {
    const s = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return {
      color:s.color, background:s.backgroundColor, fill:s.webkitTextFillColor,
      width:r.width, height:r.height, x:r.x, right:r.right,
      opacity:s.opacity, visibility:s.visibility, whiteSpace:s.whiteSpace,
      scrollWidth:el.scrollWidth, clientWidth:el.clientWidth
    };
  });
}

for (const [engineName, engine] of [['chromium',chromium], ['webkit',webkit]]) {
  const browser = await engine.launch({headless:true});
  try {
    for (const width of [320,375,390,430,768,1280]) {
      const context=await browser.newContext({
        viewport:{width,height:900}, deviceScaleFactor:2,
        isMobile:width<=430, hasTouch:width<=430
      });
      const page=await context.newPage();
      await page.setContent(completeFixture,{waitUntil:'domcontentloaded'});
      for (const kind of ['primary','secondary']) {
        const locator=page.locator('.page .hero .actions .' + kind);
        assert.equal(await locator.isVisible(), true, engineName+' '+width+' '+kind+' visible');
        assertButtonPixels(await locator.screenshot(), engineName+' '+width+' '+kind+' default');
        const s=await cssValues(locator);
        assert.ok(s.height>=44, engineName+' '+width+' '+kind+' tap target');
        assert.ok(s.width>=100, engineName+' '+width+' '+kind+' width');
        assert.equal(s.visibility,'visible');
        assert.ok(Number(s.opacity)>=.99);
        assert.ok(ratio(s.color,s.background)>=4.5,
          engineName+' '+width+' '+kind+' contrast '+ratio(s.color,s.background).toFixed(2));
        assert.ok(ratio(s.fill,s.background)>=4.5,
          engineName+' '+width+' '+kind+' WebKit text fill');
        const spans=await locator.locator('span').all();
        for(const span of spans){
          const c=await cssValues(span);
          assert.ok(ratio(c.color,s.background)>=4.5,
            engineName+' '+width+' '+kind+' nested text');
        }
        await locator.focus();
        assertButtonPixels(await locator.screenshot(), engineName+' '+width+' '+kind+' focus');
        const focused=await cssValues(locator);
        assert.ok(ratio(focused.color,focused.background)>=4.5,
          engineName+' '+width+' '+kind+' focused');
      }
      // Founder layout, legible CTA and image positioning at all breakpoints.
      const founder=page.locator('#home-founder');
      const founderLink=founder.locator('.founderIntroductionLink');
      const founderPhoto=founder.locator('.founderIntroductionPortrait img');
      assert.equal(await founder.isVisible(),true,engineName+' '+width+' founder visible');
      assert.equal(await founderLink.isVisible(),true,engineName+' '+width+' founder link visible');
      assert.equal(await founderPhoto.isVisible(),true,engineName+' '+width+' founder image visible');
      const cta=await cssValues(founderLink);
      assert.ok(cta.height>=44,engineName+' '+width+' founder link touch height');
      assert.ok(ratio(cta.color,cta.background)>=4.5,engineName+' '+width+' founder CTA contrast');
      assert.ok(ratio(cta.fill,cta.background)>=4.5,engineName+' '+width+' founder WebKit glyph contrast');
      const founderGeometry=await founder.evaluate(section=>{
        const r=section.getBoundingClientRect();
        const intro=section.querySelector('.founderIntroductionText').getBoundingClientRect();
        const photo=section.querySelector('.founderIntroductionPortrait').getBoundingClientRect();
        return {x:r.left,right:r.right,scrollWidth:section.scrollWidth,clientWidth:section.clientWidth,
          textBottom:intro.bottom,photoTop:photo.top,photoLeft:photo.left,contentLeft:intro.left,
          photoWidth:photo.width,photoHeight:photo.height};
      });
      assert.ok(founderGeometry.x>=-2&&founderGeometry.right<=width+2,
        engineName+' '+width+' founder stays within viewport: '+JSON.stringify(founderGeometry));
      assert.ok(founderGeometry.scrollWidth<=founderGeometry.clientWidth+2,
        engineName+' '+width+' founder has no own horizontal overflow');
      assert.ok(founderGeometry.photoWidth>100&&founderGeometry.photoHeight>70,
        engineName+' '+width+' founder photo has meaningful size');
      if(width<=760){
        assert.ok(founderGeometry.photoTop>=founderGeometry.textBottom-2,
          engineName+' '+width+' portrait must stack below founder copy');
      }
      const announcement=page.locator('.site-update-strip strong');
      const announcementCSS=await cssValues(announcement);
      if(width<=430){
        assert.equal(announcementCSS.whiteSpace,'normal',engineName+' '+width+' announcement wraps');
        assert.ok(announcementCSS.scrollWidth<=announcementCSS.clientWidth+2,
          engineName+' '+width+' announcement does not clip');
      }
      const docWidth=await page.evaluate(()=>document.documentElement.scrollWidth);
      assert.ok(docWidth<=width+2,engineName+' '+width+' has no horizontal overflow ('+docWidth+')');
      await page.screenshot({path:'screenshots/home-mobile/'+engineName+'-'+width+'.png',fullPage:true});
      await context.close();
      process.stdout.write('PASS '+engineName+' '+width+' CTAs, founder, update title, responsive width\n');
    }
  } finally { await browser.close(); }
}
