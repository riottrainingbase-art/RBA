/* eslint-disable @next/next/no-html-link-for-pages -- checkout is a server redirect endpoint and must never be prefetched. */
import { ArrowRight, Check, House, ShieldCheck, Sparkles, Users } from "lucide-react";
import { homecourtFreeRegistrationUrl, HOMECOURT_PRICE_JPY, homecourtRoles } from "./homecourt-data";
import { Locale, localePath, SiteFrame } from "./site-frame";


const copy = {
  en: { title:"Your other home court.", lead:"RBA HOMECOURT is the open gateway for players, parents and coaches. Start free, then choose RBA HOMECOURT only when ongoing benefits fit your needs.", join:"Choose RBA HOMECOURT", free:"Join free", start:"Open MY HOME COURT", price:"RBA HOMECOURT / month", note:"Free registration creates no charge. RBA HOMECOURT is charged only after you confirm the plan on Stripe.", included:"What RBA HOMECOURT connects", includedBody:"A clear route from one event to the next opportunity — without replacing your current team.", steps:"How to start", stepItems:[["01","Choose your route","Review the PLAYER, PARENT or COACH guide."],["02","Join free","Register for role-based news, resources and community invitations."],["03","Upgrade only if useful","Choose RBA HOMECOURT on Stripe when you want continuous paid benefits."]], safe:"Payment and personal information", safeBody:"Payment details are handled by Stripe. Do not submit a child’s medical information or private images through a general enquiry form." },
  ja: { title:"所属チームの外にも、学びと挑戦のホームコートを。", lead:"選手・保護者・指導者が、全国のクリニックや学び、交流の機会を見つけ、自分に合う次の一歩を選べる場所です。登録は無料。今のチームに所属したまま利用できます。", join:"RBA IDでログイン", free:"無料でRBA IDをつくる", start:"MY HOME COURTを開く", price:"HOMECOURT PLUS 月額", note:"参加条件と料金は、各プログラムの申込時にご確認ください。", included:"MY HOME COURTでできること", includedBody:"一度の参加をその日だけで終わらせず、次の活動や学びにつなげながら、自分の経験と成長を記録できます。", steps:"利用開始までの流れ", stepItems:[["01","自分に合うページを選ぶ","PLAYER／PARENT／COACHから、自分の立場に合った案内を確認します。"],["02","RBA IDで始める","活動情報や育成に役立つ学び、コミュニティのお知らせを確認できます。"],["03","次の活動を見つける","クリニックや交流活動の予定から、自分に合う次の挑戦を探せます。"]], safe:"決済情報・個人情報の取り扱い", safeBody:"カード情報はStripeの決済画面で入力・管理されます。お子さまの健康情報や非公開の写真は、一般のお問い合わせフォームから送信しないでください。" },
  "zh-tw": { title:"再多一個主場。", lead:"RBA HOMECOURT是球員、家長與教練連結活動與學習的入口。先免費加入，需要持續福利時再選擇RBA HOMECOURT。", join:"查看RBA HOMECOURT", free:"免費加入", start:"開啟MY HOME COURT", price:"RBA HOMECOURT 每月", note:"免費登錄不收費；只有在Stripe確認並付款後才成為付費會員。", included:"RBA HOMECOURT連結內容", includedBody:"從一次活動持續連結到下一次學習與機會，不需離開目前的球隊。", steps:"開始使用", stepItems:[["01","選擇入口","查看PLAYER、PARENT或COACH指南。"],["02","免費加入","接收活動、內容與社群邀請。"],["03","需要時升級","需要持續福利時再於Stripe選擇RBA HOMECOURT。"]], safe:"付款與個人資料", safeBody:"付款資料由Stripe處理。請勿透過一般詢問表提交兒童的健康資料或非公開照片。" },
  ko: { title:"또 하나의 홈 코트를.", lead:"RBA HOMECOURT는 선수, 보호자, 코치가 활동과 배움에 연결되는 입구입니다. 무료로 시작하고 필요할 때 RBA HOMECOURT를 선택합니다.", join:"RBA HOMECOURT 보기", free:"무료 가입", start:"MY HOME COURT 열기", price:"RBA HOMECOURT 월", note:"무료 등록은 과금되지 않습니다. Stripe에서 확인하고 결제한 경우에만 유료 회원이 됩니다.", included:"RBA HOMECOURT로 연결되는 것", includedBody:"현재 팀을 떠나지 않고 한 번의 참가를 다음 배움과 기회로 연결합니다.", steps:"이용 시작", stepItems:[["01","입구 선택","PLAYER, PARENT 또는 COACH 안내를 확인합니다."],["02","무료 가입","프로그램, 콘텐츠와 커뮤니티 안내를 받습니다."],["03","필요할 때 업그레이드","지속 혜택이 필요할 때 Stripe에서 RBA HOMECOURT를 선택합니다."]], safe:"결제 및 개인정보", safeBody:"결제 정보는 Stripe가 처리합니다. 일반 문의 양식으로 아동의 건강 정보나 비공개 사진을 보내지 마세요." },
} as const;


