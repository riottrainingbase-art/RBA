import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight, Building2, CalendarDays, Globe2, GraduationCap, HeartHandshake, House, ShieldCheck, Users, UserRoundPlus } from "lucide-react";
import { SiteFrame } from "@/components/site-frame";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "RBAの育成に関わる｜選手・保護者・指導者・地域・企業・海外の協力者募集",
  description: "Riot Basketball Academyは、選手・保護者・指導者・会場協力者・運営スタッフ・企業・国際交流パートナーなど、育成の機会を一緒につくる方を募集しています。無料の相談・協力意向登録。",
  robots: { index: true, follow: true },
};

const routes = [
  {
    number: "01", tag: "PLAYERS / FAMILIES", Icon: Users,
    title: "選手・保護者として参加する",
    body: "日頃の所属を変えずに、全国のクリニック、学び、国内外の交流を知る。保護者が活動案内を登録できます。",
    action: "MY HOME COURTの無料案内を受け取る",
    href: "https://form.jotform.com/262663913540054",
    note: "選手本人ではなく保護者が登録。活動情報の受信は任意です。",
  },
  {
    number: "02", tag: "COACH / EDUCATION", Icon: GraduationCap,
    title: "指導者として学ぶ・つながる",
    body: "育成の問いを共有し、指導者教育、講習、国際的な学びに関する情報を受け取る。",
    action: "指導者向け情報の任意登録",
    href: "https://form.jotform.com/263093763398066",
    note: "18歳以上。イベント参加確約・購入申込ではありません。",
  },
  {
    number: "03", tag: "SUPPORT CREW / VOLUNTEERS", Icon: UserRoundPlus,
    title: "運営・地域の協力者になる",
    body: "受付、会場紹介、通訳、撮影、救護、広報、学校・地域への橋渡し。得意なことから、無理のない形で。",
    action: "全国の協力者として無料登録",
    href: "https://form.jotform.com/263227860681058",
    note: "18歳以上の本人のみ。採用・謝礼・派遣を約束する登録ではありません。",
  },
  {
    number: "04", tag: "SCHOOLS / VENUES", Icon: House,
    title: "地域開催・会場の相談をする",
    body: "体育館、学校、クラブ、自治体、地域団体、教育機関と連携し、子どもたちが学ぶ機会をつくる。",
    action: "団体・会場・企画の無料相談",
    href: "https://form.jotform.com/263213962901051",
    note: "会場や共催の確定、予約や契約は別途双方で確認します。",
  },
  {
    number: "05", tag: "BUSINESS / SPONSORS", Icon: Building2,
    title: "企業・スポンサーとして支える",
    body: "物品、会場、移動、食事、宿泊、奨学支援、広報など。企業の強みと地域の課題を結びつけます。",
    action: "協賛・連携の無料相談",
    href: "https://form.jotform.com/262954078351059",
    note: "金銭協賛・ロゴ掲出・契約条件は個別協議。送信だけでは請求されません。",
  },
  {
    number: "06", tag: "INTERNATIONAL / EXCHANGE", Icon: Globe2,
    title: "海外チーム・国際連携でつながる",
    body: "海外クラブ、アカデミー、大学、旅行・受入事業者と安全で継続的な育成交流を検討する。",
    action: "海外・事業連携の相談窓口",
    href: "https://form.jotform.com/263084202642046",
    note: "海外移動・宿泊・旅行代金は、適切な契約主体と条件確認後に取り扱います。",
  },
] as const;

const flow = [
  { title: "関わり方を選ぶ", copy: "興味のある入口から、無料で相談・参加意向を登録。すべてを埋める必要はありません。" },
  { title: "RBAが内容を確認する", copy: "年代・地域・安全・受入体制・活動内容を照合します。登録だけで案件は決まりません。" },
  { title: "具体的な機会を相談する", copy: "必要に応じて目的、場所、日程、責任範囲、費用、保険、交通・謝礼などを提示します。" },
  { title: "双方の同意があれば一緒に動く", copy: "無理な参加、無給の強要、未承諾の契約や決済は行いません。" },
] as const;

