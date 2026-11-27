import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import test from 'node:test';

const css = readFileSync(new URL('../app/rba-brand.css', import.meta.url), 'utf8');
const token = name => css.match(new RegExp(`--rba-${name}:\\s*(#[0-9a-f]{6})`, 'i'))?.[1];
const lum = hex => hex.slice(1).match(/../g).map(x => parseInt(x,16)/255).map(x => x <= .04045 ? x/12.92 : ((x+.055)/1.055)**2.4).reduce((n,x,i) => n+x*[.2126,.7152,.0722][i],0);
const contrast = (a,b) => (Math.max(lum(a),lum(b))+.05)/(Math.min(lum(a),lum(b))+.05);

test('shared action and navy text meet WCAG AA contrast for normal text', () => {
  for (const [a,b] of [['action','action-ink'],['action-hover','action-ink'],['navy','white'],['muted','white'],['silver','black']]) {
    assert.ok(contrast(token(a),token(b)) >= 4.5, `${a}/${b}`);
  }
});

test('root layout provides the palette to public, standalone and member routes', () => {
  assert.match(readFileSync(new URL('../app/layout.tsx',import.meta.url),'utf8'), /import "\.\/rba-brand\.css"/);
});
