import { ArrowRight, BookOpen, Video } from "lucide-react";
import { localePath, type Locale } from "./site-frame";

const copy = {
  ja:{title:"トーステン・ロイブル Vol.2｜シューター育成講習の録画",body:"2026年11月25日のシューター育成講習。英語講義・日本語逐次通訳付き。録画のみ税込4,400円。視聴は公開から30日間（購入から30日ではありません）。RBAが入金確認後、決済時のメールアドレスに視聴案内をお送りします。",buy:"録画を購入する（税込4,400円）",support:"購入済み・再生できない方",learn:"D-HUBで継続して学ぶ",note:"LIVEは終了。購入済み・視聴対象の方は再決済不要です。",subject:"Torsten Vol.2 オンデマンド購入希望"},
  en:{title:"Torsten Loibl Vol.2 | Shooter development recording",body:"The 25 November 2026 shooter development clinic, presented in English with Japanese consecutive interpretation. Recording only: US$29. Viewing is limited to 30 days from release, not purchase. RBA emails viewing instructions after verifying payment.",buy:"Purchase recording · US$29",support:"Already paid / playback support",learn:"Continue learning with D-HUB",note:"Live registration is closed. If you already have recording access, do not pay again.",subject:"Torsten Vol.2 recording purchase request"},
  "zh-tw":{title:"Torsten Loibl Vol.2｜錄影購買申請",body:"2026年11月25日射手培育講座，英文授課並附日文逐步口譯。錄影 US$29。觀看期限為公開後30天，而非購買後30天；RBA 確認付款後將以電子郵件寄送觀看說明。",buy:"購買錄影 · US$29",support:"已付款／播放支援",learn:"透過 D-HUB 持續學習",note:"直播已結束。已有觀看資格者請勿重複付款。",subject:"Torsten Vol.2 錄影購買申請"},
  ko:{title:"Torsten Loibl Vol.2 | 녹화 구매 접수",body:"2026년 11월 25일 슈터 육성 강의. 영어 강의와 일본어 순차 통역. 녹화 US$29. 공개일로부터 30일 동안 시청하며 구매일부터 30일이 아닙니다. RBA가 결제를 확인한 후 이메일로 시청 방법을 안내합니다.",buy:"녹화 구매 · US$29",support:"결제 완료 / 재생 지원",learn:"D-HUB에서 계속 학습",note:"라이브 접수 종료. 기존 시청 권한이 있다면 다시 결제하지 마세요.",subject:"Torsten Vol.2 녹화 구매 신청"},
} as const;

export function TorstenRecordingOffer({ locale }: { locale: Locale }) {
  const c=copy[locale];
  const help={ja:"視聴期限・残り期間は購入前にご確認ください。再生できない場合はSafariまたはChromeで直接開き、解消しないときは照合フォームからご相談ください。カード番号・パスワードは不要です。",en:"Check the remaining viewing period before paying. If playback fails, open the link directly in Safari or Chrome and use the support form. Never send card details or passwords.","zh-tw":"付款前請確認剩餘觀看期限。如無法播放，請以 Safari 或 Chrome 直接開啟，再使用支援表單。請勿提供信用卡號或密碼。",ko:"결제 전에 남은 시청 기간을 확인하세요. 재생되지 않으면 Safari 또는 Chrome에서 직접 열고 지원 양식을 이용하세요. 카드 번호나 비밀번호는 보내지 마세요."}[locale];
  const checkout = locale === "ja" ? "https://book.stripe.com/bJebJ3dCD6nq9eR9gr7EQ0c" : "https://buy.stripe.com/dRmcN75671364YB9gr7EQ1m";
  return <section className="section-pad" id="torsten-recording-order" style={{background:"#142437",color:"#F6F5F1",marginBlock:"1.5rem"}}>
    <p className="section-index" style={{color:"#e4d2b6"}}>RBA COACH EDUCATION / ON DEMAND</p>
    <h2 style={{fontSize:"clamp(1.5rem,4vw,2.5rem)",fontFamily:"Georgia, Yu Mincho, serif",fontWeight:600,marginBlock:"1rem"}}><Video aria-hidden="true" size={25} style={{display:"inline",marginRight:8}}/>{c.title}</h2>
    <p style={{lineHeight:1.8,maxWidth:780}}>{c.body}</p>
    <p style={{marginBlock:"1rem",fontWeight:700}}>{c.note}</p>
    <p style={{lineHeight:1.8,maxWidth:780,marginBottom:"1rem"}}>{help}</p>
    <div style={{display:"flex",flexWrap:"wrap",gap:12}}><a className="button button-light" href={checkout}>{c.buy}<ArrowRight size={16}/></a><a className="button button-light" href="https://form.jotform.com/263243557140049">{c.support}<ArrowRight size={16}/></a><a className="button button-light" href={localePath(locale,"d-hub")}><BookOpen size={16}/>{c.learn}</a></div>
  </section>;
}