export function HomecourtPage({locale}:{locale:Locale}) {
  const c=copy[locale];
  const authReady=process.env.RBA_AUTH_EMAIL_READY==="true";
  const registrationUrl=authReady?homecourtFreeRegistrationUrl(locale):"https://lin.ee/5l1YG8N";
  const prefix=locale==="en"?"":`/${locale}`;
  const roleLabels=locale==="ja"?homecourtRoles:{
    players:{...homecourtRoles.players,label:locale==="en"?"For players":locale==="zh-tw"?"給球員":"선수"},
    families:{...homecourtRoles.families,label:locale==="en"?"For families":locale==="zh-tw"?"給家長":"보호자"},
    coaches:{...homecourtRoles.coaches,label:locale==="en"?"For coaches":locale==="zh-tw"?"給教練":"코치"},
  };
  return <SiteFrame locale={locale} languagePage="home-court">
    <section className="homecourt-launch-hero section-pad">
      <a className="back-link" href={localePath(locale)}>← RBA</a>
      <p className="section-index inverse">RBA / MY HOME COURT</p>
      <h1>{c.title}</h1><p>{c.lead}</p>
      <div className="homecourt-launch-actions"><a className="button button-member" href={registrationUrl} target={!authReady?"_blank":undefined} rel={!authReady?"noreferrer":undefined}><Sparkles size={18}/>{locale==="ja"&&!authReady?"登録再開のお知らせを受け取る":c.free}<ArrowRight size={17}/></a><a className="button button-light" href={`${prefix}/my-homecourt`}><House size={18}/>{c.start}<ArrowRight size={17}/></a></div>{locale==="ja"&&authReady?<p className="registration-note"><strong>登録無料・約1分。</strong> メールアドレスからRBA IDを作成し、PLAYER／PARENT／COACHから自分の入口を選べます。</p>:null}{locale==="ja"&&!authReady?<p className="registration-note">RBA IDの登録・ログインメールは現在調整中です。再開のお知らせは公式LINEでご案内します。</p>:null}
      {locale!=="ja"?<div className="homecourt-price"><span>{c.price}</span><strong>¥{HOMECOURT_PRICE_JPY.toLocaleString("ja-JP")}</strong><small>{c.note}</small></div>:null}
    </section>
    <section className="homecourt-role-section section-pad"><div className="section-head"><div><p className="section-index">PLAYER / PARENT / COACH</p><h2>{c.included}</h2></div><p>{c.includedBody}</p></div><div className="homecourt-role-grid">{Object.entries(roleLabels).map(([role,data])=><article key={role}><span>{data.shortLabel}</span><Users size={28}/><h3>{data.label}</h3>{locale==="ja"?<p>{data.description}</p>:null}<ul>{data.items.map(item=><li key={item}><Check size={15}/>{item}</li>)}</ul><a href={`${prefix}/my-homecourt/${role}`}>{data.label}<ArrowRight size={16}/></a></article>)}</div></section>
    {locale==="ja"?<section className="homecourt-product-preview section-pad">
      <div className="section-head">
        <div><p className="section-index">FOR TEAMS / COACHES</p><h2>チームの日常にも、MY HOME COURTをつなげる。</h2></div>
        <p>指導者はTEAM HOMEで練習を設計し、必要に応じてRBAの訪問トレーニングへつなげられます。</p>
      </div>
      <div className="homecourt-preview-grid">
        <article><Users/><span>01 / TEAM HOME</span><h3>チームを登録する</h3><p>予定、出欠、練習テーマ、メモを一つの場所で管理します。</p></article>
        <article><Check/><span>02 / TEAM TRAINING</span><h3>練習を設計する</h3><p>テーマ、目的、メニュー、人数、コート数、観察ポイントを残し、次回の練習へつなげます。</p><a className="text-link" href="/ja/team-training">TEAM TRAININGを見る<ArrowRight size={16}/></a></article>
        <article><Users/><span>03 / VISIT TRAINING</span><h3>RBAを現場に呼ぶ</h3><p>普段の体育館で、練習観察、オンコート指導、ゲーム観察、指導者フィードバックまで実施できます。</p><a className="text-link" href="/ja/team-visit-clinic">訪問トレーニングを見る<ArrowRight size={16}/></a></article>
      </div>
    </section>:null}
    {locale==="ja"?<section className="homecourt-plan-separation section-pad">
      <div className="homecourt-plan-intro">
        <p className="section-index">RBA ID / HOMECOURT</p>
        <h2>RBA IDとHOMECOURT PLUSは、できることが明確に分かれています。</h2>
        <p>無料のRBA IDでは「知る・探す・記録する」。HOMECOURT PLUSでは、そこから「学ぶ・試す・振り返る・次を決める」までを継続できます。</p>
      </div>
      <div className="homecourt-plan-grid">
        <article className="homecourt-plan-card homecourt-plan-free">
          <div className="homecourt-plan-card-head"><span>RBA ID</span><strong>¥0</strong><small>無料</small></div>
          <h3>知る・探す・記録する</h3>
          <ul>
            <li><Check size={17}/>募集中のクリニック・キャンプを探す</li>
            <li><Check size={17}/>JOURNALの公開記事を読む</li>
            <li><Check size={17}/>Basketball Passportに参加経験を残す</li>
            <li><Check size={17}/>気になる活動を保存する</li>
            <li><Check size={17}/>PLAYER / PARENT / COACHの入口を使う</li>
          </ul>
          <a className="button button-light" href={registrationUrl} target={!authReady?"_blank":undefined} rel={!authReady?"noreferrer":undefined}>RBA IDをつくる<ArrowRight size={16}/></a>
        </article>
        <article className="homecourt-plan-card homecourt-plan-paid">
          <div className="homecourt-plan-card-head"><span>HOMECOURT PLUS</span><strong>¥3,300</strong><small>月額・税込</small></div>
          <h3>記録を、次の行動に変える</h3>
          <ul>
            <li><Check size={17}/>今週の育成テーマと実践サイクル</li>
            <li><Check size={17}/>大会・遠征から逆算するSMART PREP</li>
            <li><Check size={17}/>体調・疲労・痛み・睡眠の7日間トレンド</li>
            <li><Check size={17}/>会員限定の学習ライブラリ</li>
            <li><Check size={17}/>地域〜世界までのDEVELOPMENT HORIZON</li>
            <li><Check size={17}/>参加・保存・学びをまとめるMONTHLY REVIEW</li>
          </ul>
          <a className="button button-member" href="/api/commerce/checkout/homecourt-monthly?locale=ja">HOMECOURT PLUSを始める<ArrowRight size={16}/></a>
        </article>
      </div>
      <div className="homecourt-private-note"><ShieldCheck size={24}/><div><strong>無料版の機能を制限して、有料版へ誘導する仕組みではありません。</strong><p>活動を探す、公開記事を読む、経験を記録する機能はRBA IDで利用できます。HOMECOURT PLUSは、学びと実践を継続して整理したい方のための追加機能です。</p></div></div>
    </section>:null}
    <section className="homecourt-start section-pad"><div><p className="section-index inverse">START</p><h2>{c.steps}</h2></div><ol>{c.stepItems.map(([no,title,body])=><li key={no}><span>{no}</span><div><strong>{title}</strong><p>{body}</p></div></li>)}</ol></section>
    <section className="homecourt-start section-pad"><div><p className="section-index inverse">SHARE</p><h2>{locale==="ja"?"仲間にも、もうひとつのホームコートを。":"Share another home court."}</h2></div><ol><li><span>01</span><div><strong>{locale==="ja"?"指導者に共有":"Share with a coach"}</strong><p>{locale==="ja"?"全国の育成機会や学びを探せる入口として、そのままURLを共有できます。":"Share the public MY HOME COURT page."}</p><a className="text-link" href={`mailto:?subject=${encodeURIComponent("MY HOME COURT｜Riot Basketball Academy")}&body=${encodeURIComponent("全国のクリニック・学び・育成機会を探せるRBAのMY HOME COURTです。登録は無料です。\n\nhttps://riotbasketballacademy.com/ja/my-homecourt")}`}>{locale==="ja"?"友人にMY HOME COURTを共有":"Share MY HOME COURT"}<ArrowRight size={16}/></a></div></li><li><span>02</span><div><strong>{locale==="ja"?"所属チームを変えずに使える":"Use it alongside your team"}</strong><p>{locale==="ja"?"所属チームを変えずに、チーム外の学びや全国の育成機会、自分の成長記録につなげられます。":"Use it without leaving your current team."}</p></div></li><li><span>03</span><div><strong>{locale==="ja"?"一度の参加を、次の成長へ":"Turn one event into the next step"}</strong><p>{locale==="ja"?"クリニックへの参加、Basketball Passportへの記録、活動の保存、次の育成機会までをRBA IDでつなぎます。":"Connect events, Passport, saves and the next opportunity."}</p></div></li></ol></section>
    <section className="homecourt-safety section-pad"><ShieldCheck size={38}/><div><h2>{c.safe}</h2><p>{c.safeBody}</p><a className="text-link" href={localePath(locale,"policies")}>{locale==="ja"?"参加規約・安全方針を確認":"Read policies"}<ArrowRight size={16}/></a></div></section>
  </SiteFrame>;
}
