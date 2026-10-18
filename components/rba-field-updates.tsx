import type { Locale } from "./site-frame";

type UpdateCopy = {
  section: string; title: string; intro: string;
  taiwanLabel: string; taiwanTitle: string; taiwanText: string;
  malaysiaLabel: string; malaysiaTitle: string; malaysiaText: string;
  note: string; link: string; future: string;
};
const copy: Record<Locale, UpdateCopy> = {
  ja: {
    section: "RBA FIELD NOTES / OCTOBER 2026",
    title: "台湾とマレーシア。現場で生まれた、次の学び。",
    intro: "国内のクリニックだけでなく、アジアの現場でも育成と指導者の学びをつなげています。",
    taiwanLabel: "実施記録｜台湾・台北",
    taiwanTitle: "台湾での育成交流",
    taiwanText: "2026年10月、台北で育成年代の交流活動を実施しました。異なる環境でプレーし、学んだ経験を次の練習へつなげます。",
    malaysiaLabel: "実施記録｜マレーシア・ペナン",
    malaysiaTitle: "ペナンで全7クリニックを実施",
    malaysiaText: "2026年10月16〜18日、Coach TanとSuper Hoopの協力のもと、指導者講習を含む全7クリニックを実施。U10〜U16年代の選手と指導者に向けて活動しました。",
    note: "現地での講習実施と、今後の団体間の正式な提携・契約は区別してご案内します。2027年の日台相互交流は構想・協議段階です。",
    link: "国際交流の活動・相談を見る", future: "2027年の日台交流構想を読む",
  },
  en: {
    section: "RBA FIELD NOTES / OCTOBER 2026",
    title: "Learning across courts in Taiwan and Malaysia.",
    intro: "Alongside our work in Japan, RBA continues learning with players and coaches across Asia.",
    taiwanLabel: "FIELD RECORD / TAIPEI, TAIWAN",
    taiwanTitle: "Youth basketball exchange",
    taiwanText: "In October 2026, RBA took part in youth basketball activities in Taipei, using experiences in a different environment to inform future learning.",
    malaysiaLabel: "FIELD RECORD / PENANG, MALAYSIA",
    malaysiaTitle: "Seven programmes in Penang",
    malaysiaText: "On 16–18 October 2026, RBA completed seven clinics in Penang, including coach education, with Coach Tan and Super Hoop. Programmes covered U10–U16 age groups and coaches.",
    note: "A completed session does not imply a formal partnership agreement. A possible reciprocal Japan–Taiwan programme for 2027 remains under discussion.",
    link: "Explore international exchange", future: "Read our Journal",
  },
  "zh-tw": {
    section: "RBA FIELD NOTES / 2026年10月",
    title: "從台灣到馬來西亞，讓場上的學習持續延伸。",
    intro: "除了在日本舉辦活動，RBA也持續透過亞洲各地的實際交流連結球員與教練。",
    taiwanLabel: "活動紀錄／台灣・台北",
    taiwanTitle: "青少年籃球交流",
    taiwanText: "2026年10月，RBA在台北參與青少年籃球交流活動，希望將不同環境中的經驗帶回日常訓練。",
    malaysiaLabel: "活動紀錄／馬來西亞・檳城",
    malaysiaTitle: "檳城七項課程",
    malaysiaText: "2026年10月16日至18日，RBA在Coach Tan與Super Hoop協助下完成七項訓練課程，包含教練講習，對象涵蓋U10至U16球員及教練。",
    note: "已舉辦的活動不代表未來合作合約已正式成立。2027年的台日雙向交流仍在規劃與討論中。",
    link: "了解國際交流", future: "閱讀RBA JOURNAL",
  },
  ko: {
    section: "RBA FIELD NOTES / 2026년 10월",
    title: "대만과 말레이시아, 코트에서 이어지는 배움.",
    intro: "RBA는 일본의 활동과 함께 아시아의 선수와 지도자들이 배우는 현장을 연결하고 있습니다.",
    taiwanLabel: "활동 기록 / 대만 타이베이",
    taiwanTitle: "유소년 농구 교류",
    taiwanText: "2026년 10월 타이베이에서 유소년 농구 교류 활동을 진행했습니다. 새로운 환경에서 얻은 경험을 일상 훈련에 연결합니다.",
    malaysiaLabel: "활동 기록 / 말레이시아 페낭",
    malaysiaTitle: "페낭 지도자 강습회",
    malaysiaText: "2026년 10월 현지 코치들의 도움으로 페낭에서 지도자 강습회를 진행했습니다. 향후 교류 가능성도 검토하고 있습니다.",
    note: "현장 강습회의 진행과 정식 제휴 계약의 체결은 별개입니다. 2027년 일본·대만 상호 교류는 아직 협의 중입니다.",
    link: "국제 교류 알아보기", future: "RBA JOURNAL 읽기",
  },
};

export function RbaFieldUpdates({ locale, placement = "home" }: { locale: Locale; placement?: "home" | "international" }) {
  const c = copy[locale];
  const prefix = locale === "en" ? "" : `/${locale}`;
  const futureHref = locale === "ja" ? "/ja/journal/japan-taiwan-development-exchange-2027" : `${prefix}/journal`;
  return (
    <section
      aria-labelledby={`rba-field-notes-${placement}`}
      className={placement === "international" ? "bg-[#f4f1eb] text-[#171717]" : "border-b border-[#c9c6c0]"}
    >
      <div className={placement === "international" ? "mx-auto max-w-[1100px] px-6 py-12 sm:px-10 sm:py-16" : "py-12 sm:py-16"}>
        <p className="text-[11px] font-bold tracking-[0.18em] text-[#666]">{c.section}</p>
        <h2 id={`rba-field-notes-${placement}`} className="mt-3 max-w-[820px] text-2xl font-bold leading-snug tracking-tight sm:text-3xl">{c.title}</h2>
        <p className="mt-3 max-w-[810px] text-sm leading-7 text-[#555]">{c.intro}</p>
        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <article className="border-t-2 border-[#252525] pt-5">
            <p className="text-xs font-bold text-[#696969]">{c.taiwanLabel}</p>
            <h3 className="mt-2 text-xl font-bold">{c.taiwanTitle}</h3>
            <p className="mt-3 text-sm leading-7 text-[#555]">{c.taiwanText}</p>
          </article>
          <article className="border-t-2 border-[#252525] pt-5">
            <p className="text-xs font-bold text-[#696969]">{c.malaysiaLabel}</p>
            <h3 className="mt-2 text-xl font-bold">{c.malaysiaTitle}</h3>
            <p className="mt-3 text-sm leading-7 text-[#555]">{c.malaysiaText}</p>
          </article>
        </div>
        <p className="mt-6 max-w-[850px] text-xs leading-6 text-[#666]">{c.note}</p>
        <div className="mt-6 flex flex-wrap gap-x-7 gap-y-4 text-sm font-semibold">
          <a className="inline-flex min-h-11 items-center border-b border-[#171717] text-[#171717]" href={`${prefix}/international`}>{c.link} ↗</a>
          <a className="inline-flex min-h-11 items-center border-b border-[#797979] text-[#343434]" href={futureHref}>{c.future} ↗</a>
        </div>
      </div>
    </section>
  );
}
