import { ArrowRight, Check, CreditCard, House, ShieldCheck, Sparkles, Users } from "lucide-react";
import { homecourtFreeRegistrationUrl, HOMECOURT_PRICE_JPY, homecourtRoles } from "./homecourt-data";
import { Locale, localePath, SiteFrame } from "./site-frame";


const copy = {
  en: { title:"Your other home court.", lead:"RBA HOMECOURT is the open gateway for players, parents and coaches. Start free, then choose RBA HOMECOURT only when ongoing benefits fit your needs.", join:"Choose RBA HOMECOURT", free:"Join free", start:"Open MY HOME COURT", price:"RBA HOMECOURT / month", note:"Free registration creates no charge. RBA HOMECOURT is charged only after you confirm the plan on Stripe.", included:"What RBA HOMECOURT connects", includedBody:"A clear route from one event to the next opportunity — without replacing your current team.", steps:"How to start", stepItems:[["01","Choose your route","Review the PLAYER, PARENT or COACH guide."],["02","Join free","Register for role-based news, resources and community invitations."],["03","Upgrade only if useful","Choose RBA HOMECOURT on Stripe when you want continuous paid benefits."]], safe:"Payment and personal information", safeBody:"Payment details are handled by Stripe. Do not submit a child’s medical information or private images through a general enquiry form." },
  ja: { title:"もうひとつ、ホームコートを。", lead:"RBA HOMECOURTは、選手・保護者・コーチが、全国の活動や学び、仲間とつながるための会員サービスです。まずは無料会員から始め、継続的なサポートや会員特典が必要になったときだけ、有料会員へ移行できます。", join:"ログインして加入", free:"無料会員になる", start:"MY HOME COURTを開く", price:"RBA HOMECOURT 月額", note:"無料登録だけでは料金は発生しません。ログイン後にStripeでプラン内容と金額を確認し、ご自身で決済を完了した場合にのみ有料会員となります。", included:"RBA HOMECOURTでできること", includedBody:"一度きりの参加で終わらず、次の活動や学び、地域とのつながりを広げていくための共通ページです。", steps:"利用開始までの流れ", stepItems:[["01","自分に合うページを選ぶ","PLAYER／PARENT／COACHから、自分の立場に合った案内を確認します。"],["02","無料会員になる","活動情報、育成コンテンツ、コミュニティのお知らせを受け取れます。"],["03","必要に応じて有料会員へ","継続的なサポートや会員特典が必要になったら、ログイン後にStripeで加入手続きを行います。"]], safe:"決済情報・個人情報の取り扱い", safeBody:"カード情報はStripeが安全に取り扱います。お子さまの健康情報や非公開の写真は、一般のお問い合わせフォームから送信しないでください。" },
  "zh-tw": { title:"再多一個主場。", lead:"RBA HOMECOURT是球員、家長與教練連結活動與學習的入口。先免費加入，需要持續福利時再選擇RBA HOMECOURT。", join:"查看RBA HOMECOURT", free:"免費加入", start:"開啟MY HOME COURT", price:"RBA HOMECOURT 每月", note:"免費登錄不收費；只有在Stripe確認並付款後才成為付費會員。", included:"RBA HOMECOURT連結內容", includedBody:"從一次活動持續連結到下一次學習與機會，不需離開目前的球隊。", steps:"開始使用", stepItems:[["01","選擇入口","查看PLAYER、PARENT或COACH指南。"],["02","免費加入","接收活動、內容與社群邀請。"],["03","需要時升級","需要持續福利時再於Stripe選擇RBA HOMECOURT。"]], safe:"付款與個人資料", safeBody:"付款資料由Stripe處理。請勿透過一般詢問表提交兒童的健康資料或非公開照片。" },
  ko: { title:"또 하나의 홈 코트를.", lead:"RBA HOMECOURT는 선수, 보호자, 코치가 활동과 배움에 연결되는 입구입니다. 무료로 시작하고 필요할 때 RBA HOMECOURT를 선택합니다.", join:"RBA HOMECOURT 보기", free:"무료 가입", start:"MY HOME COURT 열기", price:"RBA HOMECOURT 월", note:"무료 등록은 과금되지 않습니다. Stripe에서 확인하고 결제한 경우에만 유료 회원이 됩니다.", included:"RBA HOMECOURT로 연결되는 것", includedBody:"현재 팀을 떠나지 않고 한 번의 참가를 다음 배움과 기회로 연결합니다.", steps:"이용 시작", stepItems:[["01","입구 선택","PLAYER, PARENT 또는 COACH 안내를 확인합니다."],["02","무료 가입","프로그램, 콘텐츠와 커뮤니티 안내를 받습니다."],["03","필요할 때 업그레이드","지속 혜택이 필요할 때 Stripe에서 RBA HOMECOURT를 선택합니다."]], safe:"결제 및 개인정보", safeBody:"결제 정보는 Stripe가 처리합니다. 일반 문의 양식으로 아동의 건강 정보나 비공개 사진을 보내지 마세요." },
} as const;


