import assert from 'node:assert/strict';
import { readFileSync, mkdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

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

mkdirSync('screenshots/home-mobile', { recursive:true });

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
      await page.setContent(fixture,{waitUntil:'domcontentloaded'});
      for (const kind of ['primary','secondary']) {
        const locator=page.locator('.page .hero .actions .' + kind);
        assert.equal(await locator.isVisible(), true, engineName+' '+width+' '+kind+' visible');
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
        const focused=await cssValues(locator);
        assert.ok(ratio(focused.color,focused.background)>=4.5,
          engineName+' '+width+' '+kind+' focused');
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
      process.stdout.write('PASS '+engineName+' '+width+' CTAs, update title, responsive width\n');
    }
  } finally { await browser.close(); }
}
