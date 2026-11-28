import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const read = (path) => readFileSync(new URL("../" + path, import.meta.url), "utf8");
test("member app and login both refresh the session", () => {
  const source = read("proxy.ts");
  assert.ok(source.includes("my-homecourt\\/(?:app|login)"));
  assert.ok(source.includes("await updateSession(request,requestHeaders)"));
});
test("forward refreshed cookies to both server and browser", () => {
  const source = read("lib/supabase/proxy.ts");
  assert.ok(source.includes("new Headers(request.headers)"));
  assert.ok(source.includes("request.cookies.set(name,value)"));
  assert.ok(source.indexOf("request.cookies.set(name,value)") < source.indexOf("response=forwardRequest();", source.indexOf("setAll(values)")));
  assert.ok(source.includes("response.cookies.set(name,value,options)"));
  assert.ok(source.includes("await supabase.auth.getClaims()"));
});
test("returning members retain locale and server verification", () => {
  const source = read("components/member-login-entry.tsx");
  assert.ok(source.includes("memberAuthDestination(next||`" + "${prefix}/my-homecourt/app`)"));
  assert.ok(source.includes("await supabase.auth.getUser()"));
  assert.ok(source.indexOf("if(hasSession) redirect(destination)") < source.indexOf('process.env.RBA_AUTH_EMAIL_READY === "true"'));
});
test("guide directs users to authenticated member home", () => {
  const source = read("app/ja/my-homecourt/guide/page.tsx");
  assert.ok(source.includes("毎回メールアドレスを求められる"));
  assert.ok(source.includes('href="/ja/my-homecourt/app"'));
});
