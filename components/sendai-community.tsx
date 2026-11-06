import Image from "next/image";
import { activeSendaiPartners } from "@/lib/gream-sendai-partners";
import type { Locale } from "./site-frame";
import styles from "./sendai-community.module.css";

const copy = {
  ja: { title: "太白区のまちと、GREAM仙台を育てる。", body: "仙台市太白区を拠点に活動するU15バスケットボールクラブ。長町、富沢、八木山、茂庭台など、地域のお店や企業と、子どもたちが挑戦を続けられる環境をつくります。", team: "GREAM仙台の活動・参加相談", sponsor: "太白区の企業・お店向け協賛案内", label: "GREAM仙台の地域パートナー" },
  en: { title: "Rooted in Sendai. Growing with Taihaku.", body: "GREAM SENDAI is RBA’s U15 basketball club based in Taihaku Ward, Sendai. We welcome local businesses and shops to help young players keep learning, playing and connecting with their community.", team: "Meet GREAM SENDAI (Japanese)", sponsor: "Local partnership options (Japanese)", label: "GREAM SENDAI community partners" },
  "zh-tw": { title: "扎根仙台，與太白區一同成長。", body: "GREAM SENDAI是以仙台市太白區為基地的U15籃球俱樂部。我們邀請在地商家與企業，共同支持孩子持續學習與挑戰。", team: "認識GREAM仙台（日文）", sponsor: "在地合作方案（日文）", label: "GREAM仙台在地合作夥伴" },
  ko: { title: "센다이에 뿌리내리고, 타이하쿠와 함께 성장합니다.", body: "GREAM SENDAI는 센다이시 타이하쿠구를 거점으로 활동하는 U15 농구 클럽입니다. 지역 기업과 상점이 아이들의 배움과 도전을 함께 응원할 수 있습니다.", team: "GREAM 센다이 소개 (일본어)", sponsor: "지역 파트너십 안내 (일본어)", label: "GREAM 센다이 지역 파트너" },
} as const;

export function SendaiCommunity({ locale = "ja", partnersOnly = false }: { locale?: Locale; partnersOnly?: boolean }) {
  const c = copy[locale];
  const partners = activeSendaiPartners();
  return <section className={styles.section} aria-label={c.label} data-sendai-community="persistent">
    <div className={styles.inner}>
      <p className={styles.eyebrow}>GREAM SENDAI / SENDAI · TAIHAKU</p>
      <h2>{c.title}</h2>
      {!partnersOnly && <p>{c.body}</p>}
      {partners.length > 0 && <ul className={styles.partners}>{partners.map(p => <li key={p.id}><a href={p.url} target="_blank" rel="sponsored noopener noreferrer">{p.logoPath && <Image src={p.logoPath} alt="" width={110} height={48} />}<span>{p.name}</span></a></li>)}</ul>}
      <div className={styles.links}><a href="/ja/gream-sendai" data-growth-id="sendai-community-team">{c.team} →</a><a href="/ja/gream-sendai/partners" data-growth-id="sendai-community-partners">{c.sponsor} →</a></div>
    </div>
  </section>;
}