export function HomecourtPage({locale}:{locale:Locale}) {
  const c=copy[locale];
  const prefix=locale==="en"?"":`/${locale}`;
  const roleLabels=locale==="ja"?homecourtRoles:{
    players:{...homecourtRoles.players,label:locale==="en"?"For players":locale==="zh-tw"?"給球員":"선수"},
    families:{...homecourtRoles.families,label:locale==="en"?"For families":locale==="zh-tw"?"給家長":"보호자"},
    coaches:{...homecourtRoles.coaches,label:locale==="en"?"For coaches":locale==="zh-tw"?"給教練":"코치"},
  };
  return <SiteFrame locale={locale} languagePage="home-court">
    <section className="homecourt-launch-hero section-pad">
      <a className="back-link" href={localePath(locale)}>← RBA</a>
      <p className="section-index inverse">RBA HOMECOURT / MEMBERSHIP</p>
      <h1>{c.title}</h1><p>{c.lead}</p>
      <div className="homecourt-launch-actions"><a className="button button-member" href={homecourtFreeRegistrationUrl(locale)}><Sparkles size={18}/>{c.free}<ArrowRight size={17}/></a><a className="button button-light" href={`${prefix}/my-homecourt`}><House size={18}/>{c.start}<ArrowRight size={17}/></a><a className="text-link light-link" href={homecourtFreeRegistrationUrl(locale)}><CreditCard size={17}/>{c.join}<ArrowRight size={16}/></a></div>
      <div className="homecourt-price"><span>{c.price}</span><strong>¥{HOMECOURT_PRICE_JPY.toLocaleString("ja-JP")}</strong><small>{c.note}</small></div>
    </section>
    <section className="homecourt-role-section section-pad"><div className="section-head"><div><p className="section-index">PLAYER / PARENT / COACH</p><h2>{c.included}</h2></div><p>{c.includedBody}</p></div><div className="homecourt-role-grid">{Object.entries(roleLabels).map(([role,data])=><article key={role}><span>{data.shortLabel}</span><Users size={28}/><h3>{data.label}</h3>{locale==="ja"?<p>{data.description}</p>:null}<ul>{data.items.map(item=><li key={item}><Check size={15}/>{item}</li>)}</ul><a href={`${prefix}/my-homecourt/${role}`}>{data.label}<ArrowRight size={16}/></a></article>)}</div></section>
    <section className="homecourt-start section-pad"><div><p className="section-index inverse">START</p><h2>{c.steps}</h2></div><ol>{c.stepItems.map(([no,title,body])=><li key={no}><span>{no}</span><div><strong>{title}</strong><p>{body}</p></div></li>)}</ol></section>
    <section className="homecourt-safety section-pad"><ShieldCheck size={38}/><div><h2>{c.safe}</h2><p>{c.safeBody}</p><a className="text-link" href={localePath(locale,"policies")}>{locale==="ja"?"参加規約・安全方針を確認":"Read policies"}<ArrowRight size={16}/></a></div></section>
  </SiteFrame>;
}
