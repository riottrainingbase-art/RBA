import type { Metadata } from "next";
import { SiteFrame, localePath, type Locale } from "./site-frame";
import styles from "./regional-program.module.css";

export const regionalForms = {
  family: "https://form.jotform.com/262938892889081",
  partner: "https://form.jotform.com/262938181843062",
} as const;

const copy = {
  ja: {
    title: "この街から、世界につながるバスケを。",
    intro: "全国、そしてアジアでの出会いを、子どもたちの日常の成長へ。RBAは地域のコーチや皆さんと、今のチームの活動と両立して通えるスクールづくりを進めています。",
    status: "参加したい方・指導や運営に協力したい方を全国で募集中",
    family: "近くで参加したい", partner: "指導や運営に協力したい",
    note: "お住まいの地域や、ご希望をお聞かせください。会場・曜日・対象・料金が決まりましたら、ご案内します。フォームの送信は無料で、入会や予約のお申し込みにはなりません。",
    formsNote: "フォームは日本語です。保護者など18歳以上の方がご記入ください。",
    heading: "どのような形で関わりたいですか？",
    paths: [
      ["お子さまの参加をお考えの方", "お住まいの地域、お子さまの学年、通いやすい曜日をお知らせください。今のチームの活動と両立できるスクールを基本に、地域の状況に合った開催方法を考えます。"],
      ["指導に関わりたい方", "定期的な指導やアシスタント、身体づくりのサポートなど、これまでの経験を生かせる役割をご相談ください。仕事内容や報酬、交通費は、活動を始める前に話し合って決めます。"],
      ["運営や会場の確保、協賛にご協力いただける方", "地域での連絡・調整や体育館の紹介、企業としての支援など、協力できそうなことをお聞かせください。既存チームとのクリニックの共同開催や、チームへの出張指導から始めることも考えています。"],
    ],
    learnHeading: "RBAのスクールで大切にすること",
    learning: [
      ["一人ひとりの発達に合わせる", "同じ学年でも、経験や身体の成長、理解の仕方はそれぞれ違います。子どもたちの様子を見ながら、課題の内容や難しさを調整します。"],
      ["試合で使える力を育てる", "少人数のゲームを通じて、相手や味方を見て、自分でプレーを選び、実行する経験を積み重ねます。"],
      ["身体づくりと休養を考える", "さまざまな動きを身につける練習を取り入れます。所属チームでの練習や試合も踏まえ、負担が重なりすぎない計画を考えます。"],
      ["できたことと次の課題を共有する", "何に取り組み、何ができるようになったかを振り返ります。記録や保護者への共有の方法は、各地域の運営体制に合わせて整えます。"],
    ],
    processHeading: "開催が決まるまで",
    process: ["お住まいの地域や、参加できる曜日を教えてください", "RBAが会場と指導者の調整を進めます", "日時・内容・料金をお知らせし、体験会の参加者を募集します", "体験会でのご意見も踏まえて、継続開催を検討します"],
    availability: "開催地域や開校時期は、まだ決まっていません。会場や指導者などの準備が整った地域から、体験会を始める予定です。",
    faqHeading: "よくあるご質問",
    faq: [
      ["今のチームを辞める必要はありますか？", "今のチームの活動と両立できるスクールを考えています。移籍を前提とした募集ではありません。競技チームを募集する場合は、選手登録や大会参加の条件を別途ご案内します。"],
      ["西尾コーチが毎回指導しますか？", "普段の指導は、地域のコーチが担当する形を基本に検討しています。担当コーチ、西尾の訪問予定、本部によるサポート内容は、正式な募集の際にお知らせします。"],
      ["月謝はいくらですか？", "会場や開催回数、指導体制が決まってからご案内します。今回のフォームを送信しただけで、費用がかかることはありません。"],
      ["協力の相談をすると、契約や採用が決まりますか？", "まずはご希望や条件を伺うためのご相談です。仕事内容、費用や報酬、会員情報の管理、RBAの名称・ロゴの使用などを話し合い、双方が合意したうえで活動を始めます。相談だけで契約や採用、開校が決まることはありません。"],
      ["海外遠征や大会にも参加できますか？", "RBA UNITEDなどの海外活動は、スクールとは別に募集します。参加条件や日程、費用は、それぞれの募集案内をご確認ください。今回のフォームの送信によって、海外活動への参加や進路が決まるわけではありません。"],
    ],
    linksHeading: "現在のRBAの活動を見る", links: ["募集中のプログラム", "これまでの全国での活動", "RBA ID・MY HOME COURT", "規約・安全に関する方針"],
  },
  en: {
    title: "Help build a place to keep learning basketball, locally.",
    intro: "RBA is exploring regular development sessions in Japan with families, local coaches and organisations, building on connections made through our clinics.",
    status: "Expressions of interest open across Japan", family: "I would like sessions near me", partner: "I would like to coach or help organise",
    note: "This is a free enquiry, not enrolment or a paid booking. Locations, schedules, age groups and fees will be announced only when confirmed.", formsNote: "The forms are in Japanese. A parent, guardian or other adult aged 18 or over should complete them.",
    heading: "For families and local partners", paths: [["Players and families", "Tell us your area, school year and availability. We are exploring sessions that complement a player's existing team."],["Coaches and specialists", "Discuss regular coaching, assistance or physical preparation. Duties, payment and travel costs must be agreed before work begins."],["Organisers, venues and businesses", "Explore local coordination, court access or support. Joint clinics and team visits are possible starting points."]],
    learnHeading: "Learn, apply and reflect", learning: [["Appropriate challenges", "Adapt tasks to experience, movement and understanding."],["Learning through games", "Connect perception, decisions and action in small-sided games."],["Physical development", "Consider movement, workload and recovery alongside existing activities."],["Useful reflection", "Share what players have worked on and their next steps. Record-keeping will depend on the local setup."]],
    processHeading: "How a local programme starts", process: ["Register your area and availability", "Confirm venue and coaching arrangements", "Publish a specific trial with its schedule and fee", "Review the trial before deciding on regular sessions"], availability: "No nationwide opening schedule has been confirmed. We will start where the necessary arrangements are in place.",
    faqHeading: "Before you register", faq: [["Must a player leave their current team?", "No transfer is needed to express interest. Any competitive team registration would have its own rules and separate information."],["Will Masato coach every session?", "Regular sessions are expected to involve local coaches. The named coach, visits and head-office support will be specified before enrolment."],["What will it cost?", "Fees are not confirmed. Registering interest incurs no charge."],["Does applying create a partnership?", "No. Roles, costs, payment, data and brand use require a separate agreement."],["Does this include overseas tournaments?", "RBA UNITED and overseas activities are separate programmes with their own eligibility and costs."]], linksHeading: "Explore current RBA activities", links: ["Current programmes", "Activity map in Japan", "RBA ID / MY HOME COURT", "Policies"],
  },
  "zh-tw": {
    title: "一起在日本各地，建立持續學習籃球的地方。", intro: "RBA希望把訓練營中建立的連結延伸到日常，與家長、在地教練和團體共同規劃持續性的培育活動。", status: "接受日本各地的參加意願與合作洽詢", family: "希望在附近參加", partner: "希望參與教學或在地營運", note: "這是免費意願登記，不是付費報名。地點、時間、對象與費用將於確認後另行公告。", formsNote: "表單為日文，請由年滿18歲的家長或成年聯絡人填寫。", heading: "讓參加者與在地夥伴一起投入", paths: [["球員與家長", "提供居住地區、年級與可參加時間。我們以能與原球隊活動並行的課程為主要規劃方向。"],["教練與專業人員", "可洽談定期教學、助教或體能支持。工作範圍、報酬和交通費須於開始前確認。"],["營運者、場地與企業", "歡迎洽談在地協調、場地或活動支持，也可從共同舉辦訓練營或球隊到訪指導開始。"]], learnHeading: "學習、運用，再回顧", learning: [["符合發展的挑戰", "依經驗、動作與理解調整任務。"],["透過比賽學習", "以小組對抗連結觀察、決策與執行。"],["整合身體發展", "把動作、負荷與恢復納入計畫，兼顧原有活動。"],["分享下一步", "回顧學習內容與下一個課題，依在地體制安排記錄。"]], processHeading: "如何開始", process: ["登記地區與可參加時間", "確認場地和教練安排", "公布體驗的日期、內容與費用", "回顧體驗，再判斷是否持續舉辦"], availability: "目前尚未決定在日本所有地區開課，將從條件具備的地區開始。", faqHeading: "登記前請了解", faq: [["需要離開原球隊嗎？", "意願登記無須轉隊。競賽球隊的註冊與參賽規則將另行說明。"],["每次都由西尾教練指導嗎？", "定期活動以在地教練為規劃方向，正式招募時會公布教練、訪問和總部支持安排。"],["學費多少？", "尚未確定。意願登記不收費。"],["填表就成為合作夥伴嗎？", "不是。工作、費用、報酬、資料與品牌使用須另行協議。"],["包含海外賽事嗎？", "RBA UNITED等海外活動是獨立企劃，有各自的對象、費用與條件。"]], linksHeading: "查看目前的活動", links: ["現有活動", "日本活動地圖", "RBA ID / MY HOME COURT", "條款與安全方針"],
  },
  ko: {
    title: "일본 각 지역에 꾸준히 배울 수 있는 농구 환경을.", intro: "RBA는 클리닉에서 맺은 인연을 일상의 육성으로 이어 가고자 합니다. 가족, 지역 코치와 단체가 함께 지속적인 프로그램을 준비합니다.", status: "일본 전역의 참가 희망 및 지역 협력 문의 접수", family: "가까운 곳에서 참가하고 싶어요", partner: "지도·지역 운영에 참여하고 싶어요", note: "무료 관심 등록이며 유료 신청이나 입회가 아닙니다. 장소·일정·대상·요금은 확정 후 안내합니다.", formsNote: "양식은 일본어입니다. 만 18세 이상의 보호자 또는 성인이 작성해 주세요.", heading: "참가자와 지역 파트너를 위한 안내", paths: [["선수·보호자", "거주 지역, 학년, 가능한 요일을 알려 주세요. 기존 팀과 병행할 수 있는 수업을 기본으로 검토합니다."],["코치·전문가", "정기 지도, 보조 지도, 신체 훈련 등의 역할을 상담할 수 있습니다. 업무·보수·교통비는 시작 전에 합의합니다."],["운영자·시설·기업", "지역 조정, 코트 제공, 활동 지원을 상담해 주세요. 공동 클리닉이나 팀 방문 지도부터 시작할 수도 있습니다."]], learnHeading: "배우고, 적용하고, 돌아봅니다", learning: [["발달에 맞는 과제", "경험·움직임·이해에 맞추어 과제를 조정합니다."],["경기를 통한 학습", "소규모 경기로 관찰·선택·실행을 연결합니다."],["신체 발달", "기존 활동과 병행하며 움직임·부하·회복을 고려합니다."],["다음 단계 공유", "학습한 내용과 다음 과제를 공유합니다. 기록 방식은 지역 체제에 따라 정합니다."]], processHeading: "지역 프로그램을 시작하는 과정", process: ["지역·가능한 일정 등록", "시설과 지도자 조건 확인", "일정·내용·요금을 명시한 체험 모집", "체험을 돌아보고 정기 운영 판단"], availability: "전 지역 개설이 확정된 것은 아닙니다. 조건이 갖추어진 지역부터 시작합니다.", faqHeading: "등록 전 확인 사항", faq: [["기존 팀을 그만두어야 하나요?", "희망 등록에는 이적이 필요하지 않습니다. 경쟁 팀 등록과 대회 조건은 별도 안내합니다."],["매회 니시오 코치가 지도하나요?", "정기 수업은 지역 코치의 지도를 기본으로 검토합니다. 지도자·방문·본부 지원은 정식 모집 때 안내합니다."],["월 회비는 얼마인가요?", "아직 확정되지 않았습니다. 희망 등록은 무료입니다."],["신청하면 파트너 계약이 되나요?", "아닙니다. 업무·비용·보수·정보·브랜드 사용에 관해 별도로 합의합니다."],["해외 대회도 포함되나요?", "RBA UNITED 등 해외 활동은 별도 프로그램이며 대상과 비용도 별도로 안내합니다."]], linksHeading: "현재 활동 찾아보기", links: ["현재 프로그램", "일본 활동 지도", "RBA ID / MY HOME COURT", "약관·안전 방침"],
  },
} as const;

