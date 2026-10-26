import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const load = (path) => readFileSync(path, "utf8");
const tour = load("app/ja/national-clinic-tour/page.tsx");
const clinic = load("components/clinic-request.tsx");
const contact = load("components/contact-form.tsx");
const teamVisit = load("app/ja/team-visit-clinic/page.tsx");
const instagram = load("app/ja/instagram/page.tsx");
const home = load("components/localized-home.tsx");
const policy = load("DEPLOYMENT.md");

const checks = [
  ["RBA official national tour page", tour.includes("RBA NATIONAL CLINIC NETWORK")],
  ["47 prefectures enquiry, not confirmed tour", tour.includes("47都道府県から開催相談を受け付けています") && tour.includes("未確定の開催予定")],
  ["one dedicated host form", tour.includes('https://form.jotform.com/262648437888073') && contact.includes('https://form.jotform.com/262648437888073')],
  ["quote before commitment", tour.includes("書面で合意") && clinic.includes("開催条件に合わせて")],
  ["host three formats", ["TEAM VISIT","REGIONAL CLINIC","DEVELOPMENT SERIES"].every(x => tour.includes(x))],
  ["recurring is optional", tour.includes("自動更新や強制継続にはなりません")],
  ["regional host scope and consent", tour.includes("独占エリア") && tour.includes("子ども") === false],
  ["no direct checkout on team visit page", !teamVisit.includes("book.stripe.com") && teamVisit.includes("/ja/clinic-request#request-form")],
  ["existing clinic request uses dedicated host form", clinic.includes('formPurpose={locale==="ja" ? "clinic-host" : "general"}')],
  ["other language forms retain general contact", contact.includes('const url = isHostEnquiry ? regionalHostEnquiryUrl : contactFormUrl')],
  ["RBA homepage links to host tour", home.includes('href="/ja/national-clinic-tour"')],
  ["Instagram links to national host tour", instagram.includes('track("/ja/national-clinic-tour", "national_host_feature")')],
  ["no premature success claims", !/47都道府県.*開催済/.test(tour) && !/予約確定.*済/.test(tour)],
  ["no rogue route-to-payment link", !tour.includes("book.stripe.com") && !tour.includes("checkout.stripe.com")],
  ["deploy policy preserved", policy.includes("preview-rba") && policy.includes("promote the verified Preview artifact to Production")],
  ["SiteFrame owns main landmark", !/<main\b/.test(tour) && tour.includes("<SiteFrame")],
];
for (const [name, passed] of checks) {
  assert.ok(passed, "Clinic funnel audit failed: " + name);
}
console.log(JSON.stringify({ status: "passed", rules: checks.length, scope: "national hosting CTA, quote-first, legacy forms, no forced repeat/auto payment, deployment policy" }));
