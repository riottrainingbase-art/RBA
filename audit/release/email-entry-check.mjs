import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const code = ts.transpileModule(fs.readFileSync('components/member-login-entry.tsx', 'utf8'), {
  compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
let cases = 0;
for (const ready of [undefined, '', 'false', 'TRUE', 'true']) {
  const compiled = { exports: {} };
  vm.runInNewContext(code, {
    module: compiled, exports: compiled.exports, process: { env: { RBA_AUTH_EMAIL_READY: ready } },
    require: id => id === './member-login' ? { MemberLogin: () => React.createElement('form', { 'data-auth-entry': 'enabled' }) } : require(id),
  });
  for (const locale of ['en', 'ja', 'zh-tw', 'ko']) {
    const html = renderToStaticMarkup(React.createElement(compiled.exports.MemberLoginEntry, { locale }));
    assert.equal(html.includes('<form'), ready === 'true');
    if (ready !== 'true') {
      const prefix = locale === 'en' ? '' : `/${locale}`;
      for (const path of ['/schedule', '/contact', '/my-homecourt']) assert(html.includes(`href="${prefix}${path}"`));
      assert(html.includes('role="status"'));
      assert(!html.includes('type="email"'));
    }
    cases++;
  }
}
console.log(`PASS: ${cases} email-entry cases; unavailable SMTP never renders a send form. No email sent.`);