export function regionalMetadata(locale: Locale): Metadata {
  const c = copy[locale];
  const prefix = locale === "en" ? "" : `/${locale}`;
  return {
    title: { absolute: `${c.title} | RBA` }, description: c.intro,
    openGraph: { title: c.title, description: c.intro, url: `https://riotbasketballacademy.com${prefix}/regional-program`, siteName: "Riot Basketball Academy", type: "website", images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }] },
    twitter: { card: "summary_large_image", title: c.title, description: c.intro, images: ["https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png"] },
    alternates: { canonical: `https://riotbasketballacademy.com${prefix}/regional-program`, languages: { en: "https://riotbasketballacademy.com/regional-program", ja: "https://riotbasketballacademy.com/ja/regional-program", "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/regional-program", ko: "https://riotbasketballacademy.com/ko/regional-program" } },
  };
}

export function RegionalProgram({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const formLink = (kind: keyof typeof regionalForms) => `${regionalForms[kind]}?utm_source=rba_site&utm_medium=regional_program&utm_campaign=japan_regional_202610&entry_locale=${locale}`;
  return <SiteFrame locale={locale} languagePage="regional-program"><div className={`${styles.page} ${locale === "ja" ? styles.navyPage : ""}`}>
    <section className={styles.hero}>
      {locale === "ja" ? <a className={styles.backLink} href="/ja">← RBA トップページ</a> : null}
      <p className={styles.eyebrow}>{locale === "ja" ? "RBA 地域スクール構想" : "RBA / LOCAL DEVELOPMENT"}</p><p className={styles.status}>{c.status}</p>
      <h1>{c.title}</h1><p className={styles.lead}>{c.intro}</p>
      <div className={styles.actions}><a className={styles.primary} href={locale === "ja" ? "#families" : formLink("family")} target={locale === "ja" ? undefined : "_blank"} rel="noopener noreferrer">{c.family} {locale === "ja" ? "↓" : "↗"}</a><a className={styles.secondary} href={locale === "ja" ? "#partners" : formLink("partner")} target={locale === "ja" ? undefined : "_blank"} rel="noopener noreferrer">{c.partner} {locale === "ja" ? "↓" : "↗"}</a></div>
      <p className={styles.note}>{c.note}</p><p className={styles.note}>{c.formsNote}</p>
      {locale === "ja" ? <nav className={styles.pageNav} aria-label="このページの案内"><a href="#approach">育成方針</a><a href="#opening-steps">開催までの流れ</a><a href="#questions">よくあるご質問</a></nav> : null}
    </section>
    {locale === "ja" ? <>
      <section className={styles.section} aria-labelledby="choose-role">
        <p className={styles.eyebrow}>まずは、あなたに合う入口から</p>
        <h2 id="choose-role">「参加したい」も、「一緒につくりたい」も。</h2>
        <div className={styles.choiceGrid}>
          <article id="families" className={styles.choiceCard}>
            <p className={styles.eyebrow}>保護者の方へ</p><h3>近くで参加したい</h3>
            <p>「この地域で開かれたら参加してみたい」というご希望をお聞かせください。今のチームを続けながら、新しい学びを得られるスクールを考えています。</p>
            <ul><li>お住まいの都道府県・市区町村</li><li>お子さまの学年・現在の活動</li><li>通いやすい曜日・時間帯、ご希望</li></ul>
            <a className={styles.primary} href={formLink("family")} target="_blank" rel="noopener noreferrer">参加の希望を送る ↗</a>
            <p className={styles.smallPrint}>保護者など18歳以上の方がご入力ください。無料で、入会・予約のお申し込みにはなりません。</p>
          </article>
          <article id="partners" className={styles.choiceCard}>
            <p className={styles.eyebrow}>指導者・地域の皆さん・企業の方へ</p><h3>指導や運営に協力したい</h3>
            <p>コーチとして指導する。地域で運営を支える。体育館を紹介する。協賛で応援する。経験やご都合に合う関わり方をご相談ください。</p>
            <ul><li>指導・アシスタント・身体づくりのサポート</li><li>運営・会場の確保・地域での連絡や調整</li><li>企業・団体としての協賛や連携</li></ul>
            <a className={styles.primary} href={formLink("partner")} target="_blank" rel="noopener noreferrer">協力について相談する ↗</a>
            <p className={styles.smallPrint}>まずはご相談から。役割や報酬・交通費などは、活動を始める前に個別に話し合います。</p>
          </article>
        </div>
        <div className={styles.currentStatus}><strong>現在は、ご希望や相談を伺う段階です。</strong><p>開催地域・開始時期・対象・料金は、まだ決まっていません。条件が整った地域から体験会を検討し、決まった内容をお知らせします。</p></div>
      </section>
      <section className={`${styles.section} ${styles.vision}`} aria-labelledby="school-vision">
        <p className={styles.eyebrow}>地域で学ぶ。その先へつながる。</p><h2 id="school-vision">いつもの体育館の先に、<br/>まだ知らないバスケがある。</h2>
        <p className={styles.lead}>クリニックで得た気づきを、普段の練習で試す。地域のコーチが学び続け、子どもたちの変化を見守る。その積み重ねを、全国の仲間や国内外の交流へつなげていくことがRBAのビジョンです。</p>
        <div className={styles.visionGrid}><article><span>日常の学び</span><h3>一度の刺激を、日々の成長へ。</h3><p>単発のクリニックに加え、課題に取り組み、振り返りながら学べる場所を目指します。</p></article><article><span>コーチの学び</span><h3>いい指導が、地域で続くように。</h3><p>地域のコーチを中心に、本部が教材・研修・指導の振り返りを支える体制を整えます。</p></article><article><span>地域から国内外へ</span><h3>新しい仲間と、違うバスケに出会う。</h3><p>全国クリニックやBACKBONE、海外交流など、RBAの活動を通じて視野を広げる機会をつくります。</p></article></div>
        <div className={styles.actions}><a className={styles.secondary} href="/ja/our-work">全国・アジアでの開催実績を見る →</a><a className={styles.secondary} href="/ja/international">海外との活動を知る →</a></div>
        <p className={styles.note}>大会・遠征・海外交流は別の企画として募集します。スクールへの希望送信によって参加が決まるものではありません。</p>
      </section>
    </> : null}
    {locale !== "ja" ? <section className={styles.section}><h2>{c.heading}</h2><div className={styles.grid}>{c.paths.map(([title, body], i) => <article key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{body}</p></article>)}</div></section> : null}
    <section id="approach" className={styles.section}><h2>{c.learnHeading}</h2><div className={styles.learning}>{c.learning.map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div></section>
    <section id="opening-steps" className={styles.section}><h2>{c.processHeading}</h2><ol className={styles.steps}>{c.process.map(x => <li key={x}>{x}</li>)}</ol><p className={styles.note}>{c.availability}</p></section>
    <section id="questions" className={styles.section}><h2>{c.faqHeading}</h2>{c.faq.map(([q, a]) => <details className={styles.faq} key={q}><summary>{q}</summary><p>{a}</p></details>)}</section>
    <section className={styles.section}><h2>{c.linksHeading}</h2><div className={styles.actions}>{[localePath(locale,"opportunities"), "/ja/regions", localePath(locale,"my-homecourt"), localePath(locale,"policies")].map((href, i) => <a className={styles.secondary} href={href} key={href}>{c.links[i]} →</a>)}</div><div className={styles.actions}><a className={styles.primary} href={formLink("family")} target="_blank" rel="noopener noreferrer">{c.family} ↗</a><a className={styles.secondary} href={formLink("partner")} target="_blank" rel="noopener noreferrer">{c.partner} ↗</a></div></section>
  </div></SiteFrame>;
}