export default function GetInvolvedPage() {
  return (
    <SiteFrame locale="ja" languagePage="my-homecourt">
      <main className={styles.root}>
        <section className={styles.hero}>
          <div className={styles.eyebrow}>RBA / PEOPLE MAKE DEVELOPMENT POSSIBLE</div>
          <div className={styles.heroGrid}>
            <div>
              <p className={styles.tag}>全国・地域・世界へ。関わる入口を広げます。</p>
              <h1>バスケットボールの<br /><em>未来を、一緒につくる。</em></h1>
              <p className={styles.lead}>必要なのは、選手だけではありません。保護者、指導者、体育館をつなぐ人、当日を支える人、企業、教育機関、海外の仲間。一人ひとりが関わることで、子どもたちの選択肢は増えていきます。</p>
              <div className={styles.heroActions}>
                <a className={styles.primary} href="#roles">自分に合う関わり方を探す <ArrowRight size={18}/></a>
                <a className={styles.secondary} href="https://form.jotform.com/263227860681058" target="_blank" rel="noopener noreferrer">協力者として無料登録 <ArrowUpRight size={17}/></a>
              </div>
              <p className={styles.small}>登録は無料です。採用・イベント実施・出場枠・契約・費用負担を確約するものではありません。</p>
            </div>
            <div className={styles.heroAside}>
              <div className={styles.heroAsideIcon}><HeartHandshake size={38}/></div>
              <span>RBA NETWORK</span>
              <strong>参加する人と、<br />支える人を、<br />つなぐ。</strong>
              <p>LOCAL / JAPAN / ASIA / WORLD</p>
            </div>
          </div>
        </section>

        <section className={styles.intro}>
          <div><span>OUR PRINCIPLE</span><h2>支援をお願いするだけでなく、<br />「何ができるか」を一緒に考える。</h2></div>
          <p>参加費・協賛金・人材・会場・時間など、協力の形は一つではありません。支える人の負担や立場を尊重し、具体的な役割と条件が明らかになってから活動を進めます。</p>
        </section>

        <section className={styles.section} id="roles">
          <div className={styles.heading}><div><span>01 / GET INVOLVED</span><h2>あなたは、どこから関わりますか？</h2></div><p>目的別の窓口を整理しました。最初は小さな関わり方でも構いません。</p></div>
          <div className={styles.cards}>
            {routes.map(({number,tag,Icon,title,body,action,href,note})=>(
              <article className={styles.card} key={number}>
                <div className={styles.cardTop}><span>{number} / {tag}</span><Icon size={26}/></div>
                <h3>{title}</h3>
                <p>{body}</p>
                <a className={styles.cardLink} href={href} target="_blank" rel="noopener noreferrer">{action}<ArrowUpRight size={16}/></a>
                <small>{note}</small>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.darkSection}>
          <div className={styles.heading}><div><span>02 / HOW IT WORKS</span><h2>登録から、実際の協力まで。</h2></div><p>連絡先を集めることが目的ではありません。安全で現実的な協働につなげるための流れです。</p></div>
          <div className={styles.steps}>{flow.map((item,i)=><article key={item.title}><span>{String(i+1).padStart(2,"0")}</span><div><h3>{item.title}</h3><p>{item.copy}</p></div></article>)}</div>
        </section>

        <section className={styles.section}>
          <div className={styles.heading}><div><span>03 / IMPORTANT INFORMATION</span><h2>子どもたちを中心にした、安全な連携。</h2></div></div>
          <div className={styles.safety}>
            <ShieldCheck size={36}/>
            <div><strong>応募した方と未成年者を、無制限に直接つなぐことはしません。</strong>
              <p>イベントごとに必要な資格・本人確認・保険・安全方針・担当範囲を確認します。子どもの氏名・健康情報・顔写真・身分証などは、最初の協力登録フォームでは求めません。個人情報は登録した相談目的の範囲で取り扱い、メールによる継続案内は別途本人の同意を確認します。</p>
            </div>
          </div>
        </section>

        <section className={styles.bottom}>
          <div><span>RBA SUPPORT CREW</span><h2>「できることがあるかも」<br />その一歩から。</h2><p>協力の形がまだ決まっていなくても、活動したい地域や得意なことを聞かせてください。成人の方の無料意向登録です。</p></div>
          <div className={styles.bottomAction}>
            <a className={styles.primary} href="https://form.jotform.com/263227860681058" target="_blank" rel="noopener noreferrer">協力者として無料登録する <ArrowUpRight size={18}/></a>
            <a className={styles.back} href="/ja/my-homecourt">MY HOME COURTへ戻る <ArrowRight size={16}/></a>
          </div>
          <p className={styles.footerNote}><CalendarDays size={14}/> 活動日程、報酬・交通費、会場・企画の成立は登録後に個別確認します。</p>
        </section>
      </main>
    </SiteFrame>
  );
}
